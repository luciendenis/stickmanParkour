class Fence_Metal_Bars {
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
    this.pillarTopShape = config.pillarTopShape;
    this.pillarTopTransition = new Coordinates(config.pillarTopTransition.x*scale, config.pillarTopTransition.y*scale);
    this.pillarTopSize = new Coordinates(config.pillarTopSize.x*scale, config.pillarTopSize.y*scale);
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

    // first draw bars
    let currentBarIndex = this.barIndexStart % this.barsBetweenPillars;
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
        context.stroke(p);
        context.fill(p);
        currentWidth += this.barThickness;
      }
      currentBarIndex = (currentBarIndex + 1) % this.barsBetweenPillars;
      currentWidth += this.barGap;
      done = (currentWidth > this.width);
    }
    // second draw horizontal bars
    context.fillStyle = this.horizontalBarColor;
    for(let i = 0; i < this.horizontalBars.length; i++){
      context.beginPath();
      context.rect(0, - this.horizontalBars[i] - this.horizontalBarThickness, this.width, this.horizontalBarThickness);
      context.fill();
      context.stroke();
    }
    // last draw pillars
    done = false;
    currentWidth = 0;
    currentBarIndex = this.barIndexStart % this.barsBetweenPillars;
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
        context.stroke(p);
        context.fill(p);
        currentWidth += this.pillarThickness;
      }
      else{
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

    // first draw bars
    let currentBarIndex = this.barIndexStart % this.barsBetweenPillars;
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
        currentWidth += this.barThickness;
      }
      currentBarIndex = (currentBarIndex + 1) % this.barsBetweenPillars;
      currentWidth += this.barGap;
      done = (currentWidth > this.width);
    }
    // second draw horizontal bars
    context.fillStyle = this.horizontalBarColor;
    for(let i = 0; i < this.horizontalBars.length; i++){
      let path = svgHelper.path_Rectangle(
        this.bottomLeftCoords,
        new Coordinates(0, -this.horizontalBars[i]),
        new Coordinates(this.width, this.horizontalBarThickness),
        this.orientation
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
    // last draw pillars
    done = false;
    currentWidth = 0;
    currentBarIndex = this.barIndexStart % this.barsBetweenPillars;
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
        currentWidth += this.pillarThickness;
      }
      else{
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
