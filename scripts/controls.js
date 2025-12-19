// currently pressed control keys
var spacebarDown = false;
var leftKeyDown = false;
var rightKeyDown = false;
var upKeyDown = false;
var downKeyDown = false;
var punchKeyDown = false;
var kickKeyDown = false;
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
      if(event.keyCode == 13) selection = "ENTER";
      else if(event.keyCode == 27) selection = "ESC";
      else if(event.keyCode == 82) selection = "R";
      if(selection != null) menu.useShortcut(selection);
    }
    if(readyToPlay && gameRunning && !levelEnded){
      let keyList = [];
      if(!spacebarDown && event.keyCode == 32){  // spacebar
        spacebarDown = true;
        keyList.push("jump");
        player.setControls(keyList, true);
      }
      else if(!shiftKeyDown && event.keyCode == 16){  // shift
        shiftKeyDown = true;
        keyList.push("parkour");
        player.setControls(keyList, true);
      }
      else if(!leftKeyDown && event.keyCode == 37){  // left
        leftKeyDown = true;
        keyList.push("left");
        player.setControls(keyList, true);
      }
      else if(!upKeyDown && event.keyCode == 38){  // up
        upKeyDown = true;
        keyList.push("up");
        player.setControls(keyList, true);
      }
      else if(!rightKeyDown && event.keyCode == 39){  // right
        rightKeyDown = true;
        keyList.push("right");
        player.setControls(keyList, true);
      }
      else if(!downKeyDown && event.keyCode == 40){  // down
        downKeyDown = true;
        keyList.push("down");
        player.setControls(keyList, true);
      }
      else if(!punchKeyDown && event.keyCode == 65){ // 'a'
        punchKeyDown = true;
        keyList.push("punch");
        player.setControls(keyList, true);
      }
      else if(!kickKeyDown && event.keyCode == 81){ // 'q'
        kickKeyDown = true;
        keyList.push("kick");
        player.setControls(keyList, true);
      }
      else if(event.keyCode == 27){
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
    if(spacebarDown && event.keyCode == 32){  // spacebar
      spacebarDown = false;
      keyList.push("jump");
      player.setControls(keyList, false);
    }
    else if(shiftKeyDown && event.keyCode == 16){  // left
      shiftKeyDown = false;
      keyList.push("parkour");
      player.setControls(keyList, false);
    }
    else if(leftKeyDown && event.keyCode == 37){  // left
      leftKeyDown = false;
      keyList.push("left");
      player.setControls(keyList, false);
    }
    else if(upKeyDown && event.keyCode == 38){  // up
      upKeyDown = false;
      keyList.push("up");
      player.setControls(keyList, false);
    }
    else if(rightKeyDown && event.keyCode == 39){  // right
      rightKeyDown = false;
      keyList.push("right");
      player.setControls(keyList, false);
    }
    else if(downKeyDown && event.keyCode == 40){  // down
      downKeyDown = false;
      keyList.push("down");
      player.setControls(keyList, false);
    }
    else if(punchKeyDown && event.keyCode == 65){ // 'a'
      punchKeyDown = false;
      keyList.push("punch");
      player.setControls(keyList, false);
    }
    else if(kickKeyDown && event.keyCode == 81){ // 'q'
      kickKeyDown = false;
      keyList.push("kick");
      player.setControls(keyList, false);
    }
  }
);
