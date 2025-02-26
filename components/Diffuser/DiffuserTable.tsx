import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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
import { Grid, TextField, ThemeProvider } from '@mui/material';
import InputRow from './DiffuserInputRow';
import DiffuserStoreOption from './DiffuserStoreOption';
import { useTheme } from '@mui/material/styles';

const rowSpacing = 1;
const numCols = 19;


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

  const updateDiffuserStoreParam = (field:string,val:string) => {
    console.log(`Diffuser store parameter '${field}' value changed to '${val}'`);
    let newDiffuserTable = { ...diffuserTable };
    newDiffuserTable['store'][field]['value'] = val;
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
    </div>
  )
}

export default DiffuserTable