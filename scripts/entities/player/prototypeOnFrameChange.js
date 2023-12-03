// This file must be loaded after class Player declared player.js
// this is where we check what the next action should be based on player input and movement parameter
// this one is triggered every frame
Player.prototype.checkForNextActionOnFrameChange = function(){
  switch(this.currentAction){
    case "crouchTurning":
    case "crouching":
      if(this.controls.down && this.canClimbDownLadder(null)){
        this.climbDownLadder();
      }
      else if(this.wantsToKeepDirection()){
        if((this.direction == 1 && this.coordinates.x + this.body.hitBox.right >= this.limits.rightEdge) || (this.direction == -1 && this.coordinates.x + this.body.hitBox.left <= this.limits.leftEdge)){
          this.stopPlayerXAxis();
          this.coordinates.x = (this.direction == 1) ? this.limits.rightEdge - this.body.hitBox.right : this.limits.leftEdge - this.body.hitBox.left;
        }
        else{
          if(this.forcePathSettings == null){
            this.velocity.x = this.direction*settings.crouchingDistPerFrame/settings.crouchingFrameCount;
          }
        }
      }
      this.forceFrameCount = settings.crouchingFrameCount;
      if(this.forcePathSettings == null && this.anchor == null){
        if(this.coordinates.x + this.body.hitBox.right > this.limits.rightEdge){
          this.coordinates.x = this.limits.rightEdge - this.body.hitBox.right;
        }
        else if(this.coordinates.x + this.body.hitBox.left < this.limits.leftEdge){
          this.coordinates.x = this.limits.leftEdge - this.body.hitBox.left;
        }
      }
    break;
    case "crouchSliding":
      // speed check
      if(this.velocity.x*this.direction <= 0){
        this.stopPlayerXAxis();
      }
      else{
        this.acceleration.x = -settings.accelerationX*settings.crouchSlidingAccelerationFactor*this.direction;
      }
      // action check
      if(!this.inTransition){
        if(this.controls.up && (this.coordinates.y - this.limits.top) > this.body.standDimensions().y){
          this.setMovement("running");
        }
        else if(this.controls.down){
          if(this.canClimbDownLadder(null)){
            this.climbDownLadder();
          }
          else if(this.canClimbDownEdge(null)){
            this.climbDownEdge();
          }
        }
        else if(Math.abs(this.velocity.x) < settings.crouchingDistPerFrame/settings.crouchingFrameCount && this.wantsToKeepDirection()){
            this.setMovement("crouchTurning");
        }
        else if(this.velocity.x == 0 && this.wantsToChangeDirection()){
          this.direction *=-1;
          this.setMovement("crouching");
        }
      }
    break;
    case "edgeClimbing":
    break;
    case "idling":
      if((this.previousAction == "running" || this.previousAction == "stopping") && Math.abs(this.velocity.x) > 0){
        let edgeSide = this.isOverEdge(this.coordinates);
        if((edgeSide == "leftEdge" && this.direction == -1 && !this.obstacleLeft(this.coordinates)) || (edgeSide == "rightEdge" && this.direction == 1 && !this.obstacleRight(this.coordinates))){
          this.preventFall(edgeSide);
        }
      }
      if(!this.inTransition && this.forcePathSettings == null){
        if(this.wantsToKeepDirection()){
          this.setMovement(((this.controls.left && this.obstacleLeft(this.coordinates)) || this.controls.right && this.obstacleRight(this.coordinates)) ? "idling" : "running");
        }
        else if(this.wantsToChangeDirection()){
          this.sideSwitch = true;
          this.direction *= -1;
          this.goIdlingOrRunning(false);
          this.setMovement(null);
        }
      }
    break;
    case "running":
      if(this.velocity.x*this.direction < 0){
        this.velocity.x = 0;
      }
      if(Math.abs(this.velocity.x) < settings.minVelocityX && this.coordinates.y >= this.limits.bottom - settings.roundTolerance){
        this.velocity.x = this.direction*settings.minVelocityX;
      }
      if(this.controls.up){ // player wants to climb on something
        this.tryClimbAnything();
      }
      else if(this.controls.down){
        if(this.canClimbDownLadder(null)){
          this.climbDownLadder();
        }
      }
      else if(this.edgeAhead(this.coordinates) && this.isOnBlock(this.coordinates)){
        if(this.canHopForward(null) || this.canReachHoldForward(null)){
          this.prepareHopForward();
        }
      }
      else if(this.wantsToKeepDirection() && this.forcePathSettings == null){
        if(this.obstacleAhead(this.coordinates)){
          this.acceleration.x = 0; // stop accelerating
          if(this.canClimbEdge(null)){  // player wants to climb
            let height = this.body.coordinates.y - this.limits.usableHold.coordinates.y;
            let indexFor = this.giveEdgeClimbingPositionIndexStartForHeight(height);
            if(this.controls.up || (this.limits.usableHold.blockIndex > -1 && this.giveEdgeClimbingPositionIndexStartForHeight(height) >= 1))
              this.climbEdge();
            else{
              this.setMovement("idling");
            }
          }
          else{
            this.setMovement("idling");
          }
        }
        else if(this.crossableObstacleAhead(this.coordinates)){
          this.stopPlayerYAxis();
          let edgeCoords = this.direction == 1 ? new Coordinates(this.limits.right + settings.roundTolerance, this.limits.rightTop - settings.roundTolerance) : new Coordinates(this.limits.left - settings.roundTolerance, this.limits.leftTop - settings.roundTolerance);
          let framesCount = Math.min(frameInterpolationCountMin,Math.ceil(Math.abs(DistBetweenCoords(this.coordinates, edgeCoords)/this.velocity.x)));
          this.forcePathSettings = new ForcePathSettings(this.coordinates.clone(), edgeCoords, framesCount, true, null, null);
          console.log(JSON.stringify(this.forcePathSettings));
        }
      }
    break;
    case "stopping":
      if(this.controls.down){
        if(this.canClimbDownLadder(null)){
          this.climbDownLadder();
        }
      }
      else if(!this.inTransition && this.wantsToKeepDirection()){  // resume running
        this.setMovement("running");
      }
      else if(Math.abs(this.velocity.x) < settings.minVelocityForStopping){
        let edgeSide = this.isOverEdge(this.coordinates);
        if((edgeSide == "leftEdge" && this.direction == -1 && !this.obstacleLeft(this.coordinates)) || (edgeSide == "rightEdge" && this.direction == 1 && !this.obstacleRight(this.coordinates))){
          this.preventFall(edgeSide);
        }
      }
    break;
    case "jumping":
      if(this.controls.up){ // player wants to climb on something
        this.tryClimbAnything();
      }
      else if(this.controls.down){
        if(this.canClimbDownLadder(null)){ // case there is a ladder
          this.climbDownLadder();
        }
      }
      if(this.readyToJump && this.currentPositionIndex > 0){
        let nextCoordinates = new Coordinates(this.coordinates.x + this.currentPosition.offsets["position"].x + this.velocity.x*this.currentFrameCount, this.coordinates.y);
        if(this.direction == 1 && this.obstacleRight(nextCoordinates)){
          this.forceFrameCount = Math.floor((this.limits.right - this.coordinates.x - this.body.hitBox.right)/this.velocity.x);
          this.setMovement("wallPrepareJumping");
        }
        else if(this.direction == -1 && this.obstacleLeft(nextCoordinates)){
          this.forceFrameCount = Math.floor((this.limits.left - this.coordinates.x - this.body.hitBox.left)/this.velocity.x);
          this.setMovement("wallPrepareJumping");
        }
      }
    break;
    case "wallPrepareJumping":
      if(this.coordinates.y < this.limits.bottom && this.velocity.y > 0){
        this.readyToJump = false;
        this.setMovement("falling");
      }
      else if(this.coordinates.y >= this.limits.bottom){
        this.readyToJump = false;
        this.setMovement("running");
      }
    break;
    case "wallClimbing":
      if(this.velocity.y > 0){
        this.sideSwitch = true;
        this.setMovement("falling");
      }
      else if(this.controls.up && this.canClimbEdge(null)){
        this.climbEdge();
      }
    break;
    case "wallClimbingFront":
      if(this.velocity.y > 0){
        this.anchor = null;
        this.anglesOffsets = new Angles(0,0,0);
        this.switchDrawStartJunction("hitboxbottom");
        this.setMovement("falling");
      }
      else if(this.controls.up && this.canClimbEdge(null)){
        this.climbEdge();
      }
    break;
    case "falling":
      this.acceleration.x = 0;
      this.readyToJump = false;
      if(this.controls.up){ // player wants to climb on something
        this.tryClimbAnything();
      }
      else if (this.controls.down){
        if(this.canClimbDownLadder(null)){ // case there is a ladder
          this.climbDownLadder();
        }
      }
      if(this.coordinates.y + 30*this.velocity.y >= this.limits.bottom){  // going to hit the floor in 30 frames or less
        this.crouchFactor = 1 - .02*this.velocity.y; // the harder the fall, the greater crouchFactor on landing
        if(Math.abs(this.velocity.x) < settings.minVelocityForStopping){
          let frameCount = 0;
          let nextY = this.coordinates.y;
          let nextDY = this.velocity.y;
          while(nextY < this.limits.bottom && frameCount <= 60){
            nextDY += this.acceleration.y;
            nextY += nextDY;
            frameCount++;
          }
          this.forceFrameCount = frameCount;
          let wideEnough = IsBlockWideEnough(level, this.limits.currentBlockIndex, this, true);
          if(this.wantsNoDirection()){
            if(!wideEnough){
              this.crouchFactor -= .02*this.velocity.y; // landing on one foot, crouching more
              this.preventFall("middle");
            }
            else{
              let edgeSide = this.isOverEdge(new Coordinates(this.coordinates.x, this.limits.bottom));
              if((edgeSide == "leftEdge" && this.direction == -1 && !this.obstacleLeft(this.coordinates)) || (edgeSide == "rightEdge" && this.direction == 1 && !this.obstacleRight(this.coordinates))){
                this.preventFall(edgeSide);
              }
              else{
                this.setMovement("idling");
              }
            }
          }
          else{
            if(!wideEnough){
              this.crouchFactor -= .02*this.velocity.y; // landing on one foot, crouching more
              if(this.wantsToChangeDirection()){
                this.direction *= -1;
                this.sideSwitch = true;
              }
              this.preventFall("middle");
            }
            else{
              if(this.wantsToChangeDirection()){
                this.direction *= -1;
                this.sideSwitch = true;
              }
              this.setMovement("running");
            }
          }
        }
        else{
          if((this.velocity.x > settings.minVelocityX && this.controls.left) || (this.velocity.x < -settings.minVelocityX && this.controls.right)){
            let ds = Math.min(Math.abs(this.velocity.x), settings.accelerationX*settings.stoppingAccelerationFactor);
            this.acceleration.x = -ds * this.direction;
            this.setMovement("stopping");
          }
          else{
            this.setMovement("running");
          }
        }
      }
    break;
    case "wallJumping":
    break;
    case "ladderDownSliding":
      if(this.forcePathSettings != null){
        this.stopPlayerAll();
      }
      else{
        this.velocity.x = 0;
        this.coordinates.x = this.limits.usableLadder.xMiddle;
        if(this.coordinates.y >= this.limits.usableLadder.yBottom){ // at the bottom of the ladder
          if(this.controls.left){
            this.direction = -1;
            this.setMovement("running");
          }
          else if(this.controls.right){
            this.direction = 1;
            this.setMovement("running");
          }
          else{
            this.setMovement("idling");
          }
        }
        if(!this.controls.down){
          if(this.velocity.y > 0){
            this.acceleration.y = settings.ladderDeceleration;
          }
          else{
            this.stopPlayerYAxis();
          }
        }
        else{
          if(this.velocity.y >= settings.ladderDownSlidingSpeed){
            this.acceleration.y = 0;
          }
          else{
            this.acceleration.y = settings.gravity;
          }
        }
        if(this.controls.up && this.velocity.y <= 0){
          this.acceleration.x = 0;
          this.velocity.y = settings.ladderClimbSpeed;
          this.forceFrameCount = frameInterpolationCountMin;
          this.setMovement("ladderClimbing");
        }
      }
    break;
    case "ladderClimbing":
      if(this.forcePathSettings == null){
        this.stopPlayerXAxis();
      }
      if(this.controls.up && this.limits.usableLadder != null){
        let bodyCenterY = this.coordinates.y + this.body.getOffsetCoords("relative", this.currentPosition.drawStartJunction).y;
        let bodyCenterNextY = bodyCenterY + settings.ladderClimbSpeed*this.currentFrameCount;
        if(bodyCenterY > this.limits.usableLadder.yTop && bodyCenterNextY < this.limits.usableLadder.yTop){
          if(this.limits.usableLadder.yTop - this.body.hitBox.totalHeight() > this.limits.top){ // climb only if body can stand on top of ladder
            this.anchor = new Anchor(new Coordinates(this.limits.usableLadder.xMiddle, this.limits.usableLadder.yTop - this.body.bodySize/2),"", null);
            this.forcePositionIndex = 1;
            this.setMovement("edgeClimbing");
          }
        }
      }
    break;
    case "ropeDownSliding":
      if(!this.inTransition){
        if(this.coordinates.x + this.velocity.x < this.limits.usableRope.anchorLeft.x || this.coordinates.x + this.velocity.x > this.limits.usableRope.anchorRight.x){ // getting out of rope
          this.stopPlayerAcceleration();
          this.forceFrameCount = frameInterpolationCountMin;
          this.fallFromAnchor(null);
        }
        else{ // still on the rope
          let futureXLimit = this.coordinates.x + this.velocity.x*15 + (this.direction == 1 ? this.body.hitBox.right : this.body.hitBox.left);
          let goingToHitAWall = (this.direction == 1 && futureXLimit > this.limits.right) || (this.direction == -1 && futureXLimit < this.limits.left);
          if(!goingToHitAWall && ((this.direction == 1 && this.controls.right) || (this.direction == -1 && this.controls.left))){ // keep sliding
            let atMaxSpeed = (Math.abs(this.velocity.x) > this.limits.usableRope.speedFactors.x*settings.ropeDownSlidingSpeed);
            this.acceleration.x = atMaxSpeed ? 0 : this.direction * settings.gravity*this.limits.usableRope.speedFactors.x;
            this.acceleration.y = atMaxSpeed ? 0 : -this.direction * settings.gravity*this.limits.usableRope.speedFactors.y;
          }
          else if((this.direction == 1 && this.velocity.x > 0) || (this.direction == -1 && this.velocity.x < 0)){ // keep sliding but decelerating
            this.acceleration.x = this.direction * settings.ropeDeceleration*this.limits.usableRope.speedFactors.x;
            this.acceleration.y = -this.direction * settings.ropeDeceleration*this.limits.usableRope.speedFactors.y;
          }
          else if((this.direction == 1 && this.velocity.x <= 0) || (this.direction == -1 && this.velocity.x >= 0)){ // stop sliding
            this.stopPlayerAll();
            if(this.wantsToChangeDirection()){
              let nextX = this.coordinates.x + this.direction*-1*settings.ropeClimbingDistPerFrame*this.limits.usableRope.speedFactors.x;
              let nextY = this.coordinates.y + this.direction*-1*settings.ropeClimbingDistPerFrame*this.limits.usableRope.speedFactors.y;
              if(nextX + this.body.hitBox.left < this.limits.left || nextX + this.body.hitBox.right > this.limits.right || nextY + this.body.hitBox.totalHeight() > this.limits.bottom || nextY < this.limits.top){
                this.forceFrameCount = frameInterpolationCountMin;
              }
              else{
                this.direction *= -1;
                this.anglesOffsets = new Angles(-this.limits.usableRope.angle,0,0);
                this.forceFrameCount = frameInterpolationCountMin;
                let xLimit = (this.direction == 1) ? this.limits.usableRope.anchorLeft.x + settings.ropeClimbingEntryOffset*this.limits.usableRope.speedFactors.x : this.limits.usableRope.anchorRight.x - settings.ropeClimbingEntryOffset*this.limits.usableRope.speedFactors.x;
                let nextX = ((this.coordinates.x <= xLimit && this.direction == 1) || (this.coordinates.x >= xLimit && this.direction == -1)) ? xLimit : this.coordinates.x;
                if(nextX != this.coordinates.x){
                  let nextCoords = new Coordinates(nextX,this.limits.usableRope.giveYforX(nextX));
                  this.forcePathSettings = new ForcePathSettings(this.coordinates, nextCoords, this.forceFrameCount, true, null, null);
                }
                this.forcePositionIndex = 1;
                this.setMovement("ropeClimbing");
              }
            }
          }
        }
      }
    break;
    case "ropeCrossing":
      if(this.forcePathSettings == null && (this.controls.left || this.controls.right) && this.freezeFrame){
        let nextDir = (this.controls.left) ? -1 : 1;
        let ffc = (nextDir == this.direction) ? settings.ropeCrossingFrameCount : frameInterpolationCountMin;
        this.direction = nextDir;
        this.forceFrameCount = ffc;
        this.velocity.x = this.direction*(settings.ropeCrossingDistPerFrame/ffc)*this.limits.usableRope.speedFactors.x;
        this.velocity.y = -this.direction*(settings.ropeCrossingDistPerFrame/ffc)*this.limits.usableRope.speedFactors.y;
        this.setMovement(null);
      }
    break;
  }
}
