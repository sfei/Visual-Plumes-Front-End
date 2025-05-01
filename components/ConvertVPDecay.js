var metric
  , imperial;

metric = {
  "s-1": {
    name: {
      singular: 'Per Second'
      , plural: 'Per Second'
    }
    , to_anchor: 1
  }
  , "d-1": {
    name: {
      singular: 'Per Day'
      , plural: 'Per Day'
    }
    , to_anchor: 1/86400
  }
  , "T90h": {
    name: {
      singular: 'T90 Hour'
      , plural: 'T90 Hour'
    }
    , to_anchor: 3600/-2.30258509
  }
  , "ly/hr": {
    name: {
      singular: 'Ly per hour'
      , plural: 'Lys per hour'
    }
      // note this conversion is invalid because it's quite complex but we aren't currently porting it
    , to_anchor: 1
  }
  , "hr-1": {
    name: {
      singular: 'Per hour'
      , plural: 'Per hour'
    }
    , to_anchor: 1/3600
  }
};

module.exports = {
  metric: metric
  , imperial: {}
  , _anchors: {
    metric: {
      unit: 's-1'
      , ratio: .000001
    }
  }
};
