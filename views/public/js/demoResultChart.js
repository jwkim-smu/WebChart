var demoResultChart = function(noisedData) {

  console.log(noisedData);
  var dataArray = new Array();
  var labelArray = new Array();

  var len = noisedData.length;
  var firstTime = noisedData[0].hour;
  var lastTime = noisedData[len-1].hour;

  var idx = 0;
  for(var h=9; h<firstTime; h++) {
    dataArray[idx] = 0;
    labelArray[idx] = h;
    idx++;
  }

  for(var i=0; i<len; i++) {
    dataArray[idx] = noisedData[i].avg_noisedData;
    labelArray[idx] = noisedData[i].hour;
    idx++;
  }

  for(var h=22; i>lastTime; h--) {
    dataArray[idx] = 0;
    labelArray[idx] = h;
    idx++;
  }

  $('#demoChart').remove();
  $('#chart-container').append('<canvas id="demoChart"></canvas>');
  var ctx = document.getElementById('demoChart').getContext('2d');
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'bar',

      // The data for our dataset
      data: {
          labels: labelArray,
          datasets: [{
              label: "noisedData",
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: dataArray,
          }]
      },

      // Configuration options go here
      options: {}
  });

}
