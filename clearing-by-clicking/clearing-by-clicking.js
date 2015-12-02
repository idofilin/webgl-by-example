;(function(){
window.addEventListener("load", function setupWebGL (evt) {
  "use strict"

  // Cleaning after ourselves. The event handler removes
  // itself, because it only needs to run once. 
  window.removeEventListener(evt.type, setupWebGL, false);            

  // Adding the same click event handler to both canvas and
  // button. 
  var canvas = document.querySelector("#canvas-view");                               
  var button = document.querySelector("#color-switcher");
  canvas.addEventListener("click", switchColor, false);
  button.addEventListener("click", switchColor, false);

  // A variable to hold the WebGLRenderingContext. 
  var gl;

  // The click event handler. 
  function switchColor () {
    // Referring to the externally defined gl variable. 
    // If undefined, try to obtain the WebGLRenderingContext.
    // If failed, alert user of failure.
    // Otherwise, initialize the drawing buffer (the viewport). 
    if (!gl) {
      gl = canvas.getContext("webgl") 
        || canvas.getContext("experimental-webgl");
      if (!gl) {
        alert("Failed to get WebGL context.\n" 
          + "Your browser or device may not support WebGL.");
        return;
      }
      gl.viewport(0, 0, 
        gl.drawingBufferWidth, gl.drawingBufferHeight);
    }
    // Get a random color value using a helper function.
    var color = getRandomColor();
    // Set the clear color to the random color.
    gl.clearColor(color[0], color[1], color[2], 1.0);
    // Clear the context with the newly set color. This is
    // the function call that actually does the drawing.
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  // Random color helper function. 
  function getRandomColor() {
    return [Math.random(), Math.random(), Math.random()];
  }

}, false);
})();