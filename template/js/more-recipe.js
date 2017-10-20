 
var counter = 0;
$("#up-vote").click(function() {
  counter++;
  $("#count").text(counter);
});
$("#down-vote").click(function() {
  counter--;
  $("#count").text(counter);
})