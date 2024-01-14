class Background_Sky {
  constructor(config, levelLimits, scale, seed) {
    this.gradient =  new HslaGradient(config.gradient);
    this.topLeftCoords = new Coordinates(levelLimits.xLeft, levelLimits.yCeiling);
    this.sizeCoords = new Coordinates(levelLimits.xRight, levelLimits.yGround);
    this.seed = seed;
  }
  draw(context){
    this.drawGradient();
  }
  drawRough(context){
    this.drawGradient();
  }
  drawGradient(){
    let canvasContext = GetCanvasContext();
    let gradient = canvasContext.createLinearGradient(0,this.topLeftCoords.y,0,this.topLeftCoords.y+this.sizeCoords.y);
    for(let i = 0; i < this.gradient.colorStops.length; i++){
      gradient.addColorStop(this.gradient.colorStops[i].position, this.gradient.colorStops[i].color.getColorString());
    }
    canvasContext.beginPath();
    canvasContext.fillStyle = gradient;
    canvasContext.fillRect(this.topLeftCoords.x, this.topLeftCoords.y, this.sizeCoords.x, this.sizeCoords.y);
  }
}
