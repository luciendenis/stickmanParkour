class MenuLevel {
  constructor(name, selectable, nextLevel, element) {
    this.name = name;
    this.selectable = selectable;
    this.nextLevel = nextLevel; // can be null
    this.element = element;
    this.bestTime = null;
  }
}

class Menu {
  constructor() {
    this.mainMenuDiv = document.getElementById("main-menu");
    this.levelSelectionMenuDiv = document.getElementById("level-selection-menu");
    this.controlsMenuDiv = document.getElementById("controls-menu");
    this.pauseMenuDiv = document.getElementById("pause-menu");
    this.levelEndMenuDiv = document.getElementById("level-end-menu");
    this.currentTimeDiv = document.getElementById("current-time");
    this.currentTimeDiv.style.display = "none";
    this.levelEndMenuTimeDiv = document.getElementById("end-menu-time");
    this.nextLevelSelectorDiv = document.getElementById("next-level-selector");
    this.bestTimeDiv = document.getElementById("best-time");
    this.allLevels = [];  // array of MenuLevel objects
    this.currentLevelName = null;
    this.currentElementsArray = [];
  }
  init(){
    let that = this;
    let menuSelectors = document.getElementsByClassName("menu-select");
    Array.prototype.forEach.call(menuSelectors, function(item) {
      item.onclick = () => that.displayMenu(item.dataset.destination);
    });
    let levelSelectors = document.getElementsByClassName("level-select");
    Array.prototype.forEach.call(levelSelectors, function(item, index) {
      that.allLevels.push(new MenuLevel(item.dataset.destination, /*index == 0*/ true, null, item));
      item.onclick = () => that.selectLevel(item.dataset.destination);
      item.onmouseover = () => that.showBestTime(item.dataset.destination);
      item.onmouseleave = () => that.hideBestTime();
    });
    for(let i = 0; i < that.allLevels.length - 1; i++){
      that.allLevels[i].nextLevel = that.allLevels[i+1].name;
    }
  }
  showBestTime(levelName){
    let levelMenu = this.allLevels.find(l => l.name == levelName);
    let timeAsString = Timer.millisecondsToString(levelMenu.bestTime);
    this.bestTimeDiv.innerText = "Best time : " + timeAsString;
    this.bestTimeDiv.style.opacity = 1;
  }
  hideBestTime(){
    this.bestTimeDiv.style.opacity = 0;
  }
  unlockNextLevel(){
    let nextLevelName = this.allLevels.find(l => l.name == this.currentLevelName).nextLevel;
    this.nextLevelSelectorDiv.style.display = nextLevelName == null ? "none" : "block";
    let menuLevel = this.allLevels.find(l => l.name == nextLevelName);
    if(menuLevel != null && menuLevel != undefined){
      menuLevel.selectable = true;
      menuLevel.element.classList.add("selectable");
    }
  }
  goToNextLevel(){
    let nextLevelName = this.allLevels.find(l => l.name == this.currentLevelName).nextLevel;
    if(nextLevelName != null) this.selectLevel(nextLevelName);
  }
  displayMenu(name){
    this.mainMenuDiv.style.display = name == "main-menu" ? "block" : "none";
    this.levelSelectionMenuDiv.style.display = name == "level-selection-menu" ? "block" : "none";
    this.controlsMenuDiv.style.display = name == "controls-menu" ? "block" : "none";
    this.pauseMenuDiv.style.display = name == "pause-menu" ? "block" : "none";
    this.levelEndMenuDiv.style.display = name == "level-end-menu" ? "block" : "none";
    if(name == "level-selection-menu") this.currentElementsArray = this.levelSelectionMenuDiv.children;
    else if(name == "controls-menu") this.currentElementsArray = this.controlsMenuDiv.children;
    else if(name == "pause-menu") this.currentElementsArray = this.pauseMenuDiv.children;
    else if(name == "level-end-menu"){
      this.currentElementsArray = this.levelEndMenuDiv.children;
      this.endLevelSaveTime();
    }
    else this.currentElementsArray = null;
    if(name == "resume"){
      ResumeGame();
    }
    else if(name == "restart"){
      Respawn();
      ResumeGame();
    }
    else if(name == "nextLevel"){
      cover.nextLevel();
    }
    else if(name == "main-menu"){
      this.showCurrentTimeDiv(false);
      playingLevel = false;
      cover.coverLevel();
    }
  }
  showCurrentTimeDiv(show){
    this.currentTimeDiv.style.display = show ? "block" : "none";
  }
  updateCurrentTimeDiv(text){
    this.currentTimeDiv.innerText = text;
  }
  useShortcut(name){
    if(this.currentElementsArray != null && this.currentElementsArray.length > 0){
      let destination = Array.prototype.find.call(this.currentElementsArray, (e => e.dataset.shortcut == name));
      if(destination != null && destination != undefined){
        this.displayMenu(destination.dataset.destination);
      }
    }
  }
  selectLevel(levelName){
    this.displayMenu("");
    this.currentLevelName = levelName;
    LoadLevel(levelName);
  }
  endLevelSaveTime(){
    let menuLevel = this.allLevels.find(l => l.name == this.currentLevelName);
    if(menuLevel.bestTime == null || menuLevel.bestTime > timer.totalTime()){
      menuLevel.bestTime = timer.totalTime();
      this.levelEndMenuTimeDiv.innerHTML = "New best time : " + timer.getCurrentTimeString();
    }
    else{
      this.levelEndMenuTimeDiv.innerHTML = "Time : " + timer.getCurrentTimeString() + "<br/>Best : " + Timer.millisecondsToString(menuLevel.bestTime);
    }
  }
}
