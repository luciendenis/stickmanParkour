var dpr = window.devicePixelRatio || 1;
const pgCanvas = document.getElementById("playground");
const pgContext = pgCanvas.getContext('2d');
const pgRough = rough.canvas(document.getElementById('playground'));
pgCanvas.width = window.innerWidth*dpr;
pgCanvas.height = window.innerHeight*dpr;
pgContext.scale(dpr,dpr);
const lvlCanvas = document.getElementById("level");
const lvlContext = lvlCanvas.getContext('2d');
const lvlRough = rough.canvas(document.getElementById('level'));
lvlCanvas.width = window.innerWidth*dpr;
lvlCanvas.height = window.innerHeight*dpr;
lvlContext.scale(dpr,dpr);
const coverCanvas = document.getElementById("cover");
const coverContext = coverCanvas.getContext('2d');
const coverRough = rough.canvas(document.getElementById('cover'));
coverCanvas.width = window.innerWidth*dpr;
coverCanvas.height = window.innerHeight*dpr;
coverContext.scale(dpr,dpr);
const menu = new Menu();

const frameInterpolationCount = 6;
const frameInterpolationCountMin = 14;
var currentFrame = 0;
var settings;
var gearsCurrentState;
var player;
var level;
var currentLevelName;
var globalScale;
var debugMode = false;
var roughMode = true;
var fightAllowed = false;
var progressiveDrawMode = true;
var progressiveDraw = new ProgressiveDraw(lvlContext, 20);
var readyToPlay = false;
var levelEnded = false;
var drawPlayer = false;
var gameRunning = false;
var playingLevel= false;
var cover = LoadCover();
var timer = new Timer();


// Start and animate
function Init(){
  menu.init();
  menu.displayMenu("main-menu");
  if(roughMode) cover.drawRough(coverRough, coverContext);
  else cover.draw(coverContext);
  animate();
}

function LoadLevel(levelName){
  playingLevel = true;
  pgContext.clearRect(0,0,pgCanvas.width, pgCanvas.height);
  currentLevelName = levelName;
  globalScale = GetScaleFromLevel(LoadConfig(levelConfigs, currentLevelName), lvlCanvas.width/dpr, lvlCanvas.height/dpr);
  settings = AdaptSettingsToScale(LoadConfig(settingsConfigs,"default"),globalScale);
  gearsCurrentState = new GearsState(AdaptGearSettingsToScale(LoadConfig(propsConfigs,"gear"), globalScale));
  level = AdaptLevelToScale(LoadConfig(levelConfigs, currentLevelName), lvlCanvas.width/dpr, lvlCanvas.height/dpr, globalScale);
  if(roughMode){
    if(progressiveDrawMode){
      cover.drawRough(lvlRough, null);
      level.levelLimits.drawRough(lvlRough);
      level.assets.forEach((asset) => {
        asset.object.drawRough(lvlRough);
      });

      progressiveDraw = new ProgressiveDraw(lvlRough,1);
      level.giveProgressiveDrawInstructions(progressiveDraw);
    }
    else{
      level.drawRough(lvlRough);
      level.drawTexts(lvlContext);
    }
  }
  else{
    level.draw(lvlContext);
    level.drawTexts(lvlContext);
  }
  level.createDoor("spawn");
  bodyConfig = LoadConfig(bodyConfigs,"default");
  player = new Player(new Body(new Coordinates(0,0), new Angles(0,1,null),globalScale,bodyConfig), level.spawn);
  drawPlayer = false;
  levelEnded = false;
  readyToPlay = false;
  cover.unveilLevel();
}

function StartLevel(){
  readyToPlay = true;
  timer.reset();
  timer.start();
  menu.showCurrentTimeDiv(true);
}

function Respawn(){
  readyToPlay = false;
  levelEnded = false;
  drawPlayer = false;
  level.door = null;
  level.createDoor("spawn");
  level.resetCollectibles();
  bodyConfig = LoadConfig(bodyConfigs,"default");
  player = new Player(new Body(new Coordinates(0,0), new Angles(0,1,null),globalScale,bodyConfig), level.spawn);
}

function PauseGame(){
  if(playingLevel && gameRunning){
    menu.displayMenu("pause-menu");
    gameRunning = false;
    timer.pause();
  }
}

function ResumeGame(){
  if(playingLevel && !gameRunning){
    menu.displayMenu("");
    gameRunning = true;
    timer.resume();
  }
}

function EndCurrentLevel(){
  if(!levelEnded){
    player.killAllControls();
    player.setMovement("idling");
    player.acceleration = new Coordinates(0,0);
    let coordsToEndDoor = new Coordinates(level.door.coordinates.x - player.coordinates.x, level.door.coordinates.y - player.coordinates.y);
    player.velocity = new Coordinates(coordsToEndDoor.x/frameInterpolationCountMin, coordsToEndDoor.y/frameInterpolationCountMin);
    levelEnded = true;  // preventing player movement
    level.door.nextStatus();
    menu.unlockNextLevel();
  }
}

function Die(){
  Respawn();
}

function animate(){
  timer.updateCurrentTimeDiv();
  if(cover.inTransition){
    cover.update();
    if(roughMode) cover.drawRough(coverRough, coverContext);
    else cover.draw(coverContext);
    requestAnimationFrame(animate);
    return;
  }
  if(levelEnded){
    if(gameRunning && level.door == null){
      menu.displayMenu("level-end-menu");
      gameRunning = false;
      timer.pause();
      menu.showCurrentTimeDiv(false);
    }
    else if (level.door != null){
      // just to avoid player moving away from the door
      if((level.door.coordinates.x - player.coordinates.x)*player.velocity.x < 0){
        player.velocity = new Coordinates(0,0);
      }
    }
  }
  if(!gameRunning){
    requestAnimationFrame(animate);
    return;
  }
  currentFrame++;
  currentFrame = currentFrame%60;
  if(progressiveDraw != null){
    progressiveDraw.update();
    if(progressiveDraw.done()){
      progressiveDraw = null;
      level.drawTexts(lvlContext);
    }
  }
  if(progressiveDraw == null){
    pgContext.clearRect(0,0,pgCanvas.width, pgCanvas.height);
    player.update();
    gearsCurrentState.update();
    if(roughMode){
      level.drawCollectiblesRough(pgRough);
      level.drawDoorRough(pgRough, pgContext);
      if(drawPlayer){
        player.drawRough(pgRough);
      }
      level.drawDoorCurtainRough(pgRough, pgContext);
    }
    else{
      level.drawCollectibles(pgContext);
      level.drawDoor(pgContext);
      if(drawPlayer){
        player.draw(pgContext);
      }
      level.drawDoorCurtain(pgContext);
    }
  }
  requestAnimationFrame(animate);
}

// get contexts
function GetCanvasContext(){
  return lvlContext;
}
function GetRoughContext(){
  return lvlRough;
}

Init();
