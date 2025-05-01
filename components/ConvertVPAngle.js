
// var angle = require('convert-units/lib/definitions/angle');

function convertAzimuthDegree(deg) {
  // works both ways from/to azimuth so left ambiguous
  // make sure deg is capped from 0-359
  while(deg < 0) deg += 360;
  while(deg >= 360) deg -= 360;
  // excluding special case where both grid/azimuth quadrant is same in Q1
  let fromQuad = 1;
  let toQuad = 1;
  if(deg > 90) {
    while(++fromQuad < 4 && deg > fromQuad*90) { }
    toQuad = -(fromQuad - 6);
  }
  // start of quadrant (convert to), plus difference from end of quadrant (convert from)
  return 90*(toQuad-1) + (90*fromQuad - deg);
}

// Converting to use system to differentiate grid/azimuthal instead of metric/imperial. Not sure if this is 
// allowed. If not may need to find alternative way to do it, possibly faking with metric and imperial, 
// assuming that doesn't break something else.
module.exports = {
  // copy over metric units as grid
  grid: require('convert-units/lib/definitions/angle').metric, 
  // note surv-deg and N-deg (and same for radians) are same, though we swap terms between diffuser/ambient
  azimuth: {
    'N-deg': {
      name: {
        singular: 'N-deg'
      , plural: 'N-degs'
      }, 
      to_anchor: 1
    },
    'N-rad': {
      name: {
        singular: 'N-rad'
      , plural: 'N-rads'
      }, 
      to_anchor: 180/Math.PI
    },
    'Surv-deg': {
      name: {
        singular: 'Surv-deg'
      , plural: 'Surv-degs'
      }, 
      to_anchor: 1
    },
    'Surv-rad': {
      name: {
        singular: 'Surv-rad'
      , plural: 'Surv-rads'
      }, 
      to_anchor: 180/Math.PI 
    }
  }, 
  _anchors: {
    grid: {
      unit: "deg", 
      ratio: 1, 
      transform: convertAzimuthDegree
    }, 
    azimuth: {
      unit: "N-deg", 
      ratio: 1, 
      transform: convertAzimuthDegree
    }
  }
};
