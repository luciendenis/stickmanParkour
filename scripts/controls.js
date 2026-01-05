// currently pressed control keys
var spacebarDown = false;
var leftKeyDown = false;
var rightKeyDown = false;
var upKeyDown = false;
var downKeyDown = false;
var punchKeyDown = false;
var kickKeyDown = false;
var grabKeyDown = false;
var guardKeyDown = false;
var shiftKeyDown = false;
const delayForMultiKeyPress = 30 // delay in milliseconds to wait for checking a multiple key press
const delayForKeyRelease = 120; // delay in milliseconds to wait for checking if player just pressed a key or if he is holding it
var waitingForMultiKeyPress = false;

function GetKeyStatus(name){
  switch (name) {
    case "jump":  return spacebarDown;
    case "up":    return upKeyDown;
    case "down":  return downKeyDown;
    case "left":  return leftKeyDown;
    case "right": return rightKeyDown;
    case "punch": return punchKeyDown;
    case "kick":  return kickKeyDown;
    case "grab": return grabKeyDown;
    case "guard":  return guardKeyDown;
    case "parkour": return shiftKeyDown;
    default: return false;
  }
}


// Key listeners for controls
window.addEventListener('keydown',
  function(event){
    event.preventDefault();
    event.stopPropagation();
    if(!gameRunning){
      // that is a menu interaction
      let selection = null;
      if(event.code === "Enter") selection = "ENTER";
      else if(event.code === "Escape") selection = "ESC";
      else if(event.code === "KeyR") selection = "R";
      if(selection != null) menu.useShortcut(selection);
    }
    if(readyToPlay && gameRunning && !levelEnded){
      let keyList = [];
      // Move controls
      if(!spacebarDown && event.code === "Space"){  // spacebar
        spacebarDown = true;
        keyList.push("jump");
        player.setControls(keyList, true);
      }
      else if(!shiftKeyDown && (event.code === "ShiftLeft" || event.code === "ShiftRight")){  // shift
        shiftKeyDown = true;
        keyList.push("parkour");
        player.setControls(keyList, true);
      }
      else if(!leftKeyDown && event.code === "ArrowLeft"){  // left
        leftKeyDown = true;
        keyList.push("left");
        player.setControls(keyList, true);
      }
      else if(!upKeyDown && event.code === "ArrowUp"){  // up
        upKeyDown = true;
        keyList.push("up");
        player.setControls(keyList, true);
      }
      else if(!rightKeyDown && event.code === "ArrowRight"){  // right
        rightKeyDown = true;
        keyList.push("right");
        player.setControls(keyList, true);
      }
      else if(!downKeyDown && event.code === "ArrowDown"){  // down
        downKeyDown = true;
        keyList.push("down");
        player.setControls(keyList, true);
      }
      // Fight controls
      else if(fightAllowed && !punchKeyDown && event.code === "KeyQ"){ // 'a' on azerty
        punchKeyDown = true;
        keyList.push("punch");
        player.setControls(keyList, true);
      }
      else if(fightAllowed && !kickKeyDown && event.code === "KeyA"){ // 'q' on azerty
        kickKeyDown = true;
        keyList.push("kick");
        player.setControls(keyList, true);
      }
      else if(fightAllowed && !grabKeyDown && event.code === "KeyW"){ // 'z' on azerty
          grabKeyDown = true;
          keyList.push("grab");
          player.setControls(keyList, true);
      }
      else if(fightAllowed && !guardKeyDown && event.code === "KeyS"){ // 's' on azerty
          guardKeyDown = true;
          keyList.push("guard");
          player.setControls(keyList, true);
      }
      else if(event.code === "Escape"){
        PauseGame();
      }
    }
  }
);
window.addEventListener('keyup',
  function(event){
    event.preventDefault();
    event.stopPropagation();
    let keyList = [];
    // Move controls
    if(spacebarDown && event.code === "Space"){  // spacebar
      spacebarDown = false;
      keyList.push("jump");
      player.setControls(keyList, false);
    }
    else if(shiftKeyDown && (event.code === "ShiftLeft" || event.code === "ShiftRight")){  // shift
      shiftKeyDown = false;
      keyList.push("parkour");
      player.setControls(keyList, false);
    }
    else if(leftKeyDown && event.code === "ArrowLeft"){  // left
      leftKeyDown = false;
      keyList.push("left");
      player.setControls(keyList, false);
    }
    else if(upKeyDown && event.code === "ArrowUp"){  // up
      upKeyDown = false;
      keyList.push("up");
      player.setControls(keyList, false);
    }
    else if(rightKeyDown && event.code === "ArrowRight"){  // right
      rightKeyDown = false;
      keyList.push("right");
      player.setControls(keyList, false);
    }
    else if(downKeyDown && event.code === "ArrowDown"){  // down
      downKeyDown = false;
      keyList.push("down");
      player.setControls(keyList, false);
    }
    // Fight controls
    else if(fightAllowed && punchKeyDown && event.code === "KeyQ"){ // 'a' on azerty
      punchKeyDown = false;
      keyList.push("punch");
      player.setControls(keyList, false);
    }
    else if(fightAllowed && kickKeyDown && event.code === "KeyA"){ // 'q' on azerty
      kickKeyDown = false;
      keyList.push("kick");
      player.setControls(keyList, false);
    }
    else if(fightAllowed && grabKeyDown && event.code === "KeyW"){ // 'z' on azerty
        grabKeyDown = false;
        keyList.push("grab");
        player.setControls(keyList, false);
    }
    else if(fightAllowed && guardKeyDown && event.code === "KeyS"){ // 's' on azerty
        guardKeyDown = false;
        keyList.push("guard");
        player.setControls(keyList, false);
    }
  }
);
