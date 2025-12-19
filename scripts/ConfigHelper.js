// To load a config
function LoadConfig(configs, name){
  for(let i = 0; i < configs.length; i++){
    if(configs[i].name === name)
      return configs[i].config;
  }
}

// To load a transition config
function LoadTransitionConfig(transitionConfigs, from, to, sideSwitch){
  let transition = transitionConfigs.find(e => e.from === from && e.to === to && (e.sideSwitch === sideSwitch || e.sideSwitch == null));
  return (transition === undefined) ? null : transition;
}