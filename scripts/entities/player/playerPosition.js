// This is used to manage position for a player
class Anchor {
  constructor(coordinates, releaseOffset, fpsCurveOffsets) {
    this.coordinates = coordinates;
    this.releaseOffset = releaseOffset;
    this.fpsCurveOffsets = fpsCurveOffsets; // if a forcePathSettings is created to reach this anchor, this is the curveOffset to use
  }
}

class ForcePathSettings {
  constructor(startCoords, endCoords, autoProgressFrameCount, anchorOnDeletion, releaseVelocity, curveOffsets) {
    this.startCoords = startCoords.clone();
    this.endCoords = endCoords.clone();
    this.autoProgressCoords = autoProgressFrameCount === 0 ? null : new Coordinates((endCoords.x-startCoords.x)/autoProgressFrameCount,(endCoords.y-startCoords.y)/autoProgressFrameCount);
    this.direction = endCoords.x >= startCoords.x ? 1 : -1;
    this.coefficient = endCoords.x === startCoords.x ? 0 : (endCoords.y - startCoords.y) / Math.abs(endCoords.x - startCoords.x);
    this.roundTolerance = settings.roundTolerance;
    this.anchorOnDeletion = anchorOnDeletion;
    this.releaseVelocity = releaseVelocity == null ? new Coordinates(0,0) : releaseVelocity.clone();
    this.totalLength = DistBetweenCoords(startCoords, endCoords);
    this.middle = GetCoordsMiddle(startCoords, endCoords);
    this.curveOffsets = curveOffsets; // this is used to calculate position offsets during the transition to give a curve path effect instead of a straight line
  }
  giveYforX(x){
    if((this.direction === 1 && x <= this.startCoords.x) || (this.direction === -1 && x >= this.startCoords.x)){
      return this.startCoords.y;
    }
    else if((this.direction === 1 && x >= this.endCoords.x) || (this.direction === - 1 && x <= this.endCoords.x)){
      return this.endCoords.y;
    }
    else{
      return this.startCoords.y + (x - this.startCoords.x)*this.coefficient*this.direction;
    }
  }
  isXin(x){
    return x >= Math.min(this.startCoords.x, this.endCoords.x) && x <= Math.max(this.startCoords.x, this.endCoords.x);
    //return this.direction == 1 ? x - this.startCoords.x >= -this.roundTolerance && x - this.endCoords.x <= -this.roundTolerance : x - this.startCoords.x <= this.roundTolerance && x - this.endCoords.x >= this.roundTolerance;
  }
  isYin(y){
    return y >= Math.min(this.startCoords.y, this.endCoords.y) && y <= Math.max(this.startCoords.y, this.endCoords.y);
    //return this.coefficient > 0 ? y - this.startCoords.y >= -this.roundTolerance && y - this.endCoords.y <= -this.roundTolerance : y - this.startCoords.y <= this.roundTolerance && y - this.endCoords.y >= this.roundTolerance;
  }
  areCoordsIn(coordinates){
    return this.isXin(coordinates.x) && this.isYin(coordinates.y);
  }
  reachedTheEnd(coordinates){
    return Math.abs(this.endCoords.x - coordinates.x) < this.roundTolerance && Math.abs(this.endCoords.y - coordinates.y) < this.roundTolerance;
  }
  distToMiddle(coordinates){
    return DistBetweenCoords(coordinates, this.middle);
  }
  getCurvePositionOffsets(coordinates){
    if(this.curveOffsets == null)
      return new Coordinates(0,0);
    let offsetFactor = Math.pow(Math.max(0,1-(2*this.distToMiddle(coordinates)/this.totalLength)),.5);
    return new Coordinates(this.curveOffsets.x*offsetFactor, this.curveOffsets.y*offsetFactor);
  }
}



