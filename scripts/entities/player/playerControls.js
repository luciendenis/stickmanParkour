// This is used to manage controls on the player
class PlayerControls {
  constructor() {
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.jump = false;
    this.punch = false;
    this.kick = false;
    this.grab = false;
    this.guard = false;
    this.parkour = false;
    this.lockedControls = [];
  }
  set(keys, down){
    let action = false;
    for(let i = 0; i < keys.length; i++){
      if(!this.lockedControls.includes(keys[i])){
        switch (keys[i]) {
          case "jump":
            this.jump = down;
            action = true;
            break;
          case "parkour":
            this.parkour = down;
            if(!action && !down) action = true;
            break;
          case "up":
            this.up = down;
            action = true;
            break;
          case "down":
            this.down = down;
            action = true;
            break;
          case "left":
            this.left = down;
            action = true;
            break;
          case "right":
            this.right = down;
            action = true;
            break;
          case "punch":
            this.punch = down;
            if(!action && !down) action = true;
            break;
          case "kick":
            this.kick = down;
            if(!action && !down) action = true;
            break;
          case "grab":
            this.grab = down;
            if(!action && !down) action = true;
            break;
          case "guard":
            this.guard = down;
            action = true;
            break;
          default:
          break;
        }
      }
    }
    return action;
  }
  forceTemp(name, down, timer){
    if(!this.lockedControls.includes(name)){
      this.lockedControls.push(name);
    }
    switch (name) {
      case "jump":  this.jump = down; break;
      case "up":    this.up = down; break;
      case "down":  this.down = down; break;
      case "left":  this.left = down; break;
      case "right": this.right = down; break;
      case "punch": this.punch = down; break;
      case "kick":  this.kick = down; break;
      case "grab":  this.grab = down; break;
      case "guard":  this.guard = down; break;
      case "parkour":  this.parkour = down; break;
    }
    setTimeout(() => {
      this.release(name);
    }, timer);
  }
  release(name){
    if(this.lockedControls.includes(name)){
      this.lockedControls.splice(this.lockedControls.indexOf(name),1);
    }
    switch (name) {
      case "jump":  this.jump = GetKeyStatus(name); break;
      case "up":    this.up = GetKeyStatus(name); break;
      case "down":  this.down = GetKeyStatus(name); break;
      case "left":  this.left = GetKeyStatus(name); break;
      case "right": this.right = GetKeyStatus(name); break;
      case "punch": this.punch = GetKeyStatus(name); break;
      case "kick":  this.kick = GetKeyStatus(name); break;
      case "grab":  this.grab = GetKeyStatus(name); break;
      case "guard":  this.guard = GetKeyStatus(name); break;
      case "parkour":  this.parkour = GetKeyStatus(name); break;
    }
  }
  killAllControls(){
    this.set(["jump", "up", "down", "left", "right", "punch", "kick", "grab", "guard", "parkour"], false);
  }
}

// We add prototypes relative to the controls to the player
Player.prototype.setControls = function(keys, down){
  let action = this.controls.set(keys, down);
  if(action)
    this.action();
}
Player.prototype.forceControlTemp = function(name, down, timer){
  this.controls.forceTemp(name, down, timer);
}
Player.prototype.forceControlUntilNextKeyFrame = function(name, down, nextAction){
  let transition = nextAction == null ? null : LoadTransitionConfig(movementTransitionConfigs, this.currentAction, nextAction, this.sideSwitch);
  let forceDuration = 10 + (transition != null && transition.frameCount != null ? transition.frameCount : this.forceFrameCount !== 0 ? this.forceFrameCount : frameInterpolationCountMin)*1000/60;
  this.controls.forceTemp(name, down, forceDuration);
}
Player.prototype.wantsNoDirection = function(){
  return (this.controls.left === this.controls.right);
}
Player.prototype.wantsToKeepDirection = function(){
  return ((this.direction === 1 && this.controls.right && !this.controls.left) || (this.direction === -1 && this.controls.left && !this.controls.right));
}
Player.prototype.wantsToChangeDirection = function(){
  return ((this.direction === -1 && this.controls.right && !this.controls.left) || (this.direction === 1 && this.controls.left && !this.controls.right));
}
Player.prototype.killAllControls = function(){
  this.controls.killAllControls();
}
Player.prototype.isInFightMode = function(){
    return this.controls.punch || this.controls.kick  || this.controls.grab || this.controls.guard;
}
