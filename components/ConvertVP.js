var convert
  , keys = require('lodash.keys')
  , each = require('lodash.foreach')
  , measures = {
      length: require('convert-units/lib/definitions/length')
    , area: require('convert-units/lib/definitions/area')
    , mass: require('convert-units/lib/definitions/mass')
    , volume: require('convert-units/lib/definitions/volume')
    , each: require('convert-units/lib/definitions/each')
    , temperature: require('convert-units/lib/definitions/temperature')
    , time: require('convert-units/lib/definitions/time')
    , digital: require('convert-units/lib/definitions/digital')
    , partsPer: require('convert-units/lib/definitions/partsPer')
    , speed: require('convert-units/lib/definitions/speed')
    , pace: require('convert-units/lib/definitions/pace')
    , pressure: require('convert-units/lib/definitions/pressure')
    , current: require('convert-units/lib/definitions/current')
    , voltage: require('convert-units/lib/definitions/voltage')
    , power: require('convert-units/lib/definitions/power')
    , reactivePower: require('convert-units/lib/definitions/reactivePower')
    , apparentPower: require('convert-units/lib/definitions/apparentPower')
    , energy: require('convert-units/lib/definitions/energy')
    , reactiveEnergy: require('convert-units/lib/definitions/reactiveEnergy')
    , volumeFlowRate: require('convert-units/lib/definitions/volumeFlowRate')
    , illuminance: require('convert-units/lib/definitions/illuminance')
    , frequency: require('convert-units/lib/definitions/frequency')
    , angle : require('./ConvertVPAngle')
    , salinity: require('./ConvertVPSalinity')
    , decayRate: require('./ConvertVPDecay')
    }
  , Converter;



/***** Custom measure metrics *****/

/* Speed */
measures.speed.metric = {
  ...measures.speed.metric,
  'cm/s': {
    name: {
      singular: 'Centimetre per second'
    , plural: 'Centimetres per second'
    }
  , to_anchor: 0.036
  }
}

measures.speed.imperial = {
  ...measures.speed.imperial,
  kts: {
    name: {
      singular: 'Knot'
    , plural: 'Knots'
    }
  , to_anchor: 1.150779
  },
  'mph': {
      name: {
        singular: 'Mile per hour'
      , plural: 'Miles per hour'
      }
    , to_anchor: 1
    }
}

/* Length */
measures.length.imperial = {
  ...measures.length.imperial,
  'fath': {
    name: {
      singular: 'Fathom'
    , plural: 'Fathoms'
    }
  , to_anchor: 6
  }
}

/* Time */
measures.time.metric = {
  ...measures.time.metric,
  hr: {
    name: {
      singular: 'Hour'
    , plural: 'Hours'
    }
  , to_anchor: 60 * 60 
  }
}

/* Concentration (a.k.a. Parts Per) */
measures.partsPer.metric = {
  ...measures.partsPer.metric,
  'kg/kg': {
    name: {
      singular: 'Kilogram per kilogram'
    , plural: 'Kilograms per kilogram'  // technically invalid to be >1.0
    }, 
    to_anchor: 1e-6
  },
  'col/dl': {
    name: {
      singular: 'Colony per 100ml'
    , plural: 'Colonies per 100ml'
    }, 
    to_anchor: 1e-6
  },
  '%': {
    name: {
      singular: 'Percent'
    , plural: 'Percent'
    }, 
    to_anchor: 100e-6
  },
}

/* Volume Flow Rates */
measures.volumeFlowRate.metric = {
  ...measures.volumeFlowRate.metric,
  'MGD': {
    name: {
      singular: 'Megagallon per day'
    , plural: 'Megagallons per day'
    }, 
    to_anchor: 43.81264
  },
  'MLD': {
    name: {
      singular: 'Megaliter per day'
    , plural: 'Megaliters per day'
    }, 
    to_anchor: 11.57407
  },
  'bbl/d': {
    name: {
      singular: 'Barrel per day'
    , plural: 'Barrels per day'
    }, 
    // based on US oil barrel (0.158987 m3/bbl)*(1000 L/m3)*(1/86400 day/s)
    to_anchor: 0.001840173
  },
}

Converter = function (numerator, denominator) {
  if(denominator)
    this.val = numerator / denominator;
  else
    this.val = numerator;
};

/**
* Lets the converter know the source unit abbreviation
*/
Converter.prototype.from = function (from) {
  if(this.destination)
    throw new Error('.from must be called before .to');

  this.origin = this.getUnit(from);

  if(!this.origin) {
    this.throwUnsupportedUnitError(from);
  }

  return this;
};