// We add prototypes relative to the position to the player
Player.prototype.updatePosition = function(){
  this.updatePlayerLimits();
  // checking if gravity should not affect the player
  this.gravityOn = (this.forcePathSettings == null) && !(this.currentAction === "ropeClimbing" || this.currentAction === "ropeDownSliding" || this.currentAction === "ropeCrossing"
  || this.currentAction === "ladderClimbing" || this.currentAction === "ladderDownSliding" || this.currentAction === "wallPrepareJumping");
  // checking if player position relative to the bottom limit is coherent
  if(this.gravityOn && this.coordinates.y > this.limits.bottom){
    this.coordinates.y = this.limits.bottom;
  }

  // if there is an anchor and no crossing settings
  if(this.anchor != null && this.currentPosition.anchor && this.forcePathSettings == null){
    this.stopPlayerAll();
    this.coordinates.x = this.anchor.coordinates.x;
    this.coordinates.y = this.anchor.coordinates.y;
  }
  // checking if player is affected by gravity
  if(this.gravityOn && this.coordinates.y < this.limits.bottom){
    this.acceleration.y = settings.gravity;
  }

  this.velocity.x += this.acceleration.x;
  this.velocity.y += this.acceleration.y;

  this.coordinates.x += this.velocity.x;
  // if the player is currently crossing an obstacle it is a priority to use it to calculate y coordinates
  if(this.forcePathSettings != null){
    if(this.forcePathSettings.curveOffsets != null){
      let offsets = this.forcePathSettings.getCurvePositionOffsets(this.coordinates);
      this.currentPosition.offsets["position"].x += offsets.x;
      this.currentPosition.offsets["position"].y += offsets.y;
    }
    if(this.forcePathSettings.autoProgressCoords != null){
      this.coordinates.x += this.forcePathSettings.autoProgressCoords.x;
      this.coordinates.y += this.forcePathSettings.autoProgressCoords.y;
      if(!this.forcePathSettings.areCoordsIn(this.coordinates)){
        if(this.forcePathSettings.anchorOnDeletion){
          this.coordinates.x = this.forcePathSettings.endCoords.x;
          this.coordinates.y = this.forcePathSettings.endCoords.y;
          this.velocity.x = this.forcePathSettings.releaseVelocity.x;
          this.velocity.y = this.forcePathSettings.releaseVelocity.y;
        }
        this.forcePathSettings = null;
      }
    }
    else{
      this.coordinates.y = this.forcePathSettings.giveYforX(this.coordinates.x);
      if(!this.forcePathSettings.isXin(this.coordinates.x)){
        if(this.forcePathSettings.anchorOnDeletion){
          this.coordinates.x = this.forcePathSettings.endCoords.x;
          this.coordinates.y = this.forcePathSettings.endCoords.y;
          this.velocity.x = this.forcePathSettings.releaseVelocity.x;
          this.velocity.y = this.forcePathSettings.releaseVelocity.y;
        }
        this.forcePathSettings = null;
      }
    }
  }
  // checking if player is crossing x limits
  // case the player hit a wall left
  if(this.body.coordinates.x + this.velocity.x + this.body.hitBox.left + this.currentPosition.offsets["position"].x < this.limits.left && this.velocity.x < 0){
    if(this.forcePathSettings == null){
      this.stopPlayerXAxis();
      this.coordinates.x = this.limits.left - this.body.hitBox.left - this.currentPosition.offsets["position"].x;
    }
  }
  // case the player hit a wall right
  else if(this.body.coordinates.x + this.velocity.x + this.body.hitBox.right + this.currentPosition.offsets["position"].x > this.limits.right && this.velocity.x > 0){
    if(this.forcePathSettings == null){
      this.stopPlayerXAxis();
      this.coordinates.x = this.limits.right - this.body.hitBox.right - this.currentPosition.offsets["position"].x;
    }
  }

  // checking if player is crossing y limits
  // case the player lands on a block
  if(this.forcePathSettings == null && this.currentAction !== "ladderDownSliding" && this.coordinates.y + this.velocity.y + this.currentPosition.offsets["position"].y > this.limits.bottom && this.velocity.y > 0){
    this.stopPlayerYAxis();
    this.coordinates.y = this.limits.bottom;
  }
  // case the player hits the ceiling
  else if(this.gravityOn && this.coordinates.y + this.velocity.y + this.currentPosition.offsets["position"].y + this.body.hitBox.top - this.body.hitBox.bottom < this.limits.top  && this.velocity.y < 0){
    this.velocity.y = 0;
    if(this.velocity.x !== 0) this.direction = Math.sign(this.velocity.x);
    this.setMovement("falling");
  }
  this.coordinates.y += this.velocity.y;

  // getting offset cords
  let dscOffsets = this.body.getOffsetCoords("relative", this.currentPosition.drawStartJunction);

  let bodyCenterCoords = new Coordinates(this.coordinates.x + this.currentPosition.offsets["position"].x + dscOffsets.x, this.coordinates.y + this.currentPosition.offsets["position"].y + dscOffsets.y);
  this.body.setPositionAbsolute(bodyCenterCoords);
}
