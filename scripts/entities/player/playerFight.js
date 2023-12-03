// This is used to manage fighting actions for a player
class FightAction {
  constructor(action, direction, sideSwitch, transition) {
    this.action = action;         // next action
    this.direction = direction;   // next direction
    this.sideSwitch = sideSwitch; // is there a sideSwitch
    this.transition = transition; // transition to apply (can be null)
  }
}



// We add prototypes relative to the fighting actions to the player
Player.prototype.fightAction = function(callback){
  if(callback){
    let type = this.controls.punch ? "Punch" : this.controls.kick ? "Kick" : "";
    let height = (this.wantsNoDirection() ? "" : this.controls.up ? "High" : this.controls.down ? "Low" : "Mid");
    if(type == "" || height == "") return;
    let previousDirection;
    let previousAction;
    if(this.fightActions.length > 0){
      let latestFightAction = this.fightActions[this.fightActions.length - 1];
      previousAction = latestFightAction.action;
      previousDirection = latestFightAction.direction;
    }
    else{
      previousAction = this.currentAction;
      previousDirection = this.direction;
    }
    let nextDirection = this.controls.right ? 1 : this.controls.left ? -1 : previousDirection;
    console.log("PreviousAction : " + previousAction + ", LeftKeyDown ? " + this.controls.left + ", RightKeyDown ? " + this.controls.right + ", PreviousDirection : " + previousDirection + ", NextDirection : " + nextDirection);
    let sideSwitch = (previousDirection != nextDirection);

    let memberSelect = sideSwitch ? (previousAction.startsWith("front") ? "front" : "back") : (previousAction.startsWith("front") ? "back" : "front");
    memberSelect += (type == "Punch") ? "Hand" : "Leg";
    type = memberSelect + type + height;  // this is the name of the next movement
    if(this.fightActions.length < 2)
      this.fightActions.push(new FightAction(type, nextDirection, sideSwitch));

    switch (this.currentAction) {
      case "frontHandPunchMid":
      case "frontHandPunchHigh":
      case "frontHandPunchLow":
      case "backHandPunchMid":
      case "backHandPunchHigh":
      case "backHandPunchLow":
        break;
      case "idling":
        this.findNextMovement();
        break;
      default:
      break;
    }

  }
  else if(!waitingForMultiKeyPress){
    waitingForMultiKeyPress = true;
    setTimeout(() => {
      waitingForMultiKeyPress = false;
      this.fightAction(true);
    }, delayForMultiKeyPress);
  }
}
