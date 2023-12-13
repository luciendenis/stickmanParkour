function DistBetweenCoords(firstCoord, secondCoord){
  return Math.sqrt(Math.pow(firstCoord.x - secondCoord.x,2) + Math.pow(firstCoord.y - secondCoord.y,2));
}
function GetCoordsMiddle(firstCoord, secondCoord){
  return new Coordinates((firstCoord.x + secondCoord.x)/2,(firstCoord.y + secondCoord.y)/2);
}
function DistBetweenCoordsWithDirection(firstCoord, secondCoord, direction){
  if(direction == "left" || direction == "right"){
    return Math.abs(firstCoord.x - secondCoord.x);
  }
  else if(direction == "up" || direction == "down"){
    return Math.abs(firstCoord.y - secondCoord.y);
  }
  else{
    return DistBetweenCoords(firstCoord, secondCoord);
  }
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

function AngleDiff(nextAngle, currentAngle, forceRotationDirection, direction){
  let angleDiff = nextAngle - currentAngle;
  // angle diff must be the shortest path between the 2 angles so no absolute value greater than PI...
  if(angleDiff > Math.PI){
    angleDiff -= 2*Math.PI;
  }
  else if(angleDiff < - Math.PI){
    angleDiff += 2*Math.PI;
  }
  // ... unless we force the rotation in a given direction
  if(forceRotationDirection != null && forceRotationDirection != 0){
    if(forceRotationDirection*direction == -1){
      angleDiff += angleDiff >= 0 ? 0 : 2*Math.PI;
    }
    else if(forceRotationDirection*direction == 1){
      angleDiff -= angleDiff <= 0 ? 0 : 2*Math.PI;
    }
  }
  return angleDiff;
}

function CartesianCoordinatesFromPolar(length, angle){
  return new Coordinates(length*Math.cos(angle),length*Math.sin(angle));
}
function CalculateFrameCountToReachLimitDown(y, dy, ay, yLimit){
  let frameCount = 0;
  let nextY = y;
  let nextDY = dy;
  while(nextY < yLimit && frameCount <= 60){
    nextDY += ay;
    nextY += nextDY;
    frameCount++;
  }
  return frameCount;
}
