import { useAppContext } from '@/context/state';
import { FormControl, Grid, TextField } from '@mui/material';
import * as React from 'react';

const inputMaxWidth = 70;

/* Interface for input parameters */
type Props = {
  'recordId': number;
  'field': string;
  'val': any;
}

const InputCell: React.FC<Props> = ({recordId,field,val}) => {
  const {diffuserTable, setDiffuserTable, diffuserTimeSeries} = useAppContext();

  const updateInputVal = (event:any) => {
    console.log("Update called!");
    console.log(`Updating diffuser row ${recordId}, field ${field}, with value ${event.target.value}`);
    let newDiffuserTable = { ...diffuserTable };
    for (let i=0; i < newDiffuserTable.data.length; i++) {
      let currDiffuserRow = newDiffuserTable.data[i];
      if (currDiffuserRow.id === recordId) {
        console.log("Row found!");
        newDiffuserTable.data[i][field] = event.target.value;
      }
    }

    setDiffuserTable(newDiffuserTable);
  }

  return (
      <FormControl sx={{ m: 1, width: inputMaxWidth, margin:'0px 3px'  }}>
        <TextField
          // error={false}
          // helperText="Incorrect entry."
          id="outlined-number"
          type={(field === 'port_alias') ? "string" : "number"}
          fullWidth={true}
          InputLabelProps={{
            shrink: true,
          }}
          value={val}
          onChange={updateInputVal}
          disabled={!diffuserTable.store[field]['isEnabled']}
        />
      </FormControl>
  )

}

export default InputCell;