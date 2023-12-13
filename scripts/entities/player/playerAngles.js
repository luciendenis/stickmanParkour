class PlayerAngles {
  constructor(angles, angularSpeed, angularAcceleration, gravityAffected, controlAffected, friction) {
    this.angles = angles;
    this.angularSpeed = angularSpeed;
    this.angularAcceleration = angularAcceleration;
    this.gravityAffected = gravityAffected;
    this.controlAffected = controlAffected;
    this.friction = friction;
  }
  update(control){
    let factor = 1/180;
    let controlAcceleration = this.controlAffected ? 0.1*factor*(control == null ? 0 : control == "right" ? -1 : 1) : 0;
    let gravityAcceleration = this.gravityAffected ? Math.cos(this.angles.xy + Math.PI/2)*settings.gravity*factor : 0;
    let nextAngularSpeed = (this.angularSpeed.xy + this.angularAcceleration.xy + gravityAcceleration + controlAcceleration)*(1 - this.friction);
    this.angularSpeed.xy = nextAngularSpeed;
    this.angles.xy += this.angularSpeed.xy;
    if(this.angles.xy > Math.PI) this.angles.xy -= 2*Math.PI;
    else if(this.angles.xy < -Math.PI) this.angles.xy += 2*Math.PI;
  }
  exitVelocityCoords(){
    let totalExitSpeed = this.angularSpeed.xy*60;
    let exitAngle = (this.angularSpeed.xy > 0 ? Math.PI : 0) - this.angles.xy;
    let coords = new Coordinates(Math.abs(totalExitSpeed)*Math.cos(exitAngle), Math.abs(totalExitSpeed)*Math.sin(exitAngle)*(-1));
    //console.log("Angle : " + this.angles.xy + ", AngularSpeed : " + this.angularSpeed.xy + ", exitAngle : " + exitAngle + ", coords(cos,-sin) : " + JSON.stringify(coords));
    return coords;
  }
}
