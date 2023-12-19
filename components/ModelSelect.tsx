import * as React from 'react';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useAppContext } from '../context/state';
import TidalPollutantBuildupSettings from './TidalPollutantBuildupSettings';
import { Switch } from '@mui/material';
import AdditionalModelInput from './AdditionalModelInput';
import BrooksFarFieldSettings from './BrooksFarFieldSettings';

type Props = {}

const ModelSelect: React.FC<Props> = ({ }) => {
  const { projectName, setProjectName } = useAppContext();
  const { tidalPollutantBuildup, setTidalPollutantBuildup } = useAppContext();
  const { modelConfigType, setModelConfigType } = useAppContext();
  const { reportEffectiveDillution, setReportEffectiveDillution } = useAppContext();
  const { currentVectorAveraging, setCurrentVectorAveraging } = useAppContext();

  const updateChannelWidth = (event:React.ChangeEvent<HTMLInputElement>) => {
    let tmpTidalPollutantBuildup = {... tidalPollutantBuildup};
    tmpTidalPollutantBuildup['channel_width'] = event.target.value
    setTidalPollutantBuildup(tmpTidalPollutantBuildup);
  }

  const updateReportEffectiveDillution = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReportEffectiveDillution(event.target.checked);
  };

  const handleUpdateProjectName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProjectName(event.target.value);
  }

  const handleModelConfig = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    let toggleTidalPollutantBuildupSettings = (val:boolean) => {
      let newTidalPollutantBuildup = {...tidalPollutantBuildup};
      newTidalPollutantBuildup["isEnabled"] = val;
      setTidalPollutantBuildup(newTidalPollutantBuildup);
    }

    console.log("handleModelConfig fired!");
    if (event.target.value === "tidal"){
      console.log("tidal selected");
      toggleTidalPollutantBuildupSettings(true);
      setModelConfigType("tidal");
    } else if (event.target.value === "brooks") {
      /* TODO: Add brooks parameter now */
      toggleTidalPollutantBuildupSettings(false);
      setModelConfigType("brooks")
    } else {
      toggleTidalPollutantBuildupSettings(false);
      setModelConfigType("none");
    }
  }
  
  return (
    <div>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{height: "100%"}}>

        {/* Basic Model Info */}
        <Grid item xs={6}>

          {/* Project Name */}
          <TextField 
            id="project-name" 
            label="Project Name" 
            variant="outlined"
            onChange={handleUpdateProjectName}
            value={projectName}
            sx={{width:"75%"}}
          />

          <Typography 
            variant="h5" 
            color="text.primary" 
            gutterBottom
            sx={{marginTop:"1em"}}
          >
            Model Algorithm
          </Typography>
          <RadioGroup
              aria-labelledby="model-select-radio-buttons-group-label"
              defaultValue="um3"
              name="nrfield-radio-buttons-group"
          >
            <FormControlLabel value="um3" control={<Radio />} label="UM3: A brief derscription of UM3 model." />
            <FormControlLabel value="nrfield" control={<Radio disabled />} label="NRField: A brief description of NR field model." />
              
          </RadioGroup>

          {/* Model Configuration Column*/}
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <Typography 
                variant="h5" 
                color="text.primary" 
                gutterBottom
                sx={{marginTop:"1em"}}
              >
                Model Configuration
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <RadioGroup
                  aria-labelledby="model-config-1-field-demo-radio-buttons-group-label"
                  defaultValue="none"
                  name="radio-buttons-group"
                  value={modelConfigType}
                  onChange={handleModelConfig}
              >
                <FormControlLabel value="none" control={<Radio />} label="None" />
                <FormControlLabel value="brooks" control={<Radio />} label="Brooks far-field solution" />
                <FormControlLabel value="tidal" control={<Radio />} label="Tidal pollution buildup" />
              </RadioGroup>
              <Typography 
                variant="h5" 
                color="text.primary" 
                gutterBottom
                sx={{marginTop:"1em"}}
              >
                Model Configuration Options
              </Typography>
              <Grid item xs={12}>
                  <TextField 
                    id="channel_width"
                    label="Channel width (m)"
                    variant="outlined"
                    type="string"
                    fullWidth={true}
                    value = {tidalPollutantBuildup['channel_width']}
                    onChange={updateChannelWidth}
                    sx={{paddingBottom:'1em', marginTop:'1em'}}
                  />
                </Grid>
              {tidalPollutantBuildup['isEnabled'] && <TidalPollutantBuildupSettings />}
              {(modelConfigType === "brooks") && <BrooksFarFieldSettings/>}

            </Grid>
            {/* Estimate fairfield background */}
            {/* estimateFarfieldBackground, setEstimateFarfieldBackground */}
            <Grid item xs={6}>
              <Grid
                container
                justifyContent="flex-start"
                spacing={1}
                alignItems="center"
              >
                
                <Grid item xs={9}>
                  {/* <InputLabel id="estimate-fairfield-background-label">Estimate fairfield background</InputLabel> */}
                  <Typography gutterBottom>
                    Report effective dilution
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Switch 
                    inputProps={{ 'aria-label': 'Estimate fairfield background' }}
                    defaultChecked 
                    checked = {reportEffectiveDillution}
                    onChange = {updateReportEffectiveDillution}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Additional Model Input */}
        <Grid item xs={6} sx={{ width: '100%', minWidth: 500 }}>
          <AdditionalModelInput />
        </Grid>
      </Grid>
      {/* </ResponsiveContainer> */}
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
  )
}

export default ModelSelect