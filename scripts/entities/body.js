// x and y coordinates on the canvas
class Coordinates{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  addOffset(offsetCoords){
    this.x += offsetCoords.x;
    this.y += offsetCoords.y;
    return this;
  }
  clone(offset){
    if(offset == null || offset === undefined)
      offset = new Coordinates(0,0);
    return new Coordinates(this.x + offset.x, this.y + offset.y);
  }
}
class PolarCoordinates {
  constructor(distance, angle) {
    this.distance = distance;
    this.angle = angle;
  }
}

class Angles {
  constructor(xy,z,forceRotationDirection) {
    this.xy = xy; // angle on the pane formed by the x and y axis, between 0 and 2Pi
    this.z = z;   // angle on the pane formed by the xy line and the z axis, between -1 and 1
    this.forceRotationDirection = forceRotationDirection; // null or -1 or 1, used to force rotation direction to the next frame
  }
  clone(){
    return new Angles(this.xy, this.z, this.forceRotationDirection);
  }
}

// Body junction
class Junction{
  constructor(coordinates,size,color){
    this.coordinates = coordinates;
    this.size = size;   // draw size
    this.color = color; // color
  }
  draw(context){
    context.beginPath();
    context.arc(this.coordinates.x, this.coordinates.y, this.size/2, 0, Math.PI*2, false);
    context.fillStyle = this.color;
    context.fill();
  }
  drawRough(context, roughOptions){
    context.circle(this.coordinates.x,this.coordinates.y,0, roughOptions);
  }
}

// Movement, containing a succession of positions
class Movement {
  constructor() {
    this.positions = [];        // collection of positions
    this.cycle = true;          // if true, at the end of position array it cycles back to first element
    this.switchSide = true;     // if true, left and right position elements switch at each cycle
    this.resetAfter = false;    // if true, once last frame of last position is reached, go back to idle
  }
}

// Position for a whole body, containing a collection of position elements
class Position {
  constructor() {
    this.anchor = null;  // if true, the drawing on the level will start on an anchor point instead of the coordinates of the player
    this.drawStartJunction = "hitboxbottom";  // from which point on the body this position is meant to be drawn
    this.offsets = {};  // collection of offsets for the position (coordinates, velocity and acceleration)
    this.elements = []; // collection of position elements, order is very important
    // it starts from the center, then shoulders and hips, then head, hands and feet
    // elbows and knees are deduced
  }
}

// Position element, defines a junction position relative to another
class PositionElement {
  constructor(startJunction,middleJunction,endJunction,startLength,endLength,angles,extension) {
    this.startJunction = startJunction;   // string name of the start junction
    this.middleJunction = middleJunction; // *optional* string name of the middle junction if relevant
    this.endJunction = endJunction;       // string name of the end junction
    this.startLength = startLength;       // string name of the start limb length
    this.endLength = endLength;           // *optional* string name of the end limb length if relevant
    this.angles = angles;                   // angle formed by the line between junctions relative to horizontal
    this.extension = extension;           // percentage of limb extension from 0 to 1 (only used if there is an intermediate junction)
  }
}

class HitBox {  // gives the offsets from body center to tell the space that is occupied by the body
  constructor(left, right, top, bottom) {
    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
  }
  clone(){
    return new HitBox(this.left, this.right, this.top, this.bottom);
  }
  totalHeight(){
    return this.bottom - this.top;
  }
  totalWidth(){
    return this.right - this.left;
  }
}

class Dimensions {  // calculated dimensions of a body for a given position
  constructor(movementName, positionIndex, dimensions) {
    this.movement = movementName; // name of the movement
    this.index = positionIndex;   // index of the position in the movement
    this.dimensions = dimensions; // coordinates, x is width, y is height
  }
}

