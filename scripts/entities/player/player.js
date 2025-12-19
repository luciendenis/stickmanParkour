// This is the main class to manage a player
class Player {
  constructor(body, levelSpawn) {
    this.controls = new PlayerControls();
    this.coordinates = new Coordinates(levelSpawn.coordinates.x,levelSpawn.coordinates.y);
    this.anchor = null;
    this.fightActions = [];
    this.drawStartJunction = "hitboxbottom";
    this.forcePathSettings = null;
    this.limits = new PlayerLimits(level.levelLimits.xLeft, level.levelLimits.yCeiling, level.levelLimits.xRight, level.levelLimits.yGround);
    this.body = body;
    this.previousAction = levelSpawn.action;
    this.currentAction = levelSpawn.action;
    this.currentMovement = LoadConfig(movementConfigs,this.currentAction);
    this.currentMovementOverride = null;
    this.currentMovementOverrideIndex = 0;
    this.newMovement = false;
    this.inTransition = false;
    this.keepNextKeyFrameReference = false;
    this.direction = levelSpawn.direction;
    this.sideSwitch = false;
    this.velocity = new Coordinates(0,0);
    this.acceleration = new Coordinates(0,0);
    this.gravityOn = false;
    this.frontSide = levelSpawn.frontSide;
    this.backSide = levelSpawn.frontSide == 'left' ? 'right' : 'left';
    this.overrideFrontSide = levelSpawn.frontSide;
    this.overrideBackSide = levelSpawn.frontSide == 'left' ? 'right' : 'left';
    this.crouchFactor = 1;
    this.readyToJump = false;
    this.lastPositionKeyFrame = ApplyPositionSettings(this.currentMovement.positions[0], this.currentMovementOverride, this.frontSide, this.backSide, this.direction, new Angles(0,0,0));
    this.currentPosition = ApplyPositionSettings(this.currentMovement.positions[0], this.currentMovementOverride, this.frontSide, this.backSide, this.direction, new Angles(0,0,0));
    this.nextPositionKeyFrame = ApplyPositionSettings(this.currentMovement.positions[0], this.currentMovementOverride, this.frontSide, this.backSide, this.direction, new Angles(0,0,0));
    this.currentFrame = 0;
    this.currentFrameCount = frameInterpolationCount;
    this.forceFrameCount = 1;
    this.freezeFrame = false;
    this.currentPositionIndex = 0;
    this.forcePositionIndex = 0;
    this.intermediatePositionSettings = {};
    this.intermediateOffsetSettings = {};
    this.anglesOffsets = new PlayerAngles(new Angles(0,0,0), new Angles(0,0,0), new Angles(0,0,0), false, false, 0, 0);
  }
  setMovement(movementName){
    this.previousAction = this.currentAction;
    if(movementName != null) this.currentAction = movementName;
    this.currentMovement = LoadConfig(movementConfigs,this.currentAction);
    this.currentFrame = 0;
    this.newMovement = true;
  }
  update(){
    if(this.currentFrame == 0){ // reached a keyframe, need to update next keyframe
      this.inTransition = this.newMovement;
      this.checkForNextActionOnKeyFrameChange();
      let positionOverride = null;
      let applyVelocityOffSets = false;
      if(!this.newMovement){
        if(this.forceFrameCount > 0){
          this.currentFrameCount = this.forceFrameCount;
          this.forceFrameCount = 0;
        }
        else{
          this.currentFrameCount = frameInterpolationCountMin + Math.floor(frameInterpolationCount * ((settings.maxVelocityX - Math.max(Math.abs(this.velocity.x),0))/ settings.maxVelocityX));
        }
        this.lastPositionKeyFrame = this.nextPositionKeyFrame;
        if(!this.freezeFrame){
          if(this.currentMovement.resetAfter && (this.currentPositionIndex == this.currentMovement.positions.length - 1 )){
            return this.findNextMovement();
          }
          this.currentPositionIndex = this.currentPositionIndex + 1 < this.currentMovement.positions.length ? this.currentPositionIndex + 1 : this.currentMovement.cycle ? 0 : this.currentPositionIndex;
        }
        if(this.currentMovementOverride != null){
          this.currentMovementOverrideIndex = this.currentMovementOverrideIndex + 1 < this.currentMovementOverride.positions.length ? this.currentMovementOverrideIndex + 1 : this.currentMovementOverride.cycle ? 0 : this.currentMovementOverrideIndex;
        }
      }
      else{ // changing movement
        this.currentFrame = 1;  // to avoid position redundancy
        // checking if there is a transition between the movements
        let transition = LoadTransitionConfig(movementTransitionConfigs, this.previousAction, this.currentAction, this.sideSwitch);
        console.log("New movement : { previousAction : " + this.previousAction + ", currentAction : " + this.currentAction + ", sideSwitch : " + this.sideSwitch + " }");
        if(transition != null){
          this.applyTransition(transition);
        }
        // current position becomes the last keyframe for a smooth transition unless keepNextKeyFrameReference is true
        this.lastPositionKeyFrame = this.keepNextKeyFrameReference ? this.nextPositionKeyFrame : this.currentPosition;
        this.keepNextKeyFrameReference = false;
        if(this.forceFrameCount > 0){
          this.currentFrameCount = this.forceFrameCount;
          this.forceFrameCount = 0;
        }
        else{
          this.currentFrameCount = frameInterpolationCountMin; // for a transition keeping interpolation frames to a minimum
        }
        if(this.forcePositionIndex != 0){
          this.currentPositionIndex = this.forcePositionIndex;
          this.forcePositionIndex = 0;
        }
        else{
          this.currentPositionIndex = 0;
        }
        this.currentMovementOverrideIndex = 0;
        if(this.sideSwitch){
          this.frontSide = this.frontSide == 'left' ? 'right' : 'left';
          this.backSide = this.backSide == 'left' ? 'right' : 'left';
        }
        if(this.currentMovementOverride != null && this.sideSwitch){
          this.overrideFrontSide = this.overrideFrontSide == 'left' ? 'right' : 'left';
          this.overrideBackSide = this.overrideBackSide == 'left' ? 'right' : 'left';
        }

        applyVelocityOffSets = true;
        this.newMovement = false;
        this.sideSwitch = false;
      }

      this.currentPosition = this.lastPositionKeyFrame;


      // Switching sides if necessary
      if(this.currentPositionIndex == 0 && this.currentMovement.switchSide && !this.freezeFrame){
        this.frontSide = this.frontSide == 'left' ? 'right' : 'left';
        this.backSide = this.backSide == 'left' ? 'right' : 'left';
      }
      if(this.currentMovementOverride != null && this.currentMovementOverrideIndex == 0 && this.currentMovementOverride.switchSide && !this.freezeFrame){
        this.overrideFrontSide = this.overrideFrontSide == 'left' ? 'right' : 'left';
        this.overrideBackSide = this.overrideBackSide == 'left' ? 'right' : 'left';
      }

      // Applying settings to positions
      if(this.currentMovementOverride != null){
        positionOverride = ApplyPositionOverrideSettings(this.currentMovementOverride.positions[this.currentMovementOverrideIndex], this.overrideFrontSide, this.overrideBackSide, this.direction, this.body, this.anchor);
      }
      this.nextPositionKeyFrame = ApplyPositionSettings(this.currentMovement.positions[this.currentPositionIndex], positionOverride, this.frontSide, this.backSide, this.direction, this.crouchFactor, this.anglesOffsets.angles.clone());

      // Applying velocity offsets
      if(applyVelocityOffSets){
        let offsetsToApply = this.nextPositionKeyFrame.offsets["velocity"];
        if(offsetsToApply != null){
          if(offsetsToApply.y != null && offsetsToApply.y != 0){
            this.crouchFactor = Math.max(this.crouchFactor, settings.crouchFactorMin);
            this.velocity.y += offsetsToApply.y * 1/Math.pow(this.crouchFactor,2);
            this.crouchFactor = 1;
          }
          if(offsetsToApply.x !=null && offsetsToApply.x != 0){
            this.velocity.x += offsetsToApply.x;
          }
        }
      }

      // Calculating the intermediate position settings
      this.intermediatePositionSettings = {};
      for(let i = 0; i < this.lastPositionKeyFrame.elements.length; i++){
        let lastCurrentElement = this.lastPositionKeyFrame.elements[i];
        let nextCurrentElement = this.nextPositionKeyFrame.elements.find(e => e.startJunction == lastCurrentElement.startJunction && e.middleJunction == lastCurrentElement.middleJunction && e.endJunction == lastCurrentElement.endJunction);
        let angleDiff = AngleDiff(nextCurrentElement.angles.xy, lastCurrentElement.angles.xy, lastCurrentElement.angles.forceRotationDirection, this.direction);
        // key to retrieve the values is concatenation of startJunction and endJunction names
        this.intermediatePositionSettings[lastCurrentElement.startJunction+lastCurrentElement.endJunction] = new IntermediatePositionSettings(angleDiff / (this.currentFrameCount-this.currentFrame), (nextCurrentElement.angles.z - lastCurrentElement.angles.z) / (this.currentFrameCount-this.currentFrame), (nextCurrentElement.extension - lastCurrentElement.extension) / (this.currentFrameCount-this.currentFrame));
      }
      // if there is an anchor we might need transitions
      if(this.anchor != null){
        // if current frame is unanchored and next frame is anchored we create a transition between current coords and the anchor
        if(!this.currentPosition.anchor && this.nextPositionKeyFrame.anchor){
          this.forcePathSettings = new ForcePathSettings(new Coordinates(this.coordinates.x, this.coordinates.y), new Coordinates(this.anchor.coordinates.x,this.anchor.coordinates.y), this.currentFrameCount-this.currentFrame, true, null, this.anchor.fpsCurveOffsets);
          this.stopPlayerAll();
          this.gravityOn = false;
          this.anchor.releaseOffset = this.nextPositionKeyFrame.anchor.releaseOffset;
        }
        // if current frame is anchored and next frame is unanchored, getting the release offset of the current position anchor
        else if(this.currentPosition.anchor && !this.nextPositionKeyFrame.anchor){
          this.anchor.releaseOffset = this.currentPosition.anchor.releaseOffset;
          let nextPositionJunctions = this.body.calculateJunctionsForPosition(this.nextPositionKeyFrame);
          let nextOffsets = GetPositionOffsetCoords(null, nextPositionJunctions, this.nextPositionKeyFrame.drawStartJunction, null);
          let currentOffset = GetPositionOffsetCoords(null, nextPositionJunctions, this.anchor.releaseOffset, null);
          // If there is a velocity offset, the forcePathSettings take it as a releaseOffset and we calculate velocity accordingly
          let releaseVelocity = (this.currentPosition.offsets != null && this.currentPosition.offsets["velocity"] != null) ? this.currentPosition.offsets["velocity"] : null;
          if(releaseVelocity != null){
            let offsetX = releaseVelocity.x == null ? 0 : releaseVelocity.x*(this.currentFrameCount-this.currentFrame+1);
            let offsetY = releaseVelocity.y == null ? 0 : releaseVelocity.y*(this.currentFrameCount-this.currentFrame+1);
            currentOffset.addOffset(new Coordinates(offsetX,offsetY));
          }
          let crossingEndCoords = new Coordinates(this.anchor.coordinates.x+currentOffset.x-nextOffsets.x,this.anchor.coordinates.y+currentOffset.y-nextOffsets.y);
          // checking if the end coords of the forcePathSettings dont reach below ground
          if(crossingEndCoords.y > this.limits.bottom){
            crossingEndCoords.y = this.limits.bottom;
            if(releaseVelocity != null) releaseVelocity.y = 0;
          }
          this.forcePathSettings = new ForcePathSettings(new Coordinates(this.anchor.coordinates.x, this.anchor.coordinates.y),crossingEndCoords, this.currentFrameCount-this.currentFrame+1, true, releaseVelocity, null);
          this.stopPlayerAll();
          this.gravityOn = false;
        }
        // if current frame is unanchored and next frame is unanchored, getting rid of the anchor
        else if(!this.currentPosition.anchor && !this.nextPositionKeyFrame.anchor){
          this.anchor = null;
        }
      }
      // if drawStartJunction changes on the next frame, we need to add it to the offsets for a smooth transition
      let dsjOffsetCoords;
      if(this.nextPositionKeyFrame.drawStartJunction != this.currentPosition.drawStartJunction){
        let nextPositionJunctions = this.body.calculateJunctionsForPosition(this.nextPositionKeyFrame);
        let nextOffsets = GetPositionOffsetCoords(null, nextPositionJunctions, this.nextPositionKeyFrame.drawStartJunction, null);
        let currentOffset = GetPositionOffsetCoords(null, nextPositionJunctions, this.currentPosition.drawStartJunction, null);
        dsjOffsetCoords = new Coordinates(nextOffsets.x-currentOffset.x,nextOffsets.y-currentOffset.y);
      }
      else{
        dsjOffsetCoords = new Coordinates(0,0);
      }
      this.intermediateOffsetSettings["position"] = new Coordinates((this.nextPositionKeyFrame.offsets["position"].x-this.currentPosition.offsets["position"].x+dsjOffsetCoords.x)/(this.currentFrameCount-this.currentFrame),
                                                                    (this.nextPositionKeyFrame.offsets["position"].y-this.currentPosition.offsets["position"].y+dsjOffsetCoords.y)/(this.currentFrameCount-this.currentFrame));
      this.intermediateOffsetSettings["angles"] = new Angles(AngleDiff(this.nextPositionKeyFrame.offsets["angles"].xy, this.currentPosition.offsets["angles"].xy, this.anglesOffsets.angles.forceRotationDirection, this.direction)/(this.currentFrameCount-this.currentFrame),
                                                              (this.nextPositionKeyFrame.offsets["angles"].z-this.currentPosition.offsets["angles"].z)/(this.currentFrameCount-this.currentFrame),
                                                              (this.nextPositionKeyFrame.offsets["angles"].forceRotationDirection-this.currentPosition.offsets["angles"].forceRotationDirection)/(this.currentFrameCount-this.currentFrame));
    }
    // in between keyframes, just need to calculate the intermediate position
    this.currentPosition = new Position();
    this.currentPosition.anchor = this.lastPositionKeyFrame.anchor;
    this.currentPosition.drawStartJunction = this.lastPositionKeyFrame.drawStartJunction;
    this.currentPosition.offsets = {};
    this.currentPosition.offsets["position"] = new Coordinates(this.lastPositionKeyFrame.offsets["position"].x + this.intermediateOffsetSettings["position"].x * this.currentFrame,
                                                              this.lastPositionKeyFrame.offsets["position"].y + this.intermediateOffsetSettings["position"].y * this.currentFrame);
    this.currentPosition.offsets["angles"] = new Angles(this.lastPositionKeyFrame.offsets["angles"].xy + this.intermediateOffsetSettings["angles"].xy * this.currentFrame,
                                                          this.lastPositionKeyFrame.offsets["angles"].z + this.intermediateOffsetSettings["angles"].z * this.currentFrame,
                                                          this.lastPositionKeyFrame.offsets["angles"].forceRotationDirection + this.intermediateOffsetSettings["angles"].forceRotationDirection * this.currentFrame);
    for(let i = 0; i < this.lastPositionKeyFrame.elements.length; i++){
      let lastCurrentElement = this.lastPositionKeyFrame.elements[i];
      let nextCurrentElement = this.nextPositionKeyFrame.elements.find(e => e.startJunction == lastCurrentElement.startJunction && e.middleJunction == lastCurrentElement.middleJunction && e.endJunction == lastCurrentElement.endJunction);
      let steps = this.intermediatePositionSettings[lastCurrentElement.startJunction + lastCurrentElement.endJunction];
      this.currentPosition.elements.push(new PositionElement(
        lastCurrentElement.startJunction,
        lastCurrentElement.middleJunction,
        lastCurrentElement.endJunction,
        lastCurrentElement.startLength,
        lastCurrentElement.endLength,
        new Angles(
          lastCurrentElement.angles.xy + steps.xyAngleStep * this.currentFrame,
          lastCurrentElement.angles.z + steps.zAngleStep * this.currentFrame,
          lastCurrentElement.angles.forceRotationDirection
        ),
        lastCurrentElement.extension + steps.extensionStep * this.currentFrame)
        );
    }

    this.currentFrame = (this.currentFrame + 1) % this.currentFrameCount;
    this.body.setPositionRelative(this.currentPosition);
    this.updatePosition();
    this.anglesOffsets.update(this.inTransition || this.wantsNoDirection() ? null : this.controls.left ? "left" : "right");
    this.checkForNextActionOnFrameChange();
  }

