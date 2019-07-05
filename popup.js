$(function() {
  //default value is "start"
  var currentState = localStorage.currentState || "start";
  //cache button DOM element reference
  var $toggleBtn = $("#toggle-btn");

  //update button status
  if (currentState === "stop") {
    $toggleBtn.text("OFF");
  }

  //register button click handler
  $toggleBtn.click(function() {
    if (currentState === "start") {
      $toggleBtn.text("OFF");
      localStorage.currentState = "stop";
    }
    if (currentState === "stop") {
      $toggleBtn.text("ON");
      localStorage.currentState = "start";
    }
  });
});
