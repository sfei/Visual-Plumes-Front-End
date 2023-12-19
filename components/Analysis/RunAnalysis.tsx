import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

/* Pull in global app state */
import { useAppContext } from '../../context/state';
import { Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Switch, Typography } from '@mui/material';
import ModelRunOptions from './ModelRunOptions';
import OutputGraphOptions from './OutputGraphOptions';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

type Props = {};

const rowSpacing = 2;

const RunAnalysis: React.FC<Props> = () => {
  const { diffuserRows, setDiffuserRows } = useAppContext();
  const { projectName, setProjectName } = useAppContext();
  const { diffuserPortAliasID, setDiffuserPortAliasID,} = useAppContext();
  const { ambientProfile, setAmbientProfile,} = useAppContext();
  const { diffuserTable, ambientStore } = useAppContext();
  const { resultData, setResultData } = useAppContext();
  // const {ambientFile1} = useAppContext();
  const { bacterialModelValue, setBacterialModelValue} = useAppContext();
  const { modelConfigType, setModelConfigType } = useAppContext();
  const { tidalPollutantBuildup, setTidalPollutantBuildup } = useAppContext();

  /* Model Parameters */
  const { 
    reportEffectiveDillution, 
    currentVectorAveraging,
    diffPortContCoeff,
    lightAbsorpCoeff,
    um3AspCoeff,
    eqOfState,
    similarityProfile
  } = useAppContext();

  /* Time Series Data */
  const { diffuserTimeSeries, setDiffuserTimeSeries } = useAppContext();
  const { ambientFiles, setAmbientFiles } = useAppContext();

  /* Analysis Options */
  const { hasAnalysisData, setHasAnalysisData } = useAppContext();
  const { waitingForAnalysisData, setWaitingForAnalysisData } = useAppContext();
  const { writeStepFreq, setWriteStepFreq } = useAppContext();
  const { maxReverals, setMaxReverals, maxReversalOpts } = useAppContext();
  const { maxDilutionReported, setMaxDilutionReported } = useAppContext();
  const { estimateFarfieldBackground, setEstimateFarfieldBackground } = useAppContext();
  const { outputAllFarfieldTimeIncrements, setOutputAllFarfieldTimeIncrements } = useAppContext();
  const { stopOnBottomHit, setStopOnBottomHit } = useAppContext();
  const { dontStopOnSurfaceHit, setDontStopOnSurfaceHit } = useAppContext();
  const { allowInducedCurrent, setAllowInducedCurrent } = useAppContext();
  const { farfieldDiffusivity, setFarfieldDiffusivity, farfieldDiffusivityOpts, farfieldCoeff } = useAppContext();
  const { setDilutionGraph, setPlanGraphData, setAmbientGraphData, setElevationGraphData, setConcentrationGraphData, setDilutionFullPanelGraphData, setTextOutput } = useAppContext();
  const { useShoreVector, distToShore, dirToShore } = useAppContext();
  const { setOutputID } = useAppContext();

  /* Results Data Structures */
  const { seriesList, setSeriesList } = useAppContext();

  function getCookie(name: string) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    // console.log(`Cookie Value: ${cookieValue}`);
    return cookieValue;
  }

  /* Convert series data from model output to rechart input */
  const getSeriesData = (data: any, series: string) => {
    let middlewareData   = data['graphs'][series]['coords'];
    let tmpSeries = [];
    for (let i=0; i < middlewareData.length; i++) {
      let x = middlewareData[i][0];
      let y = middlewareData[i][1];
      let point = {
        'x'  : parseFloat(x),
        'y' : parseFloat(y)
      }
      tmpSeries.push(point);
    }
    return tmpSeries;
  }

  {/* Dilution Graph */}
  const getDilutionSeriesData = (data: any) => {
    let dilutionSeriesData = {
      'dilution'   : getSeriesData(data, 'dilution'),
      'cldilution' : getSeriesData(data, 'cldilution'),
      'x_units'    : data['graphs']['dilution']['units']['x']['units_label'],
      'x_label'    : data['graphs']['dilution']['units']['x']['axis_label'],
      'y_units'    : data['graphs']['dilution']['units']['y']['units_label'],
      'y_label'    : data['graphs']['dilution']['units']['y']['axis_label'],
    }
    return dilutionSeriesData;
  }

  {/* Plan View */}
  const getPlanViewSeriesData = (data: any) => {
    let planGraphData = {
      'path'    : getSeriesData(data, 'path'),
      'out1'    : getSeriesData(data, 'out1'),
      'out2'    : getSeriesData(data, 'out2'),
      'pathv'   : getSeriesData(data, 'pathv'),
      'x_units' : data['graphs']['path']['units']['x']['units_label'],
      'x_label' : data['graphs']['path']['units']['x']['axis_label'],
      'y_units' : data['graphs']['path']['units']['y']['units_label'],
      'y_label' : data['graphs']['path']['units']['y']['axis_label'],
    }

    return planGraphData;

  }

  {/* Elevation View */}
  const getElevationViewSeriesData = (data: any) => {
    let elevationGraphData = {
      'trajectory' : getSeriesData(data, 'trajectory'),
      'boundary1'  : getSeriesData(data, 'boundary1'),
      'boundary2'  : getSeriesData(data, 'boundary2'),
      'x_units': data['graphs']['trajectory']['units']['x']['units_label'],
      'x_label': data['graphs']['trajectory']['units']['x']['axis_label'],
      'y_units': data['graphs']['trajectory']['units']['y']['units_label'],
      'y_label': data['graphs']['trajectory']['units']['y']['axis_label'],
    }
    return elevationGraphData;
  }

  {/* Ambient properties */}
  const getAmbientPropsSeriesData = (data: any) => {
    let ambientGraphData = {
      'ambdensity' : getSeriesData(data, 'ambdensity'),
      'density' : getSeriesData(data, 'density'),
      'x_units': data['graphs']['ambdensity']['units']['x']['units_label'],
      'x_label': data['graphs']['ambdensity']['units']['x']['axis_label'],
      'y_units': data['graphs']['ambdensity']['units']['y']['units_label'],
      'y_label': data['graphs']['ambdensity']['units']['y']['axis_label'],
    }
    return ambientGraphData;
  }

  {/* Concentration */}
  const getConcentrationSeriesData = (data:any) => {
    let concentrationData = {
      'concentration' : getSeriesData(data, 'concentration'),
      'mzconcentration' : getSeriesData(data, 'mzconcentration'),
      'x_units': data['graphs']['concentration']['units']['x']['units_label'],
      'x_label': data['graphs']['concentration']['units']['x']['axis_label'],
      'y_units': data['graphs']['concentration']['units']['y']['units_label'],
      'y_label': data['graphs']['concentration']['units']['y']['axis_label'],
    }
    return concentrationData;
  }

  {/* Dilution */}
  const getDilutionFullPanelSeriesData = (data:any) => {
    let dilutionData = {
      'enddilution' : getSeriesData(data, 'enddilution'),
      'mzdilution' : getSeriesData(data, 'mzdilution'),
      'x_units': data['graphs']['enddilution']['units']['x']['units_label'],
      'x_label': data['graphs']['enddilution']['units']['x']['axis_label'],
      'y_units': data['graphs']['enddilution']['units']['y']['units_label'],
      'y_label': data['graphs']['enddilution']['units']['y']['axis_label'],
    }
    return dilutionData;
  }

  /* Tasks to run once result data is returned from the model run */
  const handleResultData = (strData: any) => {
    // console.log(`strData: ${strData}`);
    // console.log(strData['success']);
    if (strData['success'] === undefined) {
      // console.log("Success!");
      /* Find and replace NaNs */
      const tmpData = strData.replace(/NaN/g,null);

      /* Convert output string data to JSON */
      const data = JSON.parse(tmpData);

      /* Print result data to console */
      // console.log("Results Data:")
      // console.log(data);

      /* Flag that we have analysis data */
      setHasAnalysisData(true);
      // console.log(`hasAnalysisData: ${hasAnalysisData}`)
      
      /* Set up graph data for dilution series, just an example */
      let dilutionGraphData = getDilutionSeriesData(data);
      setDilutionGraph(dilutionGraphData);

      /* Plan View graph data */
      let planViewGraphData = getPlanViewSeriesData(data);
      setPlanGraphData(planViewGraphData);

      /* Elevation View */
      let elevationGraphData = getElevationViewSeriesData(data);
      setElevationGraphData(elevationGraphData);

      /* Ambient graph data */
      let ambientGraphData = getAmbientPropsSeriesData(data);
      setAmbientGraphData(ambientGraphData);

      /* Concentration graph data */
      let concentrationGraphData = getConcentrationSeriesData(data);
      setConcentrationGraphData(concentrationGraphData);

      /* Dilution full panel graph data */
      let dilutionFullPanelGraphData = getDilutionFullPanelSeriesData(data);
      setDilutionFullPanelGraphData(dilutionFullPanelGraphData);

      /* Set text output */
      setTextOutput(data['text_outputs']);

      /* Set output ID for archive download */
      setOutputID(data['output_id']);

      /* Stop circular progress */
      setWaitingForAnalysisData(false);
    } else {
      /* Set text output */
      setHasAnalysisError(true);
      setTextOutput(strData['error']);
      setErrorText(strData['error']);
      setWaitingForAnalysisData(false);
    }
  }

  const handleRunAnalysis = () => {
    const csrftoken = getCookie('csrftoken');

    /* Establish a new FormData instance */
    let formData = new FormData();

    /* Append Diffuser Time series files */
    Object.keys(diffuserTimeSeries).map( (field: string) => {
      formData.append(`${field}-diffuser-file`, diffuserTimeSeries[field]['file']);
    });

    /* Append Ambient Time series files */
    Object.keys(ambientFiles).map( (field: string) => {
      if (field !== 'depth_or_height'){
        formData.append(`${field}-ambient-file`, ambientFiles[field]['file']);
      }
    });

    let projectData = JSON.stringify({
      diffuserStore                   : diffuserTable.store,
      diffuserData                    : diffuserTable.data.filter((row:any) => row.id === diffuserPortAliasID),
      diffuserTimeSeries              : diffuserTimeSeries,
      ambientProfileData              : ambientStore.tabs.filter((tab:any) => tab.id === ambientProfile),
      modelConfigType                 : modelConfigType,
      maxDilutionReported             : maxDilutionReported,
      tidalPollutantBuildup           : tidalPollutantBuildup,
      bacterialModelValue             : bacterialModelValue,
      writeStepFreq                   : writeStepFreq,
      stopOnBottomHit                 : stopOnBottomHit,
      maxReverals                     : maxReverals,
      dontStopOnSurfaceHit            : dontStopOnSurfaceHit,
      allowInducedCurrent             : allowInducedCurrent,
      ambientFiles                    : ambientFiles,
      reportEffectiveDillution        : reportEffectiveDillution,
      currentVectorAveraging          : currentVectorAveraging,
      diffPortContCoeff               : diffPortContCoeff,
      lightAbsorpCoeff                : lightAbsorpCoeff,
      um3AspCoeff                     : um3AspCoeff,
      eqOfState                       : eqOfState,
      similarityProfile               : similarityProfile,
      estimateFarfieldBackground      : estimateFarfieldBackground,
      outputAllFarfieldTimeIncrements : outputAllFarfieldTimeIncrements,
      farfieldDiffusivity             : farfieldDiffusivity,
      farfieldCoeff                   : farfieldCoeff,
      useShoreVector                  : useShoreVector,
      distToShore                     : distToShore,
      dirToShore                      : dirToShore
    });

    formData.append("projectData", projectData);

    /* Start spinner */
    setWaitingForAnalysisData(true);

    let API_URL = process.env.API_URL;
    if (API_URL === undefined) {
      API_URL = 'http://localhost:3000/app/run_analysis';
    } else {
      API_URL = `${API_URL}/run_analysis`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 sec timeout

    setErrorText(``);
    setHasAnalysisError(false);

    try {
      fetch(API_URL, {
        method: 'POST',
        credentials: 'include',
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        },
        body: formData
      }).then(
        response => response.json()
      ).then(
        data => handleResultData(data)
      ).catch(() => {
        setErrorText(`Internal Server Error`);
        setHasAnalysisError(true);
        setWaitingForAnalysisData(false);
      })
    } catch (e) {
      setErrorText(`Internal Server Error`);
      setHasAnalysisError(true);
      setWaitingForAnalysisData(false);
    }

    
  }

  const updateDiffuserSelection = (event:any) => {
    setDiffuserPortAliasID(event.target.value);
  }

  const updateAmbientSelection = (event:any) => {
    setAmbientProfile(event.target.value);
  }

  /* Clear time series file dialog variables */
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (field:string) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /* Error Text Handling */
  const [ errorText, setErrorText ] = React.useState('');
  const [ hasAnalysisError, setHasAnalysisError ] = React.useState(false);

  return (
    <div>
      <Box sx={{ width: '100%', marginBottom: rowSpacing }}>
        
        <Grid
          container
          justifyContent="flex-start"
          spacing={1}
          alignItems="center"
        >
          <Grid
            container
            justifyContent="flex-start"
            spacing={1}
            alignItems="center"
          >
            <Grid item xs={12}>
              <Typography variant="h5" color="text.primary" gutterBottom>Test Project Name: {projectName}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" color="text.primary" gutterBottom>Select scenario for model run:</Typography>
            </Grid>
            <Grid item xs={2}>
              <InputLabel id="scenrio-diffuser-select-label">Diffuser Port Alias</InputLabel>
              <Select
                // inputProps={{ 'aria-label': 'Without label' }}
                label="Diffuser Port Alias" 
                labelId={`scenrio-diffuser-select-label`}
                id={`scenario-ambient-select`}
                sx={{minWidth: 150}}
                onChange={updateDiffuserSelection}
                value = {diffuserPortAliasID}
                // variant="outlined"
              >
              {diffuserTable.data.map((inputRow:any) => {
                return <MenuItem value={inputRow.id} key={inputRow.id}>{inputRow.port_alias}</MenuItem>
              })}
              </Select>
            </Grid>
            <Grid item xs={2}>
              <InputLabel id="ambient-profile-select-label">Ambient Condition Profile</InputLabel>
              <Select
                // inputProps={{ 'aria-label': 'Without label' }}
                label="Ambient Condition Profile" 
                labelId={`ambient-profile-select-label`}
                id={`ambient-profile-select`}
                sx={{minWidth: 150}}
                onChange={updateAmbientSelection}
                value = {ambientProfile}
                // variant="outlined"
              >
                {ambientStore.tabs.map((tab:any) => {
                  return <MenuItem value={tab.id} key={tab.id}>{`Ambient Cond ${tab.id}`}</MenuItem>
              })}
              </Select>
            </Grid>
            {/* Run Analysis Button */}
            <Grid item xs={2}>
              <Button
                onClick = {handleRunAnalysis}
                variant = "contained"
              >
                Run Analysis
              </Button>
            </Grid>
            <Grid item xs={6}>
              {waitingForAnalysisData && <CircularProgress sx={{marginLeft: "1em"}}/>}
              {hasAnalysisError && <Typography>Analysis Error: {errorText}</Typography>}
              {hasAnalysisData && <Typography>Analysis complete.</Typography>}
            </Grid>
          </Grid>

          {/* Model Run Options */}
          <ModelRunOptions /> 

          {/* Output Graph Options */}
          <OutputGraphOptions />
          
        </Grid>
      </Box>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
  )
}

export default RunAnalysis