  // Applying overrides to position
  applyTransition(transition){
    if(transition != null){
      this.forcePositionIndex = (transition.indexTo != null) ? transition.indexTo : 0;
      if(transition.frameCount != null) this.forceFrameCount = transition.frameCount;
      let rotationDirectionsCount = transition.rotationDirections == null ? 0 : transition.rotationDirections.length;
      if(transition.releaseOffset != null){
        if(this.keepNextKeyFrameReference)
          this.nextPositionKeyFrame.releaseOffset = transition.releaseOffset;
        else
          this.currentPosition.releaseOffset = transition.releaseOffset;
      }
      if(transition.drawStartJunction != null){
        if(this.keepNextKeyFrameReference)
          this.nextPositionKeyFrame.drawStartJunction = transition.drawStartJunction;
        else
          this.currentPosition.drawStartJunction = transition.drawStartJunction;
      }
      for(let i = 0; i < rotationDirectionsCount; i++){
        let rd = transition.rotationDirections[i];
        let endJunctionName = rd.endJunction.replace('front', this.frontSide).replace('back', this.backSide);
        if(this.keepNextKeyFrameReference){
          if(this.nextPositionKeyFrame.elements.find(e => e.endJunction == endJunctionName) !== undefined){
            this.nextPositionKeyFrame.elements.find(e => e.endJunction == endJunctionName).angles.forceRotationDirection = rd.direction;
          }
        }
        else{
          if(this.currentPosition.elements.find(e => e.endJunction == endJunctionName) !== undefined){
            this.currentPosition.elements.find(e => e.endJunction == endJunctionName).angles.forceRotationDirection = rd.direction;
          }
        }
      }
    }
  }

