// This file must be loaded after class Player declared player.js
// this is where we check what the next action should be based on player input and movement parameter
// this one is triggered at the end of a movement with property "resetAfter":true
Player.prototype.findNextMovement = function(){
  this.keepNextKeyFrameReference = (this.currentAction !== "idling");
  let next = false;
  let wideEnough = false;
  let offsets;
  switch(this.currentAction){
    case "edgeClimbing":
      wideEnough = this.limits.usableHold == null || IsBlockWideEnough(level,this.limits.usableHold.blockIndex, this, (this.limits.usableHold.climbType === "stand"));
      if(this.limits.usableHold != null && this.limits.usableHold.climbType === "crouch"){
        if(wideEnough){
          this.keepNextKeyFrameReference = true;
          this.setMovement("crouching");
        }
        else{
          if(this.wantsToKeepDirection()){
            let edgeCoords = GetBlockLimitCoords(level, this.limits.usableHold.blockIndex, (this.direction === 1 ? "right" : "left"), "top");
            this.limits.usableHold = null;
            this.nextPositionKeyFrame.anchor = null;
            this.anchor = new Anchor(new Coordinates(edgeCoords.x + (this.direction*this.body.bodySize/2), edgeCoords.y - this.body.bodySize/2),"", null);
            this.sideSwitch = true;
            this.setMovement("edgeHopping");
          }
          else{
            this.blockSwitchEdgeHold(null);
            this.climbDownEdge();
          }
        }
      }
      else if(this.limits.usableHold != null && this.limits.usableHold.type === "pole"){
        this.currentPosition.anchor = null;
        this.nextPositionKeyFrame.anchor = null;
        this.anchor = new Anchor(new Coordinates(this.limits.usableHold.coordinates.x, this.limits.usableHold.coordinates.y - this.body.bodySize/2),"", null);
        this.setMovement("oneFootBalance");
      }
      else{
        if(wideEnough){
          if(this.wantsToKeepDirection()){
            this.keepNextKeyFrameReference = true;
            this.setMovement("running");
          }
          else{
            this.sideSwitch = true;
            this.keepNextKeyFrameReference = true;
            this.setMovement("idling");
          }
        }
        else{
          if(this.controls.down){
            this.blockSwitchEdgeHold(null);
            this.climbDownEdge();
          }
          else if(this.wantsToKeepDirection()){
            let currentBlockIndex = this.limits.usableHold.blockIndex;
            if(this.canHopForward(null) || this.canReachHoldForward(null)){
              this.prepareHopForward();
            }
            else{
              let edgeCoords = GetBlockLimitCoords(level, currentBlockIndex, (this.direction === 1 ? "right" : "left"), "top");
              this.limits.usableHold = null;
              this.nextPositionKeyFrame.anchor = null;
              this.anchor = new Anchor(new Coordinates(edgeCoords.x + (this.direction*this.body.bodySize/2), edgeCoords.y - this.body.bodySize/2),"", null);
              this.sideSwitch = true;
              this.setMovement("edgeHopping");
            }
          }
          else{
            this.blockSwitchEdgeHold("middle");
            this.nextPositionKeyFrame.anchor = null;
            this.anchor = new Anchor(new Coordinates(this.limits.usableHold.coordinates.x, this.limits.usableHold.coordinates.y - this.body.bodySize/2),"", null);
            this.sideSwitch = true;
            this.setMovement("oneFootBalance");
          }
        }
      }
    break;
    case "edgeClimbingDown":
      this.forceFrameCount = 20;
      if(this.limits.usableHold.climbDownType === "edgeHangingWithLegs" || this.limits.usableHold.climbDownType === "edgeHanging")
        this.setMovement(this.limits.usableHold.climbDownType);
    break;
    case "edgeHopping":
      this.fall();
    break;
    case "edgePreventFall":
    wideEnough = IsBlockWideEnough(level, this.limits.currentBlockIndex, this, true);
      if(wideEnough){
        this.setMovement("idling");
      }
      else{
        this.setMovement("oneFootBalance");
      }
    break;
    case "oneFootBalanceTurning":
      this.direction *= -1;
      this.setMovement("oneFootBalance");
    break;
    case "hoppingForwardJumping":
      if(this.limits.reachableBlockStandingPoint != null){
        this.hopForward();
      }
      else if(this.limits.usableHold != null){
        this.nextPositionKeyFrame.anchor = null;
        this.currentPosition.anchor = null;
        this.sideSwitch = true;
        this.climbEdge();
      }
      else{ // Should never happen
        if(this.wantsToKeepDirection()){
          this.sideSwitch = true;
          this.setMovement("running");
        }
        else{
          this.setMovement("idling");
        }
      }
    break;
    case "edgeHangingFrontWithLegsHopping":
      offsets = new Coordinates(0, this.body.hitBox.totalHeight());
      if(this.canHopForward(offsets) || this.canReachHoldForward(offsets)){
        if(this.limits.reachableBlockStandingPoint != null){
          this.sideSwitch = true;
          this.hopForward();
        }
        else if(this.limits.usableHold != null){
          this.nextPositionKeyFrame.anchor = null;
          this.currentPosition.anchor = null;
          this.climbEdge();
        }
      }
      else if(this.canReachHoldDown(null, this.direction === 1 ? "right" : "left")){
        this.currentPosition.anchor = false;
        this.nextPositionKeyFrame.anchor = false;
        this.climbEdge();
      }
      else{
        this.fallFromAnchor("edgeHangingFrontForwardFall");
      }
    break;
    case "hoppingForwardLanding":
      if(this.limits.reachableBlockStandingPoint.type === "idling"){
        this.limits.reachableBlockStandingPoint = null;
        this.keepNextKeyFrameReference = true;
        if(this.wantsToKeepDirection()){
          this.sideSwitch = true;
          this.setMovement("running");
        }
        else{
          this.setMovement("idling");
        }
      }
      else{
        this.limits.reachableBlockStandingPoint = null;
        this.sideSwitch = true;
        if(this.wantsToKeepDirection()){
          if((this.canHopForward(null) || this.canReachHoldForward(null)) && this.controls.parkour){
            this.prepareHopForward();
          }
          else if(this.controls.jump){
            this.readyToJump = true;
            this.setMovement("oneFootBalance");
          }
          else{
            this.setMovement("edgePreventFall");
          }
        }
        else{
          this.setMovement("oneFootBalance");
        }
      }
    break;
    case "edgeHangingFrontWithLegs":
      if(!this.inTransition){
        if(this.readyToJump){
          if(!this.controls.jump){
            this.forceControlTemp("up", false, 150); // this avoids to climb the edge the playing is jumping from
            if(!this.wantsNoDirection()){
              if(this.wantsToChangeDirection()){
                this.direction *= -1;
                this.sideSwitch = true;
              }
              this.setMovement("edgeHangingFrontWithLegsSideJumping");
            }
            else{
              this.setMovement("edgeHangingFrontWithLegsJumping");
            }
          }
        }
        else if(this.controls.up){
          if((this.previousAction === "edgeHangingFrontWithLegsReady" && this.limits.usableHold != null) || this.canReachHoldUp(null, null)){
            let holdCoordsX = this.limits.usableHold.coordinates.x;
            if(holdCoordsX > this.coordinates.x + this.body.hitBox.right){
              this.direction = 1;
              this.setMovement("edgeHangingFrontWithLegsSideJumping");
            }
            else if(holdCoordsX < this.coordinates.x + this.body.hitBox.left){
              this.direction = -1;
              this.setMovement("edgeHangingFrontWithLegsSideJumping");
            }
            else{
              this.direction = holdCoordsX > this.coordinates.x ? 1 : -1;
              this.setMovement("edgeHangingFrontWithLegsJumping");
            }
          }
          else{
            this.setMovement("edgeHangingFrontWithLegsReady");
          }
        }
        else if(this.wantsToKeepDirection() && this.controls.parkour){
          this.setMovement("edgeHangingFrontWithLegsHopping");
        }
        else if(this.wantsToChangeDirection()){
          this.direction *= -1;
          this.sideSwitch = true;
          this.setMovement("edgeHangingFrontWithLegsReady");
        }
        else if(this.controls.down){
          this.forceFrameCount = frameInterpolationCountMin;
          this.fallFromAnchor(null);
        }
        else{ // go to ready position
          this.setMovement("edgeHangingFrontWithLegsReady");
        }
      }
    break;
    case "edgeHangingFrontWithLegsSideJumping":
      this.anchor = null;
      if(this.readyToJump){
        this.switchDrawStartJunction("hitboxbottom");
        this.jump("edgeHangingFrontJumpingForward");
      }
      else{
        this.nextPositionKeyFrame.anchor = null;
        this.currentPosition.anchor = null;
        this.climbEdge();
      }
    break;
    case "edgeHangingFrontWithLegsJumping":
      this.anchor = null;
      if(this.readyToJump){
        this.switchDrawStartJunction("hitboxbottom");
        this.setMovement("wallClimbingFront");
      }
      else{
        this.nextPositionKeyFrame.anchor = null;
        this.currentPosition.anchor = null;
        this.climbEdge();
      }
    break;
    case "edgeHangingWithLegsTurning":
      offsets = new Coordinates(0, this.body.hitBox.totalHeight());
      if(this.canHopForward(offsets) || this.canReachHoldForward(offsets)){
        if(this.limits.reachableBlockStandingPoint != null){
          this.hopForward();
        }
        else if(this.limits.usableHold != null){
          this.nextPositionKeyFrame.anchor = null;
          this.currentPosition.anchor = null;
          this.sideSwitch = true;
          this.climbEdge();
        }
      }
      else{
        this.sideSwitch = true;
        this.fallFromAnchor("edgeHangingTurningFall");
      }
    break;
    case "edgeHangingFrontSwingingOutForward":
      if(this.limits.reachableBlockStandingPoint != null){
        this.sideSwitch = true;
        this.hopForward();
      }
      else if(this.limits.usableHold != null){
        this.nextPositionKeyFrame.anchor = null;
        this.currentPosition.anchor = null;
        this.sideSwitch = true;
        this.climbEdge();
      }
      else{
        this.fallFromAnchor(null);
      }
    break;
    case "edgeHangingFrontSwingingOutUp":
      if(this.limits.usableHold != null){
        this.nextPositionKeyFrame.anchor = null;
        this.currentPosition.anchor = null;
        this.sideSwitch = true;
        this.climbEdge();
      }
      else{
        this.fallFromAnchor(null);
      }
    break;
    case "poleSwingingSwichingSide":
      this.direction *= -1;
      if(this.wantsToKeepDirection() || Math.abs(this.anglesOffsets.angularSpeed.xy) > 0){
        if(Math.abs(this.anglesOffsets.angularSpeed.xy) === 0){
          this.anglesOffsets = new PlayerAngles(new Angles(0,0,0), new Angles(-this.direction*0.02,0,0), new Angles(0,0,0), true, true, 0.12, 0.008);
        }
        this.setMovement("poleSwinging");
      }
      else{
        this.setMovement("poleHanging");
      }
    break;
    case "poleSwingingToOneFootBalance":
      this.currentPosition.anchor = null;
      this.nextPositionKeyFrame.anchor = null;
      this.anchor = new Anchor(this.limits.usableHold.coordinates.clone(new Coordinates(0,-this.body.bodySize/2)), null, null);
      this.anglesOffsets = new PlayerAngles(new Angles(0,0,0), new Angles(0,0,0), new Angles(0,0,0), false, false, 0, 0);
      this.forceFrameCount = 30;
      this.sideSwitch = true;
      this.setMovement("oneFootBalance");
    break;
    case "poleSwingingPrepareJump":
      this.velocity = this.anglesOffsets.exitVelocityCoords(true);
      this.anchor = null;
      let additionalRotationFrames = 15*Math.abs(this.anglesOffsets.angles.xy)/Math.PI;
      this.anglesOffsets = new PlayerAngles(new Angles(0,0,0), new Angles(0,0,0), new Angles(0,0,0), false, false, 0, 0);
      this.direction = this.velocity.x > 0 ? 1 : -1;
      this.switchDrawStartJunction("hitboxbottom");
      if(this.velocity.y > 0){
        this.setMovement("falling");
        this.forceFrameCount = 5;
      }
      else{
        this.forcePositionIndex = 1;
        this.forceFrameCount = 10 + additionalRotationFrames;
        this.setMovement("jumping");
      }
    break;
    default:
      next = true;
    break;
  }
  if(next){
    if(this.fightActions.length > 0){
      let fightAction = this.fightActions[0];
      this.direction = fightAction.direction;
      this.sideSwitch = fightAction.sideSwitch;
      this.forceFrameCount = settings.fightFrameCount;
      this.fightActions.splice(0,1);
      this.setMovement(fightAction.action);
    }
    else if(!this.wantsNoDirection()){
      this.direction = this.controls.left ? -1 : 1;
      if(this.controls.punch || this.controls.kick){
        this.setMovement("idling");
      }
      else{
        this.setMovement("running");
      }
    }
    else{
      this.setMovement("idling");
    }
  }
}