class Body {
  constructor(coordinates,angles,scale,config) {
    this.coordinates = coordinates;
    this.hitBox = new HitBox(0,0,0,0);
    this.angles = angles;
    this.scale = scale;         // scale of the body
    this.bodySize = config.size*scale;   // draw size of body parts
    this.color = config.color;         // global color for the body
    this.junctions = {};        // collection of junctions
    this.lengths = {};          // collection of limbs lengths
    this.calculatedDimensions = []; // collection of dimensions for specific positions, to avoid unnecessary recalculation
    this.drawInstructions = config.drawInstructions; // collection of drawing instructions
    for(let i = 0; i < config.lengths.length; i++){
      this.lengths[config.lengths[i].name] = config.lengths[i].value*this.scale;
    }
    for(let i = 0; i < config.junctions.length; i++){
      let colors = debugMode && config.junctions[i].name.includes("left") ? "green" : debugMode && config.junctions[i].name.includes("right") ? "red" : this.color;
      this.junctions[config.junctions[i].name] = new Junction(this.coordinates,config.junctions[i].sizeModifier*this.bodySize,colors);
    }
    this.roughOptions = AdaptRoughOptionsToScale(config.roughOptions, scale);
  }
  draw(context){
    if(debugMode){ // drawing body hitbox
      context.fillStyle = "hsla(280, 100%, 50%, 0.2)";
      context.fillRect(this.hitBox.left + this.coordinates.x, this.hitBox.top + this.coordinates.y, this.hitBox.right - this.hitBox.left, this.hitBox.bottom - this.hitBox.top);
    }
    for(let key in this.junctions){
      this.junctions[key].draw(context);
    }
    context.beginPath();
    context.lineWidth = this.bodySize;
    context.strokeStyle = this.color;
    for(let i = 0; i < this.drawInstructions.length ; i++){
      for(let j = 0; j <this.drawInstructions[i].endNames.length; j++){
        context.moveTo(this.junctions[this.drawInstructions[i].startName].coordinates.x,this.junctions[this.drawInstructions[i].startName].coordinates.y);
        context.lineTo(this.junctions[this.drawInstructions[i].endNames[j]].coordinates.x,this.junctions[this.drawInstructions[i].endNames[j]].coordinates.y);
      }
    }
    context.stroke();
    if(debugMode){ // drawing body center
      context.beginPath();
      context.arc(this.coordinates.x, this.coordinates.y, this.bodySize/2, 0, Math.PI*2, false);
      context.fillStyle = "purple";
      context.fill();
    }
  }
  drawRough(context){
    for(let key in this.junctions){
      this.junctions[key].drawRough(context, this.roughOptions);
    }
    for(let i = 0; i < this.drawInstructions.length ; i++){
      for(let j = 0; j <this.drawInstructions[i].endNames.length; j++){
        if(this.drawInstructions[i].endNames[j] != "head"){
          context.line(
            this.junctions[this.drawInstructions[i].startName].coordinates.x,
            this.junctions[this.drawInstructions[i].startName].coordinates.y,
            this.junctions[this.drawInstructions[i].endNames[j]].coordinates.x,
            this.junctions[this.drawInstructions[i].endNames[j]].coordinates.y,
            this.roughOptions
          );
        }
      }
    }
    context.circle(this.junctions["head"].coordinates.x,this.junctions["head"].coordinates.y,this.junctions["head"].size, this.roughOptions);
  }
  calculateJunctionsForPosition(position){
    var junctions = {};
    for(let i = 0; i < position.elements.length; i++){
      let currentPE = position.elements[i];
      let startCoordinates = currentPE.startJunction == "center" ? new Coordinates(0,0) : junctions[currentPE.startJunction].coordinates;
      junctions[currentPE.endJunction] = new Junction(CaclulateEndJunctionCoordinates(currentPE,startCoordinates, this.lengths[currentPE.startLength], this.lengths[currentPE.endLength], position.offsets["angles"].xy),this.junctions[currentPE.endJunction].size,this.junctions[currentPE.endJunction].color);
      if(currentPE.middleJunction != ""){
        junctions[currentPE.middleJunction] = new Junction(CaclulateMiddleJunctionPosition(startCoordinates, junctions[currentPE.endJunction].coordinates, this.lengths[currentPE.startLength], this.lengths[currentPE.endLength], currentPE.angles.z),this.junctions[currentPE.middleJunction].size,this.junctions[currentPE.middleJunction].color);
      }
    }
    return junctions;
  }
  setPositionRelative(position){ // computing junctions positions relative to center
    for(let i = 0; i < position.elements.length; i++){
      let currentPE = position.elements[i];
      let startCoordinates = currentPE.startJunction == "center" ? new Coordinates(0,0) : this.junctions[currentPE.startJunction].coordinates;
      this.junctions[currentPE.endJunction].coordinates = CaclulateEndJunctionCoordinates(currentPE,startCoordinates, this.lengths[currentPE.startLength], this.lengths[currentPE.endLength], position.offsets["angles"].xy);
      if(currentPE.middleJunction != ""){
        this.junctions[currentPE.middleJunction].coordinates = CaclulateMiddleJunctionPosition(startCoordinates, this.junctions[currentPE.endJunction].coordinates, this.lengths[currentPE.startLength], this.lengths[currentPE.endLength], currentPE.angles.z);
      }
    }
    this.updateHitBox();
  }
  updateHitBox(){ // computing the size of the body hitbox
    this.hitBox = GetPositionHitbox(this.junctions);
  }
  setPositionAbsolute(centerCoordinates){ // applying computed junctions positions to center coordinates
    this.coordinates.x = centerCoordinates.x;
    this.coordinates.y = centerCoordinates.y;
    for(let key in this.junctions){
      let j = this.junctions[key];
      j.coordinates.x += centerCoordinates.x;
      j.coordinates.y += centerCoordinates.y;
    }
  }
  crossingAbility(){  // gives the maximum height body can cross without having to climb
    return (this.lengths["thighs"] + this.lengths["calves"])*settings.bodyCrossingAbilityFactor;
  }
  climbingAbility(){ // gives the maximum height body is able to reach for climbing
    return (this.lengths["thighs"] + this.lengths["calves"] + 2*this.lengths["chest"] + this.lengths["upperarm"] + this.lengths["forearm"])*settings.bodyHeightFactor;
  }
  standDimensions(){
    return this.searchBodyDimensions("idling",0);
  }
  crouchDimensions(){
    return this.searchBodyDimensions("crouching",0);
  }
  hoppingForwardRange(){
    let coords = this.standDimensions();
    return new Coordinates(coords.x*settings.hoppingRangeX, coords.y*settings.hoppingRangeY);
  }
  hangWithLegsHeightMin(){
    return this.searchBodyDimensions("edgeHangingWithLegs",0).y - (this.bodySize/2);
  }
  getOffsetCoords(type, startCoordName){ // gives x and y offsets from center depending on the name of the junction or limit
    return GetPositionOffsetCoords((type == "absolute" ? this.coordinates : null), this.junctions, startCoordName, this.hitBox);
  }
  getJunctionCoords(junctionName){
    let junction = this.junctions[junctionName];
    if(junction != null){
      return junction.coordinates.clone();
    }
    else{
      return null;
    }
  }
  getOffsetCoordsBetweenDrawStartJunctions(firstDrawStartJunction, secondDrawStartJunction){
    let firstOffsetCoords = this.getOffsetCoords("absolute", firstDrawStartJunction);
    let secondOffsetCoords = this.getOffsetCoords("absolute", secondDrawStartJunction);
    return new Coordinates(secondOffsetCoords.x - firstOffsetCoords.x, secondOffsetCoords.y - firstOffsetCoords.y);
  }
  getHitBoxForPosition(position){
    let referencePosition = ApplyPositionSettings(position, null, "left", "right", 1, 1, null);
    return GetPositionHitbox(this.calculateJunctionsForPosition(referencePosition));
  }
  getDimensionsForPosition(position){
    let referenceHitbox = this.getHitBoxForPosition(position);
    return new Coordinates(referenceHitbox.totalWidth(),referenceHitbox.totalHeight());
  }
  searchBodyDimensions(movementName, positionIndex){
    let calculatedDimensions = this.calculatedDimensions.find(d => d.movement == movementName && d.index == positionIndex);
    if(calculatedDimensions == null || calculatedDimensions === undefined){
      calculatedDimensions = new Dimensions(movementName, positionIndex, this.getDimensionsForPosition(LoadConfig(movementConfigs,movementName).positions[positionIndex]));
      this.calculatedDimensions.push(calculatedDimensions);
    }
    return calculatedDimensions.dimensions;
  }
}

