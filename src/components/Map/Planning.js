function svgPlanning(svgRef){
  var svg = svgRef.current;

  svg.addEventListener('pointerdown', onPointerDown,false); // Pointer is pressed
  svg.addEventListener('pointerup', onPointerUp); // Releasing the pointer
  svg.addEventListener('pointerleave', onPointerUp); // Pointer gets out of the SVG area

  var point = svg.createSVGPoint();
  // This function returns an object with X & Y values from the pointer event
  function getPointFromEvent(event) {

    point.x = event.clientX;
    point.y = event.clientY;
    // get the current transformation matrix of the SVG and we inverse it
    var invertedSVGMatrix = svg.getScreenCTM().inverse();

    return point.matrixTransform(invertedSVGMatrix);
  }

  var pointerOrigin;

  function onPointerDown(event) {
    // prevent planning on drag
    if(event.target.nodeName != "circle"){
      svg.addEventListener("pointermove", onPointerMove);
      pointerOrigin = getPointFromEvent(event);
    }
  }
  // save the original values from the viewBox
  var viewBox = svg.viewBox.baseVal;

  function onPointerMove(event) {
    var pointerPosition = getPointFromEvent(event);

    // Update the viewBox variable with the distance from origin and current position
    viewBox.x -= (pointerPosition.x - pointerOrigin.x);
    viewBox.y -= (pointerPosition.y - pointerOrigin.y);
  }

  function onPointerUp() {
    svg.removeEventListener("pointermove",onPointerMove);
  }

}

export default svgPlanning;