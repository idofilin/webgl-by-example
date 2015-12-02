;(function(){
// Run everything inside window load event handler, to make sure
// DOM is fully loaded and styled before trying to manipulate it.
window.addEventListener("load", function() { 
  var paragraph = document.querySelector("p"),
    button = document.querySelector("button");
  // Adding click event handler to button.
  button.addEventListener("click", detectWebGLContext, false);
  function detectWebGLContext () {
    // Create canvas element. The canvas is not added to the
    // document itself, so it is never displayed in the
    // browser window.
    var canvas = document.createElement("canvas");
    // Get WebGLRenderingContext from canvas element.
    var gl = canvas.getContext("webgl") 
      || canvas.getContext("experimental-webgl");
    // Report the result.
    if (gl && gl instanceof WebGLRenderingContext) {
      paragraph.innerHTML = 
        "Congratulations! Your browser supports WebGL.";
    } else {
      paragraph.innerHTML = "Failed to get WebGL context. "
        + "Your browser or device may not support WebGL.";
    }
  }
}, false);
})();