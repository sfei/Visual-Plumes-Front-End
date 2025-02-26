import { useAppContext } from '@/context/state';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, TextField } from '@mui/material';
import * as React from 'react';
import InputCell from './DiffuserInputCell';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

/* Interface for input parameters */
type Props = {
  'record': any;
  'allowDelete': boolean;
}

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

/* Input Row module */
const InputRow: React.FC<Props> = ({record, allowDelete}) => {

  const { diffuserTable, setDiffuserTable, diffuserInputTemplate } = useAppContext();

  const deleteRow = (event:any) => {
    console.log("Removing diffuser row...");
    let newDiffuserTable = { ...diffuserTable };
    newDiffuserTable.data = newDiffuserTable.data.filter((inputRecord:any) => inputRecord.id !== record.id);
    setDiffuserTable(newDiffuserTable);
    handleClose();
  }

  const getInputCell = (key:string,value:any) => {
    if (key !== 'key' && key !== 'id') {
      return (
        <InputCell 
          recordId={record.id}
          field={key}
          val={value}
        ></InputCell>
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
    <Box sx={{display: 'flex', alignItems:'center'}}>
      <Button
        onClick={handleClickOpen }
        variant="text"
        color="error"
        disabled={!allowDelete}
      >
        <HighlightOffIcon sx={{width:"24px"}}/>
      </Button>
      {Object.entries(record).map(([key,value])=>{
        return (
          getInputCell(key,value)
        );
      })}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete diffusion input row?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Delete diffusion table input row. This will permanently delete associated diffuser input row data. This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error"><ClearIcon/> No</Button>
          <Button onClick={deleteRow} autoFocus color="success">
            <CheckIcon/> Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default InputRow;