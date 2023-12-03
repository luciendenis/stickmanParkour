function DistBetweenCoords(firstCoord, secondCoord){
  return Math.sqrt(Math.pow(firstCoord.x - secondCoord.x,2) + Math.pow(firstCoord.y - secondCoord.y,2));
}
function GetCoordsMiddle(firstCoord, secondCoord){
  return new Coordinates((firstCoord.x + secondCoord.x)/2,(firstCoord.y + secondCoord.y)/2);
}

function AngleXYfromCoords(startCoords, endCoords){
  let dx = endCoords.x-startCoords.x;
  let dy = endCoords.y-startCoords.y;
  if(dx == 0){
    return dy > 0 ? Math.PI * .5 : Math.PI * -.5;
  }
  else{
    let angle = Math.atan(Math.abs(dy)/Math.abs(dx));
    if(dx > 0){
      return dy > 0 ? angle : Math.PI*2 - angle;
    }
    else{
      return dy > 0 ? Math.PI - angle : Math.PI + angle;
    }
  }
}

function AngleMirrorY(angle){
  if(angle < 0){
    angle += 2 * Math.PI;
  }
  let offset;
  if(angle < Math.PI){
    offset = 0;
  }
  else{
    angle -= Math.PI;
    offset = Math.PI;
  }
  return offset + Math.PI - angle;
}

function CartesianCoordinatesFromPolar(length, angle){
  return new Coordinates(length*Math.cos(angle),length*Math.sin(angle));
}
