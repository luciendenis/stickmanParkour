// This is used to manage limits for a player
class PlayerLimits {
  constructor(left, top, right, bottom) {
    this.left = left;
    this.leftTop = top;
    this.leftEdge = left;
    this.top = top;
    this.right = right;
    this.rightTop = top;
    this.rightEdge = right;
    this.bottom = bottom;
    this.currentBlockIndex = -1;
    this.usableLadder = null;
    this.usableRope = null;
    this.usableHold = null;
    this.reachableBlockStandingPoint = null;
    this.canUseExit = false;
  }
}

class UsableHold {
  constructor(coordinates, type, climbType, climbDownType, angles, blockIndex) {
    this.coordinates = coordinates;
    this.type = type;                   // sideLeft, sideRight or front
    this.climbType = climbType;         // null, "stand" or "crouch"
    this.climbDownType = climbDownType; // null, "edgeHanging", "edgeHangingWithLegs" or "edgeHopping"
    this.angles = angles;               // to adjust position depending on the type of hold
    this.blockIndex = blockIndex;       // if hold is attached to a block, it is the block index in level.blocks, else -1
  }
}

class ReachableBlockStandingPoint {
  constructor(coordinates, blockIndex, type){
    this.coordinates = coordinates;
    this.blockIndex = blockIndex;
    this.type = type;               // "idling" or "oneFootBalance"
  }
}

