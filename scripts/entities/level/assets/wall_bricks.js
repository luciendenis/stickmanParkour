class Wall_Bricks {
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
    this.layerHeightMin = config.layerHeightMin*scale;
    this.layerHeightMax = config.layerHeightMax*scale;
    this.brickWidthMin = config.brickWidthMin*scale;
    this.brickWidthMax = config.brickWidthMax*scale;
    this.brickBorderRadius = config.brickBorderRadius*scale;
    this.jointThickness = config.jointThickness*scale;
    this.brickColors = config.brickColors;
    this.jointColor = config.jointColor;
    this.brickRoughness = Math.min(config.brickRoughness,10);
  }
  draw(context){
    var t0 = performance.now();
    let done = false;
    let currentHeight = 0;
    let brickLayerCount = 0;
    let currentRandomIndex = this.seed;
    // temporary translation and rotation
    context.translate(this.bottomLeftCoords.x, this.bottomLeftCoords.y);
    context.rotate(this.orientation);
    // drawing the joint layer, bricks will be drawn over
    context.fillStyle = this.jointColor;
    context.fillRect(
      this.strokeStrength + this.brickBorderRadius/2,
      -this.height + this.strokeStrength + this.brickBorderRadius,
      this.width - 2*this.strokeStrength - this.brickBorderRadius,
      this.height - this.strokeStrength - this.brickBorderRadius
    );
    // Stroke style will remain the same for every drawing
    context.lineWidth = this.strokeStrength;
    context.strokeStyle = this.strokeColor;

    while(!done){ // while for the layers
      let currentBrickLayerHeight;
      if(this.height - currentHeight < this.layerHeightMax + 3*this.jointThickness){
        currentBrickLayerHeight = this.height - currentHeight;
        done = true;
      }
      else{
        currentBrickLayerHeight = this.layerHeightMin + (this.layerHeightMax - this.layerHeightMin)*randomHandler.giveNumber(currentRandomIndex);
        currentRandomIndex++;
      }

      // Draw bricks in this layer
      let layerDone = false;
      let currentWidth = 0;
      let brickCount = 0;
      while(!layerDone){ // while for the bricks
        let currentBrickWidth;
        if(this.width - currentWidth < ((brickCount == 0 && brickLayerCount % 2 == 1 ? 0.5 : 1)*this.brickWidthMax + 3*this.jointThickness)){
          currentBrickWidth = this.width - currentWidth;
          layerDone = true;
        }
        else{
          currentBrickWidth = this.brickWidthMin + (this.brickWidthMax - this.brickWidthMin)*randomHandler.giveNumber(currentRandomIndex);
          currentRandomIndex++;
        }
        if(brickCount == 0 && brickLayerCount % 2 == 1)
          currentBrickWidth /= 2;

        // Now drawing
        let colorIndex = Math.floor(this.brickColors.length*randomHandler.giveNumber(currentRandomIndex));
        currentRandomIndex++;
        context.fillStyle = this.brickColors[colorIndex];
        context.beginPath();
        context.roundRect(
          currentWidth,
          -currentHeight,
          currentBrickWidth,
          -currentBrickLayerHeight,
          this.brickBorderRadius
        );
        context.closePath();
        context.fill();
        if(this.strokeStrength > 0){
          context.stroke();
          let currentBrickRoughness = Math.round((this.brickRoughness*currentBrickWidth*currentBrickLayerHeight)/(this.brickWidthMax*this.layerHeightMax));
          for(let i = 0; i < currentBrickRoughness; i++){
            let lineX = this.strokeStrength + this.brickBorderRadius/2 + (currentBrickWidth - this.strokeStrength - this.brickBorderRadius/2)*randomHandler.giveNumber(currentRandomIndex);
            currentRandomIndex++;
            let lineLength = (lineX < currentBrickWidth/2 ? 1 : -1)*this.strokeStrength*5*randomHandler.giveNumber(currentRandomIndex);
            currentRandomIndex++;
            let lineY = - this.strokeStrength - this.brickBorderRadius/2 + (-currentBrickLayerHeight + this.strokeStrength + this.brickBorderRadius/2)*randomHandler.giveNumber(currentRandomIndex);
            currentRandomIndex++;
            context.moveTo(currentWidth + lineX, -currentHeight + lineY);
            context.lineTo(currentWidth + lineX + lineLength, -currentHeight + lineY);
            context.stroke();
          }
        }

        brickCount++;
        currentWidth += currentBrickWidth + this.jointThickness + 2*this.strokeStrength;
      }

      brickLayerCount++;
      currentHeight += currentBrickLayerHeight + this.jointThickness + 2*this.strokeStrength;
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
    let currentHeight = 0;
    let brickLayerCount = 0;
    let currentRandomIndex = this.seed;
    context.path(
      svgHelper.path_Rectangle(
        this.bottomLeftCoords,
        new Coordinates(this.strokeStrength + this.brickBorderRadius/2,-this.strokeStrength),
        new Coordinates(this.width - this.strokeStrength - this.brickBorderRadius/2, this.height -this.strokeStrength - this.brickBorderRadius/2),
        this.orientation,
        0
      ),
      {
        fill: this.jointColor,
        fillStyle: 'solid',
        strokeWidth: 0,
        stroke: 'transparent'
      }
    );

    while(!done){ // while for the layers
      let currentBrickLayerHeight;
      if(this.height - currentHeight < this.layerHeightMax + 3*this.jointThickness){
        currentBrickLayerHeight = this.height - currentHeight;
        done = true;
      }
      else{
        currentBrickLayerHeight = this.layerHeightMin + (this.layerHeightMax - this.layerHeightMin)*randomHandler.giveNumber(currentRandomIndex);
        currentRandomIndex++;
      }
      // Draw bricks in this layer
      let layerDone = false;
      let currentWidth = 0;
      let brickCount = 0;
      while(!layerDone){ // while for the bricks
        let currentBrickWidth;
        if(this.width - currentWidth < ((brickCount == 0 && brickLayerCount % 2 == 1 ? 0.5 : 1)*this.brickWidthMax + 3*this.jointThickness)){
          currentBrickWidth = this.width - currentWidth;
          layerDone = true;
        }
        else{
          currentBrickWidth = this.brickWidthMin + (this.brickWidthMax - this.brickWidthMin)*randomHandler.giveNumber(currentRandomIndex);
          currentRandomIndex++;
        }
        if(brickCount == 0 && brickLayerCount % 2 == 1)
          currentBrickWidth /= 2;

        // Now drawing
        let colorIndex = Math.floor(this.brickColors.length*randomHandler.giveNumber(currentRandomIndex));
        currentRandomIndex++;
        if(this.brickBorderRadius < 2){
          context.path(
            svgHelper.path_Rectangle(
              this.bottomLeftCoords,
              new Coordinates(currentWidth,-currentHeight),
              new Coordinates(currentBrickWidth,currentBrickLayerHeight),
              this.orientation,
              0
            ),
            {
              fill: this.brickColors[colorIndex],
              fillStyle: 'solid',
              strokeWidth: this.strokeStrength,
              stroke: (this.strokeStrength == 0 ? 'transparent' : this.strokeColor),
              roughness: this.roughOptions.roughness
            }
          );
        }
        else{
          context.path(
            svgHelper.path_Rectangle_Rounded(
              this.bottomLeftCoords,
              new Coordinates(currentWidth,-currentHeight),
              new Coordinates(currentBrickWidth,currentBrickLayerHeight),
              this.orientation,
              0,
              this.brickBorderRadius
            ),
            {
              fill: this.brickColors[colorIndex],
              fillStyle: 'solid',
              strokeWidth: this.strokeStrength,
              stroke: (this.strokeStrength == 0 ? 'transparent' : this.strokeColor),
              roughness: this.roughOptions.roughness
            }
          );
        }

        if(this.strokeStrength > 0){
          let currentBrickRoughness = Math.round((this.brickRoughness*currentBrickWidth*currentBrickLayerHeight)/(this.brickWidthMax*this.layerHeightMax));
          for(let i = 0; i < currentBrickRoughness; i++){
            let lineX = this.strokeStrength + this.brickBorderRadius/2 + (currentBrickWidth - this.strokeStrength - this.brickBorderRadius/2)*randomHandler.giveNumber(currentRandomIndex);
            currentRandomIndex++;
            let lineLength = (lineX < currentBrickWidth/2 ? 1 : -1)*this.strokeStrength*5*randomHandler.giveNumber(currentRandomIndex);
            currentRandomIndex++;
            let lineY = - this.strokeStrength - this.brickBorderRadius/2 + (-currentBrickLayerHeight + this.strokeStrength + this.brickBorderRadius/2)*randomHandler.giveNumber(currentRandomIndex);
            currentRandomIndex++;
            context.path(
              svgHelper.path_Line(
                this.bottomLeftCoords,
                new Coordinates(currentWidth + lineX, -currentHeight + lineY),
                new Coordinates(lineLength, 0), this.orientation
              ),
              {
                strokeWidth: this.strokeStrength,
                stroke: this.strokeColor,
                roughness: this.roughOptions.roughness
              }
            );
          }
        }

        brickCount++;
        currentWidth += currentBrickWidth + this.jointThickness + 2*this.strokeStrength;
      }
      brickLayerCount++;
      currentHeight += currentBrickLayerHeight + this.jointThickness + 2*this.strokeStrength;
    }
    var t1 = performance.now();
    console.log("Render time : " + (t1 - t0) + " ms");
  }
}
