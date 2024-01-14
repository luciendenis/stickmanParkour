class Ground_Depth_Concrete {
  constructor(config, levelLimits, scale, seed) {
    this.startCoords = new Coordinates(config.startCoords.x*scale + levelLimits.xLeft, levelLimits.yGround-config.startCoords.y*scale);
    this.orientation = config.orientation;
    this.depthPolygon = new DepthPolygon(config.depthPolygon, scale);
    this.backgroundGradient = new HslaGradient(config.backgroundGradient);
    this.strokeColor = config.strokeColor;
    this.strokeMaxGapVertical = config.strokeMaxGapVertical*scale;
    this.strokeMaxGapHorizontal = config.strokeMaxGapHorizontal*scale;
    this.strokeMinWidth = config.strokeMinWidth*scale;
    this.strokeMaxWidth = config.strokeMaxWidth*scale;
    this.strokeWidthRandomness = Math.max(0,Math.min(1,config.strokeWidthRandomness));
    this.seed = seed;
  }
  draw(context){
    var t0 = performance.now();
    let maxGap = this.strokeMaxGapVertical;
    let dpMaxDist = this.depthPolygon.maxDistance();
    let actualGap = maxGap*this.depthPolygon.startScale;
    let currentHeight = 0;
    let totalInstances = 0;
    let currentRandomIndex = this.seed;

    this.drawGradient(context);

    let stepsProperties = [];
    while(currentHeight < dpMaxDist){
      let properties = this.depthPolygon.propertiesForDistance(currentHeight);
      stepsProperties.push({
        height:currentHeight,
        properties:properties
      });
      actualGap = maxGap*properties.scale;
      currentHeight += actualGap;
    }

    // Drawing strokes
    for(let i = 0; i < stepsProperties.length; i++){
      let pHeight = stepsProperties[i].height;
      let properties = stepsProperties[i].properties;
      let countInstances = properties.length/this.strokeMaxGapHorizontal;
      let xMin = properties.offset;
      let xMax = properties.offset + properties.length;
      let fixedWidth = this.strokeMaxWidth*(1-this.strokeWidthRandomness);
      let randomWidth = this.strokeMaxWidth*this.strokeWidthRandomness;
      for(let j = 0; j < countInstances; j++){
        let width = properties.scale*(this.strokeMinWidth + (fixedWidth + randomWidth*randomHandler.giveNumber(currentRandomIndex)));
        currentRandomIndex++;
        let x = properties.offset + (properties.length)*randomHandler.giveNumber(currentRandomIndex);
        currentRandomIndex++;
        let y = pHeight + properties.scale*1*randomHandler.giveNumber(currentRandomIndex);
        currentRandomIndex++;
        let pth = svgHelper.path_Line(
          this.startCoords,
          new Coordinates(x,y),
          new Coordinates(width,0),
          0
        );
        context.beginPath();
        context.strokeStyle = this.strokeColor;
        context.lineWidth = 0.5*properties.scale;
        context.stroke(new Path2D(pth));
      }
    }

    var t1 = performance.now();
    console.log("Render time : " + (t1 - t0) + " ms");
  }
  drawRough(context){
    var t0 = performance.now();
    let maxGap = this.strokeMaxGapVertical;
    let dpMaxDist = this.depthPolygon.maxDistance();
    let actualGap = maxGap*this.depthPolygon.startScale;
    let currentHeight = 0;
    let totalInstances = 0;
    let currentRandomIndex = this.seed;

    let canvasContext = GetCanvasContext();
    this.drawGradient(canvasContext);

    let stepsProperties = [];
    while(currentHeight < dpMaxDist){
      let properties = this.depthPolygon.propertiesForDistance(currentHeight);
      stepsProperties.push({
        height:currentHeight,
        properties:properties
      });
      actualGap = maxGap*properties.scale;
      currentHeight += actualGap;
    }

    // Drawing strokes
    for(let i = 0; i < stepsProperties.length; i++){
      let pHeight = stepsProperties[i].height;
      let properties = stepsProperties[i].properties;
      let countInstances = properties.length/this.strokeMaxGapHorizontal;
      let xMin = properties.offset;
      let xMax = properties.offset + properties.length;
      let fixedWidth = this.strokeMaxWidth*(1-this.strokeWidthRandomness);
      let randomWidth = this.strokeMaxWidth*this.strokeWidthRandomness;
      for(let j = 0; j < countInstances; j++){
        let width = properties.scale*(this.strokeMinWidth + (fixedWidth + randomWidth*randomHandler.giveNumber(currentRandomIndex)));
        currentRandomIndex++;
        let x = properties.offset + (properties.length)*randomHandler.giveNumber(currentRandomIndex);
        currentRandomIndex++;
        let y = pHeight + properties.scale*1*randomHandler.giveNumber(currentRandomIndex);
        currentRandomIndex++;
        let pth = svgHelper.path_Line(
          this.startCoords,
          new Coordinates(x,y),
          new Coordinates(width,0),
          0
        );
        context.path(
          pth,
          {
            strokeWidth: 0.5*properties.scale,
            stroke: this.strokeColor,
            roughness: 0.5*properties.scale
          }
        )
      }
    }

    var t1 = performance.now();
    console.log("Render time : " + (t1 - t0) + " ms");
  }
  drawGradient(context){
    // rough or not, the context is the canvas
    let coordsSvg = this.depthPolygon.getArrayOfCoordsForSvgPath();
    let path = svgHelper.path_Polygon_Relative(this.startCoords, new Coordinates(0,0), coordsSvg, this.orientation, 0);
    let gradient = context.createLinearGradient(0,this.startCoords.y,0,this.startCoords.y+this.depthPolygon.maxDistance());
    for(let i = 0; i < this.backgroundGradient.colorStops.length; i++){
      gradient.addColorStop(this.backgroundGradient.colorStops[i].position, this.backgroundGradient.colorStops[i].color.getColorString());
    }
    context.beginPath();
    context.fillStyle = gradient;
    context.fill(new Path2D(path));
  }
}
