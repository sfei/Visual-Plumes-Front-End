import * as React from 'react';
// import convert from '../ConvertVP';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridColumnMenu,
  GridColumnMenuProps,
  GridColumnMenuItemProps,
  GridRowModel,
} from '@mui/x-data-grid';
import { useAppContext } from '../../context/state';
import { ThemeProvider } from '@mui/material';
import InputRow from './DiffuserInputRow';
import DiffuserStoreOption from './DiffuserStoreOption';
import { useTheme } from '@mui/material/styles';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const convert = require('../ConvertVP');

const rowSpacing = 1;
const numCols = 19;

const unsupportedUnits = ["mmho/cm", "psu", "ly/hr"];


declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: React.CSSProperties['color'];
    };
  }

  interface Palette {
    neutral: Palette['primary'];
  }

  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }

  interface PaletteColor {
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }

  interface ThemeOptions {
    status: {
      danger: React.CSSProperties['color'];
    };
  }
}

type Props = {
  tableWidth: number;
}

function CustomUserItem(props: GridColumnMenuItemProps) {
  const { myCustomHandler, myCustomValue } = props;
  return (
    <MenuItem onClick={myCustomHandler}>
      <ListItemIcon>
        <SettingsApplicationsIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>{myCustomValue}</ListItemText>
    </MenuItem>
  );
}

function CustomColumnMenu(props: GridColumnMenuProps) {
  return (
    <GridColumnMenu
      {...props}
      slots={{
        // Add new item
        columnMenuUserItem: CustomUserItem,
      }}
      slotProps={{
        columnMenuUserItem: {
          // set `displayOrder` for the new item
          displayOrder: 15,
          // Additional props
          myCustomValue: 'Choose Units',
          // myCustomHandler: () => alert('Custom handler fired'),
        },
      }}
    />
  );
}

const DiffuserTable: React.FC<Props> = ({ tableWidth }) => {
  const { diffuserStore, setDiffuserStore } = useAppContext();
  const { diffuserRows, setDiffuserRows } = useAppContext();
  const { diffuserTable, setDiffuserTable, diffuserInputTemplate } = useAppContext();
  const { diffuserUnitSwitcher, setDiffuserUnitSwitcher } = useAppContext();

  const [currField, setCurrField] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const addDiffuserInputRow = () => {
    console.log("Adding new diffuser row...");
    let newDiffuserTable = { ...diffuserTable };
    newDiffuserTable.currInputID += 1;

    /* Copy Diffuser Input row template, update id and alias */
    let newDiffuserInputRow = { ...diffuserInputTemplate };
    newDiffuserInputRow.id = newDiffuserTable.currInputID;
    newDiffuserInputRow.port_alias = `Port ${newDiffuserInputRow.id}`;
    
    newDiffuserTable.data.push(newDiffuserInputRow);

    setDiffuserTable(newDiffuserTable);
  }

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

  const updateDiffuserStoreParam = (field:string,val:string) => {

    /* Get new diffuser table */
    let newDiffuserTable = { ...diffuserTable };

    /* Store old unit value */
    let old_unit_val = diffuserTable['store'][field]['value'];

    /* Update diffuser store value */
    newDiffuserTable['store'][field]['value'] = val;

    console.log(`In diffuser store param update.`);

    /* Check if unit conversion is supported, iterate field values if so */
    // if (val === "mmho/cm" || val === "psu" || val === "ly/hr") {
    if (unsupportedUnits.includes(val) || unsupportedUnits.includes(old_unit_val)) {
      if (unsupportedUnits.includes(val)) {
        setCurrField(val);
      } else if (unsupportedUnits.includes(old_unit_val)) {
        setCurrField(old_unit_val);
      }
      handleOpen();
    } else {
      console.log(`old_unit_val: ${old_unit_val}`);
      console.log(`val: ${val}`);
      if (convert().possibilities().includes(old_unit_val)) {
        if (convert().from(old_unit_val).possibilities().includes(val)) {
          for (let i=0; i < newDiffuserTable.data.length; i++) {
            let currInputCellValue = newDiffuserTable.data[i][field];
            console.log(`currInputCellValue: ${currInputCellValue}`);
            if (currInputCellValue !== "") {
              newDiffuserTable.data[i][field] = convert(currInputCellValue).from(old_unit_val).to(val);
            }
          }
        }
      }
    }

    /* Set diffuser table */
    setDiffuserTable(newDiffuserTable);
  }

  const getDiffuserStoreOption = (field:string,options:any) => {
    if (field !== 'key' && field !== 'id') {
      return (
        <DiffuserStoreOption
          label={options['label']}
          defaultVal={options['default']}
          optionVals={options['options']}
          setParameterFunc={updateDiffuserStoreParam}
          field={field}
          val={options['value']}
          enabled={options['isEnabled']}
        />
      )
    }
  }

  const tableTheme = useTheme();
  tableTheme.typography.body1 = {
    fontSize: '0.8rem'
  }
  tableTheme.typography.subtitle2 = {
    fontSize: '0.8rem'
  }
  // theme.components.MuiFormControl = {
  //   margin: '5px'
  // }
  
  return (
    <div style={{width:tableWidth}}>
      <ThemeProvider theme={tableTheme}>
        <Box sx={{ width: '100%', marginBottom: rowSpacing, marginLeft:'64px' }}>
          <Grid
            container
            columns={numCols}
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
          >
            {Object.entries(diffuserTable.store).map(([key,value])=>{
                return getDiffuserStoreOption(key,value);
            })}
          </Grid>
        </Box>

        <Box sx={{ width: '100%', marginBottom: rowSpacing }}>
          <Grid
            container
            columns={numCols}
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
          >
            {diffuserTable.data.map((inputRow:any)=>{
              // console.log(inputRow);
              return (
                <InputRow
                  key         = {inputRow.id}
                  record      = {inputRow}
                  allowDelete = {(diffuserTable.data.length > 1)}
                />
              )
            })}

          </Grid>
        </Box>
        
          
        <Box>
          <Button 
            variant = "contained"
            onClick={addDiffuserInputRow}
          >
            Add Row
          </Button>
        </Box>
      </ThemeProvider>
      {showUnitSwitchWarning()}
    </div>
  )
}

export default DiffuserTable