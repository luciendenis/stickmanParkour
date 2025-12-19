class Background_Mist {
  constructor(config, levelLimits, scale, seed) {
    this.topLeftCoords = new Coordinates(config.topLeftCoords.x*scale + levelLimits.xLeft, levelLimits.yGround-config.topLeftCoords.y*scale);
    this.sizeCoords = new Coordinates(config.sizeCoords.x*scale,config.sizeCoords.y*scale);
    this.orientation = config.orientation;
    this.baseGradient = new HslaGradient(config.baseGradient);
    this.cloudGradient = new HslaGradient(config.cloudGradient);
    this.cloudClusterDensity = config.cloudClusterDensity;
    this.cloudClusterSize = config.cloudClusterSize*scale;
    this.cloudClusterXStep = config.cloudClusterXStep*scale;
    this.cloudClusterYStep = config.cloudClusterYStep*scale;
    this.cloudCountPerCluster = config.cloudCountPerCluster;
    this.cloudSize = new Coordinates(config.cloudSize.x*scale,config.cloudSize.y*scale);
    this.seed = seed;
  }
  draw(context){
    var t0 = performance.now();
    let randomIndex = this.seed;
    let canvasContext = GetCanvasContext();

    // Drawing the base gradient
    let canvasGradient = canvasContext.createLinearGradient(0,this.topLeftCoords.y,0,this.topLeftCoords.y+this.sizeCoords.y);
    for(let i = 0; i < this.baseGradient.colorStops.length; i++){
      canvasGradient.addColorStop(this.baseGradient.colorStops[i].position, this.baseGradient.colorStops[i].color.getColorString());
    }
    canvasContext.beginPath();
    canvasContext.fillStyle = canvasGradient;
    canvasContext.fillRect(this.topLeftCoords.x,this.topLeftCoords.y,this.sizeCoords.x,this.sizeCoords.y);

    // Drawing random clouds
    let currentHeight = 0;
    while(currentHeight < this.sizeCoords.y){
      let proportion = currentHeight/this.sizeCoords.y;
      let properties = this.cloudClusterPropertiesForHeight(proportion);
      if(properties.density > 0){
        let clusterCount = this.sizeCoords.x/this.cloudClusterXStep;
        for(let i = 0; i < clusterCount; i++){
          if(randomHandler.giveNumber(randomIndex) < properties.density){
            let x = randomHandler.giveNumber(randomIndex + 1)*this.sizeCoords.x;
            randomIndex++;
            randomIndex = this.drawCloudCluster(canvasContext, new Coordinates(x, currentHeight), properties.scale, randomIndex+1);
          }
          randomIndex++;
        }
      }

      currentHeight += this.cloudClusterYStep;
    }

    var t1 = performance.now();
    console.log("Render time : " + (t1 - t0) + " ms");
  }
  drawRough(context){
    this.draw(context);
  }
  cloudClusterPropertiesForHeight(height){
    if(height < 0 || height > 1) return null;
    let i = 0;
    while(this.cloudClusterDensity[i].y < height){
      i++;
    }
    let j = Math.max(i-1,0);
    let factor = (height - this.cloudClusterDensity[j].y)/(this.cloudClusterDensity[i].y - this.cloudClusterDensity[j].y);
    return {
      density : this.cloudClusterDensity[j].density + (this.cloudClusterDensity[i].density - this.cloudClusterDensity[j].density)*factor,
      scale: this.cloudClusterDensity[j].scale + (this.cloudClusterDensity[i].scale - this.cloudClusterDensity[j].scale)*factor,
    };
  }
  drawCloudCluster(context, coords, scale, randomIndex){
    let x = coords.x + this.topLeftCoords.x;
    let y = coords.y + this.topLeftCoords.y;
    let radialGradient = context.createRadialGradient(x, y, 0, x, y, this.cloudClusterSize*scale);
    for(let i = 0; i < this.cloudGradient.colorStops.length; i++){
      radialGradient.addColorStop(this.cloudGradient.colorStops[i].position, this.cloudGradient.colorStops[i].color.getColorString());
    }
    context.fillStyle = radialGradient;
    context.beginPath();
    context.arc(x, y, this.cloudClusterSize*scale, 0, 2*Math.PI);
    context.fill();
    for(let i = 0; i < this.cloudCountPerCluster; i++){
      let rx = (randomHandler.giveNumber(randomIndex)-.5)*this.cloudClusterSize*scale;
      let ry = (randomHandler.giveNumber(randomIndex+1)-.5)*this.cloudClusterSize*scale;
      randomIndex+=2;
      radialGradient = context.createRadialGradient(x+rx, y+ry, 0, x+rx, y+ry, this.cloudSize.x*scale);
      for(let j = 0; j < this.cloudGradient.colorStops.length; j++){
        radialGradient.addColorStop(this.cloudGradient.colorStops[j].position, this.cloudGradient.colorStops[j].color.getColorString());
      }
      context.fillStyle = radialGradient;
      context.beginPath();
      context.arc(x+rx, y+ry, this.cloudSize.x*scale, 0, 2*Math.PI);
      context.fill();
    }

    return randomIndex;
  }
}
