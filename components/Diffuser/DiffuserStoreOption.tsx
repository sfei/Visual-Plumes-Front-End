import { SelectChangeEvent, Grid, Select, MenuItem, FormControl, Typography, Box } from '@mui/material';
import * as React from 'react';

const inputMaxWidth = 100;

interface OptionProps {
  label: string;
  defaultVal: string;
  optionVals: string[];
  setParameterFunc: any;
  field: string;
  val: string;
  enabled: boolean;
}

const DiffuserStoreOption: React.FC<OptionProps> = ({label, defaultVal, optionVals, setParameterFunc, field, val, enabled}) => {
  const handleSelection = (event:SelectChangeEvent) => {
    setParameterFunc(field,event.target.value);
  }

  const get_ui_element = () => {
    if (field !== 'num_of_ports_test') {
      return (
        <Select
          inputProps={{ 'aria-label': 'Without label' }}
          labelId={`diffuser-option-${field}-label`}
          id={`diffuser-option-${field}-select`}
          defaultValue={defaultVal}
          fullWidth={true}
          onChange={handleSelection}
          value = {val}
          disabled={enabled === true ? false : true}
        >
          {optionVals.map((val:string)=>{
              return <MenuItem value={val} key={val}>{val}</MenuItem>
          })}
        </Select>
      )
    } else {
      return (
        <Box sx={{ width: '100%' }} />
      )
    }
  }

  return (
    // <div style={{width:'110px'}}>
    // <div>
      // <Grid item xs={1} sx={{width:inputMaxWidth}}>
        <FormControl sx={{ m: 1, width: inputMaxWidth }}>
        {/* <FormControl sx={{ m: 1, minWidth: inputMaxWidth }}> */}
          <Typography variant="subtitle2" color="text.primary" sx={{minHeight:'2rem'}} gutterBottom>
            {label}
          </Typography>
          {get_ui_element()}
        </FormControl>
      // </Grid>
    // </div>
  )
}

export default DiffuserStoreOption