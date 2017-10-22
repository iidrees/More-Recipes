 
var countup = 0;
$("#up-vote").click(function() {
  countup++;
  $("#count-up").text(countup);
});
var countdown = 0;
$("#down-vote").click(function() {
  countdown--;
  $("#count-down").text(countdown);
})