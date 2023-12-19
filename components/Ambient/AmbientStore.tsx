import * as React from 'react';
import { useAppContext } from '@/context/state';
import { Box, Button, Grid, Select } from '@mui/material';
import AmbientStoreOption from './AmbientStoreOption';


const rowSpacing = 2;

type Props = {
  'id': number,
};

const AmbientStore: React.FC<Props> = ({id}) => {
  const {ambientWidth, numAmbientCols} = useAppContext();
  const {ambientStore, setAmbientStore, ambientInputTemplate} = useAppContext();

  const updateAmbientStoreParam = (profileID:number, field:string, subfield:string, val:string) => {
    console.log("updateAmbientStoreParam ambientStore value:");
    console.log(ambientStore);

    let newAmbientStore = { ...ambientStore};
    newAmbientStore.tabs[profileID].store[field][subfield] = val;
    setAmbientStore(newAmbientStore);
  }

  return (
    <div style={{width:ambientWidth}}>

      {/* Extrapolation (sfc) */}
      <Box sx={{ marginBottom: rowSpacing, width: ambientWidth }}>
        <Grid
          container
          columns={numAmbientCols}
          // direction="row"
          justifyContent="flex-start"
          // alignItems="center"
          spacing={1}
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
            optionVals = {["m/s","cm/s","kt","mph","ft/s"]}
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
            optionVals = {["m/s","cm/s","ft/s","mph","kt"]}
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
      
    </div>
  )
}

export default AmbientStore;