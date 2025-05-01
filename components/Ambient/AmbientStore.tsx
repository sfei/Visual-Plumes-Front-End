import * as React from 'react';
// import convert from 'convert-units';
// import convert from '../ConvertVP';
import { useAppContext } from '@/context/state';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import AmbientStoreOption from './AmbientStoreOption';

const convert = require('../ConvertVP');

// import speed from 'convert-units/lib/definitions/speed';


const rowSpacing = 0;
const numCols = 11;

type Props = {
  'id': number,
};

const unsupportedUnits = ["mmho/cm", "psu", "ly/hr"];

const AmbientStore: React.FC<Props> = ({id}) => {
  const {ambientWidth, numAmbientCols} = useAppContext();
  const {ambientStore, setAmbientStore, ambientInputTemplate} = useAppContext();

  const [currField, setCurrField] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const showUnitSwitchWarning = () => {
    return (
      <Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Unsupported unit conversion"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Automatic conversion not supported for {currField}
              {/* Automatic conversion not supported for */}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose} color="error"><ClearIcon/> No</Button> */}
            <Button onClick={() => {handleClose()}} autoFocus color="success">
              <CheckIcon/> OK
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    )
  }

  const updateAmbientStoreParam = (profileID:number, field:string, subfield:string, val:string) => {
    // console.log("updateAmbientStoreParam ambientStore value:");
    // console.log(ambientStore);

    /* Get new ambient store */
    let newAmbientStore = { ...ambientStore};

    /* Store old field value */
    let old_unit_val = newAmbientStore.tabs[profileID].store[field][subfield];

    /* Update ambient store value */
    newAmbientStore.tabs[profileID].store[field][subfield] = val;

    /* Iterate through ambient store, convert appropriate values */
    if (unsupportedUnits.includes(val) || unsupportedUnits.includes(old_unit_val)) {
      if (unsupportedUnits.includes(val)) {
        setCurrField(val);
      } else if (unsupportedUnits.includes(old_unit_val)) {
        setCurrField(old_unit_val);
      }
      handleOpen();
    } else {
      if (convert().possibilities().includes(old_unit_val)) {
        if (convert().from(old_unit_val).possibilities().includes(val)) {
          for (let i=0; i < newAmbientStore.tabs[profileID].data.length; i++) {
            let currInputCellValue = newAmbientStore.tabs[profileID].data[i][field];
            if (currInputCellValue !== "") {
              newAmbientStore.tabs[profileID].data[i][field] = convert(currInputCellValue).from(old_unit_val).to(val);
            }
          }
        }
      }
    }
    

    /* Set ambient store */
    setAmbientStore(newAmbientStore);
  }

  return (
    <div style={{width:ambientWidth}}>

      {/* Extrapolation (sfc) */}
      <Box sx={{ marginBottom: rowSpacing, width: ambientWidth }}>
        <Grid
          container
          // columns={numAmbientCols}
          // direction="row"
          justifyContent="flex-start"
          // alignItems="center"
          spacing={1}
          columns={numCols}
        >
          <Grid item xs={1}>
            Extrapolation (sfc)
          </Grid>
          <div><Grid item xs={1}></Grid></div>
          <AmbientStoreOption 
            profileID = {id}
            setParameterFunc  = {updateAmbientStoreParam}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
            field = {'current_speed'}
            subfield = {'e_sfc'}
            val = {ambientStore.tabs[id].store['current_speed']['e_sfc']}
          ></AmbientStoreOption>
          <AmbientStoreOption 
            profileID = {id}
            setParameterFunc  = {updateAmbientStoreParam}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
            field = 'current_direction'
            subfield = 'e_sfc'
            val = {ambientStore.tabs[id].store['current_direction']['e_sfc']}
          ></AmbientStoreOption>
          <AmbientStoreOption 
            profileID = {id}
            setParameterFunc  = {updateAmbientStoreParam}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
            field = 'ambient_salinity'
            subfield = 'e_sfc'
            val = {ambientStore.tabs[id].store['ambient_salinity']['e_sfc']}
          ></AmbientStoreOption>
          <AmbientStoreOption 
            profileID = {id}
            setParameterFunc  = {updateAmbientStoreParam}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
            field = 'ambient_temperature'
            subfield = 'e_sfc'
            val = {ambientStore.tabs[id].store['ambient_temperature']['e_sfc']}
          ></AmbientStoreOption>
          <AmbientStoreOption 
            profileID = {id}
            setParameterFunc  = {updateAmbientStoreParam}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
            field = 'background_concentration'
            subfield = 'e_sfc'
            val = {ambientStore.tabs[id].store['background_concentration']['e_sfc']}
          ></AmbientStoreOption>
          <AmbientStoreOption 
            profileID = {id}
            setParameterFunc  = {updateAmbientStoreParam}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
            field = 'pollution_decay_rate'
            subfield = 'e_sfc'
            val = {ambientStore.tabs[id].store['pollution_decay_rate']['e_sfc']}
          ></AmbientStoreOption>
          <AmbientStoreOption 
            profileID = {id}
            setParameterFunc  = {updateAmbientStoreParam}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
            field = 'far_field_curr_speed'
            subfield = 'e_sfc'
            val = {ambientStore.tabs[id].store['far_field_curr_speed']['e_sfc']}
          ></AmbientStoreOption>
          <AmbientStoreOption 
            profileID = {id}
            setParameterFunc  = {updateAmbientStoreParam}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
            field = 'far_field_curr_dir'
            subfield = 'e_sfc'
            val = {ambientStore.tabs[id].store['far_field_curr_dir']['e_sfc']}
          ></AmbientStoreOption>
          <AmbientStoreOption 
            profileID = {id}
            setParameterFunc  = {updateAmbientStoreParam}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
            field = 'far_field_diff_coeff'
            subfield = 'e_sfc'
            val = {ambientStore.tabs[id].store['far_field_diff_coeff']['e_sfc']}
          ></AmbientStoreOption>
        </Grid>
      </Box>

      {/* Extrapolation (sfc) */}
      <Box sx={{ width: '100%', marginBottom: rowSpacing }}>
        <Grid
          container
          // direction="row"
          justifyContent="flex-start"
          // alignItems="center"
          spacing={1}
          columns={numCols}
        >
          <Grid item xs={1}>
            Extrapolation (btm)
          </Grid>
          <div><Grid item xs={1}></Grid></div>
          <AmbientStoreOption 
            profileID = {id}
            setParameterFunc  = {updateAmbientStoreParam}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
            field = {'current_speed'}
            subfield = {'e_btm'}
            val = {ambientStore.tabs[id].store['current_speed']['e_btm']}
          ></AmbientStoreOption>
          <AmbientStoreOption 
            profileID = {id}
            setParameterFunc  = {updateAmbientStoreParam}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
            field = 'current_direction'
            subfield = 'e_btm'
            val = {ambientStore.tabs[id].store['current_direction']['e_btm']}
          ></AmbientStoreOption>
          <AmbientStoreOption 
            profileID = {id}
            setParameterFunc  = {updateAmbientStoreParam}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
            field = 'ambient_salinity'
            subfield = 'e_btm'
            val = {ambientStore.tabs[id].store['ambient_salinity']['e_btm']}
          ></AmbientStoreOption>
          <AmbientStoreOption 
            profileID = {id}
            setParameterFunc  = {updateAmbientStoreParam}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
            field = 'ambient_temperature'
            subfield = 'e_btm'
            val = {ambientStore.tabs[id].store['ambient_temperature']['e_btm']}
          ></AmbientStoreOption>
          <AmbientStoreOption 
            profileID = {id}
            setParameterFunc  = {updateAmbientStoreParam}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
            field = 'background_concentration'
            subfield = 'e_btm'
            val = {ambientStore.tabs[id].store['background_concentration']['e_btm']}
          ></AmbientStoreOption>
          <AmbientStoreOption 
            profileID = {id}
            setParameterFunc  = {updateAmbientStoreParam}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
            field = 'pollution_decay_rate'
            subfield = 'e_btm'
            val = {ambientStore.tabs[id].store['pollution_decay_rate']['e_btm']}
          ></AmbientStoreOption>
          <AmbientStoreOption 
            profileID = {id}
            setParameterFunc  = {updateAmbientStoreParam}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
            field = 'far_field_curr_speed'
            subfield = 'e_btm'
            val = {ambientStore.tabs[id].store['far_field_curr_speed']['e_btm']}
          ></AmbientStoreOption>
          <AmbientStoreOption 
            profileID = {id}
            setParameterFunc  = {updateAmbientStoreParam}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
            field = 'far_field_curr_dir'
            subfield = 'e_btm'
            val = {ambientStore.tabs[id].store['far_field_curr_dir']['e_btm']}
          ></AmbientStoreOption>
          <AmbientStoreOption 
            profileID = {id}
            setParameterFunc  = {updateAmbientStoreParam}
            defaultVal = {"constant"}
            optionVals = {["constant","extrapolated","linear_to_zero"]}
            field = 'far_field_diff_coeff'
            subfield = 'e_btm'
            val = {ambientStore.tabs[id].store['far_field_diff_coeff']['e_btm']}
          ></AmbientStoreOption>
        </Grid>
      </Box>

      {/* Measurement Unit */}
      <Box sx={{ width: '100%', marginBottom: rowSpacing }}>
        <Grid
          container
          // direction="row"
          justifyContent="flex-start"
          // alignItems="center"
          spacing={1}
          columns={numCols}
        >
          <Grid item xs={1}>
            Measurement Unit
          </Grid>
          <AmbientStoreOption 
            profileID = {id}
            setParameterFunc  = {updateAmbientStoreParam}
            defaultVal = {"constant"}
            optionVals = {["m","cm","ft","in","fath"]}
            field = {'depth_or_height'}
            subfield = {'mu'}
            val = {ambientStore.tabs[id].store['depth_or_height']['mu']}
          ></AmbientStoreOption>
          <AmbientStoreOption 
            profileID = {id}
            setParameterFunc  = {updateAmbientStoreParam}
            defaultVal = {"constant"}
            optionVals = {["m/s","cm/s","kts","mph","ft/s"]}
            field = {'current_speed'}
            subfield = {'mu'}
            val = {ambientStore.tabs[id].store['current_speed']['mu']}
          ></AmbientStoreOption>
          <AmbientStoreOption 
            profileID = {id}
            setParameterFunc  = {updateAmbientStoreParam}
            defaultVal = {"deg"}
            optionVals = {["deg","rad","N-deg","N-rad"]}
            field = 'current_direction'
            subfield = 'mu'
            val = {ambientStore.tabs[id].store['current_direction']['mu']}
          ></AmbientStoreOption>
          <AmbientStoreOption 
            profileID = {id}
            setParameterFunc  = {updateAmbientStoreParam}
            defaultVal = {"psu"}
            optionVals = {["psu","mmho/cm","kg/m3","sigmaT","lb/ft3"]}
            field = 'ambient_salinity'
            subfield = 'mu'
            val = {ambientStore.tabs[id].store['ambient_salinity']['mu']}
          ></AmbientStoreOption>
          <AmbientStoreOption 
            profileID = {id}
            setParameterFunc  = {updateAmbientStoreParam}
            defaultVal = {"C"}
            optionVals = {["C","F"]}
            field = 'ambient_temperature'
            subfield = 'mu'
            val = {ambientStore.tabs[id].store['ambient_temperature']['mu']}
          ></AmbientStoreOption>
          <AmbientStoreOption 
            profileID = {id}
            setParameterFunc  = {updateAmbientStoreParam}
            defaultVal = {"kg/kg"}
            optionVals = {["kg/kg","ppm","ppb","%","col/dl"]}
            field = 'background_concentration'
            subfield = 'mu'
            val = {ambientStore.tabs[id].store['background_concentration']['mu']}
          ></AmbientStoreOption>
          <AmbientStoreOption 
            profileID = {id}
            setParameterFunc  = {updateAmbientStoreParam}
            defaultVal = {"s-1"}
            optionVals = {["s-1","d-1","T90hr","ly/hr","hr-1"]}
            field = 'pollution_decay_rate'
            subfield = 'mu'
            val = {ambientStore.tabs[id].store['pollution_decay_rate']['mu']}
          ></AmbientStoreOption>
          <AmbientStoreOption 
            profileID = {id}
            setParameterFunc  = {updateAmbientStoreParam}
            defaultVal = {"m/s"}
            optionVals = {["m/s","cm/s","ft/s","mph","kts"]}
            field = 'far_field_curr_speed'
            subfield = 'mu'
            val = {ambientStore.tabs[id].store['far_field_curr_speed']['mu']}
          ></AmbientStoreOption>
          <AmbientStoreOption 
            profileID = {id}
            setParameterFunc  = {updateAmbientStoreParam}
            defaultVal = {"deg"}
            optionVals = {["deg","rad","N-deg","N-rad"]}
            field = 'far_field_curr_dir'
            subfield = 'mu'
            val = {ambientStore.tabs[id].store['far_field_curr_dir']['mu']}
          ></AmbientStoreOption>
          <AmbientStoreOption 
            profileID = {id}
            setParameterFunc  = {updateAmbientStoreParam}
            defaultVal = {"m0.67/s2"}
            optionVals = {["m0.67/s2"]}
            field = 'far_field_diff_coeff'
            subfield = 'mu'
            val = {ambientStore.tabs[id].store['far_field_diff_coeff']['mu']}
          ></AmbientStoreOption>
        </Grid>
      </Box>
      {showUnitSwitchWarning()}
      
    </div>
  )
}

export default AmbientStore;