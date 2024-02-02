class Background_Mountains {
  constructor(config, levelLimits, scale, seed) {
    this.topLeftCoords = new Coordinates(config.topLeftCoords.x*scale + levelLimits.xLeft, levelLimits.yGround-config.topLeftCoords.y*scale);
    this.sizeCoords = new Coordinates(config.sizeCoords.x*scale,config.sizeCoords.y*scale);
    this.orientation = config.orientation;
    this.strokeStrength = config.strokeStrength*scale;
    this.strokeColor = config.strokeColor;
    this.baseGradient = new HslaGradient(config.baseGradient);
    this.topGradient = new HslaGradient(config.topGradient);
    this.topShadowGradient = new HslaGradient(config.topShadowGradient);
    this.randomShadowGradient = new HslaGradient(config.randomShadowGradient);
    this.rockGradient = new HslaGradient(config.rockGradient);
    this.treeGradient = new HslaGradient(config.treeGradient);
    this.yMin = config.yMin*scale;
    this.yMax = config.yMax*scale;
    this.yMinSnow = config.yMinSnow*scale;
    this.yMaxSnow = config.yMaxSnow*scale;
    this.xStep = config.xStep*scale;
    this.yStepMin = config.yStepMin*scale;
    this.yStepMax = config.yStepMax*scale;
    this.yInvertProbability = config.yInvertProbability;
    this.rockDensity = config.rockDensity;
    this.randomShadowDensity = config.randomShadowDensity;
    this.randomShadowLength = config.randomShadowLength*scale;
    this.randomShadowWidth = config.randomShadowWidth*scale;
    this.treeClusterDensity = config.treeClusterDensity;
    this.treeClusterSize = config.treeClusterSize*scale;
    this.treeClusterYStep = Math.max(1,config.treeClusterYStep*scale);
    this.treeCountPerCluster = config.treeCountPerCluster,
    this.treeSize = new Coordinates(config.treeSize.x*scale, config.treeSize.y*scale);
    this.roughness = config.roughness*scale;
    this.seed = seed;
  }
  draw(context){
    var t0 = performance.now();

    var t1 = performance.now();
    console.log("Render time : " + (t1 - t0) + " ms");
  }
  drawRough(context){
    var t0 = performance.now();
    let randomIndex = this.seed;
    let currentWidth = 0;
    let coordsArray = [];
    let transitionLimitArray = [];
    let peaksArray = [];
    let valleysArray = [];
    let shadowAreas = [];
    let rockAreas = [];
    let transitionAreas = [];
    let randomShadowsArray = [];
    let treeArray = [];
    let currentShadowArea = null;
    let currentAltPath = null;
    let currentAltCoords = null;
    let currentCoords = new Coordinates(this.topLeftCoords.x, this.topLeftCoords.y + this.yMin + (this.yMax-this.yMin)*randomHandler.giveNumber(randomIndex));
    randomIndex++;
    let currentSnowCoords = new Coordinates(this.topLeftCoords.x, this.topLeftCoords.y + this.yMinSnow + (this.yMaxSnow-this.yMinSnow)*randomHandler.giveNumber(randomIndex));
    randomIndex++;
    let direction = (randomHandler.giveNumber(randomIndex) > .5 ? 1 : -1);
    let nextDirection = direction;
    randomIndex++;
    let transitionDirection = (randomHandler.giveNumber(randomIndex) > .5 ? 1 : -1);
    randomIndex++;
    coordsArray.push(currentCoords.clone());
    transitionLimitArray.push(currentSnowCoords.clone())
    if(direction == -1){
      valleysArray.push(currentCoords.clone());
      currentShadowArea = [];
      currentShadowArea.push(currentCoords.clone());
      currentAltPath = [];
      currentAltCoords = currentCoords.clone();
    }
    // creating base shape with peak shadow areas
    while(currentWidth < this.sizeCoords.x){
      let yStep = this.yStepMin + (this.yStepMax-this.yStepMin)*randomHandler.giveNumber(randomIndex);
      randomIndex++;
      let yStepSnow = this.yStepMin + (this.yStepMax-this.yStepMin)*randomHandler.giveNumber(randomIndex);
      randomIndex++;
      nextDirection = direction*(randomHandler.giveNumber(randomIndex) > this.yInvertProbability ? 1 : -1);
      randomIndex++;
      transitionDirection = transitionDirection*(randomHandler.giveNumber(randomIndex) > this.yInvertProbability ? 1 : -1);
      randomIndex++;
      if(currentCoords.y + nextDirection*yStep < this.topLeftCoords.y + this.yMin || currentCoords.y + nextDirection*yStep > this.topLeftCoords.y + this.yMax){
        nextDirection *= -1;
      }
      if(currentSnowCoords.y + transitionDirection*yStepSnow < this.topLeftCoords.y + this.yMinSnow || currentSnowCoords.y + transitionDirection*yStepSnow > this.topLeftCoords.y + this.yMaxSnow){
        transitionDirection *= -1;
      }
      if(nextDirection != direction){
        if(direction == -1){
          peaksArray.push(currentCoords.clone());
          currentShadowArea.push(currentCoords.clone());
          randomIndex = this.closeShadowArea(shadowAreas, currentShadowArea, currentAltPath, rockAreas, randomIndex);
          currentShadowArea = null;
          currentAltPath = null;
          currentAltCoords = null;
        }
        else{
          valleysArray.push(currentCoords.clone());
          currentShadowArea = [];
          currentShadowArea.push(currentCoords.clone());
          currentAltPath = [];
          currentAltCoords = currentCoords.clone();
        }
      }
      currentCoords.x = Math.min(currentCoords.x + this.xStep, this.topLeftCoords.x + this.sizeCoords.x);
      currentSnowCoords.x = currentCoords.x;
      currentCoords.y += nextDirection*yStep;
      currentSnowCoords.y += transitionDirection*yStepSnow;
      currentSnowCoords.y = Math.max(currentSnowCoords.y, currentCoords.y);
      coordsArray.push(currentCoords.clone());
      if(transitionDirection == -1){
        let offset = new Coordinates(this.xStep, this.yStepMin+randomHandler.giveNumber(randomIndex)*this.yStepMax);
        randomIndex+=2;
        transitionLimitArray.push(currentSnowCoords.clone().addOffset(offset));
      }
      transitionLimitArray.push(currentSnowCoords.clone());
      if(currentShadowArea != null){
        currentShadowArea.push(currentCoords.clone());
        let yStepAlt = this.yStepMin + (this.yStepMax-this.yStepMin)*randomHandler.giveNumber(randomIndex);
        randomIndex++;
        currentAltCoords.x = Math.min(currentAltCoords.x + this.xStep, this.topLeftCoords.x + this.sizeCoords.x);
        currentAltCoords.y += yStepAlt;
        currentAltPath.push(currentAltCoords.clone());
        if(currentWidth + this.xStep > this.sizeCoords.x){
          randomIndex = this.closeShadowArea(shadowAreas, currentShadowArea, currentAltPath, rockAreas, randomIndex);
        }
      }
      // creating transition areas at the limit
      if(randomHandler.giveNumber(randomIndex) < 0.7){
        let rockCount = 1 + randomHandler.giveNumber(randomIndex+1)*3;
        for(let i = 0; i < rockCount; i++){
          let yStart = (randomHandler.giveNumber(randomIndex+1)-1)*(this.yStepMax);
          randomIndex++;
          let transitionArea = [];
          let transitionCoords = new Coordinates(currentCoords.x,currentSnowCoords.y + yStart);
          transitionArea.push(transitionCoords.clone());
          transitionCoords.x -= this.xStep;
          transitionCoords.y += this.yStepMin + (this.yStepMax-this.yStepMin)*(randomHandler.giveNumber(randomIndex)-.5);
          randomIndex++;
          let coordsCount = 1 + randomHandler.giveNumber(randomIndex+1)*4;
          randomIndex++;
          transitionArea.push(transitionCoords.clone());
          for(let j = 0; j < coordsCount; j++){
            transitionCoords.x += this.xStep;
            transitionCoords.y += (j+1>coordsCount) ? this.yStepMax/2 : this.yStepMin + (this.yStepMax-this.yStepMin)*randomHandler.giveNumber(randomIndex);
            randomIndex++;
            transitionArea.push(transitionCoords.clone());
          }
          transitionAreas.push(transitionArea);
        }
      }

      // creating random rocks
      if(randomHandler.giveNumber(randomIndex) < this.rockDensity){
        let rockCount = 5*this.rockDensity*(currentCoords.y - this.yMax)/(this.yMax-this.yMin);
        let yMin = currentAltCoords != null ? currentAltCoords.y : currentCoords.y;
        let segmentHeight = this.topLeftCoords.y + this.sizeCoords.y - yMin;
        for(let i = 0; i < rockCount; i++){
          let yStart = randomHandler.giveNumber(randomIndex+1)*(segmentHeight)+5;
          randomIndex++;
          let rockArea = [];
          let rockCoords = new Coordinates(currentCoords.x, yMin + yStart);
          rockArea.push(rockCoords.clone());
          let coordsCount = 2 + randomHandler.giveNumber(randomIndex+1)*2;
          randomIndex++;
          for(let j = 0; j < coordsCount; j++){
            rockCoords.x += this.xStep;
            rockCoords.y += this.yStepMin + (this.yStepMax-this.yStepMin)*randomHandler.giveNumber(randomIndex);
            randomIndex++;
            rockArea.push(rockCoords.clone());
          }
          rockAreas.push(rockArea);
        }
      }
      randomIndex++;

      // creating random shadow areas
      if(randomHandler.giveNumber(randomIndex) < this.randomShadowDensity){
        let yMin = currentAltCoords != null ? currentAltCoords.y : currentCoords.y;
        let segmentHeight = this.topLeftCoords.y + this.sizeCoords.y - yMin;
        let yStart = randomHandler.giveNumber(randomIndex+1)*(segmentHeight)+5;
        randomIndex++;
        let shadowArea = [];
        let shadowAreaBack = [];
        let shadowCoords = new Coordinates(currentCoords.x, yMin + yStart);
        shadowArea.push(shadowCoords.clone());
        let shadowLength = (this.randomShadowLength/this.xStep)*(.5 + randomHandler.giveNumber(randomIndex+1)*.5);
        randomIndex++;
        for(let i = 0; i < shadowLength; i++){
          shadowCoords.x += this.xStep;
          shadowCoords.y += this.yStepMin + (this.yStepMax-this.yStepMin)*randomHandler.giveNumber(randomIndex+1);
          randomIndex++;
          shadowArea.push(shadowCoords.clone());
          if(i != 0 && i+1 < shadowLength){
            let xOffset = this.randomShadowWidth/2 + (1 - 2*Math.abs(i-shadowLength/2)/shadowLength)*(this.randomShadowWidth/2)*randomHandler.giveNumber(randomIndex+1);
            randomIndex++;
            shadowAreaBack.push(shadowCoords.clone().addOffset(new Coordinates(xOffset,0)));
          }
        }
        for(let i = shadowAreaBack.length - 1; i > 0; i--){
          shadowArea.push(shadowAreaBack[i].clone());
        }
        randomShadowsArray.push(shadowArea);
      }
      randomIndex++;

      // Generating tree clusters
      let h = 0;
      let segmentHeight = this.topLeftCoords.y + this.sizeCoords.y - currentCoords.y;
      while(currentCoords.y + h < this.topLeftCoords.y + this.sizeCoords.y){
        let hRelative = h / segmentHeight;
        let properties = this.treeClusterPropertiesForHeight(hRelative);
        if(properties.density > 0){
          if(randomHandler.giveNumber(randomIndex) < properties.density){
            randomIndex = this.addTreeCluster(treeArray, new Coordinates(currentCoords.x, currentCoords.y + h), randomIndex+1);
          }
          randomIndex++;
        }
        h += this.treeClusterYStep;
      }

      currentWidth += this.xStep;
      direction = nextDirection;
    }
    coordsArray.push(new Coordinates(this.topLeftCoords.x + this.sizeCoords.x, this.topLeftCoords.y + this.sizeCoords.y));
    coordsArray.push(new Coordinates(this.topLeftCoords.x, this.topLeftCoords.y + this.sizeCoords.y));
    transitionLimitArray.push(new Coordinates(this.topLeftCoords.x + this.sizeCoords.x, this.topLeftCoords.y + this.sizeCoords.y));
    transitionLimitArray.push(new Coordinates(this.topLeftCoords.x, this.topLeftCoords.y + this.sizeCoords.y));

    let path = svgHelper.path_Polygon_Absolute(coordsArray);
    this.fillWithGradient(path, this.topGradient);
    context.path(
      path,
      {
        fill: "transparent",
        fillStyle: 'solid',
        strokeWidth: this.strokeStrength,
        stroke: (this.strokeStrength == 0 ? 'transparent' : this.strokeColor),
        roughness: this.roughness
      }
    );
    path = svgHelper.path_Polygon_Absolute(transitionLimitArray);
    this.fillWithGradient(path, this.baseGradient);
    for(let i = 0; i < transitionAreas.length; i++){
      let pth = svgHelper.path_Polygon_Absolute(transitionAreas[i]);
      this.fillWithGradient(pth, this.topGradient);
    }
    for(let i = 0; i < rockAreas.length; i++){
      let pth = svgHelper.path_Polygon_Absolute(rockAreas[i]);
      this.fillWithGradient(pth, this.rockGradient);
    }
    for(let i = 0; i < shadowAreas.length; i++){
      let pth = svgHelper.path_Polygon_Absolute(shadowAreas[i]);
      this.fillWithGradient(pth, this.topShadowGradient);
    }
    for(let i = 0; i < randomShadowsArray.length; i++){
      let pth = svgHelper.path_Polygon_Absolute(randomShadowsArray[i]);
      this.fillWithGradient(pth, this.randomShadowGradient);
    }
    this.drawTrees(treeArray, this.treeGradient);

    var t1 = performance.now();
    console.log("Render time : " + (t1 - t0) + " ms");
  }
  closeShadowArea(shadowAreasArray, currentShadowAreaArray, secondPathArray, rockAreasArray, randomIndex){
    if(currentShadowAreaArray.length < 2 || secondPathArray.length < 2)
      return randomIndex;
    let finalShadowArea = [];
    // copying the path to the peak
    for(let i = 0; i < currentShadowAreaArray.length; i++){
      finalShadowArea.push(currentShadowAreaArray[i].clone());
    }
    // creating the vertical path
    let currentCoords = currentShadowAreaArray[currentShadowAreaArray.length-1].clone();
    let endY = secondPathArray[secondPathArray.length-1].y;
    while(currentCoords.y < endY){
      currentCoords.y += this.xStep;
      let randomX = (randomHandler.giveNumber(randomIndex)-.5)*this.xStep*3;
      randomIndex++;
      finalShadowArea.push(new Coordinates(currentCoords.x + randomX, currentCoords.y));
    }
    // copying the path the the valley backwards
    for(let i = secondPathArray.length -1; i >= 0; i--){
      finalShadowArea.push(secondPathArray[i].clone());
    }
    shadowAreasArray.push(finalShadowArea);
    return randomIndex;
  }
  fillWithGradient(path, hslaGgradient){
    let canvasContext = GetCanvasContext();
    let canvasGradient = canvasContext.createLinearGradient(0,this.topLeftCoords.y,0,this.topLeftCoords.y+this.sizeCoords.y);
    for(let i = 0; i < hslaGgradient.colorStops.length; i++){
      canvasGradient.addColorStop(hslaGgradient.colorStops[i].position, hslaGgradient.colorStops[i].color.getColorString());
    }
    canvasContext.beginPath();
    canvasContext.fillStyle = canvasGradient;
    canvasContext.fill(new Path2D(path));
  }
  treeClusterPropertiesForHeight(height){
    if(height < 0 || height > 1) return null;
    let i = 0;
    while(this.treeClusterDensity[i].y < height){
      i++;
    };
    let j = Math.max(i-1,0);
    let factor = (height - this.treeClusterDensity[j].y)/(this.treeClusterDensity[i].y - this.treeClusterDensity[j].y);
    return {
      density : this.treeClusterDensity[j].density + (this.treeClusterDensity[i].density - this.treeClusterDensity[j].density)*factor,
      scale: this.treeClusterDensity[j].scale + (this.treeClusterDensity[i].scale - this.treeClusterDensity[j].scale)*factor,
    };
  }
  addTreeCluster(treeArray, startCoords, randomIndex){
    for(let i = 0; i < this.treeCountPerCluster; i++){
      let x = randomHandler.giveNumber(randomIndex)-.5;
      let y = randomHandler.giveNumber(randomIndex+1)-.5;
      randomIndex+=2;
      treeArray.push(startCoords.clone().addOffset(new Coordinates(x*this.treeClusterSize,y*this.treeClusterSize)));
    }
    return randomIndex;
  }
  drawTrees(treeArray, hslaGgradient){
    let canvasContext = GetCanvasContext();
    let canvasGradient = canvasContext.createLinearGradient(0,this.topLeftCoords.y,0,this.topLeftCoords.y+this.sizeCoords.y);
    for(let i = 0; i < hslaGgradient.colorStops.length; i++){
      canvasGradient.addColorStop(hslaGgradient.colorStops[i].position, hslaGgradient.colorStops[i].color.getColorString());
    }
    canvasContext.fillStyle = canvasGradient;
    for(let i = 0; i < treeArray.length; i++){
      let path = svgHelper.path_Triangle(treeArray[i].clone(), new Coordinates(0,0), this.treeSize.clone(), 0, 0);
      canvasContext.beginPath();
      canvasContext.fill(new Path2D(path));
    }
  }
}