// We add prototypes relative to the limits to the player
Player.prototype.updatePlayerLimits = function(){ // computing what the player limits are
  // at this point body hitbox is still relative
  let bodyHitBoxLeft = this.body.hitBox.left + this.body.coordinates.x;
  let bodyHitBoxRight = this.body.hitBox.right + this.body.coordinates.x;
  let bodyHitBoxTop = this.body.hitBox.top + this.body.coordinates.y;
  let bodyHitBoxBottom = this.body.hitBox.bottom + this.body.coordinates.y;
  for(let i = 0; i < level.hazards.length; i++){
    let hazard = level.hazards[i];
    if(hazard.xRight > bodyHitBoxLeft && hazard.xLeft < bodyHitBoxRight && hazard.yBottom > bodyHitBoxTop && hazard.yTop < bodyHitBoxBottom){
      Die();
    }
  }
  let newLimits = new PlayerLimits(level.levelLimits.xLeft, level.levelLimits.yCeiling, level.levelLimits.xRight, level.levelLimits.yGround);
  newLimits.usableHold = this.limits.usableHold;
  newLimits.reachableBlockStandingPoint = this.limits.reachableBlockStandingPoint;
  for(let i = 0; i < level.blocks.length ; i++){
    let block = level.blocks[i];
    if(block.yTop + settings.roundTolerance < bodyHitBoxBottom && block.yBottom > bodyHitBoxTop){
      if(block.xRight > newLimits.left && block.xRight < this.body.coordinates.x){
        newLimits.left = block.xRight;
        newLimits.leftTop = block.yTop;
      }
      else if(block.xLeft < newLimits.right && block.xLeft > this.body.coordinates.x){
        newLimits.right = block.xLeft;
        newLimits.rightTop = block.yTop;
      }
    }
    if(block.xLeft < this.body.coordinates.x && block.xRight > this.body.coordinates.x){
      if(block.yTop < newLimits.bottom && block.yTop > this.body.coordinates.y){
        newLimits.bottom = block.yTop;
        newLimits.leftEdge = block.xLeft;
        newLimits.rightEdge = block.xRight;
        newLimits.currentBlockIndex = i;
      }
      else if(block.yBottom > newLimits.top && block.yBottom < this.body.coordinates.y){
        newLimits.top = block.yBottom;
      }
    }
  }
  for(let i = 0; i < level.ladders.length ; i++){
    let ladder = level.ladders[i];
    if(ladder.xLeft < bodyHitBoxRight && ladder.xRight > bodyHitBoxLeft){
      if(ladder.xLeft < this.body.coordinates.x && ladder.xRight > this.body.coordinates.x && ladder.yTop < newLimits.bottom && ladder.yTop > this.body.coordinates.y){
        newLimits.bottom = ladder.yTop; // ladder acts as a block in that case
      }
      if(bodyHitBoxBottom + settings.ladderDetectionRange >= ladder.yTop && bodyHitBoxBottom - settings.roundTolerance <= ladder.yBottom){
        newLimits.usableLadder = ladder;
      }
    }
  }
  for(let i = 0; i < level.ropes.length ; i++){
    let rope = level.ropes[i];
    if(rope.anchorLeft.x < bodyHitBoxRight && rope.anchorRight.x > bodyHitBoxLeft){
      let yRope = rope.giveYforX(this.body.coordinates.x);
      if(bodyHitBoxBottom > yRope && bodyHitBoxTop - settings.ropeDetectionRange < yRope){
        newLimits.usableRope = rope;
      }
    }
  }
  for(let i = 0; i < level.collectibles.length; i++){
    let collectible = level.collectibles[i];
    if(!collectible.collected && collectible.coordinates.x > bodyHitBoxLeft && collectible.coordinates.x < bodyHitBoxRight && collectible.coordinates.y > bodyHitBoxTop && collectible.coordinates.y < bodyHitBoxBottom){
      collectible.collected = true;
      level.checkCollectibleStatus();
    }
  }
  newLimits.canUseExit = (level.door != null && level.door.type == "exit" && DistBetweenCoords(this.coordinates, level.door.coordinates) < level.door.settings.curtainWidth/2);
  let bottomGap = newLimits.bottom - this.limits.bottom;
  this.limits = newLimits;
  this.checkForFall(bottomGap);
}
Player.prototype.searchForUsableHold = function(xMin, xMax, yMin, yMax, direction){  //checking if the is a usable hold for the player in the area
  let type = direction == 1 ? "sideRight" : "sideLeft";
  let dist = 9999;
  // checking for ClimbingHolds in this area
  let usableHold = null;
  for(let i = 0 ; i < level.climbingHolds.length ; i++){
    let h = level.climbingHolds[i];
    if(h.coordinates.x > xMin && h.coordinates.x < xMax && h.coordinates.y > yMin && h.coordinates.y < yMax && (h.type == "front" || h.type == type)){
      if(DistBetweenCoords(this.body.coordinates, h.coordinates) < dist){
        usableHold = h;
      }
    }
  }
  // checking for block edge in this area
  let usableBlockIndex = -1;
  for(let i = 0; i < level.blocks.length ; i++){
    let b = level.blocks[i];
    if(direction == 1){
      if(b.xLeft > xMin && b.xLeft < xMax && b.yTop > yMin && b.yTop < yMax){
        if(DistBetweenCoords(this.body.coordinates, new Coordinates(b.xLeft, b.yTop)) < dist){
          usableBlockIndex = i;
        }
      }
    }
    else{
      if(b.xRight > xMin && b.xRight < xMax && b.yTop > yMin && b.yTop < yMax){
        if(DistBetweenCoords(this.body.coordinates, new Coordinates(b.xRight, b.yTop)) < dist){
          usableBlockIndex = i;
        }
      }
    }
  }
  let chosenHold = null;
  // now if we have a block it means its the closest so we use it, else we use the hold, else null
  if(usableBlockIndex != -1){
    let climbType = GetBlockEdgeTypeForPlayer(level, usableBlockIndex, type, this);
    let usableBlock = level.blocks[usableBlockIndex];
    let climbDownType = ((usableBlock.yBottom - usableBlock.yTop) > this.body.hangWithLegsHeightMin()) ? "edgeHangingWithLegs" : "edgeHanging";
    chosenHold = new UsableHold(
      new Coordinates((direction == 1 ? usableBlock.xLeft : usableBlock.xRight), usableBlock.yTop),
      type,
      climbType,
      climbDownType,
      new Angles(0,0,0),
      usableBlockIndex
    );
  }
  else if(usableHold != null){
    chosenHold = new UsableHold(
      new Coordinates(usableHold.coordinates.x - (usableHold.type == "front" ? 0 : usableHold.size*direction/2), usableHold.coordinates.y),
      usableHold.type,
      null,
      "edgeHanging" + (usableHold.type == "front" ? "Front" : "") + (usableHold.hangWithLegs ? "WithLegs" : ""),
      (usableHold.type != "front" && usableHold.hangWithLegs ? new Angles(-0.1*direction,0,0) : new Angles(0,0,0)),
      -1
    );
  }
  this.limits.usableHold = chosenHold;
}
Player.prototype.searchForUsableEdgeDown = function(offsetCoords){
  // checking if already at the level bottom
  if(this.limits.currentBlockIndex == -1){
    this.limits.usableHold = null;
    return;
  }
  // checking if player is close enough to the edge to use it
  offsetCoords = (offsetCoords == null) ? new Coordinates(0,0) : offsetCoords;
  if(this.coordinates.y + offsetCoords.y < this.limits.bottom - settings.roundTolerance){
    this.limits.usableHold = null;
    return;
  }
  let rangeExtension = (this.currentAction == "running" || this.currentAction == "idling") ? 2 : 1;
  let xLimit = this.coordinates.x + offsetCoords.x;
  xLimit += this.direction == 1 ? this.body.hitBox.right + settings.obstacleRange*rangeExtension : this.body.hitBox.left - settings.obstacleRange*rangeExtension;
  if((this.direction == 1 && this.limits.rightEdge > xLimit) || (this.direction == -1 && this.limits.leftEdge < xLimit)){
    this.limits.usableHold = null;
    return;
  }
  // checking if there is enough room around the edge to use it
  let climbDownType = GetBlockEdgeDownTypeForPlayer(level, this.limits.currentBlockIndex, (this.direction == 1 ? "sideLeft" : "sideRight"), this);
  if(climbDownType == null){
    this.limits.usableHold = null;
    return;
  }
  this.limits.usableHold = new UsableHold(
    GetBlockLimitCoords(level, this.limits.currentBlockIndex,(this.direction == 1 ? "right":"left"),"top"),
    this.direction == 1 ? "sideLeft" : "sideRight",
    null,
    climbDownType,
    new Angles(0,0,0),
    this.limits.currentBlockIndex
  );
}
Player.prototype.isOnBlock = function(coordinates){
  return coordinates.y >= this.limits.bottom - settings.roundTolerance;
}
Player.prototype.reachingLimitLeft = function(coordinates){
  return (coordinates.x + this.body.hitBox.left - settings.obstacleRange) <= this.limits.left;
}
Player.prototype.reachingLimitRight = function(coordinates){
  return (coordinates.x + this.body.hitBox.right + settings.obstacleRange) >= this.limits.right;
}
Player.prototype.reachingLimitAhead = function(coordinates){
  return (this.direction == 1) ? this.reachingLimitRight(coordinates) : this.reachingLimitLeft(coordinates);
}
Player.prototype.obstacleLeft = function(coordinates){
  return this.reachingLimitLeft(coordinates) && ((coordinates.y - this.limits.leftTop) > this.body.crossingAbility());
}
Player.prototype.obstacleRight = function(coordinates){
  return this.reachingLimitRight(coordinates) && ((coordinates.y - this.limits.rightTop) > this.body.crossingAbility());
}
Player.prototype.obstacleAhead = function(coordinates){
  return (this.direction == 1) ? this.obstacleRight(coordinates) : this.obstacleLeft(coordinates);
}
Player.prototype.crossableObstacleLeft = function(coordinates){
  return this.reachingLimitLeft(coordinates) && ((coordinates.y - this.limits.leftTop) < this.body.crossingAbility());
}
Player.prototype.crossableObstacleRight = function(coordinates){
  return this.reachingLimitRight(coordinates) && ((coordinates.y - this.limits.rightTop) < this.body.crossingAbility());
}
Player.prototype.crossableObstacleAhead = function(coordinates){
  return (this.direction == 1) ? this.crossableObstacleRight(coordinates) : this.crossableObstacleLeft(coordinates);
}
Player.prototype.edgeLeft = function(coordinates){
  return ((coordinates.x + this.body.hitBox.left - settings.obstacleRange) <= this.limits.leftEdge && this.limits.left + settings.roundTolerance < this.limits.leftEdge);
}
Player.prototype.edgeRight = function(coordinates){
  return ((coordinates.x + this.body.hitBox.right + settings.obstacleRange) >= this.limits.rightEdge && this.limits.right - settings.roundTolerance > this.limits.rightEdge);
}
Player.prototype.edgeAhead = function(coordinates){
  return (this.direction == 1) ? this.edgeRight(coordinates) : this.edgeLeft(coordinates);
}
Player.prototype.giveEdgeClimbingPositionIndexStartForHeight = function(height){
  // this function will return the start frame for edge climbing, -1 if unclimbable
  let bodyClimbingAbility = this.body.climbingAbility();
  return  height > bodyClimbingAbility ? -1 :
          height > bodyClimbingAbility*0.6 ? 0 :
          height > bodyClimbingAbility*0.4 ? 1 : 2;
}
Player.prototype.canClimbRope = function(offsetCoords){
  offsetCoords = (offsetCoords == null) ? new Coordinates(0,0) : offsetCoords;
  return this.limits.usableRope != null && (this.velocity.y <= 5 || (this.coordinates.y + offsetCoords.y - this.body.hitBox.totalHeight() < this.limits.usableRope.giveYforX(this.coordinates.x + offsetCoords.x)));
}
Player.prototype.canClimbLadder = function(offsetCoords){
  offsetCoords = (offsetCoords == null) ? new Coordinates(0,0) : offsetCoords;
  return this.limits.usableLadder != null && this.coordinates.y + offsetCoords.y - settings.roundTolerance <= this.limits.usableLadder.yBottom && this.coordinates.y + offsetCoords.y - this.body.hitBox.bottom > this.limits.usableLadder.yTop;
}
Player.prototype.canClimbDownLadder = function(offsetCoords){
  offsetCoords = (offsetCoords == null) ? new Coordinates(0,0) : offsetCoords;
  return this.limits.usableLadder != null && (this.limits.usableLadder.xMiddle-(this.coordinates.x + offsetCoords.x))*this.direction >= 0 && this.coordinates.y + offsetCoords.y <= this.limits.usableLadder.yBottom && this.coordinates.y + offsetCoords.y >= this.limits.usableLadder.yTop - settings.roundTolerance;
}
Player.prototype.canClimbEdge = function(offsetCoords){
  let rangeExtension = (this.currentAction == "running" || this.currentAction == "idling") ? 2 : 1;
  let xMin = this.direction == 1 ? this.body.coordinates.x : (this.body.coordinates.x + this.body.hitBox.left - settings.obstacleRange*rangeExtension);
  let xMax = this.direction == -1 ? this.body.coordinates.x : (this.body.coordinates.x + this.body.hitBox.right + settings.obstacleRange*rangeExtension);
  let yMax = this.coordinates.y;
  let yMin = this.body.coordinates.y - this.body.climbingAbility()*rangeExtension;
  if(offsetCoords != null){
    xMin += offsetCoords.x;
    xMax += offsetCoords.x;
    yMin += offsetCoords.y;
    yMax += offsetCoords.y;
  }
  this.searchForUsableHold(xMin,xMax,yMin,yMax,this.direction);
  return this.limits.usableHold != null;
}
Player.prototype.canReachHoldForward = function(offsetCoords){
  let searchArea = this.body.hoppingForwardRange();
  let xMin = (this.direction == 1) ? this.coordinates.x : this.coordinates.x - searchArea.x;
  let xMax = (this.direction == 1) ? this.coordinates.x + searchArea.x : this.coordinates.x;
  let yMax = this.coordinates.y - searchArea.y;
  let yMin = this.coordinates.y - 3*searchArea.y;
  if(offsetCoords != null){
    xMin += offsetCoords.x;
    xMax += offsetCoords.x;
    yMin += offsetCoords.y;
    yMax += offsetCoords.y;
  }
  this.searchForUsableHold(xMin,xMax,yMin,yMax,this.direction);
  return this.limits.usableHold != null;
}
Player.prototype.canReachHoldUp = function(offsetCoords){
  let searchArea = this.body.hoppingForwardRange();
  let xMin = this.coordinates.x - (searchArea.x/2);
  let xMax = this.coordinates.x + (searchArea.x/2);
  let yMax = this.coordinates.y;
  let yMin = this.coordinates.y - 2*searchArea.y;
  if(offsetCoords != null){
    xMin += offsetCoords.x;
    xMax += offsetCoords.x;
    yMin += offsetCoords.y;
    yMax += offsetCoords.y;
  }
  this.searchForUsableHold(xMin,xMax,yMin,yMax,this.direction);
  return this.limits.usableHold != null;
}
Player.prototype.canClimbEdgeFromHanging = function(){
  if(this.limits.usableHold == null || this.limits.usableHold.blockIndex == -1)
    return false;
  this.limits.usableHold.climbType = GetBlockEdgeTypeForPlayer(level, this.limits.usableHold.blockIndex, this.limits.usableHold.type, this);
  return this.limits.usableHold.climbType != null;
}
Player.prototype.canClimbDownEdge = function(offsetCoords){
  offsetCoords = (offsetCoords == null) ? new Coordinates(0,0) : offsetCoords;
  if(this.reachingLimitAhead(this.coordinates.clone(offsetCoords)))
    return false;
  this.searchForUsableEdgeDown(offsetCoords);
  return this.limits.usableHold != null;
}
Player.prototype.canHopForward = function(offsetCoords){
  offsetCoords = (offsetCoords == null) ? new Coordinates(0,0) : offsetCoords;
  let coords = this.coordinates.clone(offsetCoords);
  if(this.obstacleAhead(coords)){
    this.limits.reachableBlockStandingPoint = null;
    return false;
  }
  let searchArea = this.body.hoppingForwardRange();
  let xMin = (this.direction == 1) ? coords.x : coords.x - searchArea.x;
  let xMax = (this.direction == 1) ? coords.x + searchArea.x : coords.x;
  let yMin = coords.y - searchArea.y;
  let yMax = coords.y + searchArea.y*2;
  let xLimit = (this.direction == 1) ? "left" : "right";
  //console.log("xMin : " + xMin + ", xMax : " + xMax + ", yMin : " + yMin + ", yMax : " + yMax + ", xLimit : " + xLimit);
  let blocksIndexes = GetBlockIndexesInZone(level, this.limits.currentBlockIndex, xMin, xMax, yMin, yMax, xLimit, "top", this.direction == 1 ? "ascending" : "descending");
  if(blocksIndexes.length == 0){
    this.limits.reachableBlockStandingPoint = null;
    return false;
  }
  let standDimensions = this.body.standDimensions();
  let block = null;
  let i = 0;
  while(block == null && i < blocksIndexes.length){
    let b = level.blocks[blocksIndexes[i]];
    xMin = (this.direction == 1) ? b.xLeft : b.xRight - standDimensions.x;
    xMax = (this.direction == 1) ? b.xLeft + standDimensions.x : b.xRight;
    yMin = b.yTop - standDimensions.y;
    yMax = b.yTop;
    if(IsZoneClear(level, blocksIndexes[i], xMin, xMax, yMin, yMax)){
      block = b;
    }
    else{
      i++;
    }
  }
  if(block == null){
    this.limits.reachableBlockStandingPoint = null;
    return false;
  }
  let blockWideEnough = IsBlockWideEnough(level, blocksIndexes[i], this, true);
  this.limits.reachableBlockStandingPoint = new ReachableBlockStandingPoint(
    GetBlockLimitCoords(level, blocksIndexes[i], blockWideEnough ? xLimit : "center", "top"),
    blocksIndexes[i],
    blockWideEnough ? "idling" : "oneFootBalance"
  );
  return true;
}
Player.prototype.blockSwitchEdgeHold = function(side){
  if(this.limits.usableHold != null && this.limits.usableHold.blockIndex != -1){
    let block = level.blocks[this.limits.usableHold.blockIndex];
    if(side == null){
      this.limits.usableHold.coordinates = new Coordinates((this.limits.usableHold.type == "sideRight" ? block.xRight : block.xLeft), block.yTop);
      this.limits.usableHold.type = (this.limits.usableHold.type == "sideRight") ? "sideLeft" : "sideRight";
      this.limits.usableHold.climbDownType = GetBlockEdgeDownTypeForPlayer(level, this.limits.usableHold.blockIndex, this.limits.usableHold.type, this);
    }
    else{
      this.limits.usableHold.coordinates = new Coordinates((side == "sideLeft" ? block.xRight : side == "sideRight" ? block.xLeft : ((block.xRight + block.xLeft)/2)), block.yTop);
      this.limits.usableHold.type = side;
    }
  }
}
Player.prototype.isOverEdge = function(coordinates){
  if(coordinates.y < this.limits.bottom - settings.roundTolerance)
    return null;
  let left = coordinates.x + this.body.hitBox.left;
  let right = coordinates.x + this.body.hitBox.right;
  if(this.limits.leftEdge > left && this.limits.leftEdge < right)
    return "leftEdge";
  else if(this.limits.rightEdge > left && this.limits.rightEdge < right)
    return "rightEdge";
  else
    return null;
}
