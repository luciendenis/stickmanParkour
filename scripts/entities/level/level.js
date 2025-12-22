class Level {
  constructor(spawn, exit, levelLimits) {
    this.spawn = spawn;
    this.exit = exit;
    this.levelLimits = levelLimits;
    this.blocks = [];
    this.climbingHolds = [];
    this.ladders = [];
    this.ropes = [];
    this.collectibles = [];
    this.texts = [];
    this.collectiblesToDraw = 1;
    this.assets = [];
    this.frameWait = 5;
    this.hazards = [];
    this.door = null;
  }
  resetCollectibles(){
    for(let i = 0 ; i < this.collectibles.length ; i++){
      this.collectibles[i].collected = false;
    }
  }
  checkCollectibleStatus(){
    let allCollected = true;
    for(let i = 0 ; i < this.collectibles.length ; i++){
      if(!this.collectibles[i].collected){
        allCollected = false;
      }
    }
    if(allCollected){
      this.createDoor("exit");
    }
  }
  createDoor(type){
    if(type === "spawn"){
      this.door = new LevelDoor("spawn", this.spawn.coordinates, AdaptDoorSettingsToScale(LoadConfig(propsConfigs, "door"), globalScale), false, true);
    }
    else if(type === "exit"){
      this.door = new LevelDoor("exit", this.exit.coordinates, AdaptDoorSettingsToScale(LoadConfig(propsConfigs, "door"), globalScale), true, false);
    }
  }
  giveProgressiveDrawInstructions(progressiveDrawObj){
    for(let i = 0 ; i < this.blocks.length ; i++){
      this.blocks[i].giveProgressiveDrawInstructions(progressiveDrawObj);
    }
    for(let i = 0 ; i < this.climbingHolds.length ; i++){
      this.climbingHolds[i].giveProgressiveDrawInstructions(progressiveDrawObj);
    }
    for(let i = 0 ; i < this.ladders.length ; i++){
      this.ladders[i].giveProgressiveDrawInstructions(progressiveDrawObj);
    }
    for(let i = 0 ; i < this.ropes.length ; i++){
      this.ropes[i].giveProgressiveDrawInstructions(progressiveDrawObj);
    }
    for(let i = 0 ; i < this.hazards.length ; i++){
      this.hazards[i].giveProgressiveDrawInstructions(progressiveDrawObj);
    }
  }
  draw(context){
    for(let i = 0 ; i < this.assets.length ; i++){
      if(this.assets[i].parent == null) this.assets[i].object.draw(context);
    }
    for(let i = 0 ; i < this.blocks.length ; i++){
      this.blocks[i].draw(context);
    }
    for(let i = 0 ; i < this.climbingHolds.length ; i++){
      this.climbingHolds[i].draw(context);
    }
    for(let i = 0 ; i < this.ladders.length ; i++){
      this.ladders[i].draw(context);
    }
    for(let i = 0 ; i < this.ropes.length ; i++){
      this.ropes[i].draw(context);
    }
    for(let i = 0 ; i < this.hazards.length ; i++){
      this.hazards[i].draw(context);
    }
    this.levelLimits.draw(context);
  }
  drawCollectibles(context){
    for(let i = 0 ; i < this.collectiblesToDraw ; i++){
      this.collectibles[i].draw(context);
    }
    if(this.collectiblesToDraw < this.collectibles.length && currentFrame%this.frameWait === 0){
      this.collectiblesToDraw++;
    }
  }
  drawDoor(context){
    if(this.door != null && this.door.status() === "done"){
      this.door = null;
    }
    if(this.door != null && this.collectiblesToDraw === this.collectibles.length){
      this.door.draw(context);
    }
  }
  drawDoorCurtain(context){
    if(this.door != null && this.door.curtainOverdraw){
      this.door.drawCurtain(context);
    }
  }
  drawRough(context){
    for(let i = 0 ; i < this.assets.length ; i++){
      if(this.assets[i].parent == null) this.assets[i].object.drawRough(context);
    }
    for(let i = 0 ; i < this.blocks.length ; i++){
      this.blocks[i].drawRough(context);
    }
    for(let i = 0 ; i < this.climbingHolds.length ; i++){
      this.climbingHolds[i].drawRough(context);
    }
    for(let i = 0 ; i < this.ladders.length ; i++){
      this.ladders[i].drawRough(context);
    }
    for(let i = 0 ; i < this.ropes.length ; i++){
      this.ropes[i].drawRough(context);
    }
    for(let i = 0 ; i < this.hazards.length ; i++){
      this.hazards[i].drawRough(context);
    }
    this.levelLimits.drawRough(context);
  }
  drawTexts(context){
    for(let i = 0 ; i < this.texts.length ; i++){
      this.texts[i].draw(context);
    }
  }
  drawCollectiblesRough(context){
    for(let i = 0 ; i < this.collectiblesToDraw ; i++){
      this.collectibles[i].drawRough(context);
    }
    if(this.collectiblesToDraw < this.collectibles.length && currentFrame%this.frameWait === 0){
      this.collectiblesToDraw++;
    }
  }
  drawDoorRough(roughContext,context){
    if(this.door != null && this.door.status() === "done"){
      this.door = null;
    }
    if(this.door != null && this.collectiblesToDraw === this.collectibles.length){
      this.door.drawRough(roughContext,context);
    }
  }
  drawDoorCurtainRough(roughContext,context){
    if(this.door != null && this.door.curtainOverdraw){
      this.door.drawCurtainRough(roughContext,context);
    }
  }
}

class LevelSpawn {
  constructor(coordinates, direction, frontSide, action){
    this.coordinates = coordinates;
    this.direction = direction;
    this.frontSide = frontSide;
    this.action = action;
  }
}

class LevelExit {
  constructor(coordinates) {
    this.coordinates = coordinates;
  }
}