class IntermediatePositionSettings {  // class used for calculus of positionElements between keyframes
  constructor(xyAngleStep, zAngleStep, extensionStep) {
    this.xyAngleStep = xyAngleStep;
    this.zAngleStep = zAngleStep;
    this.extensionStep = extensionStep;
  }
}


function ApplyPositionOverrideSettings(position, frontSide, backSide, direction, body, anchor){
  var newPosition = new Position();
  if(position.offsets == null){
    newPosition.offsets["position"] = new Coordinates(0,0);
    newPosition.offsets["velocity"] = new Coordinates(0,0);
  }
  else{
    newPosition.offsets["position"] = position.offsets.position != null ? new Coordinates(position.offsets.position.x != null ? position.offsets.position.x : 0, position.offsets.position.y != null ? position.offsets.position.y : 0) : new Coordinates(0,0);
    newPosition.offsets["velocity"] = position.offsets.velocity != null ? new Coordinates(position.offsets.velocity.x != null ? position.offsets.velocity.x : 0, position.offsets.velocity.y != null ? position.offsets.velocity.y : 0) : new Coordinates(0,0);
  }
  for(let i = 0; i < position.elements.length; i++){
    let pe = position.elements[i];
    let newAngles;
    let newExtension;
    if(pe.anchor != null){
      var startCoords = body.junctions[pe.startJunction].coordinates;
      newAngles = new Angles(AngleXYfromCoords(startCoords, anchor.coordinates), pe.angles.z, pe.angles.forceRotationDirection != null ? pe.angles.forceRotationDirection : null);
      newExtension = Math.min(1, (body.lengths[pe.startLength]+body.lengths[pe.endLength]) /DistBetweenCoords(startCoords, anchor.coordinates));
    }
    else{
      newAngles = new Angles(pe.angles.xy, pe.angles.z, pe.angles.forceRotationDirection != null ? pe.angles.forceRotationDirection : null);
      newExtension = pe.extension;
    }
    newPosition.elements.push(new PositionElement(
      pe.startJunction.replace('front', frontSide).replace('back', backSide),
      pe.middleJunction.replace('front', frontSide).replace('back', backSide),
      pe.endJunction.replace('front', frontSide).replace('back', backSide),
      pe.startLength,
      pe.endLength,
      newAngles,
      newExtension
    ));
  }
  return newPosition;
}

