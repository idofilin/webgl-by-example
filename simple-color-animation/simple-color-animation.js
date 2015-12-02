;(function(){
window.addEventListener("load", function setupAnimation (evt) {
  "use strict"
  window.removeEventListener(evt.type, setupAnimation, false);            

  // A variable to hold a timer that drives the animation.
  var timer;

  // Click event handlers.  
  var button = document.querySelector("#animation-onoff");
  var verb = document.querySelector("strong");
  function startAnimation(evt) {
    button.removeEventListener(evt.type, startAnimation, false);            
    button.addEventListener("click", stopAnimation, false);
    verb.innerHTML="stop";
    // Setup animation loop by redrawing every second.
    timer = setInterval(drawAnimation, 1000);
    // Give immediate feedback to user after clicking, by
    // drawing one animation frame.
    drawAnimation();
  }
  function stopAnimation(evt) {
    button.removeEventListener(evt.type, stopAnimation, false);            
    button.addEventListener("click", startAnimation, false);
    verb.innerHTML="start";
    // Stop animation by clearing the timer.
    clearInterval(timer);
  }
  // Call stopAnimation() once to setup the initial event
  // handlers for canvas and button.
  stopAnimation({type: "click"});

  var gl;
  function drawAnimation () {
    if (!gl) {
      var canvas = document.getElementById("canvas-view");
      gl = canvas.getContext("webgl") 
        ||canvas.getContext("experimental-webgl");
      if (!gl) {
        clearInterval(timer);
        alert("Failed to get WebGL context.\n" 
          + "Your browser or device may not support WebGL.");
        return;
      }
      gl.viewport(0, 0, 
        gl.drawingBufferWidth, gl.drawingBufferHeight);
    }

    // Get a random color value using a helper function.
    var color = getRandomColor();
    // Set the WebGLRenderingContext clear color to the
    // random color.
    gl.clearColor(color[0], color[1], color[2], 1.0);
    // Clear the context with the newly set color. 
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  // Random color helper function.
  function getRandomColor() {
    return [Math.random(), Math.random(), Math.random()];
  }
}, false);
})();