class LevelBlock {
  constructor(xLeft, xRight, yTop, yBottom, color, roughOptions) {
    this.xLeft = xLeft;
    this.xRight = xRight;
    this.yTop = yTop;
    this.yBottom = yBottom;
    this.color = color;
    this.roughOptions = roughOptions;
  }
  giveProgressiveDrawInstructions(progressiveDrawObj){
    progressiveDrawObj.drawFunctions.push(new Function("context", "context.line(" + this.xLeft + "," + this.yTop + "," + this.xLeft + ","  + this.yBottom + "," + JSON.stringify(this.roughOptions) + ");" ));
    progressiveDrawObj.drawFunctions.push(new Function("context", "context.line(" + this.xLeft + "," + this.yTop + "," + this.xRight + ","  + this.yTop + "," + JSON.stringify(this.roughOptions) + ");" ));
    progressiveDrawObj.drawFunctions.push(new Function("context", "context.line(" + this.xRight + "," + this.yTop + "," + this.xRight + ","  + this.yBottom + "," + JSON.stringify(this.roughOptions) + ");" ));
    progressiveDrawObj.drawFunctions.push(new Function("context", "context.line(" + this.xLeft + "," + this.yBottom + "," + this.xRight + ","  + this.yBottom + "," + JSON.stringify(this.roughOptions) + ");" ));
    let previousStroke = this.roughOptions.stroke;
    this.roughOptions.stroke = "transparent";
    progressiveDrawObj.drawFunctions.push(new Function("context", "context.rectangle(" + this.xLeft + "," + this.yTop + "," + (this.xRight - this.xLeft) + ","  + (this.yBottom - this.yTop) + "," + JSON.stringify(this.roughOptions) + ");" ));
    this.roughOptions.stroke = previousStroke;
  }
  draw(context){
    context.fillStyle = this.color;
    context.fillRect(this.xLeft, this.yTop, this.xRight - this.xLeft, this.yBottom - this.yTop);
  }
  drawRough(context){
    context.rectangle(this.xLeft, this.yTop, this.xRight - this.xLeft, this.yBottom - this.yTop, this.roughOptions);
  }
}

class ClimbingHold {
  constructor(coordinates, size, type, hangWithLegs, color, roughOptions) {
    this.coordinates = coordinates;
    this.size = size;
    this.type = type;   // sideLeft, sideRight, front or pole
    this.hangWithLegs = hangWithLegs; // boolean that determines the position used to hang on the hold
    this.color = color;
    this.roughOptions = roughOptions;
  }
  giveProgressiveDrawInstructions(progressiveDrawObj){
    let startAngle = this.type === "sideRight" ? Math.PI/2 : 0;
    let endAngle = this.type === "pole" ? 2*Math.PI : this.type === "sideLeft" ? Math.PI/2 : Math.PI;
    let size = this.type === "pole" ? this.size/3 : this.size;
    progressiveDrawObj.drawFunctions.push(new Function("context", "context.arc(" + this.coordinates.x + "," + this.coordinates.y + "," + size + "," + size + "," + startAngle + "," + endAngle + ",true," + JSON.stringify(this.roughOptions) + ");" ));
  }
  draw(context){
    context.beginPath();
    context.moveTo(this.coordinates.x, this.coordinates.y);
    if(this.type === "sideLeft")
      context.lineTo(this.coordinates.x + this.size/2, this.coordinates.y);
    else if(this.type === "sideRight")
      context.lineTo(this.coordinates.x, this.coordinates.y + this.size/2);
    let startAngle = this.type === "sideRight" ? Math.PI/2 : 0;
    let endAngle = this.type === "sideLeft" ? Math.PI/2 : this.type === "pole" ? 2*Math.PI : Math.PI;
    let size = this.type === "pole" ? this.size/4 : this.size/2;
    context.arc(this.coordinates.x, this.coordinates.y, size, startAngle, endAngle, false);
    context.fillStyle = this.color;
    context.fill();
  }
  drawRough(context){
    let startAngle = this.type === "sideRight" ? Math.PI/2 : 0;
    let endAngle = this.type === "sideLeft" ? Math.PI/2 : this.type === "pole" ? 2*Math.PI : Math.PI;
    let size = this.type === "pole" ? this.size/2: this.size;
    context.arc(this.coordinates.x, this.coordinates.y, size, size, startAngle, endAngle, this.type !== "pole", this.roughOptions);
  }
}

class LevelLadder {
  constructor(xLeft, xRight, yTop, yBottom, yStep, lineWidth, color, roughOptions) {
    this.xLeft = xLeft;
    this.xRight = xRight;
    this.xMiddle = xLeft + (xRight - xLeft)/2;
    this.yTop = yTop;
    this.yBottom = yBottom;
    this.yStep = yStep;
    this.lineWidth = lineWidth;
    this.color = color;
    this.roughOptions = roughOptions;
  }
  giveProgressiveDrawInstructions(progressiveDrawObj){
    progressiveDrawObj.drawFunctions.push(new Function("context", "context.line(" + this.xLeft + "," + (this.yTop + this.lineWidth/2) + "," + this.xLeft + "," + this.yBottom + "," + JSON.stringify(this.roughOptions) + ");" ));
    progressiveDrawObj.drawFunctions.push(new Function("context", "context.line(" + this.xRight + "," + (this.yTop + this.lineWidth/2) + "," + this.xRight + "," + this.yBottom + "," + JSON.stringify(this.roughOptions) + ");" ));
    for(let i = this.lineWidth/2; i < this.yBottom - this.yTop; i+= this.yStep){
      progressiveDrawObj.drawFunctions.push(new Function("context", "context.line(" + (this.xLeft - this.lineWidth/2) + "," + (this.yTop + i) + "," + (this.xRight + this.lineWidth/2) + "," + (this.yTop + i) + "," + JSON.stringify(this.roughOptions) + ");" ));
    }
  }
  draw(context){
    context.strokeStyle = this.color;
    context.lineWidth = this.lineWidth;
    context.beginPath();
    context.moveTo(this.xLeft, this.yTop + this.lineWidth/2);
    context.lineTo(this.xLeft, this.yBottom);
    context.moveTo(this.xRight, this.yTop + this.lineWidth/2);
    context.lineTo(this.xRight, this.yBottom);
    for(let i = this.lineWidth/2; i < this.yBottom - this.yTop; i+= this.yStep){
      context.moveTo(this.xLeft - this.lineWidth/2, this.yTop + i);
      context.lineTo(this.xRight + this.lineWidth/2, this.yTop + i);
    }
    context.stroke();
    if(debugMode){
      context.strokeStyle = "green";
      context.beginPath();
      context.moveTo(this.xMiddle, this.yTop + this.lineWidth/2);
      context.lineTo(this.xMiddle, this.yBottom);
      context.stroke();
    }
  }
  drawRough(context){
    context.line(this.xLeft, this.yTop + this.lineWidth/2,this.xLeft, this.yBottom, this.roughOptions);
    context.line(this.xRight, this.yTop + this.lineWidth/2,this.xRight, this.yBottom, this.roughOptions);
    for(let i = this.lineWidth/2; i < this.yBottom - this.yTop; i+= this.yStep){
      context.line(this.xLeft - this.lineWidth/2, this.yTop + i,this.xRight + this.lineWidth/2, this.yTop + i, this.roughOptions);
    }
  }
}

