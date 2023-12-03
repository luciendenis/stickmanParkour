class ProgressiveDraw {
  constructor(context, drawsPerFrame) {
    this.context = context;
    this.drawFunctions = [];
    this.drawCount = 0;
    this.drawsPerFrame = drawsPerFrame;
  }
  done(){
    return (this.drawCount == this.drawFunctions.length);
  }
  update(){
    for(let i = this.drawCount; i < Math.min(this.drawCount + this.drawsPerFrame, this.drawFunctions.length); i++){
      this.drawFunctions[i](this.context);
    }
    this.drawCount = Math.min(this.drawCount + this.drawsPerFrame, this.drawFunctions.length);
  }
}



function AdaptRoughOptionsToScale(roughOptions, scale){
  var newRoughOptions = JSON.parse(JSON.stringify(roughOptions));
  if(newRoughOptions.strokeWidth != null){
    newRoughOptions.strokeWidth*=scale;
  }
  if(newRoughOptions.fillWeight != null){
    newRoughOptions.fillWeight*=scale;
  }
  if(newRoughOptions.hachureGap != null){
    newRoughOptions.hachureGap*=scale;
  }
  return newRoughOptions;
}
