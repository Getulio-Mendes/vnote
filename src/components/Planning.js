function svgPlanning(svgRef){
  var svg = svgRef.current;

  svg.addEventListener('pointerdown', onPointerDown); // Pointer is pressed
  svg.addEventListener('pointerup', onPointerUp); // Releasing the pointer
  svg.addEventListener('pointerleave', onPointerUp); // Pointer gets out of the SVG area
  svg.addEventListener('pointermove', onPointerMove); // Pointer is moving

  var point = svg.createSVGPoint();
  // This function returns an object with X & Y values from the pointer event
  function getPointFromEvent(event) {

    point.x = event.clientX;
    point.y = event.clientY;
    // We get the current transformation matrix of the SVG and we inverse it
    var invertedSVGMatrix = svg.getScreenCTM().inverse();

    return point.matrixTransform(invertedSVGMatrix);
  }

  var isPointerDown = false;
  var pointerOrigin;

  function onPointerDown(event) {
    isPointerDown = true;

    pointerOrigin = getPointFromEvent(event);
  }
  // We save the original values from the viewBox
  var viewBox = svg.viewBox.baseVal;

  function onPointerMove(event) {
    if (!isPointerDown) {
      return;
    }
    event.preventDefault();

    var pointerPosition = getPointFromEvent(event);

    // Update the viewBox variable with the distance from origin and current position
    viewBox.x -= (pointerPosition.x - pointerOrigin.x);
    viewBox.y -= (pointerPosition.y - pointerOrigin.y);
  }

  function onPointerUp() {
    isPointerDown = false;
  }

}

export default svgPlanning;