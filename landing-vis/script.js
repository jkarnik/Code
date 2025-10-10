// Small Chart.js demo that initializes on page load, with randomize and download features

function rand(max=100){return Math.floor(Math.random()*max)}

const ctx = document.getElementById('landingChart');
const pieCtx = document.getElementById('pieChart');
let landingChart, pieChart;

function makeBarData(){
  return {
    labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    datasets: [{
      label: 'Visitors',
      backgroundColor: function(context){
        const value = context.raw;
        // gradient-like colors
        return value > 75 ? '#60a5fa' : value > 40 ? '#34d399' : '#f97316';
      },
      borderRadius: 6,
      data: Array.from({length:7},()=>rand(100))
    }]
  }
}

function makePieData(barData) {
  const data = barData.datasets[0].data;
  return {
    labels: ['High Traffic (>75)', 'Medium Traffic (40-75)', 'Lower Traffic (<40)'],
    datasets: [{
      data: [
        data.filter(v => v > 75).length,
        data.filter(v => v > 40 && v <= 75).length,
        data.filter(v => v <= 40).length
      ],
      backgroundColor: ['#60a5fa', '#34d399', '#f97316'],
      borderWidth: 0,
      borderRadius: 6
    }]
  };
}

function createCharts(){
  if(!ctx || !pieCtx) return;
  
  const barData = makeBarData();
  
  landingChart = new Chart(ctx, {
    type: 'bar',
    data: barData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {duration: 800, easing: 'easeOutQuart'},
      plugins: {
        legend:{display:false}, 
        tooltip:{enabled:true},
        title: {
          display: true,
          text: 'Daily Visitors',
          color: '#e6eef6',
          font: {size: 16}
        }
      },
      scales: {
        x: {grid:{display:false}, ticks: {color: '#9aa4b2'}},
        y: {
          beginAtZero:true, 
          ticks:{stepSize:20, color: '#9aa4b2'},
          grid: {color: 'rgba(154, 164, 178, 0.1)'}
        }
      }
    }
  });

  pieChart = new Chart(pieCtx, {
    type: 'pie',
    data: makePieData(barData),
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {duration: 800, easing: 'easeOutQuart'},
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: '#e6eef6',
            padding: 20,
            font: {size: 12}
          }
        },
        tooltip: {enabled: true},
        title: {
          display: true,
          text: 'Traffic Distribution',
          color: '#e6eef6',
          font: {size: 16}
        }
      }
    }
  });
}

function randomizeData(){
  if(!landingChart || !pieChart) return;
  const barData = makeBarData();
  landingChart.data = barData;
  pieChart.data = makePieData(barData);
  landingChart.update();
  pieChart.update();
}

function downloadPNG(chartId){
  const canvas = document.getElementById(chartId);
  if(!canvas) return;
  const a = document.createElement('a');
  a.href = canvas.toDataURL('image/png');
  a.download = `${chartId}.png`;
  a.click();
}

window.addEventListener('DOMContentLoaded', ()=>{
  createCharts();
  document.getElementById('randomize').addEventListener('click', randomizeData);
  document.getElementById('download').addEventListener('click', () => {
    downloadPNG('landingChart');
    setTimeout(() => downloadPNG('pieChart'), 100);
  });
});