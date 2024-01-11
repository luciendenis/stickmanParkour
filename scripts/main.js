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

const frameInterpolationCount = 6;
const frameInterpolationCountMin = 14;
var currentFrame = 0;
var settings;
var gearsCurrentState;
var player;
var level;
var currentLevelName;
var globalScale;
var debugMode = true;
var roughMode = true;
var progressiveDrawMode = false;
var progressiveDraw = null;
var readyToPlay = false;
var drawPlayer = true;


// Start and animate
function Init(){
  //globalScale = 0.4;
  currentLevelName = "level0";
  globalScale = GetScaleFromLevel(LoadConfig(levelConfigs, currentLevelName), lvlCanvas.width/dpr, lvlCanvas.height/dpr);
  settings = AdaptSettingsToScale(LoadConfig(settingsConfigs,"default"),globalScale);
  gearsCurrentState = new GearsState(AdaptGearSettingsToScale(LoadConfig(propsConfigs,"gear"), globalScale));
  level = AdaptLevelToScale(LoadConfig(levelConfigs, currentLevelName), lvlCanvas.width/dpr, lvlCanvas.height/dpr, globalScale);
  if(roughMode){
    if(progressiveDrawMode){
      progressiveDraw = new ProgressiveDraw(lvlRough,1);
      level.giveProgressiveDrawInstructions(progressiveDraw);
    }
    else{
      level.drawRough(lvlRough);
    }
  }
  else{
    level.draw(lvlContext);
  }
  level.createDoor("spawn");
  bodyConfig = LoadConfig(bodyConfigs,"default");
  player = new Player(new Body(new Coordinates(0,0), new Angles(0,1,null),globalScale,bodyConfig), level.spawn);
  animate();
}

function Respawn(){
  readyToPlay = false;
  drawPlayer = true;
  level.door = null;
  level.createDoor("spawn");
  level.resetCollectibles();
  player.reset(level.spawn);
}

function Die(){
  Respawn();
}

function animate(){
  currentFrame++;
  currentFrame = currentFrame%60;
  requestAnimationFrame(animate);
  // var t0 = performance.now();
  if(progressiveDraw != null){
    progressiveDraw.update();
    if(progressiveDraw.done()){
      progressiveDraw = null;
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
  // var t1 = performance.now();
  // console.log(t1 - t0 + " ms");
}

// get contextes
function GetCanvasContext(){
  return lvlContext;
}
function GetRoughContext(){
  return lvlRough;
}

Init();
