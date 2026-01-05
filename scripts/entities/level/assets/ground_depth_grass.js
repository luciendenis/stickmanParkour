class Ground_Depth_Grass {
  constructor(config, levelLimits, scale, seed) {
    this.startCoords = new Coordinates(config.startCoords.x*scale + levelLimits.xLeft, levelLimits.yGround-config.startCoords.y*scale);
    this.orientation = config.orientation;
    this.strokeStrength = config.strokeStrength*scale;
    this.strokeColor = config.strokeColor;
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
    this.leafStrokeProbability = config.leafStrokeProbability;
    this.roughness = config.roughness*scale;
    this.seed = seed;
    this.children = [];
    this.shadowAreas = [];
  }
  addChild(child){
    // pushing the child object to draw
    this.children.push(child);
    // pushing the child object shadow
    let childHitbox = child.getHitBox();
    let dist = child.startCoords.y - this.startCoords.y;
    let depth = this.depthPolygon.propertiesForDistance(dist).scale*childHitbox.totalWidth()/6;
    this.shadowAreas.push({
      type:child.getShadowType(),
      centerCoords:new Coordinates(childHitbox.left-this.startCoords.x+childHitbox.totalWidth()/2,dist),
      hitbox:new HitBox(-childHitbox.totalWidth()/2,childHitbox.totalWidth()/2,-depth/3,2*depth/3)});
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
    let previousHeight = stepsProperties[0].height;
    for(let i = 0; i < stepsProperties.length; i++){
      let pHeight = stepsProperties[i].height;
      let properties = stepsProperties[i].properties;
      let countInstances = properties.length/this.tuftMaxGapHorizontal;
      let width = properties.scale*this.tuftSize;
      let xMin = properties.offset;
      let xMax = properties.offset + properties.length;
      let color = this.grassGradient.getColorForPosition(pHeight/dpMaxDist);
      let colorVariation = this.grassVariationGradient.getColorForPosition(pHeight/dpMaxDist);
      // Checking if there are children to draw
      for(let j = 0; j < this.children.length; j++){
        if(this.children[j].startCoords.y > this.startCoords.y + previousHeight && this.children[j].startCoords.y < this.startCoords.y + pHeight){
          this.children[j].draw(context);
          // draw additional grass tuft to blend in the child asset
          let tuftColor = color.clone();
          currentRandomIndex = tuftColor.randomize(colorVariation, currentRandomIndex);
          currentRandomIndex = this.drawGrassTuft(
            context,
            null,
            tuftColor,
            new Coordinates(this.children[j].startCoords.x-this.startCoords.x,this.children[j].startCoords.y-this.startCoords.y),
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

      for(let j = 0; j < countInstances; j++){
        let x = properties.offset + (properties.length)*randomHandler.giveNumber(currentRandomIndex);
        currentRandomIndex++;
        let y = pHeight + properties.scale*6*randomHandler.giveNumber(currentRandomIndex);
        currentRandomIndex++;
        let tuftColor = color.clone();
        currentRandomIndex = tuftColor.randomize(colorVariation, currentRandomIndex);
        currentRandomIndex = this.drawGrassTuft(
          context,
          null,
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
      previousHeight = pHeight;
    }
    var t1 = performance.now();
    if(debugMode) console.log("Render time : " + (t1 - t0) + " ms");
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
    let previousHeight = stepsProperties[0].height;
    for(let i = 0; i < stepsProperties.length; i++){
      let pHeight = stepsProperties[i].height;
      let properties = stepsProperties[i].properties;
      let countInstances = properties.length/this.tuftMaxGapHorizontal;
      let width = properties.scale*this.tuftSize;
      let xMin = properties.offset;
      let xMax = properties.offset + properties.length;
      let color = this.grassGradient.getColorForPosition(pHeight/dpMaxDist);
      let colorVariation = this.grassVariationGradient.getColorForPosition(pHeight/dpMaxDist);
      // Checking if there are children to draw
      for(let j = 0; j < this.children.length; j++){
        if(this.children[j].startCoords.y > this.startCoords.y + previousHeight && this.children[j].startCoords.y < this.startCoords.y + pHeight){
          this.children[j].drawRough(context);
          // draw additional grass tuft to blend in the child asset
          let tuftColor = color.clone();
          currentRandomIndex = tuftColor.randomize(colorVariation, currentRandomIndex);
          currentRandomIndex = this.drawGrassTuft(
            canvasContext,
            context,
            tuftColor,
            new Coordinates(this.children[j].startCoords.x-this.startCoords.x,this.children[j].startCoords.y-this.startCoords.y),
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

      for(let j = 0; j < countInstances; j++){
        let x = properties.offset + (properties.length)*randomHandler.giveNumber(currentRandomIndex);
        currentRandomIndex++;
        let y = pHeight + properties.scale*6*randomHandler.giveNumber(currentRandomIndex);
        currentRandomIndex++;
        let tuftColor = color.clone();
        currentRandomIndex = tuftColor.randomize(colorVariation, currentRandomIndex);
        currentRandomIndex = this.drawGrassTuft(
          canvasContext,
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
      previousHeight = pHeight;
    }
    var t1 = performance.now();
    if(debugMode) console.log("Render time : " + (t1 - t0) + " ms");
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
    // draw shadow areas
    if(this.shadowAreas.length > 0){
      gradient = context.createLinearGradient(0,this.startCoords.y,0,this.startCoords.y+this.depthPolygon.maxDistance());
      for(let i = 0; i < this.backgroundGradient.colorStops.length; i++){
        gradient.addColorStop(this.backgroundGradient.colorStops[i].position, this.backgroundGradient.colorStops[i].color.add(new HslaColor(0,0,-20,0)).getColorString());
      }
    }
    for(let i = 0; i < this.shadowAreas.length; i++){
      let s = this.shadowAreas[i];
      let shadowPath;
      if(s.type == "rectangle"){
        shadowPath = svgHelper.path_Rectangle(
          this.startCoords,
          new Coordinates(s.centerCoords.x+s.hitbox.left,s.centerCoords.y+s.hitbox.bottom),
          new Coordinates(s.hitbox.totalWidth(),s.hitbox.totalHeight()),
          0,
          0
        );
      }
      else if(s.type == "circle"){
        shadowPath = svgHelper.path_lens(
          this.startCoords,
          new Coordinates(s.centerCoords.x+s.hitbox.left,s.centerCoords.y),
          2*s.hitbox.totalWidth(),
          8*s.hitbox.bottom/s.hitbox.totalHeight(),
          8*s.hitbox.top/s.hitbox.totalHeight(),
          0,
          0
        );
      }
      context.beginPath();
      context.fillStyle = gradient;
      context.fill(new Path2D(shadowPath));
    }
  }
  drawGrassTuft(context,roughContext,color,coords,xMin,xMax,width,bowing,orientation,angle,randomIndex){
    if(this.coordsInShadow(coords)){
      color.lightness = 12;
    }
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
        // Drawing the stroke
        if(i%2 == 0 && randomHandler.giveNumber(randomIndex) < this.leafStrokeProbability){
          if(roughContext != null){
            roughContext.path(
              leafPath,
              {
                fill: 'transparent',
                fillStyle: 'solid',
                strokeWidth: this.strokeStrength,
                stroke: this.strokeColor,
                roughness: this.roughness
              }
            );
          }
          else{
            context.lineWidth = this.strokeStrength;
            context.strokeStyle = this.strokeColor;
            context.stroke(new Path2D(leafPath));
          }
        }
        randomIndex++;
      }
    }
    return randomIndex;
  }
  coordsInShadow(coords){
    let inShadow = false;
    let i = 0;
    while(!inShadow && i < this.shadowAreas.length){
      let s = this.shadowAreas[i];
      if(s.type == "rectangle"){
        inShadow = (coords.x > s.centerCoords.x + s.hitbox.left && coords.x < s.centerCoords.x + s.hitbox.right && coords.y > s.centerCoords.y + s.hitbox.top && coords.y < s.centerCoords.y + s.hitbox.bottom);
      }
      else if(s.type == "circle"){
        if(coords.y < s.centerCoords.y){
          inShadow = Math.pow(coords.x - s.centerCoords.x,2)/Math.pow(s.hitbox.left,2) + Math.pow(coords.y - s.centerCoords.y,2)/Math.pow(s.hitbox.top,2) < 1;
        }
        else{
          inShadow = Math.pow(coords.x - s.centerCoords.x,2)/Math.pow(s.hitbox.left,2) + Math.pow(coords.y - s.centerCoords.y,2)/Math.pow(s.hitbox.bottom,2) < 1;
        }
      }
      i++;
    }
    return inShadow;
  }
}
