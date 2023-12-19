import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import {
  GridApi,
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridColumnMenu,
  GridColumnMenuProps,
  GridColumnMenuItemProps,
  GridRowModel,
  // useGridApiContext,
} from '@mui/x-data-grid';
import { useAppContext } from '@/context/state';

/* Custom components */
import AmbientTableOption from './AmbientTableOption';


type Props = {};
const ddWidth = 125;
const rowLabelWidth = 150;
const rowSpacing = 2;

// const depthOrHeightOptions = ['depth', 'height'];
const depthOrHeightOptions = [
  { value: 'D', label: 'depth' },
  { value: 'H', label: 'height' }
]

const AmbientTableOptions: React.FC<Props> = ({ }) => {
  const {currentSpeedExtrapolationSfc, setCurrentSpeedExtrapolationSfc } = useAppContext();
  const {currentSpeedExtrapolationBtm, setCurrentSpeedExtrapolationBtm} = useAppContext();
  const {currentSpeedMU, setCurrentSpeedMU} = useAppContext();
  const {currentDirectionExtrapolationSfc, setCurrentDirectionExtrapolationSfc} = useAppContext();
  const {currentDirectionExtrapolationBtm, setCurrentDirectionExtrapolationBtm} = useAppContext();
  const {currentDirectionMU, setCurrentDirectionMU} = useAppContext();
  const {ambientSalinityExtrapolationSfc, setAmbientSalinityExtrapolationSfc} = useAppContext();
  const {ambientSalinityExtrapolationBtm, setAmbientSalinityExtrapolationBtm} = useAppContext();
  const {ambientSalinityMU, setAmbientSalinityMU} = useAppContext();
  const {ambientTemperatureExtrapolationSfc, setAmbientTemperatureExtrapolationSfc} = useAppContext();
  const {ambientTemperatureExtrapolationBtm, setAmbientTemperatureExtrapolationBtm} = useAppContext();
  const {ambientTemperatureMU, setAmbientTemperatureMU} = useAppContext();
  const {backgroundConcentrationSfc, setBackgroundConcentrationSfc} = useAppContext();
  const {backgroundConcentrationBtm, setBackgroundConcentrationBtm} = useAppContext();
  const {backgroundConcentrationMU, setBackgroundConcentrationMU} = useAppContext();
  const {pollutionDecayRateExtrapolationSfc, setPollutionDecayRateExtrapolationSfc} = useAppContext();
  const {pollutionDecayRateExtrapolationBtm, setPollutionDecayRateExtrapolationBtm} = useAppContext();
  const {pollutionDecayRateMU, setPollutionDecayRateMU} = useAppContext();
  const {farFieldCurrentSpeedExtrapolationSfc, setFarFieldCurrentSpeedExtrapolationSfc} = useAppContext();
  const {farFieldCurrentSpeedExtrapolationBtm, setFarFieldCurrentSpeedExtrapolationBtm} = useAppContext();
  const {farFieldCurrentSpeedMU, setFarFieldCurrentSpeedMU} = useAppContext();
  const {farFieldCurrentDirectionExtrapolationSfc, setFarFieldCurrentDirectionExtrapolationSfc} = useAppContext();
  const {farFieldCurrentDirectionExtrapolationBtm, setFarFieldCurrentDirectionExtrapolationBtm} = useAppContext();
  const {farFieldCurrentDirectionMU, setFarFieldCurrentDirectionMU} = useAppContext();
  const {farFieldDiffCoeffExtrapolationSfc, setFarFieldDiffCoeffExtrapolationSfc} = useAppContext();
  const {farFieldDiffCoeffExtrapolationBtm, setFarFieldDiffCoeffExtrapolationBtm} = useAppContext();
  const {farFieldDiffCoeffMU, setFarFieldDiffCoeffMU} = useAppContext();

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-label">Depth or height</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={"depth"}
          label="Depth or Height"
          // onChange={handleChange}
        >
          <MenuItem value={"depth"}>depth</MenuItem>
          <MenuItem value={"height"}>height</MenuItem>
        </Select>
      </FormControl>

      <hr></hr>

      <Box sx={{ width: '100%', marginBottom: rowSpacing }}>
        <Grid
          container
          // direction="row"
          justifyContent="flex-start"
          // alignItems="center"
          spacing={1}
        >
          <Grid item xs={1}>
            Depth or Height
          </Grid>
          <Grid item xs={1}>
            Current Speed
          </Grid>
          <Grid item xs={1}>
            Current Direction
          </Grid>
          <Grid item xs={1}>
            Ambient Salinity
          </Grid>
          <Grid item xs={1}>
            Ambient Temperature
          </Grid>
          <Grid item xs={1}>
            Background Concentration
          </Grid>
          <Grid item xs={1}>
            Pollution Decay Rate
          </Grid>
          <Grid item xs={1}>
            Far Field Current Speed
          </Grid>
          <Grid item xs={1}>
            Far Field Current Direction
          </Grid>
          <Grid item xs={1}>
            Far Field Diff Coeff
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ width: '100%', marginBottom: rowSpacing }}>
        <Grid
          container
          // direction="row"
          justifyContent="flex-start"
          // alignItems="center"
          spacing={1}
        >
          <Grid item xs={1}>
            Extrapolation (sfc)
          </Grid>
          <AmbientTableOption 
            setParameterFunc  = {setCurrentSpeedExtrapolationSfc}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
          ></AmbientTableOption>
          <AmbientTableOption 
            setParameterFunc  = {setCurrentDirectionExtrapolationSfc}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
          ></AmbientTableOption>
          <AmbientTableOption 
            setParameterFunc  = {setAmbientSalinityExtrapolationSfc}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
          ></AmbientTableOption>
          <AmbientTableOption 
            setParameterFunc  = {setAmbientTemperatureExtrapolationSfc}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
          ></AmbientTableOption>
          <AmbientTableOption 
            setParameterFunc  = {setBackgroundConcentrationSfc}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
          ></AmbientTableOption>
          <AmbientTableOption 
            setParameterFunc  = {setPollutionDecayRateExtrapolationSfc}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
          ></AmbientTableOption>
          <AmbientTableOption 
            setParameterFunc  = {setFarFieldCurrentSpeedExtrapolationSfc}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
          ></AmbientTableOption>
          <AmbientTableOption 
            setParameterFunc  = {setFarFieldCurrentDirectionExtrapolationSfc}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
          ></AmbientTableOption>
          <AmbientTableOption 
            setParameterFunc  = {setFarFieldDiffCoeffExtrapolationSfc}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
          ></AmbientTableOption>
        </Grid>
      </Box>

      <Box sx={{ width: '100%', marginBottom: rowSpacing  }}>
        <Grid
          container
          // direction="row"
          justifyContent="flex-start"
          // alignItems="center"
          spacing={1}
        >
          <Grid item xs={1}>
            Extrapolation (btm)
          </Grid>
          <AmbientTableOption 
            setParameterFunc  = {setCurrentSpeedExtrapolationBtm}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
          ></AmbientTableOption>
          <AmbientTableOption 
            setParameterFunc  = {setCurrentDirectionExtrapolationBtm}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
          ></AmbientTableOption>
          <AmbientTableOption 
            setParameterFunc  = {setAmbientSalinityExtrapolationBtm}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
          ></AmbientTableOption>
          <AmbientTableOption 
            setParameterFunc  = {setAmbientTemperatureExtrapolationBtm}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
          ></AmbientTableOption>
          <AmbientTableOption 
            setParameterFunc  = {setBackgroundConcentrationBtm}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
          ></AmbientTableOption>
          <AmbientTableOption 
            setParameterFunc  = {setPollutionDecayRateExtrapolationBtm}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
          ></AmbientTableOption>
          <AmbientTableOption 
            setParameterFunc  = {setFarFieldCurrentSpeedExtrapolationBtm}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
          ></AmbientTableOption>
          <AmbientTableOption 
            setParameterFunc  = {setFarFieldCurrentDirectionExtrapolationBtm}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
          ></AmbientTableOption>
          <AmbientTableOption 
            setParameterFunc  = {setFarFieldDiffCoeffExtrapolationBtm}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
          ></AmbientTableOption>
        </Grid>
      </Box>

      <Box sx={{ width: '100%', marginBottom: rowSpacing  }}>
        <Grid
          container
          // direction="row"
          justifyContent="flex-start"
          // alignItems="center"
          spacing={1}
        >
          <Grid item xs={1}>
            Measurement unit
          </Grid>
          <AmbientTableOption 
            setParameterFunc  = {setCurrentSpeedMU}
            defaultVal = {"m/s"}
            optionVals = {["m/s","cm/s","kt","mph","ft/s"]}
          ></AmbientTableOption>
          <AmbientTableOption 
            setParameterFunc  = {setCurrentDirectionMU}
            defaultVal = {"deg"}
            optionVals = {["deg","rad","N-deg","N-rad"]}
          ></AmbientTableOption>
          <AmbientTableOption 
            setParameterFunc  = {setAmbientSalinityMU}
            defaultVal = {"psu"}
            optionVals = {["psu","mmho/cm","kg/m3","sigmaT","lb/ft3"]}
          ></AmbientTableOption>
          <AmbientTableOption 
            setParameterFunc  = {setAmbientTemperatureMU}
            defaultVal = {"C"}
            optionVals = {["C","F"]}
          ></AmbientTableOption>
          <AmbientTableOption 
            setParameterFunc  = {setBackgroundConcentrationMU}
            defaultVal = {"kg/kg"}
            optionVals = {["kg/kg","ppm","ppb","%","col/dl"]}
          ></AmbientTableOption>
          <AmbientTableOption 
            setParameterFunc  = {setPollutionDecayRateMU}
            defaultVal = {"s-1"}
            optionVals = {["s-1","d-1","T90hr","ly/hr","hr-1"]}
          ></AmbientTableOption>
          <AmbientTableOption 
            setParameterFunc  = {setFarFieldCurrentSpeedMU}
            defaultVal = {"m/s"}
            optionVals = {["m/s","cm/s","ft/s","mph","kt"]}
          ></AmbientTableOption>
          <AmbientTableOption 
            setParameterFunc  = {setFarFieldCurrentDirectionMU}
            defaultVal = {"deg"}
            optionVals = {["deg","rad","N-deg","N-rad"]}
          ></AmbientTableOption>
          <AmbientTableOption 
            setParameterFunc  = {setFarFieldDiffCoeffMU}
            defaultVal = {"m0.67/s2"}
            optionVals = {["m0.67/s2"]}
          ></AmbientTableOption>
        </Grid>
      </Box>
    </div>
  )
}

export default AmbientTableOptions;