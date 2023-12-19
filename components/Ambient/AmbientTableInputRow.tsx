import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

/* VP Components */
import AmbientTableInputCell from './AmbientTableInputCell';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useAppContext } from '@/context/state';

type Props = {
  'record': any;
  'id': number;
  'allowDelete': boolean;
};

const AmbientTableInputRow: React.FC<Props> = ({record, id, allowDelete}) => {
  const {ambientStore, setAmbientStore} = useAppContext();

  const deleteRow = (event:any) => {
    console.log(`Deleting row: ${record.id}`);
    let newAmbientStore = { ...ambientStore};
    newAmbientStore.tabs[id].data = newAmbientStore.tabs[id].data.filter((inputRow:any) => inputRow.id !== record.id);

    console.log(newAmbientStore);
    setAmbientStore(newAmbientStore);
  }

  const getAmbTblInputCell = (key:string,value:any) => {
    if (key !== 'key' && key !== 'id') {
      return (
        <AmbientTableInputCell 
          // key={record.id}
          profileId={id}
          rowId={record.id}
          field={key}
          val={value}
        />
      )
    }
  }

  /* Delete Diffuser Row dialog variables */
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid
      container
      justifyContent="flex-start"
      spacing={1}
    >
      <Grid item xs={1}>
        {/* <Button 
            sx={{float:"right"}}
            onClick={deleteRow}
          >
            Delete
          </Button> */}
        <Button
          // onClick={deleteRow}
          onClick={handleClickOpen }
          variant="text"
          color="error"
          disabled={!allowDelete}
          sx={{float:'right'}}
        >
          <HighlightOffIcon/>
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete ambient profile input row?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Delete ambient profile input row. This will permanently delete associated ambient profile input row data. This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error"><ClearIcon/> No</Button>
            <Button onClick={deleteRow} autoFocus color="success">
              <CheckIcon/> Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
      { Object.entries(record).map(([key,value])=>{
        return (
          getAmbTblInputCell(key,value)
        );
      })}
    </Grid>
  )
}

export default AmbientTableInputRow;