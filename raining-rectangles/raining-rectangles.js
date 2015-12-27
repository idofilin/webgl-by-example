;(function(){
"use strict"
window.addEventListener("load", setupAnimation, false);
var gl, 
  timer,
  rainingRect,
  scoreDisplay,
  missesDisplay;
function setupAnimation (evt) {
  window.removeEventListener(evt.type, setupAnimation, false);
  if (!(gl = getRenderingContext()))
    return;
  gl.enable(gl.SCISSOR_TEST);

  rainingRect = new Rectangle();
  timer = setTimeout(drawAnimation, 17);
  document.querySelector("canvas")
      .addEventListener("click", playerClick, false);
  var displays = document.querySelectorAll("strong");
  scoreDisplay = displays[0];  
  missesDisplay = displays[1]; 
}

var score = 0,
  misses = 0;
function drawAnimation () {
  gl.scissor(rainingRect.position[0], rainingRect.position[1], 
      rainingRect.size[0] , rainingRect.size[1]);
  gl.clear(gl.COLOR_BUFFER_BIT);
  rainingRect.position[1] -= rainingRect.velocity;
  if (rainingRect.position[1] < 0) {
    misses += 1;
    missesDisplay.innerHTML = misses;
    rainingRect = new Rectangle();
  }
  // We are using setTimeout for animation.  So we reschedule
  // the timeout to call  drawAnimation again in 17ms.
  // Otherwise we won't get any animation.
  timer = setTimeout(drawAnimation, 17);
}

function playerClick (evt) {
  // We need to transform the position of the click event from
  // window coordinates to relative position inside the canvas.
  // In addition we need to remember that  vertical position in
  // WebGL increases from bottom to top, unlike in the browser
  // window.
  var position = [
      evt.pageX - evt.target.offsetLeft,
      gl.drawingBufferHeight - (evt.pageY - evt.target.offsetTop),
    ];
  // if the click falls inside the rectangle, we caught it.
  // Increment score and create a new rectangle.
  var diffPos = [ position[0] - rainingRect.position[0],
      position[1] - rainingRect.position[1] ];
  if ( diffPos[0] >= 0 && diffPos[0] < rainingRect.size[0]
      && diffPos[1] >= 0 && diffPos[1] < rainingRect.size[1] ) {
    score += 1;
    scoreDisplay.innerHTML = score;
    rainingRect = new Rectangle();
  }
}

function Rectangle () {
  // Keeping a reference to the new Rectangle object, rather
  // than using the confusing this keyword.
  var rect = this;
  // We get three random numbers and use them for new rectangle
  // size and position. For each we use a different number,
  // because we want horizontal size, vertical size and
  // position to be determined independently.
  var randNums = getRandomVector();
  rect.size = [
    5 + 120 * randNums[0],
    5 + 120 * randNums[1]
  ];  
  rect.position = [
    randNums[2]*(gl.drawingBufferWidth - rect.size[0]),
    gl.drawingBufferHeight
  ];
  rect.velocity = 1.0 + 6.0*Math.random();
  rect.color = getRandomVector();
  gl.clearColor(rect.color[0], rect.color[1], rect.color[2], 1.0);
  function getRandomVector() {
    return [Math.random(), Math.random(), Math.random()];
  }
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