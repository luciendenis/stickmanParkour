class Tree {
  constructor(config, levelLimits, scale, seed) {
    this.startCoords = new Coordinates(config.startCoords.x*scale + levelLimits.xLeft, levelLimits.yGround-config.startCoords.y*scale);
    this.orientation = config.orientation;
    this.baseWidth = config.baseWidth*scale;
    this.minWidthForTrunc = config.minWidthForTrunc*scale;
    this.truncLines = config.truncLines;
    this.truncLinesCuts = config.truncLinesCuts;
    this.truncLinesRoughness = config.truncLinesRoughness*scale;
    this.minWidth = config.minWidth*scale;
    this.widthLossfactor = config.widthLossfactor;
    this.baseLength = config.baseLength*scale;
    this.minLength = config.minLength*scale;
    this.lengthLossfactor = config.lengthLossfactor;
    this.maxDeviation = config.maxDeviation;
    this.segmentsLimit = config.segmentsLimit;
    this.layerCount = config.layerCount;
    this.splitProbability = config.splitProbability;
    this.maxWidthForSplit = config.maxWidthForSplit*scale;
    this.splitAngle = config.splitAngle;
    this.splitAngleRandom = config.splitAngleRandom;
    this.splitAngleDistribution = config.splitAngleDistribution;
    this.splitWidthFactor = config.splitWidthFactor;
    this.maxWidthForLeaves = config.maxWidthForLeaves*scale;
    this.minSegmentForLeaves = config.minSegmentForLeaves;
    this.leavesAreaSize = config.leavesAreaSize*scale;
    this.leavesCountPerBush = config.leavesCountPerBush;
    this.leavesSize = new Coordinates(config.leavesSize.x*scale,config.leavesSize.y);
    this.branchesGradient = new HslaGradient(config.branchesGradient);
    this.leavesBackLayerGradient = new HslaGradient(config.leavesBackLayerGradient);
    this.leavesShadowLayerGradient = new HslaGradient(config.leavesShadowLayerGradient);
    this.leavesFrontLayerGradient = new HslaGradient(config.leavesFrontLayerGradient);
    this.strokeStrength = config.strokeStrength*scale;
    this.roughness = config.roughness*scale;
    this.seed = seed;
    this.branches = [];
    this.branches.push(new TreeBranch(
      0,
      this.startCoords,
      this.orientation,
      this.baseWidth,
      this.baseLength
    ));
    this.build();
  }
  build(){
    this.seed = this.branches[0].build(this.branches, this.seed,
      {minWidth:this.minWidth, widthLossfactor:this.widthLossfactor, minLength:this.minLength, lengthLossfactor:this.lengthLossfactor, segmentsLimit:this.segmentsLimit,
      maxDeviation:this.maxDeviation, layerCount:this.layerCount, maxWidthForSplit:this.maxWidthForSplit, splitProbability:this.splitProbability,
      splitAngle:this.splitAngle, splitAngleRandom:this.splitAngleRandom, splitAngleDistribution:this.splitAngleDistribution, splitWidthFactor:this.splitWidthFactor});
  }
  getHitBox(){
    let hitbox = this.branches[0].hitBox.clone();
    for(let i = 1; i < this.branches.length; i++){
      let currentHitBox = this.branches[i].hitBox;
      hitbox.left = Math.min(hitbox.left, currentHitBox.left);
      hitbox.right = Math.max(hitbox.right, currentHitBox.right);
      hitbox.top = Math.min(hitbox.top, currentHitBox.top);
      hitbox.bottom = Math.max(hitbox.bottom, currentHitBox.bottom);
    }
    return hitbox;
  }
  getShadowType(){
    return "circle";
  }
  draw(context){
    var t0 = performance.now();
    console.log("Branch count : " + this.branches.length);
    for(let i = 0; i < this.branches.length ; i++){
      this.seed = this.branches[i].drawLeavesBackLayer(this.seed,{gradient:this.leavesBackLayerGradient, strokeStrength:this.strokeStrength, roughness:this.roughness, maxWidthForLeaves:this.maxWidthForLeaves, minSegmentForLeaves:this.minSegmentForLeaves, leavesAreaSize:this.leavesAreaSize, leavesSize:this.leavesSize, leavesCountPerBush:this.leavesCountPerBush});
    }
    for(let i = 0; i < this.branches.length ; i++){
      this.seed = this.branches[i].drawBranch(context,this.seed,{gradient:this.branchesGradient, strokeStrength:this.strokeStrength, roughness:this.roughness, minWidthForTrunc:this.minWidthForTrunc, truncLines:this.truncLines, truncLinesCuts:this.truncLinesCuts, truncLinesRoughness:this.truncLinesRoughness});
    }
    for(let i = 0; i < this.branches.length ; i++){
      this.seed = this.branches[i].drawSelfShadowLayer(this.seed,{gradient:this.leavesShadowLayerGradient, strokeStrength:this.strokeStrength, roughness:this.roughness, maxWidthForLeaves:this.maxWidthForLeaves, minSegmentForLeaves:this.minSegmentForLeaves, leavesAreaSize:this.leavesAreaSize, leavesSize:this.leavesSize, leavesCountPerBush:this.leavesCountPerBush});
    }
    for(let i = 0; i < this.branches.length ; i++){
      this.seed = this.branches[i].drawLeavesFrontLayer(this.seed,{gradient:this.leavesFrontLayerGradient, strokeStrength:this.strokeStrength, roughness:this.roughness, maxWidthForLeaves:this.maxWidthForLeaves, minSegmentForLeaves:this.minSegmentForLeaves, leavesAreaSize:this.leavesAreaSize, leavesSize:this.leavesSize, leavesCountPerBush:this.leavesCountPerBush});
    }
    var t1 = performance.now();
    console.log("Render time : " + (t1 - t0) + " ms");
  }
  drawRough(context){
    var t0 = performance.now();
    console.log("Branch count : " + this.branches.length);
    for(let i = 0; i < this.branches.length ; i++){
      this.seed = this.branches[i].drawLeavesBackLayer(this.seed,{gradient:this.leavesBackLayerGradient, strokeStrength:this.strokeStrength, roughness:this.roughness, maxWidthForLeaves:this.maxWidthForLeaves, minSegmentForLeaves:this.minSegmentForLeaves, leavesAreaSize:this.leavesAreaSize, leavesSize:this.leavesSize, leavesCountPerBush:this.leavesCountPerBush});
    }
    for(let i = 0; i < this.branches.length ; i++){
      this.seed = this.branches[i].drawBranchRough(context,this.seed,{gradient:this.branchesGradient, strokeStrength:this.strokeStrength, roughness:this.roughness, minWidthForTrunc:this.minWidthForTrunc, truncLines:this.truncLines, truncLinesCuts:this.truncLinesCuts, truncLinesRoughness:this.truncLinesRoughness});
    }
    for(let i = 0; i < this.branches.length ; i++){
      this.seed = this.branches[i].drawSelfShadowLayer(this.seed,{gradient:this.leavesShadowLayerGradient, strokeStrength:this.strokeStrength, roughness:this.roughness, maxWidthForLeaves:this.maxWidthForLeaves, minSegmentForLeaves:this.minSegmentForLeaves, leavesAreaSize:this.leavesAreaSize, leavesSize:this.leavesSize, leavesCountPerBush:this.leavesCountPerBush});
    }
    for(let i = 0; i < this.branches.length ; i++){
      this.seed = this.branches[i].drawLeavesFrontLayerRough(this.seed,{gradient:this.leavesFrontLayerGradient, strokeStrength:this.strokeStrength, roughness:this.roughness, maxWidthForLeaves:this.maxWidthForLeaves, minSegmentForLeaves:this.minSegmentForLeaves, leavesAreaSize:this.leavesAreaSize, leavesSize:this.leavesSize, leavesCountPerBush:this.leavesCountPerBush});
    }
    var t1 = performance.now();
    console.log("Render time : " + (t1 - t0) + " ms");
  }
}


