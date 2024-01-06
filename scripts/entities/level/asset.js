function AdaptAssetToScale(asset, levelLimits, scale){
  let seed = randomHandler.giveRandomIndex();
  switch (asset.type) {
    case "wall_bricks":
      return new Wall_Bricks(asset.config, levelLimits, scale, seed);
    break;
    case "fence_metal_bars":
      return new Fence_Metal_Bars(asset.config, levelLimits, scale, seed);
    break;
    case "fence_metal_grid":
      return new Fence_Metal_Grid(asset.config, levelLimits, scale, seed);
    break;
    case "fence_wood_vertical":
      return new Fence_Wood_Vertical(asset.config, levelLimits, scale, seed);
    break;
    default:
      return null;
  }
}
