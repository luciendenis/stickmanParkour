class Wall_Bricks {
  constructor(config, levelLimits, scale, seed) {
    this.bottomLeftCoords = new Coordinates(config.bottomLeftCoords.x*scale + levelLimits.xLeft, levelLimits.yGround-config.bottomLeftCoords.y*scale);
    this.height = config.height*scale;
    this.width = config.width*scale;
    this.orientation = config.orientation;
    this.layerHeightMin = config.layerHeightMin*scale;
    this.layerHeightMax = config.layerHeightMax*scale;
    this.brickWidthMin = config.brickWidthMin*scale;
    this.brickWidthMax = config.brickWidthMax*scale;
    this.brickBorderRadius = config.brickBorderRadius*scale;
    this.jointThickness = config.jointThickness*scale;
    this.strokeStrength = config.strokeStrength*scale;
    this.strokeColor = config.strokeColor;
    this.roughOptions = AdaptRoughOptionsToScale(config.roughOptions, scale);
    this.brickColors = config.brickColors;
    this.jointColor = config.jointColor;
    this.brickRoughness = config.brickRoughness;
    this.seed = seed;
  }
  draw(context){
    var t0 = performance.now();
    let done = false;
    let currentHeight = 0;
    let brickLayerCount = 0;
    let currentRandomIndex = this.seed;
    // drawing the joint layer, bricks will be drawn over
    context.fillStyle = this.jointColor;
    context.fillRect(
      this.bottomLeftCoords.x + this.strokeStrength + this.brickBorderRadius/2,
      this.bottomLeftCoords.y - this.height + this.strokeStrength + this.brickBorderRadius,
      this.width - 2*this.strokeStrength - this.brickBorderRadius,
      this.height - this.strokeStrength - this.brickBorderRadius
    );
    // Stroke style will remain the same for every drawing
    context.lineWidth = this.strokeStrength;
    context.strokeStyle = this.strokeColor;

    while(!done){ // while for the layers
      let currentBrickLayerHeight;
      if(this.height - currentHeight < this.layerHeightMax){
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
        if(this.width - currentWidth < this.brickWidthMax){
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
          this.bottomLeftCoords.x + currentWidth,
          this.bottomLeftCoords.y - currentHeight,
          currentBrickWidth,
          -currentBrickLayerHeight,
          this.brickBorderRadius
        );
        context.fill();
        if(this.strokeStrength > 0) context.stroke();

        brickCount++;
        currentWidth += currentBrickWidth + this.jointThickness + 2*this.strokeStrength;
      }

      brickLayerCount++;
      currentHeight += currentBrickLayerHeight + this.jointThickness + 2*this.strokeStrength;
    }
    var t1 = performance.now();
    console.log("Render time : " + (t1 - t0) + " ms");
  }
  drawRough(context){
    var t0 = performance.now();
    let done = false;
    let currentHeight = 0;
    let brickLayerCount = 0;
    let currentRandomIndex = this.seed;
    // drawing the joint layer, bricks will be drawn over
    context.fillStyle = this.jointColor;
    context.rectangle(
      this.bottomLeftCoords.x + this.strokeStrength + this.brickBorderRadius/2,
      this.bottomLeftCoords.y - this.height + this.strokeStrength + this.brickBorderRadius,
      this.width - 2*this.strokeStrength - this.brickBorderRadius,
      this.height - this.strokeStrength - this.brickBorderRadius,
      {
        fill: this.jointColor,
        fillStyle: 'solid',
        strokeWidth: 0,
        stroke: 'transparent'
      }
    );
    // Stroke style will remain the same for every drawing
    context.lineWidth = this.strokeStrength;
    context.strokeStyle = this.strokeColor;

    while(!done){ // while for the layers
      let currentBrickLayerHeight;
      if(this.height - currentHeight < this.layerHeightMax){
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
        if(this.width - currentWidth < this.brickWidthMax){
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
          context.rectangle(
            this.bottomLeftCoords.x + currentWidth,
            this.bottomLeftCoords.y - currentHeight,
            currentBrickWidth,
            -currentBrickLayerHeight,
            {
              fill: this.brickColors[colorIndex],
              fillStyle: 'solid',
              strokeWidth: this.strokeStrength,
              stroke: (this.strokeStrength == 0 ? 'transparent' : this.strokeColor)
            }
          );
        }
        else{
          let radius = Math.min(this.brickBorderRadius, currentBrickWidth/2, currentBrickLayerHeight/2);
          context.polygon([
            [this.bottomLeftCoords.x + currentWidth + radius, this.bottomLeftCoords.y - currentHeight],
            [this.bottomLeftCoords.x + currentWidth + currentBrickWidth - radius, this.bottomLeftCoords.y - currentHeight],
            [this.bottomLeftCoords.x + currentWidth + currentBrickWidth, this.bottomLeftCoords.y - currentHeight - radius],
            [this.bottomLeftCoords.x + currentWidth + currentBrickWidth, this.bottomLeftCoords.y - currentHeight - currentBrickLayerHeight + radius],
            [this.bottomLeftCoords.x + currentWidth + currentBrickWidth - radius, this.bottomLeftCoords.y - currentHeight - currentBrickLayerHeight],
            [this.bottomLeftCoords.x + currentWidth + radius, this.bottomLeftCoords.y - currentHeight - currentBrickLayerHeight],
            [this.bottomLeftCoords.x + currentWidth, this.bottomLeftCoords.y - currentHeight - currentBrickLayerHeight + radius],
            [this.bottomLeftCoords.x + currentWidth, this.bottomLeftCoords.y - currentHeight - radius]
          ],
            {
              fill: this.brickColors[colorIndex],
              fillStyle: 'solid',
              strokeWidth: this.strokeStrength,
              stroke: (this.strokeStrength == 0 ? 'transparent' : this.strokeColor),
              roughness: 0.8
            }
          );
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