class LevelRope {
  constructor(anchorLeft, anchorRight, lineWidth, color, roughOptions) {
    this.anchorLeft = anchorLeft;
    this.anchorRight = anchorRight;
    this.coefficient = -(anchorRight.y-anchorLeft.y)/(anchorRight.x-anchorLeft.x);
    this.angle = Math.atan(this.coefficient);
    this.speedFactors = new Coordinates(Math.cos(this.angle), Math.sin(this.angle));
    this.lineWidth = lineWidth;
    this.color = color;
    this.roughOptions = roughOptions;
  }
  giveProgressiveDrawInstructions(progressiveDrawObj){
    progressiveDrawObj.drawFunctions.push(new Function("context", "context.line(" + this.anchorLeft.x + "," + this.anchorLeft.y + "," + this.anchorRight.x + "," + this.anchorRight.y + "," + JSON.stringify(this.roughOptions) + ");" ));
  }
  giveYforX(x){
    return this.anchorLeft.y - (x-this.anchorLeft.x)*this.coefficient;
  }
  draw(context){
    context.strokeStyle = this.color;
    context.lineWidth = this.lineWidth;
    context.beginPath();
    context.moveTo(this.anchorLeft.x, this.anchorLeft.y);
    context.lineTo(this.anchorRight.x, this.anchorRight.y);
    context.stroke();
  }
  drawRough(context){
    context.line(this.anchorLeft.x, this.anchorLeft.y, this.anchorRight.x, this.anchorRight.y, this.roughOptions);
  }
}

class LevelCollectible{
  constructor(coordinates, type, lineWidth, color, roughOptions){
    this.coordinates = coordinates;
    this.type = type;
    this.lineWidth = lineWidth;
    this.color = color;
    this.collected = false;
    this.roughOptions = roughOptions;
  }
  draw(context){
    if(!this.collected){
      if(this.type === "gear"){
        let offsetY = -gearsCurrentState.offsetY;
        var len = gearsCurrentState.points.length;
        context.strokeStyle = this.color;
        context.lineWidth = this.lineWidth;
        context.beginPath();
        context.arc(this.coordinates.x, this.coordinates.y+offsetY, gearsCurrentState.settings.centerDiameter-this.lineWidth, 0, 2*Math.PI);
        context.moveTo(gearsCurrentState.points[0].x+this.coordinates.x, gearsCurrentState.points[0].y+this.coordinates.y+offsetY);
        for(let i = 0; i < len ; i++){
          let j = (i+1)%len;
          context.lineTo(gearsCurrentState.points[j].x+this.coordinates.x, gearsCurrentState.points[j].y+this.coordinates.y+offsetY);
        }
        context.stroke();
      }
    }
  }
  drawRough(context){
    if(!this.collected){
      if(this.type === "gear"){
        let offsetY = -gearsCurrentState.offsetY;
        context.circle(this.coordinates.x, this.coordinates.y+offsetY, gearsCurrentState.settings.centerDiameter, this.roughOptions);
        var len = gearsCurrentState.points.length;
        for(let i = 0; i < len ; i++){
          let j = (i+1)%len;
          context.line(gearsCurrentState.points[i].x+this.coordinates.x, gearsCurrentState.points[i].y+this.coordinates.y+offsetY, gearsCurrentState.points[j].x+this.coordinates.x, gearsCurrentState.points[j].y+this.coordinates.y+offsetY, this.roughOptions);
        }
      }
    }
  }
}

