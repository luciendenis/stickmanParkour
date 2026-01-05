class Settings {
  constructor(minVelocityForStopping, minVelocityX, maxVelocityX, accelerationX, stoppingAccelerationFactor, crouchSlidingAccelerationFactor, gravity,
    crouchFactorMin, crouchFactorDiff, bodyCrossingAbilityFactor, bodyHeightFactor, obstacleRange, roundTolerance, ladderDetectionRange, ladderClimbSpeed,
    ladderDownSlidingSpeed, ladderDeceleration, ladderOffSpeed, ropeDetectionRange, ropeCrossingDistPerFrame, ropeCrossingFrameCount, ropeDownSlidingSpeed,
    ropeDeceleration, ropeClimbingEntryOffset, ropeClimbingDistPerFrame, ropeClimbingFrameCount, ropeCrossingAngleLimit, fallHeight,
    crouchingDistPerFrame, crouchingFrameCount, crouchTurningFactor, hoppingRangeX, hoppingRangeY, hoppingDistPerFrame, hoppingDistMin, poleEntrySpeedFactor, poleExitSpeedFactor) {
    this.minVelocityForStopping = minVelocityForStopping;
    this.minVelocityX = minVelocityX;
    this.maxVelocityX = maxVelocityX;
    this.accelerationX = accelerationX;
    this.stoppingAccelerationFactor = stoppingAccelerationFactor;
    this.crouchSlidingAccelerationFactor = crouchSlidingAccelerationFactor;
    this.gravity = gravity;
    this.crouchFactorMin = crouchFactorMin;
    this.crouchFactorDiff = crouchFactorDiff;
    this.bodyCrossingAbilityFactor = bodyCrossingAbilityFactor;
    this.bodyHeightFactor = bodyHeightFactor;
    this.obstacleRange = obstacleRange;
    this.roundTolerance = roundTolerance;
    this.ladderDetectionRange = ladderDetectionRange;
    this.ladderClimbSpeed = ladderClimbSpeed;
    this.ladderDownSlidingSpeed = ladderDownSlidingSpeed;
    this.ladderDeceleration = ladderDeceleration;
    this.ladderOffSpeed = ladderOffSpeed;
    this.ropeDetectionRange = ropeDetectionRange;
    this.ropeCrossingDistPerFrame = ropeCrossingDistPerFrame;
    this.ropeCrossingFrameCount = ropeCrossingFrameCount;
    this.ropeDownSlidingSpeed = ropeDownSlidingSpeed;
    this.ropeDeceleration = ropeDeceleration;
    this.ropeClimbingEntryOffset = ropeClimbingEntryOffset;
    this.ropeClimbingDistPerFrame = ropeClimbingDistPerFrame;
    this.ropeClimbingFrameCount = ropeClimbingFrameCount;
    this.ropeCrossingAngleLimit = ropeCrossingAngleLimit;
    this.fallHeight = fallHeight;
    this.crouchingDistPerFrame = crouchingDistPerFrame;
    this.crouchingFrameCount = crouchingFrameCount;
    this.crouchTurningFactor = crouchTurningFactor;
    this.hoppingRangeX = hoppingRangeX;
    this.hoppingRangeY = hoppingRangeY;
    this.hoppingDistPerFrame = hoppingDistPerFrame;
    this.hoppingDistMin = hoppingDistMin;
    this.poleEntrySpeedFactor = poleEntrySpeedFactor;
    this.poleExitSpeedFactor = poleExitSpeedFactor;
  }
}

class GearSettings{
  constructor(bounceMaxHeight, bounceSpeed, angleFrameDiff, teethCount, centerDiameter, innerLength, outerLength,teethFlatAngleProportion){
    this.bounceMaxHeight = bounceMaxHeight;
    this.bounceSpeed = bounceSpeed;
    this.angleFrameDiff = angleFrameDiff;
    this.teethCount = teethCount;
    this.centerDiameter = centerDiameter;
    this.innerLength = innerLength;
    this.outerLength = outerLength;
    this.repeatAngle = 2*Math.PI/this.teethCount;
    this.teethAngle = teethFlatAngleProportion*this.repeatAngle;
    this.interTeethAngle = (0.5-teethFlatAngleProportion)*this.repeatAngle;
  }
}

