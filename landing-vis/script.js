// Small Chart.js demo that initializes on page load, with randomize and download features

function rand(max=100){return Math.floor(Math.random()*max)}

const ctx = document.getElementById('landingChart');
let landingChart;

function makeData(){
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

function createChart(){
  if(!ctx) return;
  landingChart = new Chart(ctx.getContext('2d'), {
    type: 'bar',
    data: makeData(),
    options: {
      animation: {duration: 800, easing: 'easeOutQuart'},
      plugins: {legend:{display:false}, tooltip:{enabled:true}},
      scales: {
        x: {grid:{display:false}},
        y: {beginAtZero:true, ticks:{stepSize:20}}
      }
    }
  })
}

function randomizeData(){
  if(!landingChart) return;
  landingChart.data = makeData();
  landingChart.update();
}

function downloadPNG(){
  if(!ctx) return;
  const a = document.createElement('a');
  a.href = ctx.toDataURL('image/png');
  a.download = 'landing-chart.png';
  a.click();
}

window.addEventListener('DOMContentLoaded', ()=>{
  createChart();
  document.getElementById('randomize').addEventListener('click', randomizeData);
  document.getElementById('download').addEventListener('click', downloadPNG);
});
