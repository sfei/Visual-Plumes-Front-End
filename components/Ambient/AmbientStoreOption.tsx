import * as React from 'react';
import Grid from '@mui/material/Grid';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl } from '@mui/material';

const inputMaxWidth = 95;
const ambientMargins = '0px';

interface OptionProps {
  profileID: number;
  defaultVal: string;
  optionVals: string[];
  setParameterFunc: any;
  field: string;
  subfield: string;
  val: string;
}

const AmbientStoreOption: React.FC<OptionProps> = ({ profileID, setParameterFunc, defaultVal, optionVals, field, subfield, val }) => {
  const handleSelection = (event:SelectChangeEvent) => {
    setParameterFunc(profileID, field, subfield, event.target.value);
  }

  return (
    <Grid item xs={1}>
      <FormControl sx={{ m: 1, width: inputMaxWidth, margin:ambientMargins }}>
        <Select
          inputProps={{ 'aria-label': 'Without label' }}
          labelId={`ambient-option-${field}-${subfield}-label`}
          id={`ambient-option-${field}-${subfield}-select`}
          defaultValue={defaultVal}
          onChange={handleSelection}
          value = {val}
          fullWidth={true}
        >
          {optionVals.map((val:string)=>{
              return <MenuItem value={val} key={val}>{val}</MenuItem>
          })}
        </Select>
      </FormControl>
    </Grid>
  )
}

export default AmbientStoreOption;