class DoorSettings {
  constructor(color, lineWidth, curtainHeight, curtainWidth, curtainStep, totalWidth, sideHeight, curtainSpeed, fadeSpeed, roughOptions, curtainRoughOptions) {
    this.color = color;
    this.lineWidth = lineWidth;
    this.curtainHeight = curtainHeight;
    this.curtainWidth = curtainWidth;
    this.curtainStep = curtainStep;
    this.totalWidth = totalWidth;
    this.sideHeight = sideHeight;
    this.curtainSpeed = curtainSpeed;
    this.fadeSpeed = fadeSpeed;
    this.roughOptions = roughOptions;
    this.curtainRoughOptions = curtainRoughOptions;
    this.arcRadius = Math.sqrt(Math.pow(sideHeight,2) + Math.pow(totalWidth/2,2));
    this.arcAngle1 = -Math.PI/2 - Math.atan((totalWidth/2)/sideHeight);
    this.arcAngle2 = -Math.PI/2 + Math.atan((totalWidth/2)/sideHeight);
  }
}

function AdaptSettingsToScale(settings, scale){
  return new Settings(
    settings.minVelocityForStopping*scale,
    settings.minVelocityX*scale,
    settings.maxVelocityX*scale,
    settings.accelerationX*scale,
    settings.stoppingAccelerationFactor,
    settings.crouchSlidingAccelerationFactor,
    settings.gravity*scale,
    settings.crouchFactorMin,
    settings.crouchFactorDiff,
    settings.bodyCrossingAbilityFactor,
    settings.bodyHeightFactor,
    settings.obstacleRange*scale,
    settings.roundTolerance,
    settings.ladderDetectionRange*scale,
    settings.ladderClimbSpeed*scale,
    settings.ladderDownSlidingSpeed*scale,
    settings.ladderDeceleration*scale,
    settings.ladderOffSpeed*scale,
    settings.ropeDetectionRange*scale,
    settings.ropeCrossingDistPerFrame*scale,
    settings.ropeCrossingFrameCount,
    settings.ropeDownSlidingSpeed*scale,
    settings.ropeDeceleration*scale,
    settings.ropeClimbingEntryOffset*scale,
    settings.ropeClimbingDistPerFrame*scale,
    settings.ropeClimbingFrameCount,
    settings.ropeCrossingAngleLimit,
    settings.fallHeight*scale,
    settings.crouchingDistPerFrame*scale,
    settings.crouchingFrameCount,
    settings.crouchTurningFactor,
    settings.hoppingRangeX,
    settings.hoppingRangeY,
    settings.hoppingDistPerFrame*scale,
    settings.hoppingDistMin*scale,
    settings.poleEntrySpeedFactor/scale,
    settings.poleExitSpeedFactor*scale
  );
}

function AdaptGearSettingsToScale(settings, scale){
  return new GearSettings(
    settings.bounceMaxHeight*scale,
    settings.bounceSpeed*scale,
    settings.angleFrameDiff,
    settings.teethCount,
    settings.centerDiameter*scale,
    settings.innerLength*scale,
    settings.outerLength*scale,
    settings.teethFlatAngleProportion
  );
}

function AdaptDoorSettingsToScale(settings, scale){
  return new DoorSettings(
    settings.color,
    settings.lineWidth*scale,
    settings.curtainHeight*scale,
    settings.curtainWidth*scale,
    settings.curtainStep*scale,
    settings.totalWidth*scale,
    settings.sideHeight*scale,
    settings.curtainSpeed*scale,
    settings.fadeSpeed*scale,
    AdaptRoughOptionsToScale(settings.roughOptions, scale),
    AdaptRoughOptionsToScale(settings.curtainRoughOptions, scale)
  );
}
