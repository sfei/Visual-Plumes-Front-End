import * as React from 'react';
import Grid from '@mui/material/Grid';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// type Props = {};

interface OptionProps {
  defaultVal: string;
  optionVals: string[];
  setParameterFunc: any;
}

const AmbientTableOption: React.FC<OptionProps> = ({ setParameterFunc, defaultVal, optionVals }) => {
  const handleSelection= (event:SelectChangeEvent) => {
    setParameterFunc(event.target.value);
  }

  return (
      <Grid item xs={1}>
        <Select
          inputProps={{ 'aria-label': 'Without label' }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={defaultVal}
          sx={{minWidth: 150}}
          onChange={handleSelection}
          fullWidth={true}
        >
          {optionVals.map((val:string)=>{
              return <MenuItem key={val} value={val}>{val}</MenuItem>
          })}
        </Select>
      </Grid>
  )
}

export default AmbientTableOption;