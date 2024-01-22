class Fence_Wood_Vertical {
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
    this.barThickness = config.barThickness*scale;
    this.horizontalBarThickness = config.horizontalBarThickness*scale;
    this.horizontalBarColor = config.horizontalBarColor;
    this.horizontalBars = [];
    for(let i = 0; i < config.horizontalBars.length; i++)
      this.horizontalBars.push(config.horizontalBars[i]*scale); // each horizontal bar is represented by its height relative to the bottom
    this.barGap = config.barGap*scale;
    this.barsBetweenPillars = config.barsBetweenPillars;
    this.barIndexStart = config.barIndexStart;
    this.barsHeights = [];
    for(let i = 0; i < config.barsHeights.length; i++)
      this.barsHeights.push(config.barsHeights[i]*scale); // sequence of bar heights
    this.barsLengths = [];
    for(let i = 0; i < config.barsLengths.length; i++)
      this.barsLengths.push(config.barsLengths[i]*scale); // sequence of bar lengths
    this.barsTopShapes = [];
    for(let i = 0; i < config.barsTopShapes.length; i++)
      this.barsTopShapes.push(config.barsTopShapes[i]); // sequence of string defining bar top styles
    this.barsTopTransitions = [];
    for(let i = 0; i < config.barsTopTransitions.length; i++)
      this.barsTopTransitions.push(new Coordinates(config.barsTopTransitions[i].x*scale, config.barsTopTransitions[i].y*scale)); // sequence of coordinates defining bar transition to top shape
    this.barsTopSizes = [];
    for(let i = 0; i < config.barsTopSizes.length; i++)
      this.barsTopSizes.push(new Coordinates(config.barsTopSizes[i].x*scale, config.barsTopSizes[i].y*scale)); // sequence of coordinates defining bar top shape size
    this.barsColors = [];
    for(let i = 0; i < config.barsColors.length; i++)
      this.barsColors.push(config.barsColors[i]); // sequence of string defining bar colors
    this.woodRoughness = Math.min(config.woodRoughness,20);
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

    // first draw horizontal bars
    context.fillStyle = this.horizontalBarColor;
    for(let i = 0; i < this.horizontalBars.length; i++){
      context.beginPath();
      context.rect(0, - this.horizontalBars[i] - this.horizontalBarThickness, this.width, this.horizontalBarThickness);
      context.fill();
      context.stroke();
    }
    // second draw pillars
    let currentBarIndex = this.barIndexStart % this.barsBetweenPillars;
    let pillarRoughness = Math.round(this.woodRoughness*this.pillarThickness/this.barThickness);
    while(!done){
      if(currentBarIndex == 0){
        // draw the bar
        let path = svgHelper.path_Rectangle_Shape_Top(
          new Coordinates(0,0),
          new Coordinates(currentWidth, 0),
          new Coordinates(this.pillarThickness, this.height),
          0,
          0,
          this.pillarTopTransition,
          this.pillarTopShape,
          this.pillarTopSize
        );
        let p = new Path2D(path);
        context.fillStyle = this.pillarColor;
        context.beginPath();
        context.fill(p);
        if(this.strokeStrength > 0){
          context.stroke(p);
          context.beginPath();
          let xRange = pillarRoughness > 0 ? (this.pillarThickness - 2*this.strokeStrength)/pillarRoughness : 0;
          for(let i = 0; i < pillarRoughness; i++){
            let yStart = (i % 2 == 0) ? -this.height*3/4 : 0;
            let lineY = yStart -this.strokeStrength + (-this.height/4 + this.strokeStrength)*randomHandler.giveNumber(currentRandomIndex);
            currentRandomIndex++;
            let lineLength = (lineY < -this.height/2 ? 1 : -1)*(this.height/4 + (this.height/2)*randomHandler.giveNumber(currentRandomIndex));
            currentRandomIndex++;
            let lineX = i*xRange + this.strokeStrength + xRange*randomHandler.giveNumber(currentRandomIndex);
            currentRandomIndex++;
            context.moveTo(currentWidth + lineX, lineY);
            context.lineTo(currentWidth + lineX, lineY + lineLength);
            context.stroke();
          }
        }
        currentWidth += this.pillarThickness;
      }
      else{
        currentWidth += this.barThickness;
      }
      currentBarIndex = (currentBarIndex + 1) % this.barsBetweenPillars;
      currentWidth += this.barGap;
      done = (currentWidth > this.width);
    }
    // last draw bars
    done = false;
    currentWidth = 0;
    currentBarIndex = this.barIndexStart % this.barsBetweenPillars;
    while(!done){
      if(currentBarIndex == 0){
        currentWidth += this.pillarThickness;
      }
      else{
        // getting the info for this bar
        let bHeight = this.barsHeights[(currentBarIndex-1)%this.barsHeights.length];
        let bLength = this.barsLengths[(currentBarIndex-1)%this.barsLengths.length];
        let bTopStyle = this.barsTopShapes[(currentBarIndex-1)%this.barsTopShapes.length];
        let bTopTransition = this.barsTopTransitions[(currentBarIndex-1)%this.barsTopTransitions.length];
        let bTopSize = this.barsTopSizes[(currentBarIndex-1)%this.barsTopSizes.length];
        let bColor = this.barsColors[(currentBarIndex-1)%this.barsColors.length];
        // draw the bar
        let path = svgHelper.path_Rectangle_Shape_Top(
          new Coordinates(0,0),
          new Coordinates(currentWidth, -bHeight),
          new Coordinates(this.barThickness, bLength),
          0,
          0,
          bTopTransition,
          bTopStyle,
          bTopSize);
        let p = new Path2D(path);
        context.fillStyle = bColor;
        context.beginPath();
        context.fill(p);
        if(this.strokeStrength > 0){
          context.stroke(p);
          context.beginPath();
          let xRange = this.woodRoughness > 0 ? (this.barThickness - 2*this.strokeStrength)/this.woodRoughness : 0;
          for(let i = 0; i < this.woodRoughness; i++){
            let yStart = (i % 2 == 0) ? -bLength*3/4 : 0;
            let lineY = yStart -bHeight -this.strokeStrength + (-bLength/4 + this.strokeStrength)*randomHandler.giveNumber(currentRandomIndex);
            currentRandomIndex++;
            let lineLength = (lineY < -bLength/2 ? 1 : -1)*(bLength/4 + (bLength/2)*randomHandler.giveNumber(currentRandomIndex));
            currentRandomIndex++;
            let lineX = i*xRange + this.strokeStrength + xRange*randomHandler.giveNumber(currentRandomIndex);
            currentRandomIndex++;
            context.moveTo(currentWidth + lineX, -bHeight + lineY);
            context.lineTo(currentWidth + lineX, -bHeight + lineY + lineLength);
            context.stroke();
          }
        }
        currentWidth += this.barThickness;
      }
      currentBarIndex = (currentBarIndex + 1) % this.barsBetweenPillars;
      currentWidth += this.barGap;
      done = (currentWidth > this.width);
    }

    // temporary translation end
    context.translate(-this.bottomLeftCoords.x, -this.bottomLeftCoords.y);
    context.rotate(-this.orientation);
    var t1 = performance.now();
    console.log("Render time : " + (t1 - t0) + " ms");
  }
  drawRough(context){
    var t0 = performance.now();
    let done = false;
    let currentWidth = 0;
    let currentRandomIndex = this.seed;

    // first draw horizontal bars
    context.fillStyle = this.horizontalBarColor;
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
          roughness: this.roughOptions.roughness/2
        }
      );
    }
    // second draw pillars
    done = false;
    currentWidth = 0;
    let currentBarIndex = this.barIndexStart % this.barsBetweenPillars;
    let pillarRoughness = Math.round(this.woodRoughness*this.pillarThickness/this.barThickness);
    while(!done){
      if(currentBarIndex == 0){
        // draw the bar
        let path = svgHelper.path_Rectangle_Shape_Top(
          this.bottomLeftCoords,
          new Coordinates(currentWidth, 0),
          new Coordinates(this.pillarThickness, this.height),
          this.orientation,
          0,
          this.pillarTopTransition,
          this.pillarTopShape,
          this.pillarTopSize
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
        if(this.strokeStrength > 0){
          let xRange = pillarRoughness > 0 ? (this.pillarThickness - 2*this.strokeStrength)/pillarRoughness : 0;
          for(let i = 0; i < pillarRoughness; i++){
            let yStart = (i % 2 == 0) ? -this.height*3/4 : 0;
            let lineY = yStart -this.strokeStrength + (-this.height/4 + this.strokeStrength)*randomHandler.giveNumber(currentRandomIndex);
            currentRandomIndex++;
            let lineLength = (lineY < -this.height/2 ? 1 : -1)*(this.height/4 + (this.height/2)*randomHandler.giveNumber(currentRandomIndex));
            currentRandomIndex++;
            let lineX = i*xRange + this.strokeStrength + xRange*randomHandler.giveNumber(currentRandomIndex);
            currentRandomIndex++;
            context.path(
              svgHelper.path_Line_Relative(
                this.bottomLeftCoords,
                new Coordinates(currentWidth + lineX, lineY),
                new Coordinates(0, lineLength),
                this.orientation
              ),
              {
                disableMultiStroke:true,
                strokeWidth: this.strokeStrength/2,
                stroke: this.strokeColor,
                roughness: this.roughOptions.roughness/4
              }
            );
          }
        }
        currentWidth += this.pillarThickness;
      }
      else{
        currentWidth += this.barThickness;
      }
      currentBarIndex = (currentBarIndex + 1) % this.barsBetweenPillars;
      currentWidth += this.barGap;
      done = (currentWidth > this.width);
    }
    // last draw bars
    done = false;
    currentWidth = 0;
    currentBarIndex = this.barIndexStart % this.barsBetweenPillars;
    while(!done){
      if(currentBarIndex == 0){
        currentWidth += this.pillarThickness;
      }
      else{
        // getting the info for this bar
        let bHeight = this.barsHeights[(currentBarIndex-1)%this.barsHeights.length];
        let bLength = this.barsLengths[(currentBarIndex-1)%this.barsLengths.length];
        let bTopStyle = this.barsTopShapes[(currentBarIndex-1)%this.barsTopShapes.length];
        let bTopTransition = this.barsTopTransitions[(currentBarIndex-1)%this.barsTopTransitions.length];
        let bTopSize = this.barsTopSizes[(currentBarIndex-1)%this.barsTopSizes.length];
        let bColor = this.barsColors[(currentBarIndex-1)%this.barsColors.length];
        // draw the bar
        let path = svgHelper.path_Rectangle_Shape_Top(
          this.bottomLeftCoords,
          new Coordinates(currentWidth, -bHeight),
          new Coordinates(this.barThickness, bLength),
          this.orientation,
          0,
          bTopTransition,
          bTopStyle,
          bTopSize
        );
        context.path(
          path,
          {
            fill: bColor,
            fillStyle: 'solid',
            strokeWidth: this.strokeStrength,
            stroke: (this.strokeStrength == 0 ? 'transparent' : this.strokeColor),
            roughness: this.roughOptions.roughness
          }
        );
        if(this.strokeStrength > 0){
          let xRange = this.woodRoughness > 0 ? (this.barThickness - 2*this.strokeStrength)/this.woodRoughness : 0;
          for(let i = 0; i < this.woodRoughness; i++){
            let yStart = (i % 2 == 0) ? -bLength*3/4 : 0;
            let lineY = yStart -bHeight -this.strokeStrength + (-bLength/4 + this.strokeStrength)*randomHandler.giveNumber(currentRandomIndex);
            currentRandomIndex++;
            let lineLength = (lineY < -bLength/2 ? 1 : -1)*(bLength/4 + (bLength/2)*randomHandler.giveNumber(currentRandomIndex));
            currentRandomIndex++;
            let lineX = i*xRange + this.strokeStrength + xRange*randomHandler.giveNumber(currentRandomIndex);
            currentRandomIndex++;
            context.path(
              svgHelper.path_Line_Relative(
                this.bottomLeftCoords,
                new Coordinates(currentWidth + lineX, -bHeight + lineY),
                new Coordinates(0, lineLength),
                this.orientation
              ),
              {
                disableMultiStroke:true,
                strokeWidth: this.strokeStrength/2,
                stroke: this.strokeColor,
                roughness: this.roughOptions.roughness/4
              }
            );
          }
        }
        currentWidth += this.barThickness;
      }
      currentBarIndex = (currentBarIndex + 1) % this.barsBetweenPillars;
      currentWidth += this.barGap;
      done = (currentWidth > this.width);
    }

    var t1 = performance.now();
    console.log("Render time : " + (t1 - t0) + " ms");
  }
}
