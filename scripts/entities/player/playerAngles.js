class PlayerAngles {
  constructor(angles, angularSpeed, angularAcceleration, gravityAffected, controlAffected, friction) {
    this.angles = angles;
    this.angularSpeed = angularSpeed;
    this.angularAcceleration = angularAcceleration;
    this.gravityAffected = gravityAffected;
    this.controlAffected = controlAffected;
    this.friction = friction;
    this.directionSwitch = false;
  }
  update(control){
    let factor = 1/200;
    let controlAcceleration =  this.controlAffected ? 0.1*factor*(control == null ? 0 : control == "right" ? -1 : 1) : 0;
    let gravityAcceleration = this.gravityAffected ? Math.cos(this.angles.xy + Math.PI/2)*settings.gravity*factor : 0;
    let nextAngularSpeed = (this.angularSpeed.xy + this.angularAcceleration.xy + gravityAcceleration + controlAcceleration)*(1 - this.friction);
    this.directionSwitch = (nextAngularSpeed*this.angularSpeed.xy < 0);
    this.angularSpeed.xy = nextAngularSpeed;
    this.angles.xy += this.angularSpeed.xy;
    if(this.angles.xy > Math.PI) this.angles.xy -= 2*Math.PI;
    else if(this.angles.xy < -Math.PI) this.angles.xy += 2*Math.PI;
  }
  exitVelocityCoords(){
    let totalExitSpeed = this.angularSpeed.xy*60;
    let exitAngle = this.angles.xy + (this.angularSpeed.xy > 0 ? 1 : 0)*(Math.PI);
    return new Coordinates(totalExitSpeed*Math.sin(exitAngle), -totalExitSpeed*Math.cos(exitAngle));
  }
}
