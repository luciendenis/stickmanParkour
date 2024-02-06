function AdaptAssetToScale(asset, levelLimits, scale){
  let seed = randomHandler.giveRandomIndex();
  let object;
  switch (asset.type) {
    case "tree":
      object = new Tree(asset.config, levelLimits, scale, seed);
    break;
    case "wall_bricks":
      object = new Wall_Bricks(asset.config, levelLimits, scale, seed);
    break;
    case "fence_metal_bars":
      object = new Fence_Metal_Bars(asset.config, levelLimits, scale, seed);
    break;
    case "fence_metal_grid":
      object = new Fence_Metal_Grid(asset.config, levelLimits, scale, seed);
    break;
    case "fence_wood_vertical":
      object = new Fence_Wood_Vertical(asset.config, levelLimits, scale, seed);
    break;
    case "ground_depth_grass":
      object = new Ground_Depth_Grass(asset.config, levelLimits, scale, seed);
    break;
    case "ground_depth_concrete":
      object = new Ground_Depth_Concrete(asset.config, levelLimits, scale, seed);
    break;
    case "background_sky":
      object = new Background_Sky(asset.config, levelLimits, scale, seed);
    break;
    case "background_mountains":
      object = new Background_Mountains(asset.config, levelLimits, scale, seed);
    break;
    case "background_mist":
      object = new Background_Mist(asset.config, levelLimits, scale, seed);
    break;
    default:
      object = null;
  }
  return new Asset(asset.id, asset.parent, asset.layer, asset.order, object);
}

function LinkAssetsChildren(assetsList){
  for(let i = 0; i < assetsList.length; i++){
    if(assetsList[i].parent != null){
      let parentAsset = assetsList.find(a => a.id == assetsList[i].parent);
      if(parentAsset !== null && parentAsset !== undefined && typeof parentAsset.object.addChild === "function"){
        parentAsset.object.addChild(assetsList[i].object);
      }
    }
  }
}

class Asset {
  constructor(id, parent, layer, order, object) {
    this.id = id;
    this.parent = parent;
    this.layer = layer;
    this.order = order;
    this.object = object;
  }
}

// These classes are designed to help drawing complex shapes with depth
class DepthPolygonPoint {
  constructor(distance, offset, length) {
    this.distance = distance; // distance from the starting coordinates
    this.offset = offset;     // offset from the starting coordinates
    this.length = length;     // length of the section
  }
}
class DepthPolygon {
  constructor(config, scale) {
    this.startScale = config.startScale*scale;
    this.endScale = config.endScale*scale;
    this.points = [];
    for(let i = 0; i < config.points.length ; i++){
      let p = config.points[i];
      this.points.push(new DepthPolygonPoint(p.distance*scale, p.offset*scale, p.length*scale));
    }
    this.points.sort((a,b) => a.distance - b.distance);
  }
  maxDistance(){
    return this.points[this.points.length-1].distance;
  }
  propertiesForDistance(dist){
    if(dist < 0 || dist > this.maxDistance()) return null;
    let i = 0;
    while(this.points[i].distance <= dist){
      i++;
    };
    let j = Math.max(i-1,0);
    let factor = (dist - this.points[j].distance)/(this.points[i].distance - this.points[j].distance);
    return {
      offset : this.points[j].offset + (this.points[i].offset - this.points[j].offset)*factor,
      length : this.points[j].length + (this.points[i].length - this.points[j].length)*factor,
      scale: this.startScale + (dist/this.maxDistance())*(this.endScale-this.startScale)
    };
  }
  getArrayOfCoordsForSvgPath(){
    let arrForward = [];
    let arrBackward = [];
    let previous = this.points[0];
    for(let i = 1; i < this.points.length; i++){
      let current = this.points[i];
      arrForward.push(new Coordinates(current.distance-previous.distance, current.offset-previous.offset));
      arrBackward.unshift(new Coordinates(previous.distance-current.distance, (previous.offset + previous.length) - (current.offset + current.length)));
      if(i == (this.points.length-1) && current.length > 0){
        arrForward.push(new Coordinates(0, current.length));
      }
      previous = current;
    }
    return arrForward.concat(arrBackward);
  }
}
