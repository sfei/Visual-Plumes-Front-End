// src/context/state.js
import * as React from 'react';
import { createContext, useContext } from 'react';


const AppContext = createContext();

export function AppWrapper({ children }) {

  /* Table Width */
  const ambientWidth = 1900;
  const numAmbientCols = 12;

  /* Project Name */
  const [projectName, setProjectName] = React.useState("");

  /* Has Analysis Data? */
  const [ hasAnalysisData, setHasAnalysisData ] = React.useState(false);
  const [ waitingForAnalysisData, setWaitingForAnalysisData ] = React.useState(false);

  /* Additional Model Input */
  const eqOfStateInit = "S_T";
  const similarityProfileInit = "default";
  const bacterialModelInit = "mancini";

  /* Diffuser Table State Variables */
  const [ diffuserRows, setDiffuserRows] = React.useState([{id:1,}]);
  const [ timeseriesRows, setTimeseriesRows] = React.useState([{id:1,}]);
  const [ specialSettingsRows, setSpecialSettingsRows] = React.useState([{id:1,}]);
  const [ bacterialModelValue, setBacterialModelValue] = React.useState(bacterialModelInit);
  const [ eqOfState, setEqOfState] = React.useState(eqOfStateInit);
  const [ similarityProfile, setSimilarityProfile] = React.useState(similarityProfileInit);
  const [ diffPortContCoeff, setDiffPortContCoeff ] = React.useState(1.0);
  const [ lightAbsorpCoeff, setLightAbsorpCoeff ] = React.useState(0.16);
  const [ farfieldCoeff, setFarfieldCoeff ] = React.useState(100);
  const [ um3AspCoeff, setUm3AspCoeff ] = React.useState(0.1);

  /* Model Configuration Type */
  const modelConfigTypeDefault = "none"
  const [ modelConfigType, setModelConfigType ] = React.useState(modelConfigTypeDefault)

  /* Tidal pollution buildup parameters, includes default values */
  const tidalPollutantBuildupParams = {
    'isEnabled': false,
    'segment_length': 50,
    'channel_width': 100,
    'upstream_dir': 90,
    'coast_bin': 0,
    'coast_concentration': 0,
    'mixing_zone_ceil': 0,
  }
  const [tidalPollutantBuildup, setTidalPollutantBuildup] = React.useState(tidalPollutantBuildupParams);

  /* Extra model configuration parameters */
  const [reportEffectiveDillution, setReportEffectiveDillution] = React.useState(false); /* report_effective_dillution in model params */
  const [currentVectorAveraging, setCurrentVectorAveraging] = React.useState(false); /* current_vector_averaging in model params */


  /* Diffuser Store */
  const diffuserStore = {
    id: 0,
    key: "id",
    'port_diameter': {
      'label': 'Port Diameter',
      'isEnabled': true,
      'value': 'm',
      'default': 'm',
      'options': ['m','cm','ft','in','fath']
    },
    'vertical_angle': {
      'label': 'Vert Angle',
      'isEnabled': true,
      'value': 'deg',
      'default': 'deg',
      'options': ['deg','rad']
    },
    'horizontal_angle': {
      'label': 'Horiz Angle',
      'isEnabled': true,
      'value': 'deg',
      'default': 'deg',
      'options': ['deg','rad','Surv-deg','Surv-rad']
    },
    'source_x_coord': {
      'label': 'Source x-coord',
      'isEnabled': true,
      'value': 'm',
      'default': 'm',
      'options': ['m','cm','ft','in','fath']
    },
    'source_y_coord': {
      'label': 'Source y-coord',
      'isEnabled': true,
      'value': 'm',
      'default': 'm',
      'options': ['m','cm','ft','in','fath']
    },
    'num_of_ports': {
      'label': 'Num of Ports',
      'isEnabled': true,
      'value': '',
      'default': '',
      'options': [''],
      'counter': 0
    },
    'port_spacing': {
      'label': 'Port Spacing',
      'isEnabled': true,
      'value': 'm',
      'default': 'm',
      'options': ['m','cm','ft','in','fath']
    },
    'start_time': {
      'label': 'Start time',
      'isEnabled': true,
      'value': 's',
      'default': 's',
      'options': ['s','min','hr','d']
    },
    'end_time': {
      'label': 'End time',
      'isEnabled': true,
      'value': 's',
      'default': 's',
      'options': ['s','min','hr','d']
    },
    'time_increment': {
      'label': 'Time increment',
      'isEnabled': true,
      'value': 's',
      'default': 's',
      'options': ['s','min','hr','d']
    },
    'mix_zone_distance': {
      'label': 'Mix zone dist',
      'isEnabled': true,
      'value': 'm',
      'default': 'm',
      'options': ['m','cm','ft','in','fath']
    },
    'isopleth_val': {
      'label': 'Isopleth value',
      'isEnabled': true,
      'value': 'concent',
      'default': 'concent',
      'options': ['concent','salinity','temp','speed']
    },
    'port_depth': {
      'label': 'Port depth',
      'isEnabled': true,
      'value': 'm',
      'default': 'm',
      'options': ['m','cm','ft','in','fath']
    },
    'effluent_flow': {
      'label': 'Effluent flow',
      'isEnabled': true,
      'value': 'MGD',
      'default': 'MGD',
      'options': ['MGD','m3/s','MLD','ft3/s','bbl/d']
    },
    'effluent_salinity': {
      'label': 'Effluent salinity',
      'isEnabled': true,
      'value': 'psu',
      'default': 'psu',
      'options': ['psu','mmho/cm','kg/m3','sigmaT','lb/ft3']
    },
    'effluent_temp': {
      'label': 'Effluent temp',
      'isEnabled': true,
      'value': 'C',
      'default': 'C',
      'options': ['C','F']
    },
    'effluent_conc': {
      'label': 'Effluent conc',
      'isEnabled': true,
      'value': 'ppm',
      'default': 'ppm',
      'options': ['ppm','kg/kg','ppb','%','col/dl']
    },
    'port_alias': {
      'label': 'Port Alias',
      'isEnabled': true,
      'value': '',
      'default': '',
      'options': ['']
    },
  };

  /* Diffuser Input Template */
  const diffuserInputTemplate = {
    id: 0,
    key: 'id',
    'port_diameter': "",
    'vertical_angle': "",
    'horizontal_angle': "",
    'source_x_coord': "",
    'source_y_coord': "",
    'num_of_ports': "",
    'port_spacing': "", // Only shows under certain conditions
    'start_time': "", // Only shows for time-series
    'end_time': "", // Only shows for time-series
    'time_increment': "", // Only shows for time-series
    'mix_zone_distance': "",
    'isopleth_val': "",
    'port_depth': "",
    'effluent_flow': "",
    'effluent_salinity': "",
    'effluent_temp': "",
    'effluent_conc': "",
    'port_alias': "Port 0", // Removed in VP20, keep?
  }

  const diffuserTableTemplate = {
    id: 0,
    key: "id",
    currInputID: 0,
    store: diffuserStore,
    data: [diffuserInputTemplate]
  }
  const [diffuserTable, setDiffuserTable] = React.useState(diffuserTableTemplate);

  const defaultFileName = "No file selected";

  const diffuserTimeSeriesDefaults = {
    'port_depth': {
      'file': null,
      'filename': defaultFileName,
      'increment': 1,
      'time_cycling_period': null,
      'num_lines_in_file': 0,
      'measurement_unit': "m",
      'measurement_unit_opts': ['m','cm','ft','in','fath'],
      'file_ref': React.useRef(null)
    },
    'effluent_flow': {
      'file': null,
      'filename': defaultFileName,
      'increment': 1,
      'time_cycling_period': null,
      'num_lines_in_file': 0,
      'measurement_unit': "MGD",
      'measurement_unit_opts': ['MGD','m3/s','MLD','ft3/s','bbl/d'],
      'file_ref': React.useRef(null)
    },
    'effluent_salinity': {
      'file': null,
      'filename': defaultFileName,
      'increment': 1,
      'time_cycling_period': null,
      'num_lines_in_file': 0,
      'measurement_unit': "psu",
      'measurement_unit_opts': ['psu','mmho/cm','kg/m3','sigmaT','lb/ft3'],
      'file_ref': React.useRef(null)
    },
    'effluent_temp': {
      'file': null,
      'filename': defaultFileName,
      'increment': 1,
      'time_cycling_period': null,
      'num_lines_in_file': 0,
      'measurement_unit': "C",
      'measurement_unit_opts': ['C','F'],
      'file_ref': React.useRef(null)
    },
    'effluent_concentration': {
      'file': null,
      'filename': defaultFileName,
      'increment': 1,
      'time_cycling_period': null,
      'num_lines_in_file': 0,
      'measurement_unit': "ppm",
      'measurement_unit_opts': ['ppm','kg/kg','ppb','%','col/dl'],
      'file_ref': React.useRef(null)
    },
  }
  const [diffuserTimeSeries, setDiffuserTimeSeries] = React.useState(diffuserTimeSeriesDefaults);

  /**
   * Ambient Store Profile Template
   * Tracks parameters for distinct Ambient Profiles. Any time the user
   * creates a new profile this template is copied and added to the 
   * store array.
   */
  const ambientStoreProfileTemplate = {
    id:0,
    key:"id",
    'depth_or_height': {
      'e_sfc': 'disabled',
      'e_btm': 'disabled',
      'z_is_depth': true,
      'mu': 'm'
    },
    'current_speed': {
      'e_sfc': 'constant',
      'e_btm': 'constant',
      'mu': 'm/s'
    },
    'current_direction': {
      'e_sfc': 'constant',
      'e_btm': 'constant',
      'mu': 'deg'
    },
    'ambient_salinity': {
      'e_sfc': 'constant',
      'e_btm': 'constant',
      'mu': 'psu'
    },
    'ambient_temperature': {
      'e_sfc': 'constant',
      'e_btm': 'constant',
      'mu': 'C'
    },
    'background_concentration': {
      'e_sfc': 'constant',
      'e_btm': 'constant',
      'mu': 'kg/kg'
    },
    'pollution_decay_rate': {
      'e_sfc': 'constant',
      'e_btm': 'constant',
      'mu': 's-1'
    },
    'far_field_curr_speed': {
      'e_sfc': 'constant',
      'e_btm': 'constant',
      'mu': 'm/s'
    },
    'far_field_curr_dir': {
      'e_sfc': 'constant',
      'e_btm': 'constant',
      'mu': 'deg'
    },
    'far_field_diff_coeff': {
      'e_sfc': 'constant',
      'e_btm': 'constant',
      'mu': 'm0.67/s2'
    }
  }

  /**
   * Ambient Input Template
   * Template for ambient profile input fields. Copied for each profile and added
   * to the ambientTabTemplate's data field.
   */
  /* Ambient Table State Input */
  const ambientInputTemplate = {
    id:0,
    key:"id",
    'depth_or_height': "",
    'current_speed': "",
    'current_direction': "",
    'ambient_salinity': "",
    'ambient_temperature': "",
    'background_concentration': "",
    'pollution_decay_rate': "",
    'far_field_curr_speed': "",
    'far_field_curr_dir': "",
    'far_field_diff_coeff': ""
  }

  /**
   * Ambient Tab Template
   * Data structure for each ambient profile (aka tab). Contains one instance of the
   * ambient store and array for data input where each entry corresponds to a row.
   */
  const ambientTabTemplate = { /* TODO: Convert to array */
    id:0, /* Current input ID, increment when adding rows */
    key:"id",
    currInputID: 0,
    store: ambientStoreProfileTemplate,
    data: [ambientInputTemplate]
  }

  /**
   * Ambient Store Profiles (Ambient Store)
   * Data structure for holding all ambient store data. This is the main variable we
   * use for ambient information and will trigger updates on any correspondeing UI elements.
   */
  const ambientStoreProfiles = {
    currTab: 0, /* TODO:Verify we need/use this */
    currTabID: 0, /* Track current max ID, increment with new tabs */
    tabs: [ambientTabTemplate]
  };

  /**
   * Ambient Store Getter / Setter
   * Use these to interact with the ambient store via useAppContext.
   */
  const [ambientStore, setAmbientStore] = React.useState(ambientStoreProfiles);

  /**
   * Track ambient profile tab
   */
  const [selectedAmbientProfileTab, setSelectedAmbientProfileTab] = React.useState(0);

  const ambientFilesOptionVals = {
    'depth_or_height': ['depth','height'],
    'depth_or_height_units': ['m','ft'],
    'increment': ['4hrs','2hrs'],
    'cycling_period': [''],
    'measurement_unit': ['m/s','deg'],
  }

  const ambientFilesDefault = {
    'depth_or_height': {
      'file': null,
    },
    'current_speed': {
      'label': 'Current Speed',
      'file': null,
      'filename': "No file selected",
      'depth_or_height': 'depth',
      'depth_or_height_units': "m",
      'increment': 1,
      'cycling_period': null,
      'num_lines_in_file': 0,
      'measurement_unit': "m/s",
      'measurement_unit_opts': ["m/s","cm/s","kt","mph","ft/s"],
      'file_ref': React.useRef(null)
    },
    'current_direction': {
      'label': 'Current Direction',
      'file': null,
      'filename': "No file selected",
      'depth_or_height': 'depth',
      'depth_or_height_units': "m",
      'increment': 1,
      'cycling_period': null,
      'num_lines_in_file': 0,
      'measurement_unit': "deg",
      'measurement_unit_opts': ["deg","rad","N-deg","N-rad"],
      'file_ref': React.useRef(null)
    },
    'ambient_salinity': {
      'label': 'Ambient Salinity',
      'file': null,
      'filename': "No file selected",
      'depth_or_height': 'depth',
      'depth_or_height_units': "m",
      'increment': 1,
      'cycling_period': null,
      'num_lines_in_file': 0,
      'measurement_unit': "psu",
      'measurement_unit_opts': ["psu","mmho/cm","kg/m3","sigmaT","lb/ft3"],
      'file_ref': React.useRef(null)
    },
    'ambient_temperature': {
      'label': 'Ambient Temperature',
      'file': null,
      'filename': "No file selected",
      'depth_or_height': 'depth',
      'depth_or_height_units': "m",
      'increment': 1,
      'cycling_period': null,
      'num_lines_in_file': 0,
      'measurement_unit': "C",
      'measurement_unit_opts': ["C","F"],
      'file_ref': React.useRef(null)
    },
    'background_concentration': {
      'label': 'Background Concentration',
      'file': null,
      'filename': "No file selected",
      'depth_or_height': 'depth',
      'depth_or_height_units': "m",
      'increment': 1,
      'cycling_period': null,
      'num_lines_in_file': 0,
      'measurement_unit': "kg/kg",
      'measurement_unit_opts': ["kg/kg","ppm","ppb","%","col/dl"],
      'file_ref': React.useRef(null)
    },
    'pollution_decay_rate': {
      'label': 'Pollution Decay Rate',
      'file': null,
      'filename': "No file selected",
      'depth_or_height': 'depth',
      'depth_or_height_units': "m",
      'increment': 1,
      'cycling_period': null,
      'num_lines_in_file': 0,
      'measurement_unit': "s-1",
      'measurement_unit_opts': ["s-1","d-1","T90hr","ly/hr","hr-1"],
      'file_ref': React.useRef(null)
    },
    'far_field_curr_speed': {
      'label': 'Far Field Current Speed',
      'file': null,
      'filename': "No file selected",
      'depth_or_height': 'depth',
      'depth_or_height_units': "m",
      'increment': 1,
      'cycling_period': null,
      'num_lines_in_file': 0,
      'measurement_unit': "m/s",
      'measurement_unit_opts': ["m/s","cm/s","ft/s","mph","kt"],
      'file_ref': React.useRef(null)
    },
    'far_field_curr_dir': {
      'label': 'Far Field Current Direction',
      'file': null,
      'filename': "No file selected",
      'depth_or_height': 'depth',
      'depth_or_height_units': "m",
      'increment': 1,
      'cycling_period': null,
      'num_lines_in_file': 0,
      'measurement_unit': "deg",
      'measurement_unit_opts': ["deg","rad","N-deg","N-rad"],
      'file_ref': React.useRef(null)
    },
    'far_field_diff_coeff': {
      'label': 'Far Field Diff Coeff',
      'file': null,
      'filename': "No file selected",
      'depth_or_height': 'depth',
      'depth_or_height_units': "m",
      'increment': 1,
      'cycling_period': null,
      'num_lines_in_file': 0,
      'measurement_unit': "m0.67/s2",
      'measurement_unit_opts': ["m0.67/s2"],
      'file_ref': React.useRef(null)
    }
  }
  const [ ambientFiles, setAmbientFiles ] = React.useState(ambientFilesDefault);

  /*** Analysis Options ***/
  const [diffuserPortAliasID, setDiffuserPortAliasID] = React.useState(0);
  // const [diffuserPortId, setDiffuserPortId] = React.useState(0);
  const [ambientProfile, setAmbientProfile] = React.useState(0);

  /* Output each number of steps */
  const writeStepFreqDefault = 100;
  const [ writeStepFreq, setWriteStepFreq ] = React.useState(writeStepFreqDefault);

  /* Max vertical reversals */
  const maxReveralsDefault = "SECOND_MAX_RISE_OR_FALL";
  const maxReversalOpts = [
    "INITIAL_TRAP_LEVEL",
    "MAX_RISE_OR_FALL",
    "SECOND_TRAP_LEVEL",
    "SECOND_MAX_RISE_OR_FALL"
  ]
  const [ maxReverals, setMaxReverals ] = React.useState(maxReveralsDefault);

  /* Maximum dilution reported */
  const maxDilutionReportedDefault = 10000;
  const [ maxDilutionReported, setMaxDilutionReported ] = React.useState(maxDilutionReportedDefault);

  /* Estimate fairfield background */
  const estimateFarfieldBackgroundDefault = false;
  const [ estimateFarfieldBackground, setEstimateFarfieldBackground ] = React.useState(estimateFarfieldBackgroundDefault);

  /* Output all fairfield time increments */
  const outputAllFarfieldTimeIncrementsDefault = false;
  const [ outputAllFarfieldTimeIncrements, setOutputAllFarfieldTimeIncrements ] = React.useState(outputAllFarfieldTimeIncrementsDefault);

  /* Stop on bottom hit */
  const stopOnBottomHitDefault = false;
  const [ stopOnBottomHit, setStopOnBottomHit ] = React.useState(stopOnBottomHitDefault);

  /* Do not stop on surface hit */
  const dontStopOnSurfaceHitDefault = false;
  const [ dontStopOnSurfaceHit, setDontStopOnSurfaceHit ] = React.useState(dontStopOnSurfaceHitDefault);

  /* Allow induced current (multiport) */
  const allowInducedCurrentDefault = false;
  const [ allowInducedCurrent, setAllowInducedCurrent ] = React.useState(allowInducedCurrentDefault);

  /* Farfield diffusivity option */
  const farfieldDiffusivityDefault = "CONSTANT";
  const farfieldDiffusivityOpts = [
    "CONSTANT",
    "POWER_4_3"
  ];
  const [ farfieldDiffusivity, setFarfieldDiffusivity ] = React.useState(farfieldDiffusivityDefault);

  /*** Output Graph Data ***/
  const [ elevationProjPlane, setElevationProjPlane ] = React.useState(0);
  const [ useShoreVector, setUseShoreVector ] = React.useState(false);
  const [ distToShore, setDistToShore ] = React.useState(7250);
  const [ dirToShore, setDirToShore ] = React.useState(58);

  /*** View Results Graph Data ***/
  const [ resultData, setResultData] = React.useState({});
  const [ dilutionGraph, setDilutionGraph ] = React.useState([]);
  const [ planGraphData, setPlanGraphData ] = React.useState({});
  const [ ambientGraphData, setAmbientGraphData ] = React.useState([]);
  const [ elevationGraphData, setElevationGraphData ] = React.useState([]);
  const [ concentrationGraphData, setConcentrationGraphData ] = React.useState(null);
  const [ dilutionFullPanelGraphData, setDilutionFullPanelGraphData ] = React.useState(null);

  /* Parameter for holding series list from model output */
  const [ seriesList, setSeriesList ] = React.useState([]);

  /* Text output */
  const [ textOutput, setTextOutput ] = React.useState('No results to display yet.');

  /* Graph Panel Style */
  const graphStyles = {
    '4panel': '4 Panel',
    'dilution': 'Dilution',
    'concentration': 'Concentration',
    'custom': 'Custom'
  };
  const [ graphStyle, setGraphStyle ] = React.useState("4panel");

  /* Output ID for archive download */
  const [ outputID, setOutputID ] = React.useState("")


  /**
   * Shared State Object
   * Holds all getters and setters for VP project data. Access via useAppContext().
   */
  let sharedState = {

    ambientWidth,
    numAmbientCols,

    /***** Project Configuration Data /*****/

    /* Project Name */
    projectName,
    setProjectName,

    /* Analysis Data */
    hasAnalysisData, setHasAnalysisData,
    waitingForAnalysisData, setWaitingForAnalysisData,

    /* Model Configuration */
    modelConfigType, setModelConfigType,

    /* Tidal Pollutant Buildup */
    tidalPollutantBuildup, 
    setTidalPollutantBuildup,

    /* Extra model params */
    reportEffectiveDillution, 
    setReportEffectiveDillution,

    currentVectorAveraging,
    setCurrentVectorAveraging,

    /***** Diffuser Table *****/

    /* Diffuser table row values */
    diffuserRows,
    setDiffuserRows,

    /* Time series row values */
    timeseriesRows,
    setTimeseriesRows,

    /* Special settings table values */
    specialSettingsRows,
    setSpecialSettingsRows,

    /* Bacterial Model radio button group selection */
    bacterialModelValue,
    setBacterialModelValue,

    /* Equation of State */
    eqOfState,
    setEqOfState,
    
    /* Similarity Profile */
    similarityProfile,
    setSimilarityProfile,

    /* NEW Diffuser table variables */
    diffuserTable,
    setDiffuserTable,

    diffuserTimeSeries, 
    setDiffuserTimeSeries,
    diffuserTimeSeriesDefaults,

    defaultFileName,

    /* Input Template for diffuser table, used to add rows */
    diffuserInputTemplate,

    /* Diffuser Port Contraction Coefficient */
    diffPortContCoeff, setDiffPortContCoeff,

    /* Light Absorption Coefficient */
    lightAbsorpCoeff, setLightAbsorpCoeff,

    /* Farfield Coefficient */
    farfieldCoeff, setFarfieldCoeff,

    /* UM3 Aspiration Coefficient */
    um3AspCoeff, setUm3AspCoeff,

    /***** Ambient Inputs *****/

    ambientStore,
    setAmbientStore,

    ambientStoreProfileTemplate,
    ambientInputTemplate,
    ambientTabTemplate,

    selectedAmbientProfileTab, 
    setSelectedAmbientProfileTab,

    // ambientFile1, 
    // setAmbientFile1,

    ambientFiles,
    setAmbientFiles,

    /***** Analysis Options *****/
    diffuserPortAliasID, setDiffuserPortAliasID,
    ambientProfile, setAmbientProfile,
    writeStepFreq, setWriteStepFreq,
    maxReverals, setMaxReverals, maxReversalOpts,
    maxDilutionReported, setMaxDilutionReported,
    estimateFarfieldBackground, setEstimateFarfieldBackground,
    outputAllFarfieldTimeIncrements, setOutputAllFarfieldTimeIncrements,
    stopOnBottomHit, setStopOnBottomHit,
    dontStopOnSurfaceHit, setDontStopOnSurfaceHit,
    allowInducedCurrent, setAllowInducedCurrent,
    farfieldDiffusivity, setFarfieldDiffusivity, farfieldDiffusivityOpts,

    /***** Output Graph Options *****/
    elevationProjPlane, setElevationProjPlane,
    useShoreVector,     setUseShoreVector,
    distToShore,        setDistToShore,
    dirToShore,         setDirToShore,

    /***** View Results *****/
    graphStyles, graphStyle, setGraphStyle,
    resultData, setResultData,
    dilutionGraph, setDilutionGraph,
    ambientGraphData, setAmbientGraphData,
    elevationGraphData, setElevationGraphData,
    seriesList, setSeriesList,
    planGraphData, setPlanGraphData,
    concentrationGraphData, setConcentrationGraphData,
    dilutionFullPanelGraphData, setDilutionFullPanelGraphData,

    /***** Text Results *****/
    textOutput, setTextOutput,

    /***** Output ID *****/
    outputID, setOutputID,

  }

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}