$("#param").submit(function(){
  // read data
  var date=$("input[name=date]").val();
  var startTime=$("#startTime option:selected").val();
  var endTime=$("#endTime option:selected").val();
  // ajax
  $.ajax({
    type: "POST",
    url: "/demoRequest",
    data: {'date':date, 'startTime':startTime, 'endTime':endTime},
    dataType:"json",
    success: function(res){
      if(res.err != null) {
        console.log(res.err);
      }
      else {
        // Chart
        demoResultChart(res.noisedData);
      }
    }
  });
  return false; // prevent page move
});
