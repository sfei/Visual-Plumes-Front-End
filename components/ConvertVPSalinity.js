module.exports = {
  // actual salinity measurements (PSU and conductivity -- though conductivity is still semi-indirect)
  salinity: {
    "psu": {
      name: {
        singular: 'PSU'
      , plural: 'PSU'
      }, 
      to_anchor: 1
    }, 
    "mmho/cm": {
      name: {
        singular: 'mmho/cm'
      , plural: 'mmhos/cm'
      }, 
      // note this conversion is invalid because it's quite complex but we aren't currently porting it
      to_anchor: 1
    }
  }, 
  // salinity given as seawater density, to calculate estimated salinity from
  density: {
    "kg/m3": {
      name: {
        singular: 'kg/m3'
      , plural: 'kgs/m3'
      }, 
      to_anchor: 1
    }, 
    "sigmaT": {
      name: {
        singular: 'sigmaT'
      , plural: 'sigmaT'
      }, 
      to_anchor: 1, 
      anchor_shift: -1000
    }, 
    "lb/ft3": {
      name: {
        singular: 'lb/ft3'
      , plural: 'lbs/ft3'
      }, 
      to_anchor: 1/0.062427961
    }
  }, 
  _anchors: {
    salinity: {
      unit: "psu", 
      // note this conversion is invalid because it's quite complex but we aren't currently porting it
      ratio: 1
    }, 
    density: {
      unit: "kg/m3", 
      // note this conversion is invalid because it's quite complex but we aren't currently porting it
      ratio: 1
    }
  }
};
