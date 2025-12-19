class SvgHelper {
  constructor() {} // nothing here
  getAbsoluteCoords(refCoords, startCoords, orientation){
    let polarCoords = PolarCoordsFromCartesian(new Coordinates(0,0), startCoords);
    let coords = CartesianCoordinatesFromPolar(polarCoords.distance, polarCoords.angle + orientation);
    return coords.addOffset(refCoords);
  }
  getRelativeCoords(coords, orientation){
    let polarCoords = PolarCoordsFromCartesian(new Coordinates(0,0), coords);
    polarCoords.angle += orientation;
    return CartesianCoordinatesFromPolar(polarCoords.distance, polarCoords.angle);
  }
  startPath(coords){
    return "M " + coords.x + "," + coords.y + " ";
  }
  moveToRelative(x, y, orientation){
    let coords = this.getRelativeCoords(new Coordinates(x,y), orientation);
    return "m " + coords.x + "," + (-coords.y) + " ";
  }
  lineToRelative(x, y, orientation){
    let coords = this.getRelativeCoords(new Coordinates(x,y), orientation);
    return "l " + coords.x + "," + coords.y + " ";
  }
  lineToAbsolute(coords){
    return "L " + coords.x + "," + coords.y + " ";
  }
  arcCurveRelativeSimpleCorner(x, y, orientation, radius, largeArc, clockWise){
    let coords = this.getRelativeCoords(new Coordinates(x,y), orientation);
    return "a " + radius + " " + radius + " 0," + (largeArc ? "1," : "0,") + (clockWise ? "1 " : "0 ") + coords.x + "," + coords.y + " ";
  }
  quadraticCurveToAbsolute(x1, y1, x, y){
    return "Q " + x1 + "," + y1 + " " + x + "," + y + " ";
  }
  closePath(){
    return "Z";
  }

  // Full path for a line
  path_Line_Relative(refCoords, startCoords, sizeCoords, orientation){
    let path = this.startPath(this.getAbsoluteCoords(refCoords, startCoords, orientation));
    path += this.lineToRelative(sizeCoords.x, sizeCoords.y, orientation);
    return path + this.closePath();
  }

  // Full path for a line
  path_Line_Absolute(startCoords, endCoords){
    let path = this.startPath(startCoords);
    path += this.lineToAbsolute(endCoords);
    return path + this.closePath();
  }

  // Full path for a polygon with relative coordinates
  path_Polygon_Relative(refCoords, startCoords, pointsCoordsArray, orientation){
    let path = this.startPath(this.getAbsoluteCoords(refCoords, startCoords, orientation));
    for(let i = 0; i < pointsCoordsArray.length; i++){
      path += this.lineToRelative(pointsCoordsArray[i].x, -pointsCoordsArray[i].y, orientation);
    }
    return path + this.closePath();
  }

  // Full path for a polygon with relative coordinates
  path_Polygon_Absolute(pointsCoordsArray){
    let path = this.startPath(pointsCoordsArray[0]);
    for(let i = 1; i < pointsCoordsArray.length; i++){
      path += this.lineToAbsolute(pointsCoordsArray[i]);
    }
    return path + this.closePath();
  }

  // Full path for a rectangle
  path_Rectangle(refCoords, startCoords, sizeCoords, orientation, angle){
    let path = this.startPath(this.getAbsoluteCoords(refCoords, startCoords, orientation));
    path += this.lineToRelative(sizeCoords.x, 0, orientation+angle); // go straight right
    path += this.lineToRelative(0, -sizeCoords.y, orientation+angle); // go straight up
    path += this.lineToRelative(-sizeCoords.x, 0, orientation+angle); // go straight left
    path += this.lineToRelative(0, sizeCoords.y, orientation+angle); // go straight down
    return path + this.closePath();
  }

  // Full path for a triangle
  path_Triangle(refCoords, startCoords, sizeCoords, orientation, angle){
    startCoords.x -= sizeCoords.x/2;
    let path = this.startPath(this.getAbsoluteCoords(refCoords, startCoords, orientation));
    path += this.lineToRelative(sizeCoords.x/2, -sizeCoords.y, orientation+angle); // go up to the middle
    path += this.lineToRelative(sizeCoords.x/2, sizeCoords.y, orientation+angle); // go down to the right
    return path + this.closePath();
  }

  // Full path for a rounded rectangle
  path_Rectangle_Rounded(refCoords, startCoords, sizeCoords, orientation, angle, radius){
    radius = Math.min(radius, sizeCoords.x/2, sizeCoords.y/2);
    startCoords.x += radius; // offsetting the path start to leave room for the bottom left corner
    let path = this.startPath(this.getAbsoluteCoords(refCoords, startCoords, orientation));
    path += this.lineToRelative(sizeCoords.x - 2*radius, 0, orientation+angle); // go straight right
    path += this.arcCurveRelativeSimpleCorner(radius, -radius, orientation+angle, radius, false, false); // corner to up right
    path += this.lineToRelative(0, -sizeCoords.y + 2*radius, orientation+angle); // go straight up
    path += this.arcCurveRelativeSimpleCorner(-radius, -radius, orientation+angle, radius, false, false); // corner to up left
    path += this.lineToRelative(-sizeCoords.x + 2*radius, 0, orientation+angle); // go straight left
    path += this.arcCurveRelativeSimpleCorner(-radius, radius, orientation+angle, radius, false, false); // corner to down left
    path += this.lineToRelative(0, sizeCoords.y - 2*radius, orientation+angle); // go straight down
    path += this.arcCurveRelativeSimpleCorner(radius, radius, orientation+angle, radius, false, false); // corner to down right
    return path + this.closePath();
  }

  // Full path for a rectangle with diagonals fully rounded
  path_Rectangle_diagonal_rounded(refCoords, startCoords, sizeCoords, orientation, angle, roundInclude){
    let cornerRadius = Math.min(sizeCoords.x, sizeCoords.y);
    let path = this.startPath(this.getAbsoluteCoords(refCoords, startCoords, orientation));
    path += this.lineToRelative(sizeCoords.x - (roundInclude ? cornerRadius : 0), 0, orientation+angle); // go straight right
    path += this.arcCurveRelativeSimpleCorner(cornerRadius, -cornerRadius, orientation+angle, cornerRadius, false, false); // corner to up right
    path += this.lineToRelative(-sizeCoords.x + (roundInclude ? cornerRadius : 0), 0, orientation+angle); // go straight left
    path += this.arcCurveRelativeSimpleCorner(-cornerRadius, +cornerRadius, orientation+angle, cornerRadius, false, false); // corner down to left
    return path + this.closePath();
  }

  // Rectangle with a shape on the top side
  path_Rectangle_Shape_Top(refCoords, startCoords, sizeCoords, orientation, angle, topShapeTransitionCoords, topShape, topShapeSizeCoords){
    startCoords.y += -sizeCoords.y; startCoords.x += sizeCoords.x; // offsetting the path start to begin at the top right
    let path = this.startPath(this.getAbsoluteCoords(refCoords, startCoords, orientation));
    // Drawing the bar sides and bottom
    path += this.lineToRelative(0, sizeCoords.y, orientation+angle); // go straight down
    path += this.lineToRelative(-sizeCoords.x, 0, orientation+angle); // go straight left
    path += this.lineToRelative(0, -sizeCoords.y, orientation+angle); // go straight up
    let xSize = sizeCoords.x;
    if(topShapeTransitionCoords != null){
      path += this.lineToRelative((sizeCoords.x-topShapeTransitionCoords.x)/2, -topShapeTransitionCoords.y, orientation + angle);
      xSize = topShapeTransitionCoords.x;
    }
    // Now drawing the shape
    let xArc;
    let arcRadius;
    let y1;
    let y2;
    switch (topShape) {
      case "spike":
        path += this.lineToRelative(xSize/2, -topShapeSizeCoords.y, orientation + angle); // go up to the middle top
        path += this.lineToRelative(xSize/2, topShapeSizeCoords.y, orientation + angle); // go down to the right top corner
      break;
      case "diamond":
        y1 = ((topShapeSizeCoords.x - xSize)/topShapeSizeCoords.x)*(topShapeSizeCoords.y/2);
        path += this.lineToRelative((xSize-topShapeSizeCoords.x)/2, -y1, orientation + angle); // go up to the left corner
        path += this.lineToRelative(topShapeSizeCoords.x/2, -topShapeSizeCoords.y/2, orientation + angle); // go up to the middle top
        path += this.lineToRelative(topShapeSizeCoords.x/2, topShapeSizeCoords.y/2, orientation + angle); // go down to the right corner
        path += this.lineToRelative((xSize-topShapeSizeCoords.x)/2, y1, orientation + angle); // go down to the bottom right
      break;
      case "arrow":
        xArc = (topShapeSizeCoords.x-xSize)/2;
        arcRadius = xArc/1.3;
        y1 = topShapeSizeCoords.y/8;
        y2 = topShapeSizeCoords.y - y1;
        path += this.arcCurveRelativeSimpleCorner(-xArc, -y1, orientation + angle, arcRadius, false, false);
        path += this.lineToRelative(topShapeSizeCoords.x/2, -y2, orientation + angle); // go up to the middle top
        path += this.lineToRelative(topShapeSizeCoords.x/2, y2, orientation + angle); // go down to the right top corner
        path += this.arcCurveRelativeSimpleCorner(-xArc, y1, orientation + angle, arcRadius, false, false);
      break;
      case "drop":
        xArc = (topShapeSizeCoords.x-xSize)/2;
        arcRadius = xArc;
        y1 = topShapeSizeCoords.y/3;
        y2 = topShapeSizeCoords.y - y1;
        path += this.arcCurveRelativeSimpleCorner(-xArc, -y1, orientation + angle, arcRadius, false, true);
        path += this.lineToRelative(topShapeSizeCoords.x/2, -y2, orientation + angle); // go up to the middle top
        path += this.lineToRelative(topShapeSizeCoords.x/2, y2, orientation + angle); // go down to the right top corner
        path += this.arcCurveRelativeSimpleCorner(-xArc, y1, orientation + angle, arcRadius, false, true);
      break;
      case "spade":
        xArc = (topShapeSizeCoords.x-xSize)/2;
        arcRadius = xArc/1.5;
        y1 = topShapeSizeCoords.y/4;
        y2 = topShapeSizeCoords.y - y1;
        path += this.arcCurveRelativeSimpleCorner(-xArc, -y1, orientation + angle, arcRadius, true, true);
        path += this.arcCurveRelativeSimpleCorner(topShapeSizeCoords.x/2, -y2, orientation + angle, arcRadius*4, false, false);
        path += this.arcCurveRelativeSimpleCorner(topShapeSizeCoords.x/2, y2, orientation + angle, arcRadius*4, false, false);
        path += this.arcCurveRelativeSimpleCorner(-xArc, y1, orientation + angle, arcRadius, true, true);
      break;
      case "spear":
      arcRadius = topShapeSizeCoords.x;
        path += this.arcCurveRelativeSimpleCorner(xSize/2, -topShapeSizeCoords.y, orientation + angle, arcRadius, false, true);
        path += this.arcCurveRelativeSimpleCorner(xSize/2, topShapeSizeCoords.y, orientation + angle, arcRadius, false, true);
      break;
      case "round":
        path += this.arcCurveRelativeSimpleCorner(xSize, 0, orientation + angle, topShapeSizeCoords.x, false, true); // corner to up right
      break;
      case "ball":
        path += this.arcCurveRelativeSimpleCorner(xSize, 0, orientation + angle, topShapeSizeCoords.x, true, true); // corner to up right
      break;
      default: // in every other cases path will be closes anyway to make a simple rectangle
      break;
    }
    if(topShapeTransitionCoords != null){
      path += this.lineToRelative((sizeCoords.x-topShapeTransitionCoords.x)/2, topShapeTransitionCoords.y, orientation + angle);
    }
    return path + this.closePath();
  }

  // Full path for a grass leaf
  path_grass_leaf(refCoords, startCoords, sizeCoords, orientation, angle, deviation){
    let realStartCoords = this.getAbsoluteCoords(refCoords, startCoords, orientation);
    let path = this.startPath(realStartCoords);
    let c1 = this.getAbsoluteCoords(realStartCoords, new Coordinates(-sizeCoords.x/2,-sizeCoords.y/2), orientation + angle);
    let c2 = this.getAbsoluteCoords(realStartCoords, new Coordinates(deviation,-sizeCoords.y), orientation + angle);
    let c3 = this.getAbsoluteCoords(realStartCoords, new Coordinates(sizeCoords.x/2,-sizeCoords.y/2), orientation + angle);
    let c4 = this.getAbsoluteCoords(realStartCoords, new Coordinates(sizeCoords.x,0), orientation + angle);
    path += this.quadraticCurveToAbsolute(c1.x, c1.y, c2.x, c2.y);
    path += this.quadraticCurveToAbsolute(c3.x, c3.y, c4.x, c4.y);
    return path; // no closing here
  }

  // Full path for a lens like shape
  path_lens(refCoords, startCoords, width, baseRadiusFactor, topRadiusFactor, orientation, angle){
    let path = this.startPath(this.getAbsoluteCoords(refCoords, new Coordinates(startCoords.x, startCoords.y), orientation));
    path += this.arcCurveRelativeSimpleCorner(width/2, 0, orientation + angle, Math.abs(baseRadiusFactor)*width/2, 0, baseRadiusFactor > 0 ? 1 : 0);
    path += this.arcCurveRelativeSimpleCorner(-width/2, 0, orientation + angle, Math.abs(topRadiusFactor)*width/2, 0, topRadiusFactor > 0 ? 0 : 1);
    return path + this.closePath();
  }
}



const svgHelper = new SvgHelper();