class LevelDoor {
  constructor(type, coordinates, settings, waitBeforeClosing, curtainOverdraw) {
    this.type = type;
    this.coordinates = coordinates;
    this.settings = settings;
    this.statusOrder = (waitBeforeClosing) ? ["drawing", "opening", "waiting", "closing", "fading", "done"] : ["drawing", "opening", "closing", "fading", "done"];
    this.doorStatus = 0;
    this.curtainHeight = 0;
    this.curtainOverdraw = curtainOverdraw;
    this.roughDrawInstructions = [];
    this.roughDrawCount = 1;
    this.frameWait = 3;
    this.lineWidth = 1;
  }
  nextStatus(){
    this.doorStatus++;
    if(this.type === "spawn" && this.status() === "opening"){
      drawPlayer = true; // only starting to draw the player
    }
    else if(this.type === "spawn" && this.status() === "closing"){
      StartLevel();
    }
    else if(this.type === "exit" && this.status() === "fading"){
      drawPlayer = false; // stop drawing the player
    }
  }
  status(){
    return this.statusOrder[this.doorStatus];
  }
  createRoughDrawInstructions(init){
    if(!init){
      this.roughDrawInstructions = [];
    }
    this.roughDrawInstructions.push(new Function("context", "context.line(" + (this.coordinates.x - this.settings.totalWidth/2) + "," + this.coordinates.y + "," + (this.coordinates.x - this.settings.totalWidth/2) + "," + (this.coordinates.y - this.settings.sideHeight) + "," + JSON.stringify(this.settings.roughOptions) + ");" ));
    this.roughDrawInstructions.push(new Function("context", "context.arc(" + this.coordinates.x + "," + this.coordinates.y + "," + this.settings.arcRadius*2 + "," + this.settings.arcRadius*2 + "," + this.settings.arcAngle1 + "," + this.settings.arcAngle2 + ",false," + JSON.stringify(this.settings.roughOptions) + ");" ));
    this.roughDrawInstructions.push(new Function("context", "context.line(" + (this.coordinates.x + this.settings.totalWidth/2) + "," + this.coordinates.y + "," + (this.coordinates.x + this.settings.totalWidth/2) + "," + (this.coordinates.y - this.settings.sideHeight) + "," + JSON.stringify(this.settings.roughOptions) + ");" ));
    this.roughDrawInstructions.push(new Function("context", "context.line(" + (this.coordinates.x + this.settings.curtainWidth/2) + "," + this.coordinates.y + "," + (this.coordinates.x + this.settings.curtainWidth/2)+ "," + (this.coordinates.y - this.settings.curtainHeight) + "," + JSON.stringify(this.settings.roughOptions) + ");" ));
    this.roughDrawInstructions.push(new Function("context", "context.line(" + (this.coordinates.x - this.settings.curtainWidth/2) + "," + (this.coordinates.y - this.settings.curtainHeight) + "," + (this.coordinates.x + this.settings.curtainWidth/2)+ "," + (this.coordinates.y - this.settings.curtainHeight) + "," + JSON.stringify(this.settings.roughOptions) + ");" ));
    this.roughDrawInstructions.push(new Function("context", "context.line(" + (this.coordinates.x - this.settings.curtainWidth/2) + "," + this.coordinates.y + "," + (this.coordinates.x - this.settings.curtainWidth/2)+ "," + (this.coordinates.y - this.settings.curtainHeight) + "," + JSON.stringify(this.settings.roughOptions) + ");" ));
    if(init){
      this.roughDrawCount = progressiveDrawMode ? 1 : this.roughDrawInstructions.length;
    }
  }
  draw(context){
    context.strokeStyle = this.settings.color;
    context.lineWidth = this.settings.lineWidth;
    context.beginPath();
    context.moveTo(this.coordinates.x + this.settings.totalWidth/2, this.coordinates.y);
    context.lineTo(this.coordinates.x + this.settings.totalWidth/2, this.coordinates.y - this.settings.sideHeight);
    context.moveTo(this.coordinates.x - this.settings.totalWidth/2, this.coordinates.y);
    context.lineTo(this.coordinates.x - this.settings.totalWidth/2, this.coordinates.y - this.settings.sideHeight);
    context.arc(this.coordinates.x, this.coordinates.y, this.settings.arcRadius, this.settings.arcAngle1, this.settings.arcAngle2);
    context.stroke();
    context.strokeRect(this.coordinates.x - this.settings.curtainWidth/2, this.coordinates.y, this.settings.curtainWidth, -this.settings.curtainHeight);
    if(!this.curtainOverdraw){
      this.drawCurtain(context);
    }
  }
  drawCurtain(context){
    if(this.roughDrawCount === this.roughDrawInstructions.length){ // checking the door is fully drawn before drawing the curtain
      context.clearRect(this.coordinates.x - this.settings.curtainWidth/2, this.coordinates.y, this.settings.curtainWidth, -this.settings.curtainHeight);
    }
  }
  drawRough(roughContext, context){
    if(this.roughDrawInstructions.length === 0){
      this.createRoughDrawInstructions(true);
    }
    for(let i = 0; i < this.roughDrawCount ; i++){
      this.roughDrawInstructions[i](roughContext);
    }
    if(this.status() === "drawing"){
      if(this.roughDrawCount < this.roughDrawInstructions.length){
        if(currentFrame%this.frameWait === 0){
          this.roughDrawCount++;
        }
      }
      else{
        this.nextStatus();
      }
    }
    else{
      if(!this.curtainOverdraw){
        this.drawCurtainRough(roughContext,context);
      }
    }
  }
  drawCurtainRough(roughContext,context){
    if(this.roughDrawCount === this.roughDrawInstructions.length){ // checking the door is fully drawn before drawing the curtain
      context.clearRect(this.coordinates.x - this.settings.curtainWidth/2, this.coordinates.y-this.settings.curtainHeight, this.settings.curtainWidth, this.settings.curtainHeight-this.curtainHeight);
      roughContext.rectangle(this.coordinates.x - this.settings.curtainWidth/2, this.coordinates.y-this.settings.curtainHeight, this.settings.curtainWidth, this.settings.curtainHeight-this.curtainHeight, this.settings.curtainRoughOptions);
      if(this.status() === "opening"){
        if(this.curtainHeight < this.settings.curtainHeight){
          this.curtainHeight += this.settings.curtainSpeed;
        }
        else{
          this.nextStatus();
          this.curtainOverdraw = !this.curtainOverdraw;
        }
      }
      else if(this.status() === "closing"){
        if(this.curtainHeight > 0){
          this.curtainHeight -= this.settings.curtainSpeed;
        }
        else{
          this.nextStatus();
        }
      }
      else if(this.status() === "fading"){
        if(this.settings.roughOptions.strokeWidth > 0.01){
          this.settings.roughOptions.strokeWidth = Math.max(0.01,this.settings.roughOptions.strokeWidth-2*this.settings.fadeSpeed);
          this.settings.curtainRoughOptions.fillWeight = Math.max(0.01,this.settings.curtainRoughOptions.fillWeight-this.settings.fadeSpeed);
          this.createRoughDrawInstructions(false);
        }
        else{
          this.nextStatus();
        }
      }
    }
  }
}

