;(function(){
window.addEventListener("load", function setupWebGL (evt) { 
  "use strict"
  window.removeEventListener(evt.type, setupWebGL, false);          
  var paragraph = document.querySelector("p");
  var canvas = document.querySelector("canvas");

  // The following two lines set the size (in CSS pixels) of
  // the drawing buffer to be identical to the size of the
  // canvas HTML element, as determined by CSS.
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  var gl = canvas.getContext("webgl") 
    || canvas.getContext("experimental-webgl");
  if (!gl) {
    paragraph.innerHTML = "Failed to get WebGL context. " 
      + "Your browser or device may not support WebGL.";
    return;
  } 
  gl.viewport(0, 0, 
    gl.drawingBufferWidth, gl.drawingBufferHeight);

  // Enable scissoring operation and define the position and
  // size of the scissoring area.
  gl.enable(gl.SCISSOR_TEST);
  gl.scissor(40, 20, 60, 130);

  // Clear the drawing buffer solid yellow.
  gl.clearColor(1.0, 1.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}, false);
})();