function ApplyPositionSettings(position, overrides, frontSide, backSide, direction, crouchFactor, anglesOffsets){
  var newPosition = new Position();
  newPosition.anchor = (position.anchor != null) ? new Anchor(new Coordinates(0,0), position.anchor.releaseOffset.replace('front', frontSide).replace('back', backSide), position.anchor.fpsCurveOffsets) : null;
  if(position.drawStartJunction != null){
    newPosition.drawStartJunction = position.drawStartJunction.replace('front', frontSide).replace('back', backSide);
  }
  if(overrides != null && overrides.offsets != null){
    newPosition.offsets["position"] = overrides.offsets.position != null ? new Coordinates(overrides.offsets.position.x != null ? overrides.offsets.position.x*globalScale*direction : 0, overrides.offsets.position.y != null ? overrides.offsets.position.y*globalScale : 0) : new Coordinates(0,0);
    newPosition.offsets["velocity"] = overrides.offsets.velocity != null ? new Coordinates(overrides.offsets.velocity.x != null ? overrides.offsets.velocity.x*globalScale*direction : 0, overrides.offsets.velocity.y != null ? overrides.offsets.velocity.y*globalScale : 0) : new Coordinates(0,0);
  }
  else if(position.offsets == null){
    newPosition.offsets["position"] = new Coordinates(0,0);
    newPosition.offsets["velocity"] = new Coordinates(0,0);
  }
  else{
    newPosition.offsets["position"] = position.offsets.position != null ? new Coordinates(position.offsets.position.x != null ? position.offsets.position.x*globalScale*direction : 0, position.offsets.position.y != null ? position.offsets.position.y*globalScale : 0) : new Coordinates(0,0);
    newPosition.offsets["velocity"] = position.offsets.velocity != null ? new Coordinates(position.offsets.velocity.x != null ? position.offsets.velocity.x*globalScale*direction : 0, position.offsets.velocity.y != null ? position.offsets.velocity.y*globalScale : 0) : new Coordinates(0,0);
  }
  newPosition.offsets["angles"] = (anglesOffsets != null) ? anglesOffsets : new Angles(0,0,0);
  for(let i = 0; i < position.elements.length; i++){
    let startJunction = position.elements[i].startJunction.replace('front', frontSide).replace('back', backSide);
    let middleJunction = position.elements[i].middleJunction.replace('front', frontSide).replace('back', backSide);
    let endJunction = position.elements[i].endJunction.replace('front', frontSide).replace('back', backSide);
    let positionElement = overrides == null ? null : overrides.elements.find(e => e.startJunction == startJunction && e.endJunction == endJunction);
    positionElement = positionElement == null ? position.elements[i] : positionElement;
    newPosition.elements.push(new PositionElement(
      startJunction,
      middleJunction,
      endJunction,
      positionElement.startLength,
      positionElement.endLength,
      new Angles(
        direction == 1 ? positionElement.angles.xy : AngleMirrorY(positionElement.angles.xy),
        positionElement.angles.z * direction,
        positionElement.angles.forceRotationDirection != null ? positionElement.angles.forceRotationDirection : null
      ),
      positionElement.middleJunction.includes('knee') ? positionElement.extension*crouchFactor : positionElement.extension
    ));
  }
  return newPosition;
}

