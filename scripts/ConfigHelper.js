// To load a config
function LoadConfig(configs, name){
  for(let i = 0; i < configs.length; i++){
    if(configs[i].name == name)
      return configs[i].config;
  }
}

// Example of a config variable
// ****************************
// var exampleConfigs = JSON.parse(`
// [
//   {
//     "name":"exampleConfigName1",
//     "config":{
//       "property1":"Value1",
//       "property2":"Value2",
//       "ComplexType1":{
//         "complexType1Property1":"complexType1Value1",
//         "complexType1Property2":"complexType1Value2"
//       }
//     }
//   },
//   {
//     "name":"exampleConfigName2",
//     "config":{
//       "property1":"Value1",
//       "property2":"Value2",
//       "ComplexType1":{
//         "complexType1Property1":"complexType1Value1",
//         "complexType1Property2":"complexType1Value2"
//       }
//     }
//   }
// ]`);
// ****************************


// To load a transition config
function LoadTransitionConfig(transitionConfigs, from, to, sideSwitch){
  let transition = transitionConfigs.find(e => e.from == from && e.to == to && (e.sideSwitch == sideSwitch || e.sideSwitch == null));
  return (transition === undefined) ? null : transition;
}

// Example of a transition config variable
// ****************************
// var exampleTransitionConfigs = JSON.parse(`
// [
//  {
//    "from":"startingMovement",
//     "to":"nextMovement",
//     "sideSwitch":true,
//     "indexTo":0,
//     "frameCount":12,
//     "rotationDirections":[
//      {
//         "endJunction":"fronthand",
//        "direction":1
//      }
//   ]
// }
// ]`);
// ****************************
