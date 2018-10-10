var demoResultChart = function(noisedData) {

  console.log(noisedData);
  var dataArray = new Array();
  var labelArray = new Array();
  for(var i=0; i<noisedData.length; i++) {
    dataArray[i] = noisedData[i].noisedAvg;
    labelArray[i] = noisedData[i].hour;
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
