import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField  from '@mui/material/TextField';
import { useAppContext } from '@/context/state';

type Props = {
  'profileId': number,
  'rowId': number,
  'field':string,
  'val':any
};

const AmbientTableInputCell: React.FC<Props> = ({profileId,rowId,field,val}) => {
  const {ambientStore, setAmbientStore, ambientFiles} = useAppContext();
  const updateAmbientInputVal = (event:any) => {
    console.log("Updating input value...");
    let newAmbientStore = { ...ambientStore};

    console.log(newAmbientStore);

    for (let i=0; i < newAmbientStore.tabs[profileId].data.length; i++){
      let currAmbientRow = newAmbientStore.tabs[profileId].data[i];
      if (currAmbientRow.id === rowId) {
        console.log(`Updating tab: ${profileId}, rowId: ${rowId}, i: ${i}, field: ${field}, value: ${event.target.value}`);
        newAmbientStore.tabs[profileId].data[i][field] = event.target.value;
      }
    }
    setAmbientStore(newAmbientStore);
  }
  return (
      <Grid item xs={1}>
        <TextField
          id="outlined-number"
          type="number"
          value={val}
          onChange={updateAmbientInputVal}
          disabled={(ambientFiles[field].file !== null)}
        />
      </Grid>
  )
}

export default AmbientTableInputCell