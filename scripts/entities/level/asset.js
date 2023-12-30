function AdaptAssetToScale(asset, levelLimits, scale){
  let seed = randomHandler.giveRandomIndex();
  switch (asset.type) {
    case "wall_bricks":
        return new Wall_Bricks(asset.config, levelLimits, scale, seed);
      break;
    default:
      return null;
  }
}
