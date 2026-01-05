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
    console.log("Fight Action: " + this.currentAction + ", callback: " + callback);
    if(callback){
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
        let sideSwitch = (previousDirection !== nextDirection);

        if(this.controls.guard){
            let guardMove = "guard";
            if(this.controls.up && !this.controls.down){ guardMove += "Jump"; }
            else if(this.controls.down && !this.controls.up){
                if(this.currentAction === "guard" && !this.wantsNoDirection()){
                    guardMove += "Roll";
                }
                else{
                    guardMove += "Duck";
                }
            }
            if(!this.wantsNoDirection()){ guardMove += sideSwitch ? "Backwards" : "Forward"; }
            console.log("guard move: " + guardMove);
            if(this.fightActions.length < 2)
                // never change direction while guarding
                this.fightActions.push(new FightAction(guardMove, previousDirection, false));
            this.findNextMovement();
            return;
        }

        let memberSelect = sideSwitch ? (previousAction.startsWith("front") ? "front" : "back") : (previousAction.startsWith("front") ? "back" : "front");
        let type = this.controls.punch ? "Punch" : this.controls.kick ? "Kick" : "";
        let height = (this.wantsNoDirection() ? "" : this.controls.up ? "High" : this.controls.down ? "Low" : "Mid");
        if(type === "" || height === "") return;

        memberSelect += (type === "Punch") ? "Hand" : "Leg";
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
