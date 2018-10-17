$("#param").submit(function(){
  // read data
  var date_from=$("input[name=date-from]").val();
  var date_to=$("input[name=date-to]").val();
  var gender=$("#gender option:selected").val();

  // ajax
  $.ajax({
    type: "POST",
    url: "/demoRequest",
    data: {'date_from':date_from, 'date_to':date_to, 'gender':gender},
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
