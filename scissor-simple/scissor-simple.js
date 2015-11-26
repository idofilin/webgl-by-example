// Run everything inside window load event handler, to make sure
// DOM is fully loaded and styled before trying to manipulate it.
window.addEventListener("load", function() { 
  var paragraph = document.querySelector("p");
  var canvas = document.querySelector("canvas");
  // The following two lines set the size (in CSS pixels) of
  // the drawing buffer to be identical to that of the canvas
  // HTML element, as displayed on the page using CSS.
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  // Get WebGLRenderingContext from canvas element.
  gl = canvas.getContext("webgl") 
    || canvas.getContext("experimental-webgl");
  // Give feedback to the user.
  if (!gl) {
    paragraph.innerHTML = "Failed to get WebGL context. " 
      + "Your browser or device may not support WebGL.";
    return;
  } 
  paragraph.innerHTML = 
    "Congratulations! Your browser supports WebGL. "
    +  "Here is a small demonstration:"
  gl.viewport(0, 0, 
    gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.enable(gl.SCISSOR_TEST);
  gl.scissor(40, 20, 60, 170);
  gl.clearColor(1.0, 1.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}, false);
