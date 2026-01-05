class Fence_Metal_Grid {
  constructor(config, levelLimits, scale, seed) {
    // Basic properties
    this.seed = seed;
    this.bottomLeftCoords = new Coordinates(config.bottomLeftCoords.x*scale + levelLimits.xLeft, levelLimits.yGround-config.bottomLeftCoords.y*scale);
    this.height = config.height*scale;
    this.width = config.width*scale;
    this.orientation = config.orientation;
    this.strokeStrength = config.strokeStrength*scale;
    this.strokeColor = config.strokeColor;
    this.roughOptions = AdaptRoughOptionsToScale(config.roughOptions, scale);
    // Properties specific to this asset
    this.pillarThickness = config.pillarThickness*scale;
    this.pillarColor = config.pillarColor;
    this.pillarGap = config.pillarGap*scale;
    this.horizontalBarThickness = config.horizontalBarThickness*scale;
    this.horizontalBarColor = config.horizontalBarColor;
    this.horizontalBars = [];
    for(let i = 0; i < config.horizontalBars.length; i++)
      this.horizontalBars.push(config.horizontalBars[i]*scale); // each horizontal bar is represented by its height relative to the bottom
    this.horizontalStrings = [];
    for(let i = 0; i < config.horizontalStrings.length; i++)
      this.horizontalStrings.push(config.horizontalStrings[i]*scale); // each horizontal bar is represented by its height relative to the bottom
    this.stringThickness = config.stringThickness*scale;
    this.gridColor = config.gridColor;
    this.gridGap = config.gridGap*scale;
  }

  draw(context){
    var t0 = performance.now();
    let done = false;
    let currentWidth = 0;
    let currentRandomIndex = this.seed;
    // temporary translation and rotation
    context.translate(this.bottomLeftCoords.x, this.bottomLeftCoords.y);
    context.rotate(this.orientation);
    // Stroke style will remain the same for every drawing
    context.lineWidth = this.strokeStrength;
    context.strokeStyle = this.strokeColor;

    // draw bars
    for(let i = 0; i < this.horizontalBars.length; i++){
      context.fillStyle = this.horizontalBarColor;
      for(let i = 0; i < this.horizontalBars.length; i++){
        context.beginPath();
        context.rect(0, - this.horizontalBars[i] - this.horizontalBarThickness, this.width, this.horizontalBarThickness);
        context.fill();
        context.stroke();
      }
    }
    // drawing pillars
    while(!done){
      context.fillStyle = this.pillarColor;
      context.beginPath();
      context.rect(currentWidth, 0-this.height, this.pillarThickness, this.height);
      context.fill();
      context.stroke();
      currentWidth += this.pillarThickness + this.pillarGap;
      done = (currentWidth > this.width);
    }
    // draw strings
    for(let i = 0; i < this.horizontalStrings.length; i++){
      context.fillStyle = this.gridColor;
      context.beginPath();
      context.rect(0, -this.horizontalStrings[i]-this.stringThickness, this.width, this.stringThickness);
      context.fill();
      context.stroke();
    }
    // draw grid every wire
    let underWirePaths = [];
    let overWirePaths = [];
    let realAngle = (-Math.PI/4) + Math.atan(this.stringThickness/this.gridGap);
    let vOffset = Math.abs(this.stringThickness*Math.sin(realAngle));
    let hOffset = Math.abs(this.stringThickness*Math.cos(realAngle));
    let vStep = Math.abs(2*this.gridGap*Math.sin(Math.PI/4));
    let hStep = Math.abs(2*this.gridGap*Math.cos(Math.PI/4));

    done = false;
    currentWidth = hStep/2;
    let layerDone = false;
    let currentHeight = vStep/2;
    while(!done){
      layerDone = false;
      currentWidth = hStep/2;
      while(!layerDone){
        // draw
        overWirePaths.push(svgHelper.path_Rectangle_diagonal_rounded(
          new Coordinates(0,0),
          new Coordinates(currentWidth-hOffset, -currentHeight+vOffset),
          new Coordinates(this.gridGap + this.stringThickness, this.stringThickness),
          0,
          realAngle,
          false
        ));
        overWirePaths.push(svgHelper.path_Rectangle_diagonal_rounded(
          new Coordinates(0,0),
          new Coordinates(currentWidth+hOffset, -currentHeight-vOffset),
          new Coordinates(this.gridGap + this.stringThickness, this.stringThickness),
          0,
          Math.PI + realAngle,
          false
        ));
        underWirePaths.push(svgHelper.path_Rectangle(
          new Coordinates(0,0),
          new Coordinates(currentWidth-hOffset, -currentHeight+vOffset),
          new Coordinates(this.gridGap, this.stringThickness),
          0,
          -realAngle
        ));
        underWirePaths.push(svgHelper.path_Rectangle(
          new Coordinates(0,0),
          new Coordinates(currentWidth+hOffset, -currentHeight-vOffset),
          new Coordinates(this.gridGap, this.stringThickness),
          0,
          Math.PI - realAngle
        ));
        currentWidth += hStep;
        layerDone = (currentWidth > this.width);
      }
      currentHeight += vStep;
      done = (currentHeight > this.height);
    }
    overWirePaths = underWirePaths.concat(overWirePaths);
    for(let i = 0; i <overWirePaths.length; i++){
      let p = new Path2D(overWirePaths[i]);
      context.fillStyle = this.gridColor;
      context.stroke(p);
      context.fill(p);
    }
    // temporary translation end
    context.translate(-this.bottomLeftCoords.x, -this.bottomLeftCoords.y);
    context.rotate(-this.orientation);
    var t1 = performance.now();
    if(debugMode) console.log("Render time : " + (t1 - t0) + " ms");
  }
  drawRough(context){
    var t0 = performance.now();
    let done = false;
    let currentWidth = 0;
    let currentRandomIndex = this.seed;

    // draw bars
    for(let i = 0; i < this.horizontalBars.length; i++){
      let path = svgHelper.path_Rectangle(
        this.bottomLeftCoords,
        new Coordinates(0, -this.horizontalBars[i]),
        new Coordinates(this.width, this.horizontalBarThickness),
        this.orientation,
        0
      );
      context.path(
        path,
        {
          fill: this.horizontalBarColor,
          fillStyle: 'solid',
          strokeWidth: this.strokeStrength,
          stroke: (this.strokeStrength == 0 ? 'transparent' : this.strokeColor),
          roughness: this.roughOptions.roughness
        }
      );
    }
    // drawing pillars
    while(!done){
      let path = svgHelper.path_Rectangle(
        this.bottomLeftCoords,
        new Coordinates(currentWidth, 0),
        new Coordinates(this.pillarThickness, this.height),
        this.orientation,
        0
      );
      context.path(
        path,
        {
          fill: this.pillarColor,
          fillStyle: 'solid',
          strokeWidth: this.strokeStrength,
          stroke: (this.strokeStrength == 0 ? 'transparent' : this.strokeColor),
          roughness: this.roughOptions.roughness
        }
      );
      currentWidth += this.pillarThickness + this.pillarGap;
      done = (currentWidth > this.width);
    }
    // draw strings
    for(let i = 0; i < this.horizontalStrings.length; i++){
      let path = svgHelper.path_Rectangle(
        this.bottomLeftCoords,
        new Coordinates(0, -this.horizontalStrings[i]),
        new Coordinates(this.width, -this.stringThickness),
        this.orientation,
        0
      );
      context.path(
        path,
        {
          fill: this.gridColor,
          fillStyle: 'solid',
          strokeWidth: this.strokeStrength,
          stroke: (this.strokeStrength == 0 ? 'transparent' : this.strokeColor),
          roughness: this.roughOptions.roughness/2
        }
      );
    }
    // draw grid every wire
    let underWirePaths = [];
    let overWirePaths = [];
    let realAngle = (-Math.PI/4) + Math.atan(this.stringThickness/this.gridGap);
    let vOffset = Math.abs(this.stringThickness*Math.sin(realAngle));
    let hOffset = Math.abs(this.stringThickness*Math.cos(realAngle));
    let vStep = Math.abs(2*this.gridGap*Math.sin(Math.PI/4));
    let hStep = Math.abs(2*this.gridGap*Math.cos(Math.PI/4));

    done = false;
    currentWidth = hStep/2;
    let layerDone = false;
    let currentHeight = vStep/2;
    while(!done){
      layerDone = false;
      currentWidth = hStep/2;
      while(!layerDone){
        // draw
        overWirePaths.push(svgHelper.path_Rectangle_diagonal_rounded(
          this.bottomLeftCoords,
          new Coordinates(currentWidth-hOffset, -currentHeight+vOffset),
          new Coordinates(this.gridGap + this.stringThickness, this.stringThickness),
          this.orientation,
          realAngle,
          false
        ));
        overWirePaths.push(svgHelper.path_Rectangle_diagonal_rounded(
          this.bottomLeftCoords,
          new Coordinates(currentWidth+hOffset, -currentHeight-vOffset),
          new Coordinates(this.gridGap + this.stringThickness, this.stringThickness),
          this.orientation,
          Math.PI + realAngle,
          false
        ));
        underWirePaths.push(svgHelper.path_Rectangle(
          this.bottomLeftCoords,
          new Coordinates(currentWidth-hOffset, -currentHeight+vOffset),
          new Coordinates(this.gridGap, this.stringThickness),
          this.orientation,
          -realAngle
        ));
        underWirePaths.push(svgHelper.path_Rectangle(
          this.bottomLeftCoords,
          new Coordinates(currentWidth+hOffset, -currentHeight-vOffset),
          new Coordinates(this.gridGap, this.stringThickness),
          this.orientation,
          Math.PI - realAngle
        ));
        currentWidth += hStep;
        layerDone = (currentWidth > this.width);
      }
      currentHeight += vStep;
      done = (currentHeight > this.height);
    }
    overWirePaths = underWirePaths.concat(overWirePaths);
    for(let i = 0; i <overWirePaths.length; i++){
      context.path(
        overWirePaths[i],
        {
          fill: this.gridColor,
          fillStyle: 'solid',
          strokeWidth: this.strokeStrength,
          stroke: (this.strokeStrength == 0 ? 'transparent' : this.strokeColor),
          roughness: this.roughOptions.roughness/2
        }
      );
    }
    var t1 = performance.now();
    if(debugMode) console.log("Render time : " + (t1 - t0) + " ms");
  }
}