class TreeBranch{
  constructor(layer, startCoords, orientation, width, baseLength){
    this.layer = layer;
    this.startCoords = startCoords;
    this.baseLength = baseLength;
    this.totalLength = 0;
    this.segments = [];
    this.segments.push({
      orientation:orientation,
      width:width,
      distance:0
    });
    this.hitBox = new HitBox(startCoords.x,startCoords.x,startCoords.y,startCoords.y);
  }
  build(branchCollection, randomIndex, config){
    let currentWidth = this.segments[0].width;
    let currentOrientation = this.segments[0].orientation;
    let currentLength = this.baseLength;
    let segmentsCount = 0;
    let lastSplitDirection = 1;
    let currentCoords = this.startCoords.clone();
    while(currentWidth > config.minWidth && currentLength > config.minLength && segmentsCount < config.segmentsLimit){
      currentWidth *= 1-randomHandler.giveNumber(randomIndex)*config.widthLossfactor;
      randomIndex++;
      currentLength *= 1-randomHandler.giveNumber(randomIndex)*config.lengthLossfactor;
      randomIndex++;
      currentOrientation += (randomHandler.giveNumber(randomIndex)-.5)*config.maxDeviation;
      randomIndex++;
      if(this.layer <= config.layerCount && currentWidth < config.maxWidthForSplit){
        let split = randomHandler.giveNumber(randomIndex) < config.splitProbability;
        randomIndex++;
        if(split){
          let angle = (config.splitAngle + (randomHandler.giveNumber(randomIndex)-.5)*config.splitAngleRandom)*lastSplitDirection;
          randomIndex ++;
          lastSplitDirection *= -1;
          let newBranchAngle = currentOrientation + config.splitAngleDistribution*angle;
          currentOrientation -= (1-config.splitAngleDistribution)*angle;
          let newBranchWidth = currentWidth*config.splitWidthFactor;
          let newBranch = new TreeBranch(this.layer+1, currentCoords.clone(), newBranchAngle, newBranchWidth, currentLength);
          randomIndex = newBranch.build(branchCollection, randomIndex, config);
          branchCollection.push(newBranch);
        }
      }
      currentCoords = currentCoords.addOffset(CartesianCoordinatesFromPolar(currentLength, currentOrientation));
      this.hitBox.left = Math.min(this.hitBox.left, currentCoords.x);
      this.hitBox.right = Math.max(this.hitBox.right, currentCoords.x);
      this.hitBox.top = Math.min(this.hitBox.top, currentCoords.y);
      this.hitBox.bottom = Math.max(this.hitBox.bottom, currentCoords.y);
      this.segments.push({
        orientation:currentOrientation,
        width:currentWidth,
        distance:currentLength
      });
      this.totalLength += currentLength;
      segmentsCount++;
    }
    return randomIndex;
  }
  drawBranch(context, randomIndex, config){
    let baseColor = config.gradient.getColorForPosition(0).getColorString();
    let startCoords = this.startCoords.clone();
    let previousStartCoords = this.startCoords.clone();
    let offsetFromStart = CartesianCoordinatesFromPolar(this.segments[0].width/2, this.segments[0].orientation - Math.PI/2);
    let lastLeftCoords = startCoords.clone().addOffset(offsetFromStart);
    let lastRightCoords = startCoords.clone().addOffset(new Coordinates(-offsetFromStart.x, -offsetFromStart.y));
    let currentOrientation = this.segments[0].orientation;
    let xTruncLines = [];
    xTruncLines.push(0);
    for(let i = 1; i <= config.truncLines/2 ; i++){
      xTruncLines.push(Math.pow(2*i/config.truncLines,.6));
      xTruncLines.push(-Math.pow(2*i/config.truncLines,.6));
    }
    for(let i = 1; i < this.segments.length - 1; i++){
      previousStartCoords = startCoords.clone();
      startCoords = startCoords.addOffset(CartesianCoordinatesFromPolar(this.segments[i].distance, this.segments[i].orientation));
      offsetFromStart = CartesianCoordinatesFromPolar(this.segments[i].width/2, this.segments[i].orientation - Math.PI/2);
      let currentLeftCoords = startCoords.clone().addOffset(offsetFromStart);
      let currentRightCoords = startCoords.clone().addOffset(new Coordinates(-offsetFromStart.x, -offsetFromStart.y));

      // Filling the trunc with color
      let canvasContext = GetCanvasContext();
      canvasContext.beginPath();
      let path = new Path2D(svgHelper.path_Polygon_Absolute([lastLeftCoords, lastRightCoords, currentRightCoords, currentLeftCoords]));
      let truncGradient = canvasContext.createLinearGradient(currentLeftCoords.x, currentLeftCoords.y,currentRightCoords.x, currentRightCoords.y);
      truncGradient.addColorStop(0,config.gradient.getColorForPosition(0).getColorString());
      truncGradient.addColorStop((.5-Math.cos(this.segments[i].orientation)*.5),config.gradient.getColorForPosition(1).getColorString());
      truncGradient.addColorStop(1,config.gradient.getColorForPosition(0).getColorString());
      canvasContext.fillStyle = truncGradient;
      canvasContext.strokeStyle = truncGradient;
      canvasContext.lineWidth = config.strokeStrength;
      canvasContext.fill(path);
      canvasContext.stroke(path);

      context.strokeStyle = "black";
      // Drawing the outline
      canvasContext.stroke(new Path2D(svgHelper.path_Line_Absolute(lastLeftCoords, currentLeftCoords)));
      canvasContext.stroke(new Path2D(svgHelper.path_Line_Absolute(lastRightCoords, currentRightCoords)));

      // Drawing lines on the trunc
      if(this.segments[i].width > config.minWidthForTrunc){
        canvasContext.lineWidth = config.strokeStrength/3;
        for(let j = 0 ; j < xTruncLines.length; j++){
          let x = xTruncLines[j];
          let stOffset = this.segments[i].width*x/2;
          let ndOffset = this.segments[i-1].width*x/2;
          let bc = previousStartCoords.clone().addOffset(new Coordinates(ndOffset,0));
          let cs = new Coordinates((startCoords.x + stOffset - previousStartCoords.x - ndOffset)/config.truncLinesCuts, (startCoords.y - previousStartCoords.y)/config.truncLinesCuts);
          let poc = new Coordinates(0,0);
          for(let l = 0; l < config.truncLinesCuts; l++){
            let ec = bc.clone().addOffset(cs);
            let coc = new Coordinates((randomHandler.giveNumber(randomIndex)-.5)*config.truncLinesRoughness,0);
            randomIndex++;
            canvasContext.stroke(new Path2D(svgHelper.path_Line_Absolute(bc.clone().addOffset(poc), ec.clone().addOffset(coc))));
            bc = ec.clone();
            poc = coc.clone();
          }
        }
      }

      lastLeftCoords = currentLeftCoords;
      lastRightCoords = currentRightCoords;
    }
    return randomIndex;
  }
  drawBranchRough(context, randomIndex, config){
    let baseColor = config.gradient.getColorForPosition(0).getColorString();
    let startCoords = this.startCoords.clone();
    let previousStartCoords = this.startCoords.clone();
    let offsetFromStart = CartesianCoordinatesFromPolar(this.segments[0].width/2, this.segments[0].orientation - Math.PI/2);
    let lastLeftCoords = startCoords.clone().addOffset(offsetFromStart);
    let lastRightCoords = startCoords.clone().addOffset(new Coordinates(-offsetFromStart.x, -offsetFromStart.y));
    let xTruncLines = [];
    xTruncLines.push(0);
    for(let i = 1; i <= config.truncLines/2 ; i++){
      xTruncLines.push(Math.pow(2*i/config.truncLines,.6));
      xTruncLines.push(-Math.pow(2*i/config.truncLines,.6));
    }
    for(let i = 1; i < this.segments.length - 1; i++){
      previousStartCoords = startCoords.clone();
      startCoords = startCoords.addOffset(CartesianCoordinatesFromPolar(this.segments[i].distance, this.segments[i].orientation));
      offsetFromStart = CartesianCoordinatesFromPolar(this.segments[i].width/2, this.segments[i].orientation - Math.PI/2);
      let currentLeftCoords = startCoords.clone().addOffset(offsetFromStart);
      let currentRightCoords = startCoords.clone().addOffset(new Coordinates(-offsetFromStart.x, -offsetFromStart.y));

      // Filling the trunc with color
      let canvasContext = GetCanvasContext();
      canvasContext.beginPath();
      let path = new Path2D(svgHelper.path_Polygon_Absolute([lastLeftCoords, lastRightCoords, currentRightCoords, currentLeftCoords]));
      let truncGradient = canvasContext.createLinearGradient(currentLeftCoords.x, currentLeftCoords.y,currentRightCoords.x, currentRightCoords.y);
      truncGradient.addColorStop(0,config.gradient.getColorForPosition(0).getColorString());
      truncGradient.addColorStop((.5-Math.cos(this.segments[i].orientation)*.5),config.gradient.getColorForPosition(1).getColorString());
      truncGradient.addColorStop(1,config.gradient.getColorForPosition(0).getColorString());
      canvasContext.fillStyle = truncGradient;
      canvasContext.strokeStyle = truncGradient;
      canvasContext.lineWidth = config.strokeStrength;
      canvasContext.fill(path);
      canvasContext.stroke(path);

      // Drawing the outline
      context.path(
        svgHelper.path_Line_Absolute(lastLeftCoords, currentLeftCoords),
        {
          strokeWidth: config.strokeStrength,
          stroke: "black",
          roughness: config.roughness
        }
      );
      context.path(
        svgHelper.path_Line_Absolute(lastRightCoords, currentRightCoords),
        {
          strokeWidth: config.strokeStrength,
          stroke: "black",
          roughness: config.roughness
        }
      );

      // Drawing lines on the trunc
      if(this.segments[i].width > config.minWidthForTrunc){
        for(let j = 0 ; j < xTruncLines.length; j++){
          let x = xTruncLines[j];
          let stOffset = this.segments[i].width*x/2;
          let ndOffset = this.segments[i-1].width*x/2;
          let bc = previousStartCoords.clone().addOffset(new Coordinates(ndOffset,0));
          let cs = new Coordinates((startCoords.x + stOffset - previousStartCoords.x - ndOffset)/config.truncLinesCuts, (startCoords.y - previousStartCoords.y)/config.truncLinesCuts);
          let poc = new Coordinates(0,0);
          for(let l = 0; l < config.truncLinesCuts; l++){
            let ec = bc.clone().addOffset(cs);
            let coc = new Coordinates((randomHandler.giveNumber(randomIndex)-.5)*config.truncLinesRoughness,0);
            randomIndex++;
            context.path(
              svgHelper.path_Line_Absolute(bc.clone().addOffset(poc), ec.clone().addOffset(coc)),
              {
                strokeWidth: config.strokeStrength*.3,
                stroke: "black",
                roughness: config.roughness
              }
            );
            bc = ec.clone();
            poc = coc.clone();
          }
        }
      }

      lastLeftCoords = currentLeftCoords;
      lastRightCoords = currentRightCoords;
    }
    return randomIndex;
  }
  drawLeavesBackLayer(randomIndex, config){
    let context = GetCanvasContext();
    let startCoords = this.startCoords.clone();
    let currentLength = 0;
    for(let i = 0; i < this.segments.length; i++){
      if(i >= config.minSegmentForLeaves && this.segments[i].width < config.maxWidthForLeaves){
        let color = config.gradient.getColorForPosition(Math.pow(currentLength/this.totalLength,2)).getColorString();
        randomIndex = this.drawLeafBush(context,randomIndex, startCoords, config.leavesSize, config.leavesCountPerBush, color, config.leavesAreaSize);
      }
      currentLength += this.segments[i].distance;
      startCoords = startCoords.addOffset(CartesianCoordinatesFromPolar(this.segments[i].distance, this.segments[i].orientation));
    }
    return randomIndex;
  }
  drawSelfShadowLayer(randomIndex, config){
    let context = GetCanvasContext();
    let startCoords = this.startCoords.clone();
    let currentLength = 0;
    for(let i = 0; i < this.segments.length; i++){
      if(i >= config.minSegmentForLeaves && this.segments[i].width < config.maxWidthForLeaves){
        let color = config.gradient.getColorForPosition(Math.pow(currentLength/this.totalLength,2)).getColorString();
        randomIndex = this.drawLeafBush(context,randomIndex, startCoords, config.leavesSize, config.leavesCountPerBush, color, config.leavesAreaSize/5);
      }
      currentLength += this.segments[i].distance;
      startCoords = startCoords.addOffset(CartesianCoordinatesFromPolar(this.segments[i].distance, this.segments[i].orientation));
    }
    return randomIndex;
  }
  drawLeavesFrontLayer(randomIndex, config){
    let context = GetCanvasContext();
    let startCoords = this.startCoords.clone();
    let currentLength = 0;
    for(let i = 0; i < this.segments.length; i++){
      if(i >= config.minSegmentForLeaves && this.segments[i].width < config.maxWidthForLeaves){
        let color = config.gradient.getColorForPosition(Math.pow(currentLength/this.totalLength,2)).getColorString();
        randomIndex = this.drawLeafBush(context,randomIndex, startCoords, config.leavesSize, config.leavesCountPerBush, color, config.leavesAreaSize);
      }
      currentLength += this.segments[i].distance;
      startCoords = startCoords.addOffset(CartesianCoordinatesFromPolar(this.segments[i].distance, this.segments[i].orientation));
    }
    return randomIndex;
  }
  drawLeavesFrontLayerRough(randomIndex, config){
    let context = GetCanvasContext();
    let startCoords = this.startCoords.clone();
    let currentLength = 0;
    for(let i = 0; i < this.segments.length; i++){
      if(i >= config.minSegmentForLeaves && this.segments[i].width < config.maxWidthForLeaves){
        let color = config.gradient.getColorForPosition(Math.pow(currentLength/this.totalLength,2)).getColorString();
        randomIndex = this.drawLeafBush(context,randomIndex, startCoords, config.leavesSize, config.leavesCountPerBush, color, config.leavesAreaSize);
      }
      currentLength += this.segments[i].distance;
      startCoords = startCoords.addOffset(CartesianCoordinatesFromPolar(this.segments[i].distance, this.segments[i].orientation));
    }
    return randomIndex;
  }
  drawLeafBush(context, randomIndex, startCoords, sizeCoords, leavesCount, color, maxDistance){
    for(let i = 0; i < leavesCount; i++){
      let dist = randomHandler.giveNumber(randomIndex)*maxDistance;
      randomIndex++;
      let angle = (randomHandler.giveNumber(randomIndex)-.5)*1.2;
      randomIndex++;
      let orientation = randomHandler.giveNumber(randomIndex)*Math.PI*2;
      randomIndex++;
      //let pth = svgHelper.path_Rectangle(startCoords, new Coordinates(dist,0), sizeCoords, orientation, angle);
      let pth = svgHelper.path_lens(startCoords, new Coordinates(dist,0), sizeCoords.x, -sizeCoords.y, sizeCoords.y, orientation, angle);
      context.beginPath();
      context.fillStyle = color;
      context.fill(new Path2D(pth));
    }
    return randomIndex;
  }
}
