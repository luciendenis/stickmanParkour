class Ground_Depth_Grass {
  constructor(config, levelLimits, scale, seed) {
    this.startCoords = new Coordinates(config.startCoords.x*scale + levelLimits.xLeft, levelLimits.yGround-config.startCoords.y*scale);
    this.orientation = config.orientation;
    this.depthPolygon = new DepthPolygon(config.depthPolygon, scale);
    this.backgroundGradient = new HslaGradient(config.backgroundGradient);
    this.grassGradient = new HslaGradient(config.grassGradient);
    this.grassVariationGradient = new HslaGradient(config.grassVariationGradient);
    this.tuftSize = config.tuftSize;
    this.tuftBowing = config.tuftBowing;
    this.tuftMaxGapVertical = config.tuftMaxGapVertical*scale;
    this.tuftMaxGapHorizontal = config.tuftMaxGapHorizontal*scale;
    this.leafColorVariation = new HslaColor().parse(config.leafColorVariation);
    this.leafDensity = Math.max(0.1,Math.min(1,config.leafDensity));
    this.leafAngle = config.leafAngle;
    this.leafBowing = config.leafBowing;
    this.leafMinWidth = config.leafMinWidth*scale;
    this.leafMaxWidth = config.leafMaxWidth*scale;
    this.leafWidthRandomness = Math.max(0,Math.min(1,config.leafWidthRandomness));
    this.leafMinHeight = config.leafMinHeight*scale;
    this.leafMaxHeight = config.leafMaxHeight*scale;
    this.leafHeightRandomness = Math.max(0,Math.min(1,config.leafHeightRandomness));
    this.seed = seed;
  }
  draw(context){
    var t0 = performance.now();
    let maxGap = this.tuftMaxGapVertical;
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

    // Drawing grass tufts
    for(let i = 0; i < stepsProperties.length; i++){
      let pHeight = stepsProperties[i].height;
      let properties = stepsProperties[i].properties;
      let countInstances = properties.length/this.tuftMaxGapHorizontal;
      let xMin = properties.offset;
      let xMax = properties.offset + properties.length;
      let color = this.grassGradient.getColorForPosition(pHeight/dpMaxDist);
      let colorVariation = this.grassVariationGradient.getColorForPosition(pHeight/dpMaxDist);
      for(let j = 0; j < countInstances; j++){
        let width = properties.scale*this.tuftSize;
        let x = properties.offset + (properties.length)*randomHandler.giveNumber(currentRandomIndex);
        currentRandomIndex++;
        let y = pHeight + properties.scale*6*randomHandler.giveNumber(currentRandomIndex);
        currentRandomIndex++;
        let tuftColor = color.clone();
        currentRandomIndex = tuftColor.randomize(colorVariation, currentRandomIndex);
        currentRandomIndex = this.drawGrassTuft(
          context,
          tuftColor,
          new Coordinates(x,y),
          xMin,
          xMax,
          width,
          this.tuftBowing,
          this.orientation-(Math.PI/2),
          this.leafAngle,
          currentRandomIndex
        );
      }
    }

    // Drawing grass leafs
    for(let i = 0; i < stepsProperties.length; i++){
      let pHeight = stepsProperties[i].height;
      let properties = stepsProperties[i].properties;
      if(properties.scale > 0.1){
        let divider = properties.scale > 1 ? 8 : properties.scale > 0.4 ? 12 : 20;
        totalInstances += properties.length/(properties.scale*divider);
        for(let j = 0; j < properties.length/(properties.scale*divider); j++){
          let x = properties.offset + properties.length*randomHandler.giveNumber(currentRandomIndex);
          currentRandomIndex++;
          let y = pHeight + properties.scale*6*randomHandler.giveNumber(currentRandomIndex);
          currentRandomIndex++;
          let width = properties.scale*2;
          let height = properties.scale*8 + properties.scale*8*randomHandler.giveNumber(currentRandomIndex);
          currentRandomIndex++;
          let deviation = properties.scale*10*(randomHandler.giveNumber(currentRandomIndex)-.5);
          currentRandomIndex++;
          let pth = svgHelper.path_grass_leaf(
            this.startCoords,
            new Coordinates(x,y),
            new Coordinates(width,height),
            this.orientation-(Math.PI/2),
            this.leafAngle,
            deviation
          );
          context.beginPath();
          context.lineWidth = properties.scale*.1;
          context.strokeStyle = "black";
          context.stroke(new Path2D(pth));
        }
      }
      actualGap = maxGap*properties.scale;
      currentHeight += actualGap;
    }
    var t1 = performance.now();
    console.log("Render time : " + (t1 - t0) + " ms");
  }
  drawRough(context){
    var t0 = performance.now();
    let maxGap = this.tuftMaxGapVertical;
    let dpMaxDist = this.depthPolygon.maxDistance();
    let actualGap = maxGap*this.depthPolygon.startScale;
    let currentHeight = 0;
    let totalInstances = 0;
    let currentRandomIndex = this.seed;

    // drawing the soil on the Canvas not rough
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

    // Drawing grass tufts
    for(let i = 0; i < stepsProperties.length; i++){
      let pHeight = stepsProperties[i].height;
      let properties = stepsProperties[i].properties;
      let countInstances = properties.length/this.tuftMaxGapHorizontal;
      let xMin = properties.offset;
      let xMax = properties.offset + properties.length;
      let color = this.grassGradient.getColorForPosition(pHeight/dpMaxDist);
      let colorVariation = this.grassVariationGradient.getColorForPosition(pHeight/dpMaxDist);
      for(let j = 0; j < countInstances; j++){
        let width = properties.scale*this.tuftSize;
        let x = properties.offset + (properties.length)*randomHandler.giveNumber(currentRandomIndex);
        currentRandomIndex++;
        let y = pHeight + properties.scale*6*randomHandler.giveNumber(currentRandomIndex);
        currentRandomIndex++;
        let tuftColor = color.clone();
        currentRandomIndex = tuftColor.randomize(colorVariation, currentRandomIndex);
        currentRandomIndex = this.drawGrassTuft(
          canvasContext,
          tuftColor,
          new Coordinates(x,y),
          xMin,
          xMax,
          width,
          this.tuftBowing,
          this.orientation-(Math.PI/2),
          this.leafAngle,
          currentRandomIndex
        );
      }
    }

    // Drawing grass leafs
    for(let i = 0; i < stepsProperties.length; i++){
      let pHeight = stepsProperties[i].height;
      let properties = stepsProperties[i].properties;
      if(properties.scale > 0.1){
        let divider = properties.scale > 1 ? 8 : properties.scale > 0.4 ? 12 : 20;
        totalInstances += properties.length/(properties.scale*divider);
        for(let j = 0; j < properties.length/(properties.scale*divider); j++){
          let x = properties.offset + properties.length*randomHandler.giveNumber(currentRandomIndex);
          currentRandomIndex++;
          let y = pHeight + properties.scale*6*randomHandler.giveNumber(currentRandomIndex);
          currentRandomIndex++;
          let width = properties.scale*2;
          let height = properties.scale*8 + properties.scale*8*randomHandler.giveNumber(currentRandomIndex);
          currentRandomIndex++;
          let deviation = properties.scale*10*(randomHandler.giveNumber(currentRandomIndex)-.5);
          currentRandomIndex++;
          let pth = svgHelper.path_grass_leaf(
            this.startCoords,
            new Coordinates(x,y),
            new Coordinates(width,height),
            this.orientation-(Math.PI/2),
            this.leafAngle,
            deviation
          );
          context.path(
            pth,
            {
              fill: "transparent",
              fillStyle: 'solid',
              strokeWidth: properties.scale*.1,
              stroke: "black",
              roughness:0.5*properties.scale
            }
          );
        }
      }
      actualGap = maxGap*properties.scale;
      currentHeight += actualGap;
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
  drawGrassTuft(context,color,coords,xMin,xMax,width,bowing,orientation,angle,randomIndex){
    // rough or not, the context is the canvas
    //context.fillStyle = color.getColorString();
    let countLeafs = width*this.leafDensity;
    let sizeModifier = width/this.tuftSize;
    let xStep = width/countLeafs;
    let fixedWidth = (this.leafMaxWidth-this.leafMinWidth)*(1-this.leafWidthRandomness);
    let randomWidth = (this.leafMaxWidth-this.leafMinWidth)*this.leafWidthRandomness;
    let fixedHeight = (this.leafMaxHeight-this.leafMinHeight)*(1-this.leafHeightRandomness);
    let randomHeight = (this.leafMaxHeight-this.leafMinHeight)*this.leafHeightRandomness;
    for(let i = 0; i < countLeafs; i++){
      let x = (i - i%2)*xStep/2;
      if(coords.x - width/4 + x > xMin && coords.x - width/4 + x < xMax)
      {
        let xModifier = (1-Math.abs((width/4)-x)/(width/4));
        let y = bowing*Math.sqrt(xModifier)*width/30;
        let leafWidth = sizeModifier*xModifier*(fixedWidth+randomHandler.giveNumber(randomIndex)*randomWidth) + this.leafMinWidth;
        randomIndex++;
        let leafHeight = (sizeModifier*xModifier*(fixedHeight +randomHandler.giveNumber(randomIndex)*randomHeight)+ this.leafMinHeight)*(i % 2 == 0 ? 1 : -1);
        randomIndex++;
        let leafDeviation = this.leafBowing*leafHeight*(randomHandler.giveNumber(randomIndex)-.5);
        randomIndex++;
        y -= leafHeight*0.1;
        let col = color.clone();
        randomIndex = col.randomize(this.leafColorVariation,randomIndex);
        context.fillStyle = col.getColorString();
        let leafPath = svgHelper.path_grass_leaf(this.startCoords, new Coordinates(coords.x - width/4 + x,coords.y - y), new Coordinates(leafWidth,leafHeight), orientation, angle, leafDeviation);
        context.beginPath();
        context.fill(new Path2D(leafPath));
      }
    }
    return randomIndex;
  }
}