/**
* Converts the unit and returns the value
*/
Converter.prototype.to = function (to) {
  if(!this.origin)
    throw new Error('.to must be called after .from');

  this.destination = this.getUnit(to);

  var result
    , transform;

  if(!this.destination) {
    this.throwUnsupportedUnitError(to);
  }

  // Don't change the value if origin and destination are the same
  if (this.origin.abbr === this.destination.abbr) {
    return this.val;
  }

  // You can't go from liquid to mass, for example
  if(this.destination.measure != this.origin.measure) {
    throw new Error('Cannot convert incompatible measures of '
      + this.destination.measure + ' and ' + this.origin.measure);
  }

  /**
  * Convert from the source value to its anchor inside the system
  */
  result = this.val * this.origin.unit.to_anchor;

  /**
  * For some changes it's a simple shift (C to K)
  * So we'll add it when convering into the unit (later)
  * and subtract it when converting from the unit
  */
  if (this.origin.unit.anchor_shift) {
    result -= this.origin.unit.anchor_shift
  }

  /**
  * Convert from one system to another through the anchor ratio. Some conversions
  * aren't ratio based or require more than a simple shift. We can provide a custom
  * transform here to provide the direct result
  */
  if(this.origin.system != this.destination.system) {
    transform = measures[this.origin.measure]._anchors[this.origin.system].transform;
    if (typeof transform === 'function') {
      result = transform(result)
    }
    else {
      result *= measures[this.origin.measure]._anchors[this.origin.system].ratio;
    }
  }

  /**
  * This shift has to be done after the system conversion business
  */
  if (this.destination.unit.anchor_shift) {
    result += this.destination.unit.anchor_shift;
  }

  /**
  * Convert to another unit inside the destination system
  */
  return result / this.destination.unit.to_anchor;
};

/**
* Converts the unit to the best available unit.
*/
Converter.prototype.toBest = function(options) {
  if(!this.origin)
    throw new Error('.toBest must be called after .from');

  var options = Object.assign({
    exclude: [],
    cutOffNumber: 1,
  }, options)

  var best;
  /**
    Looks through every possibility for the 'best' available unit.
    i.e. Where the value has the fewest numbers before the decimal point,
    but is still higher than 1.
  */
  each(this.possibilities(), function(possibility) {
    var unit = this.describe(possibility);
    var isIncluded = options.exclude.indexOf(possibility) === -1;

    if (isIncluded && unit.system === this.origin.system) {
      var result = this.to(possibility);
      if (!best || (result >= options.cutOffNumber && result < best.val)) {
        best = {
          val: result,
          unit: possibility,
          singular: unit.singular,
          plural: unit.plural
        };
      }
    }
  }.bind(this));

  return best;
}

/**
* Finds the unit
*/
Converter.prototype.getUnit = function (abbr) {
  var found;

  each(measures, function (systems, measure) {
    each(systems, function (units, system) {
      if(system == '_anchors')
        return false;

      each(units, function (unit, testAbbr) {
        if(testAbbr == abbr) {
          found = {
            abbr: abbr
          , measure: measure
          , system: system
          , unit: unit
          };
          return false;
        }
      });

      if(found)
        return false;
    });

    if(found)
      return false;
  });

  return found;
};

/**
* An alias for getUnit
*/
Converter.prototype.describe = function (abbr) {
  var resp = Converter.prototype.getUnit(abbr);
  var desc = null;

  try {
    desc = describe(resp);
  } catch(err) {
    this.throwUnsupportedUnitError(abbr);
  }

  return desc;
};

/**
* Detailed list of all supported units
*/
Converter.prototype.list = function (measure) {
  var list = [];

  each(measures, function (systems, testMeasure) {
    if(measure && measure !== testMeasure)
      return;

    each(systems, function (units, system) {
      if(system == '_anchors')
        return false;

      each(units, function (unit, abbr) {
        list = list.concat(describe({
          abbr: abbr,
          measure: testMeasure
        , system: system
        , unit: unit
        }));
      });
    });
  });

  return list;
};

  /**
  * Returns the abbreviated measures that the value can be
  * converted to.
  */
  Converter.prototype.possibilities = function (measure) {
    var possibilities = [];
    if(!this.origin && !measure) {
      each(keys(measures), function (measure){
        each(measures[measure], function (units, system) {
          if(system == '_anchors')
            return false;
  
          possibilities = possibilities.concat(keys(units));
        });
      });
    } else {
      measure = measure || this.origin.measure;
      each(measures[measure], function (units, system) {
        if(system == '_anchors')
          return false;
  
        possibilities = possibilities.concat(keys(units));
      });
    }
  
    return possibilities;
  };

  /**
  * Returns the abbreviated measures that the value can be
  * converted to.
  */
  Converter.prototype.measures = function () {
    return keys(measures);
  };
  
  var convertVP = function (value) {
    return new Converter(value);
  };

  module.exports = convertVP;