class LevelHazard {
  constructor(type, xLeft, xRight, yTop, yBottom, direction, patternRepeat, color, lineWidth, roughOptions) {
    this.type = type;
    this.xLeft = xLeft;
    this.xRight = xRight;
    this.yTop = yTop;
    this.yBottom = yBottom;
    this.direction = direction;
    this.patternRepeat = patternRepeat;
    this.color = color;
    this.lineWidth = lineWidth;
    this.roughOptions = roughOptions;
  }
  giveProgressiveDrawInstructions(progressiveDrawObj){
    if(this.type === "spike"){
      let xStep;
      let yStep
      switch (this.direction) {
        case "up":
          xStep = (this.xRight-this.xLeft)/(2*this.patternRepeat);
          for(let i = 0; i < 2*this.patternRepeat; i++){
            let x1 = this.xLeft + i*xStep;
            let x2 = x1 + xStep;
            let y1 = (i % 2 === 0) ? this.yBottom : this.yTop;
            let y2 = (i % 2 === 1) ? this.yBottom : this.yTop;
            progressiveDrawObj.drawFunctions.push(new Function("context", "context.line(" + x1 + "," + y1 + "," + x2 + "," + y2 + "," + JSON.stringify(this.roughOptions) + ");" ));
          }
        break;
        case "down":
          xStep = (this.xRight-this.xLeft)/(2*this.patternRepeat);
          for(let i = 0; i < 2*this.patternRepeat; i++){
            let x1 = this.xLeft + i*xStep;
            let x2 = x1 + xStep;
            let y1 = (i % 2 === 0) ? this.yTop : this.yBottom;
            let y2 = (i % 2 === 1) ? this.yTop : this.yBottom;
            progressiveDrawObj.drawFunctions.push(new Function("context", "context.line(" + x1 + "," + y1 + "," + x2 + "," + y2 + "," + JSON.stringify(this.roughOptions) + ");" ));
          }
        break;
        case "left":
          yStep = (this.yTop-this.yBottom)/(2*this.patternRepeat);
          for(let i = 0; i < 2*this.patternRepeat; i++){
            let y1 = this.yBottom + i*yStep;
            let y2 = y1 + yStep;
            let x1 = (i % 2 === 0) ? this.xRight : this.xLeft;
            let x2 = (i % 2 === 1) ? this.xRight : this.xLeft;
            progressiveDrawObj.drawFunctions.push(new Function("context", "context.line(" + x1 + "," + y1 + "," + x2 + "," + y2 + "," + JSON.stringify(this.roughOptions) + ");" ));
          }
        break;
        case "right":
          yStep = (this.yTop-this.yBottom)/(2*this.patternRepeat);
          for(let i = 0; i < 2*this.patternRepeat; i++){
            let y1 = this.yBottom + i*yStep;
            let y2 = y1 + yStep;
            let x1 = (i % 2 === 0) ? this.xLeft : this.xRight;
            let x2 = (i % 2 === 1) ? this.xLeft : this.xRight;
            progressiveDrawObj.drawFunctions.push(new Function("context", "context.line(" + x1 + "," + y1 + "," + x2 + "," + y2 + "," + JSON.stringify(this.roughOptions) + ");" ));
          }
        break;
      }
    }
  }
  draw(context){
    if(this.type === "spike"){
      context.strokeStyle = this.color;
      context.lineWidth = this.lineWidth;
      context.beginPath();
      let xStep;
      let yStep
      switch (this.direction) {
        case "up":
          context.moveTo(this.xLeft, this.yBottom);
          xStep = (this.xRight-this.xLeft)/(2*this.patternRepeat);
          for(let i = 0; i <= 2*this.patternRepeat; i++){
            let x = this.xLeft + i*xStep;
            let y = (i % 2 === 0) ? this.yBottom : this.yTop;
            context.lineTo(x,y);
          }
        break;
        case "down":
          context.moveTo(this.xLeft, this.yTop);
          xStep = (this.xRight-this.xLeft)/(2*this.patternRepeat);
          for(let i = 0; i <= 2*this.patternRepeat; i++){
            let x = this.xLeft + i*xStep;
            let y = (i % 2 === 0) ? this.yTop : this.yBottom;
            context.lineTo(x,y);
          }
        break;
        case "left":
          context.moveTo(this.xRight, this.yBottom);
          yStep = (this.yTop-this.yBottom)/(2*this.patternRepeat);
          for(let i = 0; i <= 2*this.patternRepeat; i++){
            let y = this.yBottom + i*yStep;
            let x = (i % 2 === 0) ? this.xRight : this.xLeft;
            context.lineTo(x,y);
          }
        break;
        case "right":
          context.moveTo(this.xLeft, this.yBottom);
          yStep = (this.yTop-this.yBottom)/(2*this.patternRepeat);
          for(let i = 0; i <= 2*this.patternRepeat; i++){
            let y = this.yBottom + i*yStep;
            let x = (i % 2 === 0) ? this.xLeft : this.xRight;
            context.lineTo(x,y);
          }
        break;
      }
      context.stroke();
    }
  }
  drawRough(context){
    if(this.type === "spike"){
      let xStep;
      let yStep
      switch (this.direction) {
        case "up":
          xStep = (this.xRight-this.xLeft)/(2*this.patternRepeat);
          for(let i = 0; i < 2*this.patternRepeat; i++){
            let x1 = this.xLeft + i*xStep;
            let x2 = x1 + xStep;
            let y1 = (i % 2 === 0) ? this.yBottom : this.yTop;
            let y2 = (i % 2 === 1) ? this.yBottom : this.yTop;
            context.line(x1,y1,x2,y2,this.roughOptions);
          }
        break;
        case "down":
          xStep = (this.xRight-this.xLeft)/(2*this.patternRepeat);
          for(let i = 0; i < 2*this.patternRepeat; i++){
            let x1 = this.xLeft + i*xStep;
            let x2 = x1 + xStep;
            let y1 = (i % 2 === 0) ? this.yTop : this.yBottom;
            let y2 = (i % 2 === 1) ? this.yTop : this.yBottom;
            context.line(x1,y1,x2,y2,this.roughOptions);
          }
        break;
        case "left":
          yStep = (this.yTop-this.yBottom)/(2*this.patternRepeat);
          for(let i = 0; i < 2*this.patternRepeat; i++){
            let y1 = this.yBottom + i*yStep;
            let y2 = y1 + yStep;
            let x1 = (i % 2 === 0) ? this.xRight : this.xLeft;
            let x2 = (i % 2 === 1) ? this.xRight : this.xLeft;
            context.line(x1,y1,x2,y2,this.roughOptions);
          }
        break;
        case "right":
          yStep = (this.yTop-this.yBottom)/(2*this.patternRepeat);
          for(let i = 0; i < 2*this.patternRepeat; i++){
            let y1 = this.yBottom + i*yStep;
            let y2 = y1 + yStep;
            let x1 = (i % 2 === 0) ? this.xLeft : this.xRight;
            let x2 = (i % 2 === 1) ? this.xLeft : this.xRight;
            context.line(x1,y1,x2,y2,this.roughOptions);
          }
        break;
      }
    }
  }
}

