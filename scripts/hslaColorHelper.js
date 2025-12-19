class HslaColor{
  constructor(angle, saturation, lightness, opacity){
    this.angle = angle;
    this.saturation = saturation;
    this.lightness = lightness;
    this.opacity = opacity;
  }
  clone(){
    return new HslaColor(this.angle, this.saturation, this.lightness, this.opacity);
  }
  parse(colorString){
    colorString = colorString.trim();
    const hsla_color_regex = /([Hh][Ss][Ll][Aa]\(\s*(0|[1-9]\d?|[12]\d\d|3[0-5]\d)\s*,\s*(0|100|[1-9]\d?)\s*%?\s*,\s*(0|100|[1-9]\d?)\s*%?\s*,\s*(1|0|0?\.\d*)\s*\))/;
    let regex = new RegExp(hsla_color_regex);
    if(!regex.test(colorString))return null;
    // check and suppress 'hsla(' and ')'
    let values = colorString.split("(").pop().split(")")[0].replaceAll("%","").split(",");
    return new HslaColor(parseInt(values[0].trim()), parseInt(values[1].trim()), parseInt(values[2].trim()), parseFloat(values[3].trim()));
  }
  add(color){
    this.angle = (this.angle + color.angle)%360;
    this.saturation = Math.min(100,Math.max(0, this.saturation + color.saturation));
    this.lightness = Math.min(100,Math.max(0, this.lightness + color.lightness));
    this.opacity = Math.min(1,Math.max(0, this.opacity + color.opacity));
    return this;
  }
  scale(factor){
    this.angle = this.angle*factor;
    this.saturation = this.saturation*factor;
    this.lightness = this.lightness*factor;
    this.opacity = this.opacity*factor;
    return this;
  }
  randomize(hslaRandom, randomIndex){
    this.angle = (this.angle + (randomHandler.giveNumber(randomIndex)-.5)*hslaRandom.angle)%360;
    randomIndex++;
    this.saturation = Math.min(100,Math.max(0, this.saturation + (randomHandler.giveNumber(randomIndex)-.5)*hslaRandom.saturation));
    randomIndex++;
    this.lightness = Math.min(100,Math.max(0, this.lightness + (randomHandler.giveNumber(randomIndex)-.5)*hslaRandom.lightness));
    randomIndex++;
    this.opacity = Math.min(1,Math.max(0, this.opacity + (randomHandler.giveNumber(randomIndex)-.5)*hslaRandom.opacity));
    randomIndex++;
    return randomIndex;
  }
  getColorString(){
    return 'hsla(' + this.angle + ',' + this.saturation + '%,' + this.lightness + '%,' + this.opacity + ')';
  }
  getColorStringWithOverride(angleOverride, saturationOverride, lightnessOverride, opacityOverride){
    return 'hsla(' + (angleOverride == null ? this.angle : angleOverride) + ',' + (saturationOverride == null ? this.saturation : saturationOverride) + '%,' + (lightnessOverride == null ? this.lightness : lightnessOverride) + '%,' + (opacityOverride == null ? this.opacity : opacityOverride) + ')';
  }
}

class HslaGradient{
  constructor(colorStops){
    this.colorStops = [];
    if(colorStops.length === 1){
      this.colorStops.push({
        position: 0,
        color: new HslaColor().parse(colorStops[0].color)
      });
      this.colorStops.push({
        position: 1,
        color: new HslaColor().parse(colorStops[0].color)
      });
    }
    else if(colorStops.length > 1){
      for(let i = 0; i < colorStops.length; i++){
        let stop = colorStops[i];
        this.colorStops.push({
          position: stop.position,
          color: new HslaColor().parse(stop.color)
        });
        this.colorStops.sort((a,b) => a.position - b.position);
      }
    }

    if(this.colorStops[0].position > 0){
      this.colorStops.unshift({
        position: 0,
        color: new HslaColor(0,0,0,0)
      });
    }
    if(this.colorStops[this.colorStops.length-1].position < 1){
      this.colorStops.push({
        position: 1,
        color: new HslaColor(0,0,0,0)
      });
    }
  }
  getColorForPosition(position){
    if(position <= 0){
      return this.colorStops[0].color.clone();
    }
    else if(position >= 1){
      return this.colorStops[this.colorStops.length-1].color.clone();
    }
    else{
      let i = 1;
      let found = false;
      while(!found && i < this.colorStops.length){
        if(this.colorStops[i].position > position){found = true;}
        else{i++;}
      }
      let factor = (position - this.colorStops[i-1].position)/(this.colorStops[i].position - this.colorStops[i-1].position);
      let baseColor = this.colorStops[i-1].color.clone();
      let colorDiff = this.colorStops[i].color.clone().add(baseColor.clone().scale(-1));
      return baseColor.add(colorDiff.scale(factor));
    }
  }
}
