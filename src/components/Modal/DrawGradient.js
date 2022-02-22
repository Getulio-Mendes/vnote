function DrawGradient(svgRef){
    const svgns = 'http://www.w3.org/2000/svg';
    var gradient = document.createElementNS(svgns, 'linearGradient');
    var blackWhite = document.createElementNS(svgns, 'linearGradient');

    var stops = [
        {
            color: "rgb(255, 0, 0)",
            offset: 0
        },
        {
            color: "rgb(255, 0, 255)",
            offset: 0.15
        },
        {
            color: "rgb(0, 0, 255)",
            offset: 0.33
        },
        {
            color: "rgb(0, 255, 255)",
            offset: 0.49
        },
        {
            color: "rgb(0, 255, 0)",
            offset: 0.67
        },
        {
            color: "rgb(255, 255, 0)",
            offset: 0.84
        },
        {
            color: "rgb(255, 0, 0)",
            offset: 1
        }
    ]

    var blackWhiteStops = [
        {
            color: "rgba(0, 0, 0,1)",
            offset: 0
        },
        {
            color: "rgba(255, 255, 255,0)",
            offset: 0.5
        },
        {
            color: "rgba(0, 0, 0,0)",
            offset: 0.5
        },
        {
            color: "rgba(255, 255, 255,1)",
            offset: 1
        }
    ]

    stops.forEach(function (stop) {
        var stopE = document.createElementNS(svgns, 'stop');
        stopE.setAttribute('offset', stop.offset);
        stopE.setAttribute('stop-color', stop.color);

        gradient.appendChild(stopE);
    })
    blackWhiteStops.forEach(function (stop) {
        var stopE = document.createElementNS(svgns, 'stop');
        stopE.setAttribute('offset', stop.offset);
        stopE.setAttribute('stop-color', stop.color);

        blackWhite.appendChild(stopE);
    })

    gradient.id = 'Gradient';
    gradient.setAttribute('x1', '0');
    gradient.setAttribute('x2', '0');
    gradient.setAttribute('y1', '0');
    gradient.setAttribute('y2', '1');

    blackWhite.id = 'Gradient2';
    blackWhite.setAttribute('x1', '0');
    blackWhite.setAttribute('x2', '0');
    blackWhite.setAttribute('y1', '0');
    blackWhite.setAttribute('y2', '1');

    // used to condition render the gradient only after the rect is rendered
    var defs = document.createElementNS(svgns, 'defs');
    defs.appendChild(gradient)
    defs.appendChild(blackWhite)

    var gradRect = document.createElementNS(svgns, 'rect');
    var blackWhiteRect = document.createElementNS(svgns, 'rect');

    // set the gradient to be the rect background
    gradRect.setAttribute('fill', 'url(#Gradient)');
    blackWhiteRect.setAttribute('fill', 'url(#Gradient2)');
    // use the entire svg
    gradRect.setAttribute('width', '100%');
    gradRect.setAttribute('height', '100%');
    gradRect.setAttribute('transform', 'rotate(90,100,100)');
    blackWhiteRect.setAttribute('width', '100%');
    blackWhiteRect.setAttribute('height', '100%');

    // make sure the mouse circle is visible
    svgRef.current.insertBefore(blackWhiteRect, svgRef.current.firstChild);
    svgRef.current.insertBefore(gradRect, svgRef.current.firstChild);
    svgRef.current.insertBefore(defs, svgRef.current.firstChild);
}

export default DrawGradient;