class LevelText {
  constructor(coordinates, fontColor, fontSize, text) {
    this.coordinates = coordinates;
    this.fontColor = fontColor;
    this.fontSize = fontSize;
    this.text = text;
  }
  draw(context){
    context.font = this.fontSize + "px Fredericka the Great";
    context.lineWidth = this.fontSize*0.02;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.strokeStyle = this.fontColor;
    context.beginPath();
    for(let i = 0; i < this.text.length; i++){
      context.strokeText(this.text[i], this.coordinates.x, this.coordinates.y + i*(this.fontSize*1.5));
    }
  }
  drawRough(context){
    this.draw(context);
  }
}

class LevelLimits {
  constructor(width, height, xLeft, xRight, yGround, yCeiling, color, linesRoughOptions, rectRoughOptions) {
    this.width = width;
    this.height = height;
    this.xLeft = xLeft;
    this.xRight = xRight;
    this.yGround = yGround;
    this.yCeiling = yCeiling;
    this.color = color;
    this.linesRoughOptions = linesRoughOptions;
    this.rectRoughOptions = rectRoughOptions;
  }
  giveProgressiveDrawInstructions(progressiveDrawObj){
    progressiveDrawObj.drawFunctions.push(new Function("context", "context.line(" + this.xLeft + "," + this.yCeiling + "," + this.xLeft + ","  + this.yGround + "," + JSON.stringify(this.linesRoughOptions) + ");" ));
    progressiveDrawObj.drawFunctions.push(new Function("context", "context.line(" + this.xLeft + "," + this.yCeiling + "," + this.xRight + "," + this.yCeiling + "," + JSON.stringify(this.linesRoughOptions) + ");" ));
    progressiveDrawObj.drawFunctions.push(new Function("context", "context.line(" + this.xRight + "," + this.yCeiling + "," + this.xRight + "," + this.yGround + "," + JSON.stringify(this.linesRoughOptions) + ");" ));
    progressiveDrawObj.drawFunctions.push(new Function("context", "context.line(" + this.xLeft + "," + this.yGround + "," + this.xRight + "," + this.yGround + "," + JSON.stringify(this.linesRoughOptions) + ");" ));
    progressiveDrawObj.drawFunctions.push(new Function("context", "context.rectangle(0," + this.yCeiling + "," + this.xLeft + "," + (this.yGround-this.yCeiling) + "," + JSON.stringify(this.rectRoughOptions) + ");" ));
    progressiveDrawObj.drawFunctions.push(new Function("context", "context.rectangle(0,0," + this.width + "," + this.yCeiling + "," + JSON.stringify(this.rectRoughOptions) + ");" ));
    progressiveDrawObj.drawFunctions.push(new Function("context", "context.rectangle(" + this.xRight + "," + this.yCeiling + "," + (this.width - this.xRight) + "," + (this.yGround-this.yCeiling) + "," + JSON.stringify(this.rectRoughOptions) + ");" ));
    progressiveDrawObj.drawFunctions.push(new Function("context", "context.rectangle(0," + this.yGround + "," + this.width + "," + (this.height - this.yGround) + "," + JSON.stringify(this.rectRoughOptions) + ");" ));
  }
  draw(context){
    context.fillStyle = this.color;
    context.fillRect(0,0,this.xLeft,this.height); // left border
    context.fillRect(this.xRight,0,this.width - this.xRight,this.height); // right border
    context.fillRect(0,this.yGround,this.width,this.height - this.yGround); // ground
    context.fillRect(0,0,this.width,this.yCeiling); // ceiling
  }
  drawRough(context){
    context.line(this.xLeft, this.yCeiling, this.xLeft, this.yGround, this.linesRoughOptions);
    context.line(this.xRight, this.yCeiling, this.xRight, this.yGround, this.linesRoughOptions);
    context.line(this.xLeft, this.yGround, this.xRight, this.yGround, this.linesRoughOptions);
    context.line(this.xLeft, this.yCeiling, this.xRight, this.yCeiling, this.linesRoughOptions);
    context.rectangle(0,this.yCeiling,this.xLeft,this.yGround-this.yCeiling, this.rectRoughOptions);
    context.rectangle(this.xRight,this.yCeiling,this.width - this.xRight,this.yGround-this.yCeiling, this.rectRoughOptions);
    context.rectangle(0,this.yGround,this.width,this.height - this.yGround, this.rectRoughOptions);
    context.rectangle(0,0,this.width,this.yCeiling, this.rectRoughOptions);
  }
}

class GearsState {
  constructor(settings) {
    this.settings = settings;
    this.angle = 0;
    this.offsetY = 0;
    this.offsetSpeed = settings.bounceSpeed;
    this.points = [];
  }
  update(){
    this.angle += this.settings.angleFrameDiff;
    if(this.angle >= this.settings.repeatAngle){
      this.angle = 0;
    }
    this.offsetY += this.offsetSpeed;
    if(this.offsetY < 0 || this.offsetY > this.settings.bounceMaxHeight){
      this.offsetSpeed *= -1;
    }
    this.points = [];
    for(let i = 0 ; i < this.settings.teethCount; i++){
      let angle = this.angle + i*this.settings.repeatAngle;
      this.points.push(CartesianCoordinatesFromPolar(this.settings.innerLength, angle));
      this.points.push(CartesianCoordinatesFromPolar(this.settings.innerLength, angle + this.settings.teethAngle));
      this.points.push(CartesianCoordinatesFromPolar(this.settings.outerLength, angle + this.settings.teethAngle + this.settings.interTeethAngle));
      this.points.push(CartesianCoordinatesFromPolar(this.settings.outerLength, angle + 2*this.settings.teethAngle + this.settings.interTeethAngle));
    }
  }
}

