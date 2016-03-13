;(function(){
"use strict"
window.addEventListener("load", setupAnimation, false);
// Variables to hold the WebGL context, and the color and
// position of animated squares.
var gl,
  color = getRandomColor(),
  position;

function setupAnimation (evt) {
  window.removeEventListener(evt.type, setupAnimation, false);
  if (!(gl = getRenderingContext()))
    return;

  gl.enable(gl.SCISSOR_TEST);
  gl.clearColor(color[0], color[1], color[2], 1.0);
  // Unlike the browser window, vertical position in WebGL is
  // measured from bottom to top. In here we set the initial
  // position of the square to be at the top left corner of the
  // drawing buffer.
  position = [0, gl.drawingBufferHeight];

  var button = document.querySelector("button");
  var timer;
  function startAnimation(evt) {
    button.removeEventListener(evt.type, startAnimation, false);            
    button.addEventListener("click", stopAnimation, false);
    document.querySelector("strong").innerHTML = "stop";
    timer = setInterval(drawAnimation, 17);
    drawAnimation();
  }
  function stopAnimation(evt) {
    button.removeEventListener(evt.type, stopAnimation, false);            
    button.addEventListener("click", startAnimation, false);
    document.querySelector("strong").innerHTML = "start";
    clearInterval(timer);
  }
  stopAnimation({type: "click"});
}

// Variables to hold the size and velocity of the square.
var size = [60, 60],
  velocity = 3.0;
function drawAnimation () {
  gl.scissor(position[0], position[1], size[0] , size[1]);
  gl.clear(gl.COLOR_BUFFER_BIT);
  // Every frame the vertical position of the square is
  // decreased, to create the illusion of movement.
  position[1] -= velocity;
  // When the sqaure hits the bottom of the drawing buffer, 
  // we override it with new square of different color and
  // velocity.
  if (position[1] < 0) {
    // Horizontal position chosen randomly, and vertical
    // position at the top of the drawing buffer.
    position = [
      Math.random()*(gl.drawingBufferWidth - size[0]),
      gl.drawingBufferHeight
    ];
    // Random velocity between 1.0 and 7.0
    velocity = 1.0 + 6.0*Math.random();
    color = getRandomColor();
    gl.clearColor(color[0], color[1], color[2], 1.0);
  }
}

function getRandomColor() {
  return [Math.random(), Math.random(), Math.random()];
}

function getRenderingContext() {
  var canvas = document.querySelector("canvas");
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  var gl = canvas.getContext("webgl") 
    || canvas.getContext("experimental-webgl");
  if (!gl) {
    var paragraph = document.querySelector("p");
    paragraph.innerHTML = "Failed to get WebGL context."
      + "Your browser or device may not support WebGL.";
    return null;
  }
  gl.viewport(0, 0, 
    gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  return gl;
}
})();