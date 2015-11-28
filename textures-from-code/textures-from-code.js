window.addEventListener("load", function setupWebGL (evt) {
  "use strict"
  window.removeEventListener(evt.type, setupWebGL, false);
  var canvas = document.querySelector("canvas");
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  var gl = canvas.getContext("webgl") 
    || canvas.getContext("experimental-webgl");
  if (!gl) {
    alert("Failed to get WebGL context."
      + "Your browser or device may not support WebGL.");
    return;
  }
  gl.viewport(0, 0, 
    gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  try {
    var source = document.querySelector("#vertex-shader").innerHTML;
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader,source);
    gl.compileShader(vertexShader);
    source = document.querySelector("#fragment-shader").innerHTML
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader,source);
    gl.compileShader(fragmentShader);
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      var linkErrLog = gl.getProgramInfoLog(program);
      throw "Shader program did not link successfully.\nError log:\n" + linkErrLog;
    } 
    gl.detachShader(program, vertexShader);
    gl.detachShader(program, fragmentShader);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
  } catch(err) {
    alert("Something went wrong with shader program initialization:\n"
      + err);
    return;
  }
  gl.enableVertexAttribArray(0);
  var vertexBuffer = gl.createBuffer();  
  gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0.0]), gl.STATIC_DRAW);
  gl.vertexAttribPointer(0, 1, gl.FLOAT, false, 0, 0);
  gl.useProgram(program);
  gl.drawArrays(gl.POINTS, 0, 1);
}, false);
