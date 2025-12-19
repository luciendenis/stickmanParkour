// This file must be loaded after class Player declared player.js
// this is where we check what the next action should be based on player input and movement parameter
// this one is triggered only on position keyframe update
Player.prototype.checkForNextActionOnKeyFrameChange = function(){
  this.freezeFrame = false;
  if(this.currentAction !== "running" && this.currentAction !== "idling" && this.currentAction !== "wallPrepareJumping" && this.currentAction !== "oneFootBalance"
  && this.currentAction !== "edgeHangingFrontWithLegs"  && this.currentAction !== "edgeHangingFrontWithLegsSideJumping"  && this.currentAction !== "edgeHangingFrontWithLegsJumping"){
    this.readyToJump = false;
  }
  switch(this.currentAction){
    case "oneFootBalance":
      if(this.inTransition){
        if(this.forceFrameCount === 0){
          this.forceFrameCount = 25;
        }
      }
      else{
        // maybe randomize position a bit ?
        this.forceFrameCount = 20 + Math.round(Math.random()*40);
        if(this.readyToJump){
          this.crouchFactor = Math.max(settings.crouchFactorMin, this.crouchFactor - settings.crouchFactorDiff);
          if(!this.controls.jump){
            this.readyToJump = false;
            this.limits.usableHold = null;
            this.anchor = null;
            this.jump("oneFootBalanceJumpingForward");
          }
        }
        else if(this.wantsToKeepDirection()){
          if(this.canHopForward(null) || this.canReachHoldForward(null)){
            this.prepareHopForward();
          }
        }
        else if(this.wantsToChangeDirection()){
          this.setMovement("oneFootBalanceTurning");
        }
        else if(this.controls.down){
          if(this.canClimbDownEdge(new Coordinates(0,this.body.bodySize/2))){
            this.nextPositionKeyFrame.anchor = null;
            this.anchor = new Anchor(new Coordinates(this.limits.usableHold.coordinates.x + (this.direction*this.body.bodySize/2), this.limits.usableHold.coordinates.y - this.body.bodySize/2),"", null);
            this.climbDownEdge();
          }
        }
        else{
          this.crouchFactor = 1;
        }
      }
    break;
    case "edgeHanging":
      if(!this.inTransition && (this.controls.up || this.wantsToKeepDirection())){
        if(this.canClimbEdgeFromHanging()){
          this.climbEdgeAfterHanging();
        }
      }
    break;
    case "edgeHangingWithLegs":
      if(!this.inTransition && (this.controls.down || this.wantsToChangeDirection())){
        this.limits.usableHold = null;
        if(this.wantsToChangeDirection()){
          this.direction *= -1;
          this.setMovement("edgeHangingWithLegsTurning");
        }
        else{
          this.fallFromAnchor(null);
        }
      }
      else if(this.controls.jump){
        this.readyToJump = true;
        if(!this.inTransition){
          this.forceFrameCount = 14;
          this.setMovement("wallPrepareJumping");
        }
      }
      else if(!this.inTransition && (this.controls.up || this.wantsToKeepDirection())){
        if(this.canClimbEdgeFromHanging()){
          this.climbEdgeAfterHanging();
        }
      }
    break;
    case "edgeClimbing":
    break;
    case "edgeHopping":
      if(!this.inTransition)
        this.forceFrameCount = 12;
    break;
    case "edgePreventFall":
      if(!this.inTransition && this.forceFrameCount === 0)
        this.forceFrameCount = 10;
    break;
    case "edgeClimbingDown":
      if(!this.inTransition && this.forceFrameCount === 0){
        this.forceFrameCount = 10;
      }
    break;
    case "frontHandPunchMid":
    case "frontHandPunchHigh":
    case "frontHandPunchLow":
    case "backHandPunchMid":
    case "backHandPunchHigh":
    case "backHandPunchLow":
      this.freezeFrame = waitingForMultiKeyPress || (this.currentPositionIndex === 0 && this.fightActions.length === 0 && this.wantsToKeepDirection());
      if(this.forceFrameCount === 0) this.forceFrameCount = settings.fightFrameCount;
      break;
    case "idling":
      if(!this.inTransition)
        this.stopPlayerXAxis();
      if(this.readyToJump){
        this.crouchFactor = Math.max(settings.crouchFactorMin, this.crouchFactor - settings.crouchFactorDiff);
      }
      else if(!this.inTransition){
        this.crouchFactor = 1;
      }
    break;
    case "crouching":
      if(!this.inTransition){
        if(this.wantsNoDirection() && this.currentPositionIndex === 0){
          this.freezeFrame = true;
          this.stopPlayerXAxis();
        }
        else if(this.wantsToKeepDirection()){
          if((this.direction === 1 && (this.edgeRight(this.coordinates) || this.obstacleRight(this.coordinates))) || (this.direction === -1 && (this.edgeLeft(this.coordinates) || this.obstacleLeft(this.coordinates)))){
            if(this.currentPositionIndex === 0){
              this.freezeFrame = true;
            }
          }
        }
        else if(this.wantsToChangeDirection()){
          this.keepNextKeyFrameReference = true;
          this.direction *=-1;
          this.velocity.x *=-1;
          this.forcePositionIndex = 0;
          this.setMovement("crouchTurning");
        }
      }
      this.forceFrameCount = settings.crouchingFrameCount;
    break;
    case "crouchTurning":
      this.velocity.x = this.direction*settings.crouchingDistPerFrame/settings.crouchingFrameCount;
      this.forceFrameCount = Math.floor(settings.crouchingFrameCount*settings.crouchTurningFactor);
      if(!this.inTransition){
        this.setMovement("crouching");
      }
    break;
    case "running":
      if(this.readyToJump){
        this.crouchFactor = Math.max(settings.crouchFactorMin, this.crouchFactor - settings.crouchFactorDiff);
      }
      else if(!this.inTransition){
        this.crouchFactor = 1;
      }
      if(this.wantsNoDirection()){
        if(!this.inTransition){
          if(this.currentPositionIndex === 1 && (this.velocity.x + this.acceleration.x * this.currentFrameCount)*this.velocity.x <= settings.minVelocityForStopping){ // if total loss of speed, go to idle
            this.setMovement("idling");
          }
          else{
            let ds = Math.min(Math.abs(this.velocity.x), settings.accelerationX);
            this.acceleration.x = -ds * this.direction;
          }
        }
        if(this.controls.up){  // player wants to climb
          let offsetCoords = new Coordinates(this.velocity.x*this.currentFrameCount, 0);
          if(this.canClimbEdge(offsetCoords)){
            this.climbEdge();
          }
        }
      }
      else if(this.wantsToKeepDirection()){
        if(this.isOnBlock(this.coordinates) || (this.forcePathSettings != null && this.forcePathSettings.autoProgressCoords == null)){
          let nextX = this.coordinates.x + this.velocity.x*this.currentFrameCount;
          if(!this.obstacleAhead(this.coordinates)){
            // no obstacle in the way, accelerating or staying at max speed
            if(this.currentPositionIndex === 1)
              this.velocity.x = Math.abs(this.velocity.x) < settings.minVelocityX ? this.direction*settings.minVelocityX : this.velocity.x;
            this.acceleration.x = Math.abs(this.velocity.x) >= settings.maxVelocityX ? 0 : this.direction*settings.accelerationX;
            // checking if there is a crossable obstacle in the way
            let topLimit = this.direction === 1 ? this.limits.rightTop : this.limits.leftTop;
            let hitboxSize = this.direction === 1 ? this.body.hitBox.right : this.body.hitBox.left;
            let xLimit = this.direction === 1 ? this.limits.right : this.limits.left;
            if(this.velocity.y*this.direction >= 0 && ((this.direction === 1 && nextX + hitboxSize > xLimit) || (this.direction === -1 && nextX + hitboxSize < xLimit))){
              if(topLimit - this.coordinates.y < this.body.crossingAbility()){
                let dy = this.coordinates.y - topLimit;
                this.crouchFactor = Math.max(1 - 0.3*dy/this.body.crossingAbility(), settings.crouchFactorMin);
              }
            }
          }
        }
      }
      else if(this.wantsToChangeDirection()){
        this.acceleration.x = 0;
        if(!this.inTransition){
          if(Math.abs(this.velocity.x) >= settings.minVelocityForStopping){
            this.setMovement("stopping");
          }
          else{
            this.sideSwitch = true;
            this.direction *= -1;
            this.setMovement(null);
          }
        }
      }
    break;
    case "stopping":
      if(this.velocity.x*this.direction < 0 || (this.velocity.x + this.acceleration.x * this.currentFrameCount)*this.velocity.x <= settings.minVelocityForStopping){ // if total loss of speed, go to either idling or running
        this.forceFrameCount = Math.floor(Math.abs(this.velocity.x/this.acceleration.x));
        if(this.controls.left){ // go running left
          this.direction = -1;
          this.sideSwitch = true;
          this.setMovement("running");
        }
        else if(this.controls.right){ // go running right
          this.direction = 1;
          this.sideSwitch = true;
          this.setMovement("running");
        }
        else{ // idling
          this.setMovement("idling");
        }
      }
      else{
        let ds = Math.min(Math.abs(this.velocity.x), settings.accelerationX*settings.stoppingAccelerationFactor);
        this.acceleration.x = -ds * this.direction;
      }
    break;
    case "jumping":
      this.acceleration.x = 0;
      if(!this.inTransition) this.currentMovementOverride = null;
      if(!this.inTransition && (this.velocity.y * (this.velocity.y + this.acceleration.y * this.currentFrameCount) <0 || this.velocity.y > 0)){
        // calculating the frames it will take for the player to reach the ground
        let frames = CalculateFrameCountToReachLimitDown(this.coordinates.y, this.velocity.y, this.acceleration.y, this.limits.bottom);
        this.forceFrameCount = frames - 10;
        this.setMovement("falling");
      }
      else if(this.currentPositionIndex === this.currentMovement.positions.length -1){
        this.forceFrameCount = Math.floor(Math.abs(this.velocity.y/this.acceleration.y));
      }
      if(this.controls.up){ // player wants to climb on something
        if(this.direction === 1 && this.obstacleRight(this.coordinates)){
          let positionIndexStart = this.giveEdgeClimbingPositionIndexStartForHeight(this.coordinates.y -this.limits.rightTop);
          if(positionIndexStart > -1){
            this.anchor = new Anchor(new Coordinates(this.limits.right + this.body.bodySize/2, this.limits.rightTop - this.body.bodySize/2),"", null);
            if(positionIndexStart === 0){
              this.setMovement("edgeHangingWithLegs");
            }
            else{
              this.forcePositionIndex = positionIndexStart - 1;
              this.setMovement("edgeClimbing");
            }
          }
        }
        else if(this.direction === -1 && this.obstacleLeft(this.coordinates)){
          let positionIndexStart = this.giveEdgeClimbingPositionIndexStartForHeight(this.coordinates.y -this.limits.leftTop);
          if(positionIndexStart > -1){
            this.anchor = new Anchor(new Coordinates(this.limits.left - this.body.bodySize/2, this.limits.leftTop - this.body.bodySize/2),"", null);
            if(positionIndexStart === 0){
              this.setMovement("edgeHangingWithLegs");
            }
            else{
              this.forcePositionIndex = positionIndexStart - 1;
              this.setMovement("edgeClimbing");
            }
          }
        }
      }
    break;
    case "falling":
    break;
    case "wallJumping":
      if(!this.inTransition){
        this.direction *= -1;
        this.forcePositionIndex = 1;
        this.setMovement("jumping");
      }
    break;
    case "wallPrepareJumping":
      if(this.limits.usableHold != null && !this.inTransition && this.readyToJump && !this.controls.jump){
        this.keepNextKeyFrameReference = true;
        this.anglesOffsets = new PlayerAngles(new Angles(0,0,0), new Angles(0,0,0), new Angles(0,0,0), false, false, 0, 0);
        if(this.controls.up){
          this.stopPlayerAll();
          this.forcePathSettings = null;
          this.forceFrameCount = 10;
          this.forceControlTemp("up", false, 120); // this avoids to climb the edge the playing is jumping from
          this.setMovement("wallClimbing");
        }
        else{
          this.forcePathSettings = null;
          this.stopPlayerXAxis();
          this.setMovement("wallJumping");
        }
      }
      else if(this.readyToJump && !this.controls.jump){
        if((this.direction === 1 && this.obstacleRight(this.coordinates)) || (this.direction === -1 && this.obstacleLeft(this.coordinates))){
          this.anglesOffsets = new PlayerAngles(new Angles(0,0,0), new Angles(0,0,0), new Angles(0,0,0), false, false, 0, 0);
          if(this.controls.up){
            this.forceFrameCount = 10;
            this.forceControlTemp("up", false, 20); // this avoids climbing on the edge the playing is jumping from
            this.setMovement("wallClimbing");
          }
          else{
            this.stopPlayerXAxis();
            this.setMovement("wallJumping");
          }
        }
      }
    break;
    case "wallClimbing":
    break;
    case "ladderClimbing":
      if(this.forcePathSettings != null){

      }
      else if(this.controls.up){
        this.velocity.y = settings.ladderClimbSpeed;
      }
      else{
        this.velocity.y = 0;
        this.freezeFrame = true;
      }
    break;
    case "ropeCrossing":
      if(this.forcePathSettings == null && !this.wantsNoDirection()){
        let nextDir = (this.controls.left) ? -1 : 1;
        if(this.direction !== nextDir){
          this.direction = nextDir;
          this.forceFrameCount = frameInterpolationCountMin;
          this.velocity.x = this.direction*(settings.ropeCrossingDistPerFrame/this.forceFrameCount)*this.limits.usableRope.speedFactors.x;
          this.velocity.y = -this.direction*(settings.ropeCrossingDistPerFrame/this.forceFrameCount)*this.limits.usableRope.speedFactors.y;
        }
        else{
          let nextX = this.coordinates.x + this.direction*settings.ropeCrossingDistPerFrame*this.limits.usableRope.speedFactors.x;
          let nextY = this.coordinates.y + this.direction*settings.ropeCrossingDistPerFrame*this.limits.usableRope.speedFactors.y;
          if(nextX < this.limits.usableRope.anchorLeft.x || nextX > this.limits.usableRope.anchorRight.x){
            this.forceFrameCount = frameInterpolationCountMin;
            this.fallFromAnchor(null);
          }
          else if(nextX + this.body.hitBox.left < this.limits.left || nextX + this.body.hitBox.right > this.limits.right || nextY + this.body.hitBox.totalHeight() > this.limits.bottom || nextY < this.limits.top){
            this.freezeFrame = true;
            this.stopPlayerVelocity();
          }
          else{
            this.forceFrameCount = this.forceFrameCount !== 0 ? this.forceFrameCount : settings.ropeCrossingFrameCount;
            this.velocity.x = this.direction*(settings.ropeCrossingDistPerFrame/this.forceFrameCount)*this.limits.usableRope.speedFactors.x;
            this.velocity.y = -this.direction*(settings.ropeCrossingDistPerFrame/this.forceFrameCount)*this.limits.usableRope.speedFactors.y;
          }
        }
      }
      else{
        this.freezeFrame = true;
        this.stopPlayerVelocity();
      }
    break;
    case "ropeClimbing":
      if(this.forcePathSettings == null && !this.wantsNoDirection()){
        let nextDir = (this.controls.left) ? -1 : 1;
        if(this.direction !== nextDir){
          this.direction = nextDir;
          this.anglesOffsets = new PlayerAngles(new Angles(0,0,0), new Angles(0,0,0), new Angles(0,0,0), false, false, 0, 0);
          this.forceFrameCount = frameInterpolationCountMin;
          this.setMovement("ropeDownSliding");
        }
        else{
          let nextX = this.coordinates.x + this.direction*settings.ropeClimbingDistPerFrame*this.limits.usableRope.speedFactors.x;
          let nextY = this.coordinates.y + this.direction*settings.ropeClimbingDistPerFrame*this.limits.usableRope.speedFactors.y;
          if(nextX < this.limits.usableRope.anchorLeft.x || nextX > this.limits.usableRope.anchorRight.x){
            this.forceFrameCount = 30;
            this.direction *= -1;
            this.forcePositionIndex = 0;
            this.currentPositionIndex = 0;
            this.fallFromAnchor(null);
          }
          else if(nextX + this.body.hitBox.left < this.limits.left || nextX + this.body.hitBox.right > this.limits.right || nextY + this.body.hitBox.totalHeight() > this.limits.bottom || nextY < this.limits.top){
            this.forceFrameCount = frameInterpolationCountMin;
            this.stopPlayerVelocity();
            this.coordinates.y = this.limits.usableRope.giveYforX(this.coordinates.x);
          }
          else{
            this.forceFrameCount = (this.forceFrameCount > 0) ? this.forceFrameCount : settings.ropeClimbingFrameCount;
            this.velocity.x = this.direction*(settings.ropeClimbingDistPerFrame/this.forceFrameCount)*this.limits.usableRope.speedFactors.x;
            this.velocity.y = -this.direction*(settings.ropeClimbingDistPerFrame/this.forceFrameCount)*this.limits.usableRope.speedFactors.y;
            this.forcePositionIndex = 1;
            this.sideSwitch = true;
            this.setMovement(null);
          }
        }
      }
      else{
        this.forceFrameCount = frameInterpolationCountMin;
        this.stopPlayerVelocity();
      }
    break;
    case "edgeHangingFrontWithLegsReady":
      if(!this.inTransition){
        if(this.controls.up){
          if(this.canReachHoldUp(null,null)){
            this.forceControlUntilNextKeyFrame("up", true, "edgeHangingFrontWithLegs"); // this forces player up when edgeHangingFrontWithLegs transition is complete
            this.setMovement("edgeHangingFrontWithLegs");
          }
        }
        else if(this.controls.down){
          this.forceFrameCount = frameInterpolationCountMin;
          this.fallFromAnchor(null);
        }
        else if(this.wantsToChangeDirection()){
          this.direction *= -1;
          this.sideSwitch = true;
          this.forceControlUntilNextKeyFrame("up", false, "edgeHangingFrontWithLegs"); // this avoids player going up before transition is complete
          this.setMovement("edgeHangingFrontWithLegs");
        }
        else if(this.wantsToKeepDirection()){
          this.setMovement("edgeHangingFrontWithLegsHopping");
        }
      }
    break;
    case "edgeHangingFront":
      if(!this.wantsNoDirection()){
        let nextDirection = this.controls.left ? -1 : 1;
        this.sideSwitch = (this.direction !== nextDirection);
        this.forceFrameCount = 15;
        this.direction = nextDirection;
        this.anglesOffsets.angles.xy = -this.direction*0.2;
        this.anglesOffsets.angularSpeed.xy = -this.direction*0.025;
        this.anglesOffsets.gravityAffected = true;
        this.anglesOffsets.controlAffected = true;
        this.setMovement("edgeHangingFrontSwinging");
      }
    break;
    case "poleSwinging":
    case "edgeHangingFrontSwinging":
      if(this.forceFrameCount === 0){
        this.forceFrameCount = 5;
      }
    break;
    case "poleSwingingPrepareJump":
      if(this.controls.jump){
        this.forceFrameCount = 5;
        this.freezeFrame = true;
      }
      else{
        this.forceFrameCount = 2;
      }
    break;
  }
}
