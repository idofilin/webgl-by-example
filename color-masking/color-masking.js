;(function(){
window.addEventListener("load", function setupAnimation (evt) {
  "use strict"
  window.removeEventListener(evt.type, setupAnimation, false);            

  var canvas = document.querySelector("canvas");
  var gl = canvas.getContext("webgl") 
      || canvas.getContext("experimental-webgl");
  if (!gl) {
    document.querySelector("p").innerHTML = 
      "Failed to get WebGL context." 
      + "Your browser or device may not support WebGL.";
    return;
  }
  gl.viewport(0, 0, 
    gl.drawingBufferWidth, gl.drawingBufferHeight);

  var timer = setInterval(drawAnimation, 1000);

  var mask = [true, true, true];
  var redtoggle = document.querySelector("#red-toggle"),
    greentoggle = document.querySelector("#green-toggle"),
    bluetoggle = document.querySelector("#blue-toggle");
  redtoggle.addEventListener("click", setColorMask, false);
  greentoggle.addEventListener("click", setColorMask, false);
  bluetoggle.addEventListener("click", setColorMask, false);

  function setColorMask(evt) {
    var index = 
      evt.target === greentoggle && 1
      || evt.target === bluetoggle && 2 
      || 0;
    mask[index] = !mask[index];
    if (mask[index] === true) 
      evt.target.innerHTML="On";
    else 
      evt.target.innerHTML="Off";
    gl.colorMask(mask[0], mask[1], mask[2], true);
    drawAnimation();
  };

  function drawAnimation () {
    var color = getRandomColor();
    gl.clearColor(color[0], color[1], color[2], 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  function getRandomColor() {
    return [Math.random(), Math.random(), Math.random()];
  }
}, false);
})();