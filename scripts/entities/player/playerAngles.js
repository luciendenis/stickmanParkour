class PlayerAngles {
  constructor(angles, angularSpeed, angularAcceleration, gravityAffected, controlAffected, controlStrength, friction) {
    this.angles = angles;
    this.angularSpeed = angularSpeed;
    this.angularAcceleration = angularAcceleration;
    this.gravityAffected = gravityAffected;
    this.controlAffected = controlAffected;
    this.controlStrength = controlStrength;
    this.friction = friction;
  }
  update(control){
    const factor = 1/180;
    let controlAcceleration = this.controlAffected ? this.controlStrength*factor*(control == null ? 0 : control == "right" ? -1 : 1) : 0;
    let gravityAcceleration = this.gravityAffected ? Math.cos(this.angles.xy + Math.PI/2)*settings.gravity*factor : 0;
    let nextAngularSpeed = (this.angularSpeed.xy + this.angularAcceleration.xy + gravityAcceleration + controlAcceleration)*(1 - this.friction);
    this.angularSpeed.xy = nextAngularSpeed;
    this.angles.xy += this.angularSpeed.xy;
    if(this.angles.xy > Math.PI) this.angles.xy -= 2*Math.PI;
    else if(this.angles.xy < -Math.PI) this.angles.xy += 2*Math.PI;
  }
  calculateAngularSpeedForNextFrames(frameCount, control){
    const factor = 1/180;
    let nextAnglesXY = this.angles.xy;
    let nextAngularSpeedXY = this.angularSpeed.xy;
    let controlAcceleration = this.controlAffected ? this.controlStrength*factor*(control == null ? 0 : control == "right" ? -1 : 1) : 0;
    for(let i = 0 ; i < frameCount; i++){
      let gravityAcceleration = this.gravityAffected ? Math.cos(nextAnglesXY + Math.PI/2)*settings.gravity*factor : 0;
      nextAngularSpeedXY = (nextAngularSpeedXY + this.angularAcceleration.xy + gravityAcceleration + controlAcceleration)*(1 - this.friction);
      nextAnglesXY += nextAngularSpeedXY;
    }
    return nextAngularSpeedXY;
  }
  exitVelocityCoords(jump){
    let totalExitSpeed = this.angularSpeed.xy*60;
    // if jumping, go straight out to the opposite of the pole, else just keep momentum going
    let jumpAngleOffset = jump ? (this.angularSpeed.xy > 0 ? Math.PI/2 : -Math.PI/2) : 0;
    let exitAngle = (this.angularSpeed.xy > 0 ? Math.PI : 0) - this.angles.xy + jumpAngleOffset;
    let yOffset = -globalScale*(jump ? 8 : 3); // this allows an exit with a bit more of vertical speed
    let coords = new Coordinates(Math.abs(totalExitSpeed)*Math.cos(exitAngle), Math.abs(totalExitSpeed)*Math.sin(exitAngle)*(-1) + yOffset);
    //console.log("Angle : " + this.angles.xy + ", AngularSpeed : " + this.angularSpeed.xy + ", exitAngle : " + exitAngle + ", coords(cos,-sin) : " + JSON.stringify(coords));
    return coords;
  }
  prepareJump(){
    this.controlStrength = 0;
    this.friction = 0;
    this.angularSpeed.xy *= 1.5;
  }
}
