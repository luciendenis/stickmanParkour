class SvgHelper {
  constructor() {} // nothing here
  startPath(refCoords, startCoords, orientation){
    let polarCoords = PolarCoordsFromCartesian(new Coordinates(0,0), startCoords);
    let coords = CartesianCoordinatesFromPolar(polarCoords.distance, polarCoords.angle + orientation);
    coords.addOffset(refCoords);
    return "M " + coords.x + "," + coords.y + " ";
  }
  moveToRelative(x, y, orientation){
    let polarCoords = PolarCoordsFromCartesian(new Coordinates(0,0), new Coordinates(x,y));
    polarCoords.angle += orientation;
    let coords = CartesianCoordinatesFromPolar(polarCoords.distance, polarCoords.angle);
    return "m " + coords.x + "," + (-coords.y) + " ";
  }
  lineToRelative(x, y, orientation){
    let polarCoords = PolarCoordsFromCartesian(new Coordinates(0,0), new Coordinates(x,y));
    polarCoords.angle += orientation;
    let coords = CartesianCoordinatesFromPolar(polarCoords.distance, polarCoords.angle);
    return "l " + coords.x + "," + coords.y + " ";
  }
  arcCurveRelativeSimpleCorner(x, y, orientation, radius, clockWise){
    let polarCoords = PolarCoordsFromCartesian(new Coordinates(0,0), new Coordinates(x,y));
    polarCoords.angle += orientation;
    let coords = CartesianCoordinatesFromPolar(polarCoords.distance, polarCoords.angle);
    return "a " + radius + " " + radius + (clockWise ? " 0,1,1 " : " 0,0,0 ") + coords.x + "," + coords.y + " ";
  }
  closePath(){
    return "Z";
  }
  path_Rectangle(refCoords, startCoords, sizeCoords, orientation){
    let path = this.startPath(refCoords, startCoords, orientation);
    path += this.lineToRelative(sizeCoords.x, 0, orientation); // go straight right
    path += this.lineToRelative(0, -sizeCoords.y, orientation); // go straight up
    path += this.lineToRelative(-sizeCoords.x, 0, orientation); // go straight left
    path += this.lineToRelative(0, sizeCoords.y, orientation); // go straight down
    return path + this.closePath();
  }

  path_Rectangle_Rounded(refCoords, startCoords, sizeCoords, orientation, radius){
    radius = Math.min(radius, sizeCoords.x/2, sizeCoords.y/2);
    startCoords.x += radius;
    let path = this.startPath(refCoords, startCoords, orientation);
    path += this.lineToRelative(sizeCoords.x - 2*radius, 0, orientation); // go straight right
    path += this.arcCurveRelativeSimpleCorner(radius, -radius, orientation, radius, false); // corner to up right
    path += this.lineToRelative(0, -sizeCoords.y + 2*radius, orientation); // go straight up
    path += this.arcCurveRelativeSimpleCorner(-radius, -radius, orientation, radius, false); // corner to up left
    path += this.lineToRelative(-sizeCoords.x + 2*radius, 0, orientation); // go straight left
    path += this.arcCurveRelativeSimpleCorner(-radius, radius, orientation, radius, false); // corner to down left
    path += this.lineToRelative(0, sizeCoords.y - 2*radius, orientation); // go straight down
    path += this.arcCurveRelativeSimpleCorner(radius, radius, orientation, radius, false); // corner to down right
    return path + this.closePath();
  }

  path_Line(refCoords, startCoords, sizeCoords, orientation){
    let path = this.startPath(refCoords, startCoords, orientation);
    path += this.lineToRelative(sizeCoords.x, sizeCoords.y, orientation);
    return path + this.closePath();
  }
}

var svgHelper = new SvgHelper();