function CaclulateEndJunctionCoordinates(positionElement,startJunctionCoordinates,startLength,endLength,angleOffset){
  let totalLength = (startLength + endLength)*positionElement.extension;
  let x = startJunctionCoordinates.x + totalLength * Math.cos(positionElement.angles.xy + angleOffset);
  let y = startJunctionCoordinates.y + totalLength * Math.sin(positionElement.angles.xy + angleOffset);
  return new Coordinates(x,y);
}

function CaclulateMiddleJunctionPosition(startJunctionCoordinates, endJunctionCoordinates, startLength, endLength, zAngle){
  let distX = endJunctionCoordinates.x-startJunctionCoordinates.x;
  let distY = endJunctionCoordinates.y-startJunctionCoordinates.y;
  let dist = Math.sqrt(Math.pow(distX,2)+Math.pow(distY,2));
  let lengthToProj = (Math.pow(startLength,2) - Math.pow(endLength,2) + Math.pow(dist,2)) / (2 * dist);
  lengthToProj = Math.min(lengthToProj,startLength); // very edgy case that can happen because of approximation, lengthToProj cannot be greater than startlength
  let hProj = Math.sqrt(Math.pow(startLength,2) - Math.pow(lengthToProj,2)) * zAngle;
  let projX = startJunctionCoordinates.x + (lengthToProj * distX / dist);
  let projY = startJunctionCoordinates.y + (lengthToProj * distY / dist);
  return new Coordinates(projX - hProj * distY / dist, projY + hProj * distX / dist);
}

function GetPositionOffsetCoords(bodyCoords, junctions, startCoordName, hitbox){ // gives x and y offsets from center depending on the name of the junction or limit
  let x = 0;
  let y = 0;
  if(startCoordName.includes("hitbox")){
    hitbox = hitbox == null ? GetPositionHitbox(junctions) : hitbox;
    x += startCoordName.includes("left") ? hitbox.left : startCoordName.includes("right") ? hitbox.right : 0;
    y += startCoordName.includes("top") ? hitbox.top : startCoordName.includes("bottom") ? hitbox.bottom : 0;
  }
  else if(junctions[startCoordName] != null){
    // if junctions are relative, bodyCoords must be null
    x += junctions[startCoordName].coordinates.x - (bodyCoords != null ? bodyCoords.x : 0);
    y += junctions[startCoordName].coordinates.y - (bodyCoords != null ? bodyCoords.y : 0);
  }
  return new Coordinates(-x,-y);
}

function JunctionsSwitchSide(junctions){
  var newJunctions = {};
  for(let key in junctions){
    let newKey = key.includes("right") ? key.replace('right', 'left') : key.includes("left") ? key.replace('left', 'right') : key;
    newJunctions[newKey] = junctions[key];
  }
  return newJunctions;
}

function GetPositionHitbox(junctions){
  let left = 0;
  let right = 0;
  let top = 0;
  let bottom = 0;
  for(let key in junctions){
    let j = junctions[key];
    left = Math.min(left,j.coordinates.x - j.size/2);
    right = Math.max(right,j.coordinates.x + j.size/2);
    top = Math.min(top,j.coordinates.y - j.size/2);
    bottom = Math.max(bottom,j.coordinates.y + j.size/2);
  }
  return new HitBox(left, right, top, bottom);
}