function AdaptLevelToScale(levelSettings, width, height, scale){
  // calculating the offsets to put the level at the center of the screen
  let xOffset = (width - (levelSettings.levelLimits.width + levelSettings.levelLimits.xLeft + levelSettings.levelLimits.xRight)*scale)/2;
  let yOffset = (height - (levelSettings.levelLimits.height + levelSettings.levelLimits.yCeiling + levelSettings.levelLimits.yGround)*scale)/2;
  let limitslinesRoughOptions = AdaptRoughOptionsToScale(levelSettings.levelLimits.linesRoughOptions, scale);
  let limitsRectRoughOptions = AdaptRoughOptionsToScale(levelSettings.levelLimits.rectRoughOptions, scale);
  var newLevel = new Level(
    new LevelSpawn(
      new Coordinates(levelSettings.spawn.coordinates.x*scale+xOffset,height-yOffset-levelSettings.spawn.coordinates.y*scale),
      levelSettings.spawn.direction,
      levelSettings.spawn.frontSide,
      levelSettings.spawn.action
    ),
    new LevelExit(
      new Coordinates(levelSettings.exit.coordinates.x*scale+xOffset,height-yOffset-levelSettings.exit.coordinates.y*scale)
    ),
    new LevelLimits(
      width,
      height,
      levelSettings.levelLimits.xLeft*scale+xOffset,
      width - xOffset - levelSettings.levelLimits.xRight*scale,
      height - yOffset - levelSettings.levelLimits.yGround*scale,
      levelSettings.levelLimits.yCeiling*scale + yOffset,
      levelSettings.levelLimits.color,
      limitslinesRoughOptions,
      limitsRectRoughOptions
    )
  );
  let blocksRoughOptions = AdaptRoughOptionsToScale(levelSettings.blocks.roughOptions, scale);
  for(let i = 0 ; i < levelSettings.blocks.instances.length ; i++){
    let block = levelSettings.blocks.instances[i];
    newLevel.blocks.push(new LevelBlock(
      block.xLeft*scale+xOffset,
      block.xLeft*scale+xOffset + block.xWidth*scale,
      height - block.yBottom*scale - yOffset - block.yHeight*scale,
      height - block.yBottom*scale - yOffset,
      block.color,
      blocksRoughOptions
    ));
  }
  let climbingHoldsRoughOptions = AdaptRoughOptionsToScale(levelSettings.climbingHolds.roughOptions, scale);
  for(let i = 0 ; i < levelSettings.climbingHolds.instances.length ; i++){
    let climbingHold = levelSettings.climbingHolds.instances[i];
    newLevel.climbingHolds.push(new ClimbingHold(
      new Coordinates(climbingHold.coordinates.x*scale+xOffset, height - climbingHold.coordinates.y*scale - yOffset),
      climbingHold.size*scale,
      climbingHold.type,
      climbingHold.hangWithLegs,
      climbingHold.color,
      climbingHoldsRoughOptions
    ));
  }
  let laddersRoughOptions = AdaptRoughOptionsToScale(levelSettings.ladders.roughOptions, scale);
  for(let i = 0; i < levelSettings.ladders.instances.length ; i++){
    let ladder = levelSettings.ladders.instances[i];
    newLevel.ladders.push(new LevelLadder(
      ladder.xLeft*scale+xOffset,
      ladder.xLeft*scale+xOffset + levelSettings.ladders.width*scale,
      height - ladder.yBottom*scale - yOffset - ladder.yHeight*scale,
      height - ladder.yBottom*scale - yOffset,
      levelSettings.ladders.yStep*scale,
      levelSettings.ladders.lineWidth*scale,
      ladder.color,
      laddersRoughOptions
    ));
  }
  let ropesRoughOptions = AdaptRoughOptionsToScale(levelSettings.ropes.roughOptions, scale);
  for(let i = 0; i < levelSettings.ropes.instances.length ; i++){
    let rope = levelSettings.ropes.instances[i];
    newLevel.ropes.push(new LevelRope(
      new Coordinates(rope.anchorLeft.x*scale+xOffset, height - yOffset - rope.anchorLeft.y*scale),
      new Coordinates(rope.anchorRight.x*scale+xOffset, height - yOffset - rope.anchorRight.y*scale),
      levelSettings.ropes.lineWidth*scale,
      rope.color,
      ropesRoughOptions
    ));
  }
  let collectiblesGearsRoughOptions = AdaptRoughOptionsToScale(levelSettings.collectibles.gears.roughOptions, scale);
  for(let i = 0; i < levelSettings.collectibles.gears.instances.length ; i++){
    let gear = levelSettings.collectibles.gears.instances[i];
    newLevel.collectibles.push(new LevelCollectible(
      new Coordinates(gear.coordinates.x*scale+xOffset, height - yOffset - gear.coordinates.y*scale),
      "gear",
      levelSettings.collectibles.gears.lineWidth,
      levelSettings.collectibles.gears.color,
      collectiblesGearsRoughOptions
    ));
  }
  newLevel.collectiblesToDraw = progressiveDrawMode ? 0 : newLevel.collectibles.length;
  let hazardsSpikesRoughOptions = AdaptRoughOptionsToScale(levelSettings.hazards.spikes.roughOptions, scale);
  for(let i = 0; i < levelSettings.hazards.spikes.instances.length ; i++){
    let spike = levelSettings.hazards.spikes.instances[i];
    newLevel.hazards.push(new LevelHazard(
      "spike",
      spike.xLeft*scale+xOffset,
      spike.xLeft*scale+xOffset + spike.xWidth*scale,
      height - spike.yBottom*scale - yOffset - spike.yHeight*scale,
      height - spike.yBottom*scale - yOffset,
      spike.direction,
      spike.patternRepeat,
      levelSettings.hazards.spikes.color,
      levelSettings.hazards.spikes.lineWidth*scale,
      hazardsSpikesRoughOptions
    ));
  }
  for(let i = 0; i < levelSettings.texts.length; i++){
    let text = levelSettings.texts[i];
    newLevel.texts.push(new LevelText(
      new Coordinates(text.coordinates.x*scale+xOffset, height - text.coordinates.y*scale-yOffset),
      text.fontColor,
      text.fontSize*scale,
      text.text
    ));
  }
  for(let i = 0; i < levelSettings.assets.length; i++){
    newLevel.assets.push(AdaptAssetToScale(levelSettings.assets[i], newLevel.levelLimits, scale));
  }
  LinkAssetsChildren(newLevel.assets);
  return newLevel;
}

function GetScaleFromLevel(levelSettings, width, height){
  let levelDesignWidth = levelSettings.levelLimits.width + levelSettings.levelLimits.xLeft + levelSettings.levelLimits.xRight;
  let levelDesignHeight = levelSettings.levelLimits.height + levelSettings.levelLimits.yCeiling + levelSettings.levelLimits.yGround;
  let wRatio = levelDesignWidth/width;
  let hRatio = levelDesignHeight/height;
  return Math.min(1/wRatio, 1/hRatio);
}

