import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppContext } from '../context/state';
import {
  DataGrid,
  GridColDef,
  GridColumnMenu,
  GridColumnMenuProps,
  GridColumnMenuItemProps,
} from '@mui/x-data-grid';

type Props = {};

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

const columns: GridColDef[] = [
  { 
    field: 'id', 
    headerName: 'ID', 
    // width: 75 
    flex: 1,
  },
  { 
    field: 'diffPortContCoeff', 
    headerName: 'Diffuser Port Contraction Coefficient', 
    type: "singleSelect",
    valueOptions: ['coeff 1', 'coeff 2', 'coeff 3'],
    flex: 1, 
  },
  { 
    field: 'lightAbsCoeff', 
    headerName: 'Light Absporption Coefficient', 
    type: "singleSelect",
    valueOptions: ['coeff 1', 'coeff 2', 'coeff 3'],
    flex: 1, 
  },
  { 
    field: 'farfieldInc', 
    headerName: 'Farfield Increment', 
    type: "singleSelect",
    valueOptions: ['inc 1', 'inc 2', 'inc 3'],
    flex: 1, 
  },
  { 
    field: 'um3Aspiration', 
    headerName: 'UM3 Aspiration Coefficient', 
    type: "singleSelect",
    valueOptions: ['coeff 1', 'coeff 2', 'coeff 3'],
    flex: 1, 
  },
  
]

var rows_init = [
  { 
    id: 1,
    diffPortContCoeff: 'coeff 1', 
    lightAbsCoeff: 'coeff 1', 
    farfieldInc: 'inc 1', 
    um3Aspiration: 'coeff 1',
  },
];

const SpecialSettings: React.FC<Props> = ({ }) => {
  const { specialSettingsRows, setSpecialSettingsRows } = useAppContext();
  const { bacterialModelValue, setBacterialModelValue} = useAppContext();

  const handleBacterialModel = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setBacterialModelValue(event.target.value);
  }

  return (
    <div style={{width:'100%'}}>
      <ThemeProvider theme={theme}>
        <Typography variant="h4" color="text.primary" gutterBottom>
          Additional Model Input
        </Typography>
        <DataGrid
            rows={specialSettingsRows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
        />
        <Typography variant="h6" color="text.primary" gutterBottom>
          Bacterial Model on Solar Radiation Input
        </Typography>
        <FormControl>
          <FormLabel id="bacterial-model-radio-buttons-group-label">Bacterial Model on Solar Radiation Input</FormLabel>
          <RadioGroup
            aria-labelledby="bacterial-model-radio-buttons-group-label"
            defaultValue={bacterialModelValue}
            name="bacterial-model-radio-buttons-group"
            onChange={handleBacterialModel}
          >
            <FormControlLabel value="mancini" control={<Radio />} label="Mancini (1978) coliform model" />
            <FormControlLabel value="coliform" control={<Radio />} label="301(h) TSD (1994) coliform (for saltwater, Eqn B-68)" />
            <FormControlLabel value="enterococcus" control={<Radio />} label="301(h) TSD (1994) enterococcus (for saltwater, Eqn B-69)" />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">PDS sfc. Model Heat Transfer</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="low"
            name="radio-buttons-group"
          >
            <FormControlLabel value="low" control={<Radio />} label="Low" />
            <FormControlLabel value="medium" control={<Radio />} label="Medium" />
            <FormControlLabel value="high" control={<Radio />} label="High" />
          </RadioGroup>
        </FormControl>
      </ThemeProvider>
    </div>
  )
}

export default SpecialSettings