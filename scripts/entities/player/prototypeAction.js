// This file must be loaded after class Player declared player.js
// triggered when player presses or releases a control key
Player.prototype.action = function(){
  if(this.controls.punch || this.controls.kick){
    return this.fightAction(false);
  }
  switch(this.currentAction){
    case "frontHandPunchMid":
    case "frontHandPunchHigh":
    case "frontHandPunchLow":
    case "backHandPunchMid":
    case "backHandPunchHigh":
    case "backHandPunchLow":
      break;
    case "idling":
      if(!this.inTransition){
        if(this.controls.jump){
          this.prepareJump();
        }
        if(this.readyToJump && !this.controls.jump){
          this.jump(null);
        }
        if(!this.wantsNoDirection()){
          let nextDirection = this.controls.left ? -1 : 1;
          if(this.direction !== nextDirection){
            this.sideSwitch = true;
            this.direction = nextDirection;
            this.goIdlingOrRunning(false);
            this.setMovement(null);
          }
          else{
            if(this.obstacleAhead(this.coordinates) && this.canClimbEdge(null)){
              let height = this.body.coordinates.y - this.limits.usableHold.coordinates.y;
              if(this.controls.up || (this.limits.usableHold.blockIndex > -1 && this.giveEdgeClimbingPositionIndexStartForHeight(height) >= 1))
                this.climbEdge();
            }
            else if(this.crossableObstacleAhead(this.coordinates)){
              let edgeCoords = this.direction === 1 ? new Coordinates(this.limits.right, this.limits.rightTop) : new Coordinates(this.limits.left, this.limits.leftTop);
              this.forcePathSettings = new ForcePathSettings(this.coordinates.clone(), edgeCoords, 0, false, null, null);
            }
            else{
              this.setMovement("running");
            }
          }
        }
        if(this.controls.up){ // player wants to climb on something
          this.tryClimbAnything();
        }
        else if(this.controls.down){
          if(this.canClimbDownLadder(null)){
            this.climbDownLadder();
          }
          else if(this.canClimbDownEdge(null)){
            this.climbDownEdge();
          }
          else{
            this.currentMovementOverride = null;
            this.setMovement("crouching");
          }
        }
      }
    break;
    case "crouching":
      if(!this.inTransition){
        if(this.controls.up){
          if((this.coordinates.y - this.limits.top) > this.body.standDimensions().y){
            this.setMovement("idling");
          }
        }
        else if(this.controls.down){
          if(this.canClimbDownEdge(null)){
            this.climbDownEdge();
          }
        }
        else if(this.wantsToKeepDirection()){
          if((this.direction === 1 && (this.edgeRight(this.coordinates) || this.obstacleRight(this.coordinates))) || (this.direction === -1 && (this.edgeLeft(this.coordinates) || this.obstacleLeft(this.coordinates)))){
            if(this.currentPositionIndex === 0){
              this.freezeFrame = true;
            }
          }
          else{
            this.freezeFrame = false;
            this.forcePositionIndex = 1;
            this.velocity.x = this.direction*settings.crouchingDistPerFrame/settings.crouchingFrameCount;
            this.setMovement("crouching");
          }
        }
        else if(this.wantsToChangeDirection()){
          this.direction *=-1;
          this.velocity.x *=-1;
          this.forcePositionIndex = 0;
          this.setMovement("crouchTurning");
        }
      }
    break;
    case "crouchSliding":
      if(!this.inTransition){
        if(this.controls.up && (this.coordinates.y - this.limits.top) > this.body.standDimensions().y){
          this.setMovement("running");
        }
        else if(Math.abs(this.velocity.x) < settings.crouchingDistPerFrame/settings.crouchingFrameCount && this.wantsToKeepDirection()){
            this.setMovement("crouchTurning");
        }
        else if(this.velocity.x === 0 && this.wantsToChangeDirection()){
          this.direction *=-1;
          this.setMovement("crouching");
        }
      }
    break;
    case "running":
      if(this.controls.jump){
        this.prepareJump();
      }
      if(this.readyToJump && !this.controls.jump){
        this.jump(null);
      }
      if(this.wantsToChangeDirection()){ // stopping from running
        this.acceleration.x = 0;
        if(!this.inTransition){
          if(Math.abs(this.velocity.x) > settings.minVelocityForStopping){
            this.setMovement("stopping");
          }
          else{
            this.direction *= -1;
            this.sideSwitch = true;
            this.forceControlTemp(this.controls.left ? "right" : "left", false, 400); // cooling down the opposite control to avoid "wiggling"
            this.setMovement(null);
          }
        }
      }
      else if(this.controls.down){
        if(this.canClimbDownLadder(null)){
          this.climbDownLadder();
        }
        else{ // player wants to crouch
          this.currentMovementOverride = null;
          if(Math.abs(this.velocity.x) > (3*settings.crouchingDistPerFrame/settings.crouchingFrameCount)){
            this.setMovement("crouchSliding");
          }
          else {
            this.setMovement("crouching");
          }
        }
      }
    break;
    case "stopping":
    break;
    case "jumping":
      this.readyToJump = this.controls.jump;
      if(this.controls.up && this.canClimbEdge(null)){ // player wants to climb on something
        this.climbEdge(null);
      }
    break;
    case "falling":
      if(this.controls.up && this.canClimbEdge(null)){ // player wants to climb on something
        this.climbEdge(null);
      }
    break;
      case "wallPrepareJumping":
        // Wall prepare jumping happens when player comes from a jump against a wall,
        // Or when he is edgeHangingWithLegs. In this case, we must wait for the transition to be complete before jumping.
      if(this.readyToJump && !this.controls.jump && (this.limits.usableHold == null || !this.inTransition)){
        if((this.direction === 1 && this.obstacleRight(this.coordinates)) || (this.direction === -1 && this.obstacleLeft(this.coordinates))){
          this.anglesOffsets = new PlayerAngles(new Angles(0,0,0), new Angles(0,0,0), new Angles(0,0,0), false, false, 0, 0);
          if(this.controls.up){
            this.forceFrameCount = 10;
            this.forceControlTemp("up", false, 120); // this avoids to climb the edge the playing is jumping from
            this.setMovement("wallClimbing");
          }
          else{
            this.stopPlayerXAxis();
            this.setMovement("wallJumping");
          }
        }
      }
    break;
    case "ladderClimbing":
      if(this.forcePathSettings != null){
        // nothing but prevents actions while true
      }
      else if(this.controls.up && this.freezeFrame){
        let bodyCenterY = this.coordinates.y + this.body.getOffsetCoords("relative", this.currentPosition.drawStartJunction).y;
        let bodyCenterNextY = bodyCenterY + settings.ladderClimbSpeed*this.currentFrameCount;
        if(bodyCenterY > this.limits.usableLadder.yTop && bodyCenterNextY < this.limits.usableLadder.yTop){
          if(this.limits.usableLadder.yTop - this.body.hitBox.totalHeight() > this.limits.top){ // climb only if body can stand on top of ladder
            this.anchor = new Anchor(new Coordinates(this.limits.usableLadder.xMiddle, this.limits.usableLadder.yTop - this.body.bodySize/2),"", null);
            this.forcePositionIndex = 1;
            this.setMovement("edgeClimbing");
          }
        }
        else{
          this.freezeFrame = false;
          this.velocity.y = settings.ladderClimbSpeed;
          this.forcePositionIndex = (this.currentPositionIndex + 1) % this.currentMovement.positions.length;
          this.setMovement(null);
        }
      }
      else if(this.controls.down){  // player wants to go down
        this.velocity.y = settings.gravity;
        this.setMovement("ladderDownSliding");
      }
      else if(this.controls.left){  // player wants to get off ladder by left side
        this.tryExitLadder("left");
      }
      else if(this.controls.right){  // player wants to get off ladder by right side
        this.tryExitLadder("right");
      }
    break;
    case "ladderDownSliding":
      if(this.forcePathSettings != null){
        // nothing but prevents actions while true
      }
      else if(this.controls.left){  // player wants to get off ladder by left side
        this.tryExitLadder("left");
      }
      else if(this.controls.right){  // player wants to get off ladder by right side
        this.tryExitLadder("right");
      }
    break;
    case "ropeCrossing":
      if(this.controls.down){
        this.currentPosition.drawStartJunction = this.nextPositionKeyFrame.drawStartJunction;
        this.fallFromAnchor(null);
      }
      else if(this.forcePathSettings == null && (!this.wantsNoDirection()) && this.freezeFrame){
        let nextDir = (this.controls.left) ? -1 : 1;
        let ffc = (nextDir === this.direction) ? settings.ropeCrossingFrameCount : frameInterpolationCountMin;
        this.direction = nextDir;
        this.forceFrameCount = ffc;
        this.velocity.x = this.direction*(settings.ropeCrossingDistPerFrame/ffc)*this.limits.usableRope.speedFactors.x;
        this.velocity.y = -this.direction*(settings.ropeCrossingDistPerFrame/ffc)*this.limits.usableRope.speedFactors.y;
        this.setMovement(null);
      }
    break;
    case "ropeClimbing":
      if(this.controls.down){
        this.direction *= -1;
        this.forceFrameCount = 30;
        this.fallFromAnchor(null);
      }
      else if(!this.wantsNoDirection() && this.velocity.x === 0 && this.forcePathSettings == null){
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
            this.fallFromAnchor(null);
          }
          else if(nextX + this.body.hitBox.left < this.limits.left || nextX + this.body.hitBox.right > this.limits.right || nextY + this.body.hitBox.totalHeight() > this.limits.bottom || nextY < this.limits.top){
            this.forceFrameCount = frameInterpolationCountMin;
            this.stopPlayerVelocity();
          }
          else{
            this.forceFrameCount = settings.ropeClimbingFrameCount;
            this.velocity.x = this.direction*(settings.ropeClimbingDistPerFrame/this.forceFrameCount)*this.limits.usableRope.speedFactors.x;
            this.velocity.y = -this.direction*(settings.ropeClimbingDistPerFrame/this.forceFrameCount)*this.limits.usableRope.speedFactors.y;
            this.sideSwitch = true;
            this.forcePositionIndex = 1;
            this.setMovement(null);
          }
        }
      }
    break;
    case "ropeDownSliding":
      if(this.controls.down){
        this.stopPlayerAcceleration();
        this.forceFrameCount = frameInterpolationCountMin;
        this.fallFromAnchor(null);
      }
      else if(!this.wantsNoDirection() && this.velocity.x === 0){
        let nextDir = (this.controls.left) ? -1 : 1;
        if(nextDir !== this.direction){  // player wants to climb the rope
          let nextX = this.coordinates.x + nextDir*settings.ropeClimbingDistPerFrame*this.limits.usableRope.speedFactors.x;
          let nextY = this.coordinates.y + nextDir*settings.ropeClimbingDistPerFrame*this.limits.usableRope.speedFactors.y;
          if(nextX + this.body.hitBox.left < this.limits.left || nextX + this.body.hitBox.right > this.limits.right || nextY + this.body.hitBox.totalHeight() > this.limits.bottom || nextY < this.limits.top){
            this.forceFrameCount = frameInterpolationCountMin;
            this.stopPlayerVelocity();
          }
          else{
            this.direction = nextDir;
            this.anglesOffsets = new PlayerAngles(new Angles(-this.limits.usableRope.angle,0,0), new Angles(0,0,0), new Angles(0,0,0), false, false, 0, 0);
            this.forceFrameCount = frameInterpolationCountMin;
            let xLimit = (this.direction === 1) ? this.limits.usableRope.anchorLeft.x + settings.ropeClimbingEntryOffset*this.limits.usableRope.speedFactors.x : this.limits.usableRope.anchorRight.x - settings.ropeClimbingEntryOffset*this.limits.usableRope.speedFactors.x;
            let nextX = ((this.coordinates.x <= xLimit && this.direction === 1) || (this.coordinates.x >= xLimit && this.direction === -1)) ? xLimit : this.coordinates.x;
            if(nextX !== this.coordinates.x){
              let nextCoords = new Coordinates(nextX,this.limits.usableRope.giveYforX(nextX));
              this.forcePathSettings = new ForcePathSettings(this.coordinates, nextCoords, this.forceFrameCount, true, null, null);
            }
            this.forcePositionIndex = 1;
            this.setMovement("ropeClimbing");
          }
        }
        else{ // player wants to resume down sliding

        }
      }
    break;
    case "edgeHanging":
      if(!this.inTransition && (this.controls.down || this.wantsToChangeDirection())){
        this.limits.usableHold = null;
        if(this.wantsToChangeDirection()) this.direction *= -1;
        this.fallFromAnchor(null);
      }
      else if(!this.inTransition && (this.controls.up || this.wantsToKeepDirection())){
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
          this.forceControlTemp("up", false, 250);  // prevents player from hanging again to the same hold or edge
          this.fallFromAnchor(null);
        }
      }
      else if(!this.inTransition && this.controls.jump){
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
    case "edgeHangingFrontWithLegsReady":
      if(!this.inTransition){
        if(this.controls.jump){
          this.readyToJump = true;
          this.setMovement("edgeHangingFrontWithLegs");
        }
        else if(this.controls.up){
          if(this.canReachHoldUp(null, null)){
            this.forceControlUntilNextKeyFrame("up", true, "edgeHangingFrontWithLegs"); // this forces player up when edgeHangingFrontWithLegs transition is complete
            this.setMovement("edgeHangingFrontWithLegs");
          }
        }
        else if(this.controls.down){
          if(this.canReachHoldDown(null, this.direction === 1 ? "right" : "left")){
            this.anchor = null;
            this.currentPosition.anchor = false;
            this.nextPositionKeyFrame.anchor = false;
            this.climbEdge();
          }
          else{
            this.forceFrameCount = frameInterpolationCountMin;
            this.fallFromAnchor(null);
          }
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
      if(this.controls.down){
        if(this.canReachHoldDown(null,null)){
          this.anchor = null;
          this.currentPosition.anchor = null;
          this.nextPositionKeyFrame.anchor = null;
          this.climbEdge();
        }
        else{
          this.forceFrameCount = frameInterpolationCountMin;
          let exitVelocityCoords = this.anglesOffsets.exitVelocityCoords(false);
          this.velocity.x = exitVelocityCoords.x;
          this.velocity.y = exitVelocityCoords.y;
          this.fallFromAnchor(null);
        }
      }
      else if(!this.wantsNoDirection()){
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
    case "edgeHangingFrontSwinging":
      if(!this.inTransition && this.controls.down){
        if(this.canReachHoldDown(null,null)){
          this.anchor = null;
          this.currentPosition.anchor = null;
          this.nextPositionKeyFrame.anchor = null;
          this.climbEdge();
        }
        else{
          this.forceFrameCount = frameInterpolationCountMin;
          let exitVelocityCoords = this.anglesOffsets.exitVelocityCoords(false);
          this.velocity.x = exitVelocityCoords.x;
          this.velocity.y = exitVelocityCoords.y;
          this.fallFromAnchor(null);
        }
      }
    break;
    case "poleHanging":
      if(!this.inTransition && this.controls.down){
        this.forceFrameCount = frameInterpolationCountMin;
        let exitVelocityCoords = this.anglesOffsets.exitVelocityCoords(false);
        this.velocity.x = exitVelocityCoords.x;
        this.velocity.y = exitVelocityCoords.y;
        this.fallFromAnchor(null);
      }
      else if(!this.inTransition && this.wantsToKeepDirection()){
        this.anglesOffsets = new PlayerAngles(new Angles(0,0,0), new Angles(-this.direction*0.02,0,0), new Angles(0,0,0), true, true, 0.12, 0.008);
        this.setMovement("poleSwinging");
      }
      else if(!this.inTransition && this.wantsToChangeDirection()){
        this.setMovement("poleSwingingSwichingSide");
      }
      else if(!this.inTransition && this.controls.up){
        this.climbEdgeAfterHanging();
      }
    break;
    case "poleSwinging":
      if(!this.inTransition && this.controls.down){
        if(Math.abs(this.anglesOffsets.angles.xy) > 2.6 && Math.abs(this.anglesOffsets.angularSpeed.xy) < 0.025 && this.anglesOffsets.angles.xy*this.anglesOffsets.angularSpeed.xy > 0){
          this.anglesOffsets = new PlayerAngles(new Angles(0,0,1), new Angles(0,0,0), new Angles(0,0,0), false, false, 0, 0);
          this.setMovement("poleSwingingToOneFootBalance");
        }
        else{
          this.forceFrameCount = frameInterpolationCountMin;
          let exitVelocityCoords = this.anglesOffsets.exitVelocityCoords(false);
          this.velocity.x = exitVelocityCoords.x;
          this.velocity.y = exitVelocityCoords.y;
          this.direction = this.velocity.x > 0 ? 1 : -1;
          this.fallFromAnchor(null);
        }
      }
    break;
    case "oneFootBalance":
      if(!this.inTransition){
        if(this.controls.jump){
          this.readyToJump = true;
        }
        else if(this.readyToJump && !this.controls.jump){
          this.limits.usableHold = null;
          this.anchor = null;
          if(this.wantsToKeepDirection()){
            this.jump("oneFootBalanceJumpingForward");
          }
          else{
            this.sideSwitch = true;
            this.setMovement("wallClimbing");
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
          if(this.canClimbDownPole(null)){
            this.climbDownPole();
          }
          else if(this.canClimbDownEdge(new Coordinates(0,this.body.bodySize/2))){
            this.nextPositionKeyFrame.anchor = null;
            this.anchor = new Anchor(new Coordinates(this.limits.usableHold.coordinates.x + (this.direction*this.body.bodySize/2), this.limits.usableHold.coordinates.y - this.body.bodySize/2),"", null);
            this.climbDownEdge();
          }
        }
      }
    break;
  }
}