function GetBlockEdgeTypeForPlayer(level, blockIndex, side, player){
  if(blockIndex < 0 || blockIndex >= level.blocks.length)
    return null;
  let standDimensions = player.body.standDimensions();
  let crouchDimensions = player.body.crouchDimensions();
  let currentBlock = level.blocks[blockIndex];
  let yMax = currentBlock.yTop;
  let yMinStand = yMax - standDimensions.y;
  let yMinCrouch = yMax - crouchDimensions.y;
  let xMinStand = (side === "sideRight") ? currentBlock.xLeft : currentBlock.xRight - standDimensions.x;
  let xMinCrouch = (side === "sideRight") ? currentBlock.xLeft : currentBlock.xRight - crouchDimensions.x;
  let xMaxStand = (side === "sideRight") ? currentBlock.xLeft + standDimensions.x : currentBlock.xRight;
  let xMaxCrouch = (side === "sideRight") ? currentBlock.xLeft + crouchDimensions.x : currentBlock.xRight;
  let standOk = IsZoneClear(level, blockIndex, xMinStand, xMaxStand, yMinStand, yMax);
  let crouchOk = IsZoneClear(level, blockIndex, xMinCrouch, xMaxCrouch, yMinCrouch, yMax);
  return standOk ? "stand" : crouchOk ? "crouch" : null;
}
function GetBlockEdgeDownTypeForPlayer(level, blockIndex, side, player){
  if(blockIndex < 0 || blockIndex >= level.blocks.length)
    return null;
  let currentBlock = level.blocks[blockIndex];
  let standDimensions = player.body.standDimensions();
  let xMin = (side === "sideLeft") ? currentBlock.xRight : currentBlock.xLeft - standDimensions.x;
  let xMax = (side === "sideRight") ? currentBlock.xLeft : currentBlock.xRight + standDimensions.x;
  let yMaxHang = currentBlock.yTop + standDimensions.y;
  let yMaxHop = currentBlock.yTop + player.body.crossingAbility();
  let yMin = currentBlock.yTop;
  let usableHang = IsZoneClear(level, blockIndex, xMin, xMax, yMin, yMaxHang);
  let usableHop = IsZoneClear(level, blockIndex, xMin, xMax, yMin, yMaxHop);
  if(!(usableHang || usableHop))
    return null;
  return usableHang ? ((currentBlock.yBottom - currentBlock.yTop) > player.body.hangWithLegsHeightMin() ? "edgeHangingWithLegs" : "edgeHanging") : "edgeHopping";
}

function IsBlockWideEnough(level, blockIndex, player, stand){
  if(blockIndex === -1)
    return true;
  let block = level.blocks[blockIndex];
  let minWidth = stand ? player.body.standDimensions().x : player.body.crouchDimensions().x;
  return (block.xRight - block.xLeft > minWidth);
}

function GetBlockLimitCoords(level, blockIndex, xLimit, yLimit){ // transform to coords
  if(blockIndex >= level.blocks.length) return new Coordinates(0,0);
  let block = level.blocks[blockIndex];
  let x = (xLimit === "right") ? block.xRight : (xLimit === "left") ? block.xLeft : (block.xLeft + block.xRight)/2 ;
  let y = (yLimit === "top") ? block.yTop : (yLimit === "bottom") ? block.yBottom : (block.yTop + block.yBottom)/2 ;
  return new Coordinates(x,y);
}

function IsZoneClear(level, ignoreBlockIndex, xMin, xMax, yMin, yMax){
  let clear = xMin > level.levelLimits.xLeft && xMax < level.levelLimits.xRight && yMin >= level.levelLimits.yCeiling && yMax <= level.levelLimits.yGround;
  if(!clear)
    return false;
  let i = 0;
  while(clear && i < level.blocks.length){
    if(i !== ignoreBlockIndex){
      let b = level.blocks[i];
      clear = (b.xRight < xMin || b.xLeft > xMax || b.yTop > yMax || b.yBottom < yMin);
    }
    i++;
  }
  if(!clear)
    return false;
  i = 0;
  while(clear && i < level.hazards.length){
    let h = level.hazards[i];
    clear = (h.xRight < xMin || h.xLeft > xMax || h.yTop > yMax || h.yBottom < yMin);
    i++;
  }
  return clear;
}

function GetBlockIndexesInZone(level, ignoreBlockIndex, xMin, xMax, yMin, yMax, xLimit, yLimit, xSort){
  let indexes = [];
  let xValues = [];
  for(let i = 0 ; i < level.blocks.length ; i++){
    if(i !== ignoreBlockIndex){
      let b = level.blocks[i];
      let x = (xLimit === "left") ? b.xLeft : b.xRight;
      let y = (yLimit === "bottom") ? b.yBottom : b.yTop;
      if(x >= xMin && x <= xMax && y <= yMax && y >= yMin){
        // Block is in the zone, now placing it in the list following the order
        let j = 0;
        while(j < xValues.length && ((xSort === "ascending" && x < xValues[j]) || (xSort === "descending" && x > xValues[j]))){
          j++;
        }
        indexes.splice(j,0,i);
        xValues.splice(j,0,x);
      }
    }
  }
  return indexes;
}

function GetDistBetweenBlocks(level, firstIndex, secondIndex){
  let firstBlock = level.blocks[firstIndex];
  let secondBlock = level.blocks[secondIndex];
  if(firstBlock == null || secondBlock == null)
    return 0;
  let yDist = (firstBlock.yBottom < secondBlock.yTop) ? secondBlock.yTop - firstBlock.yBottom : (firstBlock.yTop > secondBlock.yBottom) ? secondBlock.yBottom - firstBlock.yTop : 0;
  let xDist = (firstBlock.xRight < secondBlock.xLeft) ? secondBlock.xLeft - firstBlock.xRight : (firstBlock.xLeft > secondBlock.xRight) ? secondBlock.xRight - firstBlock.xLeft : 0;
  return Math.pow(Math.pow(yDist,2) + Math.pow(xDist,2),.5);
}
