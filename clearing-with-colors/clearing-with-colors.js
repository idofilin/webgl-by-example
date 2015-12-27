;(function(){
// Run everything inside window load event handler, to make sure
// DOM is fully loaded and styled before trying to manipulate it,
// and to not mess up the global scope. We are giving the event
// handler a name (setupWebGL) so that we can refer to the
// function object within the function itself.
window.addEventListener("load", function setupWebGL (evt) {
  "use strict"

  // Cleaning after ourselves. The event handler removes
  // itself, because it only needs to run once. 
  window.removeEventListener(evt.type, setupWebGL, false);            

  // References to the document elements. 
  var paragraph = document.querySelector("p"),
    canvas = document.querySelector("canvas");

  // Getting the WebGL rendering  context.
  var gl = canvas.getContext("webgl") 
    || canvas.getContext("experimental-webgl");

  // If failed, inform user of failure. Otherwise, initialize
  // the drawing buffer (the viewport) and clear the context
  // with a solid color. 
  if (!gl) {
    paragraph.innerHTML = "Failed to get WebGL context. " 
      + "Your browser or device may not support WebGL.";
    return;
  }
  paragraph.innerHTML = 
    "Congratulations! Your browser supports WebGL. ";
  gl.viewport(0, 0, 
    gl.drawingBufferWidth, gl.drawingBufferHeight);
  // Set the clear color to darkish green.
  gl.clearColor(0.0, 0.5, 0.0, 1.0);
  // Clear the context with the newly set color. This is
  // the function call that actually does the drawing.
  gl.clear(gl.COLOR_BUFFER_BIT);

}, false);
})();