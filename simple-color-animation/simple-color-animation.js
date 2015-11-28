// The entire code runs inside an event handler of the window
// load event. That way we are not messing up the global scope,
// and ensuring that page resources are fully loaded and styled
// with CSS before running our code. Note that we are giving the
// event handler a name (setupAnimation) so that we can refer to
// the function object within the function itself. 
window.addEventListener("load", function setupAnimation (evt) {
  "use strict"
  // Cleaning after ourselves. The event handler removes
  // itself, because it only needs to run once.
  window.removeEventListener(evt.type, setupAnimation, false);            

  // A variable to hold a timer that drives the animation.
  var timer;

  // Click event handlers.  
  var canvas = document.getElementById("canvas-view");                               
  var button = document.getElementById("animation-onoff");
  function startAnimation(evt) {
    canvas.removeEventListener(evt.type, startAnimation, false);            
    button.removeEventListener(evt.type, startAnimation, false);            
    canvas.addEventListener("click", stopAnimation, false);
    button.addEventListener("click", stopAnimation, false);
    // Setup animation loop by redrawing every second.
    timer = setInterval(drawAnimation, 1000);
    // Give immediate feedback to user after clicking, by
    // drawing one animation frame.
    drawAnimation();
  }
  function stopAnimation(evt) {
    canvas.removeEventListener(evt.type, stopAnimation, false);            
    button.removeEventListener(evt.type, stopAnimation, false);            
    canvas.addEventListener("click", startAnimation, false);
    button.addEventListener("click", startAnimation, false);
    // Stop animation by clearing the timer.
    clearInterval(timer);
  }
  // Call stopAnimation() once to setup the initial event
  // handlers for canvas and button.
  stopAnimation({type: "click"});

  // A variable to hold the WebGLRenderingContext.
  var gl;

  // The frame drawing function.
  function drawAnimation () {
    // Referring to the externally defined gl variable
    // through closure. If not defined, try to obtain the
    // WebGLRenderingContext. If failed, alert user of
    // failure and remove the timer, so not to repeat the
    // alert. Otherwise, initialize the drawing area (the
    // viewport). 
    if (!gl) {
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
    // Clear the context with the newly set color. This is
    // the function call that actually draws to the canvas.
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  // Random color helper function.
  function getRandomColor() {
    return [Math.random(), Math.random(), Math.random()];
  }

}, false);