  // this is used to determine if player wanted just a direction switch and stay idling or go running
  goIdlingOrRunning(callback){
    if(callback){
      if(this.wantsToKeepDirection()){
        this.setMovement("running");
      }
    }
    else{
      setTimeout(() => {
        this.goIdlingOrRunning(true);
      }, delayForKeyRelease);
    }
  }
  checkForFall(height){
    if(height > settings.fallHeight){
      if(this.forcePathSettings == null && (this.currentAction == "running" || this.currentAction == "stopping" || this.currentAction == "idling" || this.currentAction == "crouchSliding")){
        this.fall();
      }
    }
  }
  stopPlayer(ax,ay,vx,vy){
    if(ax) this.acceleration.x = 0;
    if(ay) this.acceleration.y = 0;
    if(vx) this.velocity.x = 0;
    if(vy) this.velocity.y = 0;
  }
  stopPlayerAll(){
    this.stopPlayer(true,true,true,true);
  }
  stopPlayerVelocity(){
    this.stopPlayer(false,false,true,true);
  }
  stopPlayerAcceleration(){
    this.stopPlayer(true,true,false,false);
  }
  stopPlayerXAxis(){
    this.stopPlayer(true,false,true,false);
  }
  stopPlayerYAxis(){
    this.stopPlayer(false,true,false,true);
  }
  prepareJump(){
    this.readyToJump = true;
    this.currentMovementOverride = LoadConfig(movementOverrideConfigs,"prepareJump");
    this.currentMovementOverrideIndex = 0;
    this.overrideFrontSide = this.frontSide;
    this.overrideBackSide = this.backSide;
  }
  jump(movementOverride){
    this.forceFrameCount = Math.max(6,Math.min(this.forceFrameCount, 10));
    this.readyToJump = false;
    this.currentMovementOverride = (movementOverride == null) ? null : LoadConfig(movementOverrideConfigs,movementOverride);
    this.currentMovementOverrideIndex = 0;
    this.forcePathSettings = null;
    this.setMovement("jumping");
  }
  fall(){
    this.acceleration.x = 0;
    this.currentMovementOverride = null;
    this.setMovement("falling");
  }
  fallFromAnchor(movementOverride){
    this.anchor = null;
    let forceRotationDirection = Math.abs(this.anglesOffsets.angles.xy) > 1.7 ? -1 : 0;
    this.anglesOffsets = new PlayerAngles(new Angles(0,0,forceRotationDirection), new Angles(0,0,0), new Angles(0,0,0), false, false, 0, 0);
    this.currentMovementOverride = (movementOverride == null) ? null : LoadConfig(movementOverrideConfigs,movementOverride);
    this.currentMovementOverrideIndex = 0;
    if(forceRotationDirection == -1){
      this.forceFrameCount = 30;
    }
    this.switchDrawStartJunction("hitboxbottom");
    this.setMovement("falling");
  }
  switchDrawStartJunction(newDrawStartJunction){
    let currentCenterCoords = this.body.coordinates.clone();
    currentCenterCoords.x -= this.currentPosition.offsets["position"].x;
    currentCenterCoords.y -= this.currentPosition.offsets["position"].y;
    let currentOffsetCoords = new Coordinates(0,0);
    if(this.currentPosition.drawStartJunction != this.nextPositionKeyFrame.drawStartJunction){
      // TODO check if this code might be useful in the future
      console.log("switchDrawStartJunction, case this.currentPosition.drawStartJunction != this.nextPositionKeyFrame.drawStartJunction");
      //currentOffsetCoords = this.body.getOffsetCoordsBetweenDrawStartJunctions(this.currentPosition.drawStartJunction, this.nextPositionKeyFrame.drawStartJunction);
    }
    let nextOffsetCoords = this.body.getOffsetCoords("absolute", newDrawStartJunction);
    this.coordinates.x = currentCenterCoords.x + currentOffsetCoords.x - nextOffsetCoords.x;
    this.coordinates.y = currentCenterCoords.y + currentOffsetCoords.y - nextOffsetCoords.y;
    this.currentPosition.drawStartJunction = newDrawStartJunction;
    this.nextPositionKeyFrame.drawStartJunction = newDrawStartJunction;
    this.currentPosition.anchor = null;
    this.nextPositionKeyFrame.anchor = null;
  }
  tryExitLadder(side){
    let canExit = (side == 'left') ? (this.limits.left < this.limits.usableLadder.xLeft - this.body.hitBox.totalWidth()) : (this.limits.right > this.limits.usableLadder.xRight + this.body.hitBox.totalWidth());
    if(canExit){
      let nextDirection = (side == 'left') ? -1 : 1;
      this.sideSwitch = this.direction != nextDirection;
      this.direction = nextDirection;
      this.velocity.x =this.direction*settings.ladderOffSpeed;
      this.fall();
    }
  }
  climbRope(){
    let nextX = this.coordinates.x + this.velocity.x*frameInterpolationCountMin;
    this.stopPlayerAll();
    if(Math.abs(this.limits.usableRope.angle) < settings.ropeCrossingAngleLimit){ // case rope is crossable
      this.anglesOffsets = new PlayerAngles(new Angles(-this.limits.usableRope.angle,0,0), new Angles(0,0,0), new Angles(0,0,0), false, false, 0, 0);
      this.forceFrameCount = frameInterpolationCountMin;
      let xLimitLeft = this.limits.usableRope.anchorLeft.x + settings.ropeCrossingDistPerFrame*this.limits.usableRope.speedFactors.x;
      let xLimitRight = this.limits.usableRope.anchorRight.x - settings.ropeCrossingDistPerFrame*this.limits.usableRope.speedFactors.x;
      if(this.coordinates.x <= xLimitLeft){
        nextX = xLimitLeft;
        this.direction = 1;
      }
      else if(this.coordinates.x >= xLimitRight){
        nextX = xLimitRight;
        this.direction = -1;
      }
      let nextCoords = new Coordinates(nextX,this.limits.usableRope.giveYforX(nextX));
      this.forcePathSettings = new ForcePathSettings(this.coordinates, nextCoords, this.forceFrameCount, true, null, null);
      this.setMovement("ropeCrossing");
    }
    else if(this.direction*this.limits.usableRope.angle >= settings.ropeCrossingAngleLimit){ // case rope is climbable in that direction
      this.anglesOffsets = new PlayerAngles(new Angles(-this.limits.usableRope.angle,0,0), new Angles(0,0,0), new Angles(0,0,0), false, false, 0, 0);
      this.forceFrameCount = frameInterpolationCountMin;
      let xLimitLeft = this.limits.usableRope.anchorLeft.x + settings.ropeClimbingEntryOffset*this.limits.usableRope.speedFactors.x;
      let xLimitRight = this.limits.usableRope.anchorRight.x - settings.ropeClimbingEntryOffset*this.limits.usableRope.speedFactors.x;
      nextX = (nextX <= xLimitLeft) ? xLimitLeft : (nextX >= xLimitRight) ? xLimitRight : nextX;
      let nextCoords = new Coordinates(nextX,this.limits.usableRope.giveYforX(nextX));
      this.forcePathSettings = new ForcePathSettings(this.coordinates, nextCoords, this.forceFrameCount, true, null, null);
      this.setMovement("ropeClimbing");
    }
    else{ // rope is slidable in that direction
      this.forceFrameCount = frameInterpolationCountMin;
      nextX = (nextX <= this.limits.usableRope.anchorLeft.x) ? this.limits.usableRope.anchorLeft.x : (nextX >= this.limits.usableRope.anchorRight.x) ? this.limits.usableRope.anchorRight.x : nextX;
      let nextCoords = new Coordinates(nextX,this.limits.usableRope.giveYforX(nextX));
      this.forcePathSettings = new ForcePathSettings(this.coordinates, nextCoords, this.forceFrameCount, true, null, null);
      this.setMovement("ropeDownSliding");
    }
  }
  climbLadder(){
    this.stopPlayerXAxis();
    this.forceFrameCount = frameInterpolationCountMin;
    if(this.velocity.y == 0 && this.acceleration.y == 0){
      this.forcePathSettings = new ForcePathSettings(this.coordinates, new Coordinates(this.limits.usableLadder.xMiddle, this.coordinates.y + settings.ladderClimbSpeed*this.forceFrameCount), this.forceFrameCount, true, new Coordinates(0, settings.ladderClimbSpeed), null);
      this.setMovement("ladderClimbing");
    }
    else{
      let nextFrameY = this.coordinates.y;
      let nextFrameSpeed = this.velocity.y;
      for(let i = 0; i < this.forceFrameCount; i++){
        nextFrameSpeed += this.acceleration.y;
        nextFrameY += nextFrameSpeed;
      }
      if(nextFrameY < this.limits.bottom){
        this.stopPlayerYAxis();
        this.forcePathSettings = new ForcePathSettings(this.coordinates, new Coordinates(this.limits.usableLadder.xMiddle, nextFrameY), this.forceFrameCount, false, null, null);
        this.setMovement("ladderDownSliding");
      }
    }
  }
  climbDownLadder(){
    let nextFrameY = this.coordinates.y;
    let nextFrameSpeed = this.velocity.y;
    let frameCount = (this.currentAction == "idling" || this.currentAction == "running" || this.currentAction == "stopping" || this.currentAction == "crouching" || this.currentAction == "crouchSliding") ? 20 : frameInterpolationCountMin;
    let nextFrameAcceleration = Math.max(this.acceleration.y, settings.gravity);
    for(let i = 0; i < frameCount; i++){
      nextFrameSpeed += nextFrameAcceleration;
      nextFrameY += nextFrameSpeed;
    }
    if(nextFrameY < this.limits.usableLadder.yBottom){
      this.stopPlayerAll();
      this.forceFrameCount = frameCount;
      this.forcePathSettings = new ForcePathSettings(this.coordinates, new Coordinates(this.limits.usableLadder.xMiddle, nextFrameY), this.forceFrameCount, false, null, null);
      this.setMovement("ladderDownSliding");
    }
  }
  climbEdge(){
    this.readyToJump = false;
    this.crouchFactor = 1;
    this.currentMovementOverride = null;
    let hold = this.limits.usableHold;
    let distReduction = ((this.currentAction == "hoppingForwardJumping" || this.currentAction == "idling" || this.currentAction == "running") && hold.blockIndex == -1 && hold.climbDownType == "edgeHangingFront") ? settings.hoppingDistMin : 0;
    let dist = DistBetweenCoords(this.body.coordinates, hold.coordinates) - distReduction;
    this.forceFrameCount = Math.round(Math.max(dist/settings.hoppingDistPerFrame, 2));
    let anchorFpsOffsets = new Coordinates(0,-Math.max(0,dist)*0.3);
    this.anchor = new Anchor(new Coordinates(hold.coordinates.x + ((hold.type == "front" || hold.type == "pole") ? 0 : this.direction*this.body.bodySize/2), hold.coordinates.y - (hold.type == "pole" ? 0 : this.body.bodySize/2)),null, anchorFpsOffsets);
    let positionIndexStart = (hold.climbType == null || hold.type == "front") ? 0 : this.giveEdgeClimbingPositionIndexStartForHeight(this.body.coordinates.y - hold.coordinates.y);
    this.keepNextKeyFrameReference = true;
    if(positionIndexStart <= 0){
      if(hold.climbDownType == "edgeHangingFront" || hold.climbDownType == "pole"){
        let startCoords = this.coordinates.clone();
        if(this.currentAction.startsWith("edgeHanging")){
          startCoords = this.body.getJunctionCoords(this.frontSide + "foot");
          let distsToHold = new Coordinates(hold.coordinates.x - this.coordinates.x, hold.coordinates.y - this.coordinates.y);
          if(distsToHold.y > Math.abs(distsToHold.x)){ // the hold is above current coordinates (that are the current hold coords)
            let exitVelocityCoords = this.anglesOffsets == null ? new Coordinates(0,0) : this.anglesOffsets.exitVelocityCoords(false);
            let framesToHold = CalculateFrameCountToReachLimitDown(this.coordinates.y, exitVelocityCoords.y, settings.gravity, hold.coordinates.y);
            let framesToHoldWithXSpeed = CalculateFrameCountToReachLimitDown(this.coordinates.y, (exitVelocityCoords.y + Math.abs(exitVelocityCoords.x)), settings.gravity, hold.coordinates.y);
            let fallOffsetCoords = new Coordinates(framesToHold*exitVelocityCoords.x, distsToHold.y);
            startCoords.addOffset(fallOffsetCoords);
            this.forceFrameCount = framesToHoldWithXSpeed;
            let nextDirection = hold.coordinates.x > startCoords.x ? 1 : -1;
            this.sideSwitch = this.direction != nextDirection;
            this.direction = nextDirection;
          }
        }
        let xyAngle = AngleXYfromCoords(hold.coordinates, startCoords) - Math.PI/2;
        let friction = hold.climbDownType == "edgeHangingFront" ? 0.01 : 0.008;
        let controlStrength = hold.climbDownType == "edgeHangingFront" ? 0.1 : 0.12;
        this.anglesOffsets = new PlayerAngles(new Angles(xyAngle,0,0), new Angles(-xyAngle/30,0,0), new Angles(0,0,0), true, true, controlStrength, friction);
        this.setMovement(hold.climbDownType + "Swinging");
      }
      else{
        this.anglesOffsets = new PlayerAngles(this.limits.usableHold.angles.clone(), new Angles(0,0,0), new Angles(0,0,0), false, false, 0, 0);
        if(this.currentAction.startsWith("edgeHangingFrontSwingingOut")){
          this.sideSwitch = false;
        }
        this.setMovement(hold.climbDownType);
      }
    }
    else{
      this.forcePositionIndex = positionIndexStart - 1;
      this.setMovement("edgeClimbing");
    }
  }
  climbDownEdge(){
    let nextDirection = this.limits.usableHold.type == "sideRight" ? 1 : -1;
    this.sideSwitch = nextDirection != this.direction;
    this.direction = nextDirection;
    this.anchor = new Anchor(new Coordinates(this.limits.usableHold.coordinates.x + (this.direction*this.body.bodySize/2), this.limits.usableHold.coordinates.y - this.body.bodySize/2),"", null);
    this.keepNextKeyFrameReference = true;
    this.anglesOffsets = new PlayerAngles(this.limits.usableHold.angles.clone(), new Angles(0,0,0), new Angles(0,0,0), false, false, 0, 0);
    this.forceFrameCount = 20;
    if(this.currentAction == "crouchSliding"){
      if(this.limits.usableHold.climbDownType == "edgeHangingWithLegs" || this.limits.usableHold.climbDownType == "edgeHanging")
        this.setMovement(this.limits.usableHold.climbDownType);
    }
    else{
      if(this.currentAction == "edgeClimbing"){ // in this case player goes directly from one side of a wall to the other
        this.nextPositionKeyFrame.anchor = null;
        this.forcePositionIndex = (this.limits.usableHold.climbDownType == "edgeHopping") ? 0 : 1;
      }
      else if(this.currentAction == "oneFootBalance"){
        this.sideSwitch = false;
      }
      if(this.limits.usableHold.climbDownType == "edgeHopping"){
        this.direction *= -1;
        this.setMovement("edgeHopping");
      }
      else{
        this.setMovement("edgeClimbingDown");
      }
    }
  }
  climbEdgeAfterHanging(){
    this.keepNextKeyFrameReference = true;
    this.anglesOffsets = new PlayerAngles(new Angles(0,0,0), new Angles(0,0,0), new Angles(0,0,0), false, false, 0, 0);
    this.setMovement("edgeClimbing");
  }
  climbDownPole(){
    // Coming from oneFootBalance on a pole, going down to poleSwinging
    this.currentPosition.anchor = false;
    this.nextPositionKeyFrame.anchor = false;
    this.anchor = new Anchor(this.limits.usableHold.coordinates.clone(), null, new Coordinates(-this.direction*globalScale*30,-30*globalScale));
    this.anglesOffsets = new PlayerAngles(new Angles(this.direction*1.2,0,0), new Angles(-this.direction/50,0,0), new Angles(0,0,0), true, true, 0.12, 0.008);
    this.forceFrameCount = 30;
    this.setMovement("poleSwinging");
  }
  preventFall(edgeSide){
    this.stopPlayerAll();
    let edgeCoords = (edgeSide == "leftEdge") ? new Coordinates(this.limits.leftEdge, this.limits.bottom) : (edgeSide == "rightEdge") ? new Coordinates(this.limits.rightEdge, this.limits.bottom) : new Coordinates((this.limits.rightEdge + this.limits.leftEdge)/2, this.limits.bottom);
    this.anchor = new Anchor(new Coordinates(edgeCoords.x - (edgeSide == "leftEdge" || edgeSide == "rightEdge" ? this.direction*this.body.bodySize/2 : 0), edgeCoords.y - this.body.bodySize/2),"", null);
    this.forceFrameCount = (this.forceFrameCount != 0) ? this.forceFrameCount : 10;
    this.setMovement("edgePreventFall");
  }
  prepareHopForward(){
    if(this.currentAction == "running"){
      if(this.currentPositionIndex == 0)
        this.sideSwitch = true;
      let edgeCoords = new Coordinates(this.direction == 1 ? this.limits.rightEdge : this.limits.leftEdge, this.limits.bottom);
      this.anchor = new Anchor(new Coordinates(edgeCoords.x - this.direction*this.body.bodySize/2, edgeCoords.y - this.body.bodySize/2),"", null);
    }
    this.setMovement("hoppingForwardJumping");
  }
  hopForward(){
    this.anglesOffsets = new PlayerAngles(new Angles(0,0,0), new Angles(0,0,0), new Angles(0,0,0), false, false, 0, 0);
    let standPoint = this.limits.reachableBlockStandingPoint;
    this.nextPositionKeyFrame.anchor = null;
    this.currentPosition.anchor = null;
    // Calculating how many frames are needed to reach the next standPoint as well as the curve settings for the transition
    let dist = DistBetweenCoords(this.coordinates, standPoint.coordinates) - settings.hoppingDistMin;
    this.forceFrameCount = Math.round(Math.max(dist/settings.hoppingDistPerFrame, 2));
    let anchorFpsOffsets = new Coordinates(0,-Math.max(0,dist)*0.3);
    // Setting the anchor
    this.anchor = new Anchor(new Coordinates(standPoint.coordinates.x + (standPoint.type == "idling" ? this.direction*this.body.bodySize/2 : 0), standPoint.coordinates.y - this.body.bodySize/2),"", anchorFpsOffsets);
    this.setMovement("hoppingForwardLanding");
  }
  edgeHopForward(){
    let standPoint = this.limits.reachableBlockStandingPoint;
    this.nextPositionKeyFrame.anchor = null;
    this.currentPosition.anchor = null;
    // Calculating how many frames are needed to reach the next standPoint as well as the curve settings for the transition
    let dist = DistBetweenCoords(this.coordinates, standPoint.coordinates) - settings.hoppingDistMin;
    this.forceFrameCount = Math.round(Math.max(dist/settings.hoppingDistPerFrame, 2));
    let anchorFpsOffsets = new Coordinates(0,-Math.max(0,dist)*0.3);
    // Setting the anchor
    this.anchor = new Anchor(new Coordinates(standPoint.coordinates.x + (standPoint.type == "idling" ? this.direction*this.body.bodySize/2 : 0), standPoint.coordinates.y - this.body.bodySize/2),"", anchorFpsOffsets);
    this.setMovement("hoppingForwardLanding");
  }
  tryClimbAnything(){
    if(this.canClimbRope(null)){
      this.climbRope();
    }
    else if(this.canClimbLadder(null)){
      this.climbLadder();
    }
    else if(this.canClimbEdge(null)){
      this.climbEdge();
    }
  }
  draw(context){
    if(debugMode){  // drawing player limits
      context.fillStyle = "hsla(30, 100%, 50%, 0.2)";
      context.fillRect(0,0,this.limits.left,level.levelLimits.height); // left limit
      context.fillRect(this.limits.right,0,level.levelLimits.width - this.limits.right,level.levelLimits.height); // rigth limit
      context.fillRect(0,this.limits.bottom,level.levelLimits.width,level.levelLimits.height - this.limits.bottom); // bottom limit
      context.fillRect(0,0,level.levelLimits.width,this.limits.top); // top limit
      context.fillStyle = "hsla(30, 100%, 50%, 1)";
      context.beginPath();
      context.arc(this.limits.left, this.limits.leftTop, 5, 0, Math.PI*2, false);
      context.fill();
      context.beginPath();
      context.arc(this.limits.right, this.limits.rightTop, 5, 0, Math.PI*2, false);
      context.fill();
      context.beginPath();
      context.arc(this.limits.leftEdge, this.limits.bottom, 5, 0, Math.PI*2, false);
      context.fill();
      context.beginPath();
      context.arc(this.limits.rightEdge, this.limits.bottom, 5, 0, Math.PI*2, false);
      context.fill();
      context.beginPath();
      context.arc(this.coordinates.x, this.coordinates.y, 5, 0, Math.PI*2, false);
      context.fillStyle = "blue";
      context.fill();
      if(this.forcePathSettings != null){
        context.strokeStyle = "hsla(30, 100%, 50%, 1)";
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(this.forcePathSettings.startCoords.x,this.forcePathSettings.startCoords.y);
        context.lineTo(this.forcePathSettings.endCoords.x,this.forcePathSettings.endCoords.y);
        context.stroke();
      }
      if(this.limits.usableLadder != null){
        context.fillStyle = "hsla(120, 100%, 25%, 0.2)";
        context.fillRect(this.limits.usableLadder.xLeft,this.limits.usableLadder.yTop,this.limits.usableLadder.xRight-this.limits.usableLadder.xLeft,this.limits.usableLadder.yBottom-this.limits.usableLadder.yTop); // left limit
      }
      if(this.limits.usableRope != null){
        context.strokeStyle = "green";
        context.lineWidth = 3;
        context.beginPath();
        context.moveTo(this.limits.usableRope.anchorLeft.x,this.limits.usableRope.anchorLeft.y);
        context.lineTo(this.limits.usableRope.anchorRight.x,this.limits.usableRope.anchorRight.y);
        context.stroke();
      }
    }
    this.body.draw(context);
    }
    drawRough(context){
    this.body.drawRough(pgRough);
    }
}
