window.addEventListener("load", function() { 
  "use strict"
  var paragraph = document.querySelector("p"),
    leftCanvas = document.getElementsByTagName("canvas")[0],
    rightCanvas = document.getElementsByTagName("canvas")[1];
  leftCanvas.width = leftCanvas.clientWidth;
  leftCanvas.height = leftCanvas.clientHeight;
  [leftCanvas, rightCanvas].forEach(function(canvas) {
    var gl = canvas.getContext("webgl") 
      || canvas.getContext("experimental-webgl");
    if (!gl) {
      paragraph.innerHTML = "Failed to get WebGL context. " 
        + "Your browser or device may not support WebGL.";
      return;
    } 
    paragraph.innerHTML = "Congratulations! Your browser supports WebGL. "
      + "Now, compare the two canvases.";
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.enable(gl.SCISSOR_TEST);
    gl.scissor(30, 10, 60, 60);
    gl.clearColor(1.0, 1.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  });
}, false);
