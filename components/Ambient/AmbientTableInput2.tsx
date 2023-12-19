import * as React from 'react';
import { createContext, useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

/* UI Elements */
import Button from '@mui/material/Button';
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridColumnMenu,
  GridColumnMenuProps,
  GridColumnMenuItemProps,
  GridRowModel,
} from '@mui/x-data-grid';

/* Custom state and components */
import { useAppContext } from '../../context/state';

/* Theme settings, may want to put elsewhere */
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

/* Row IDs */
var ambientInputRowId = 1;

const ambInputColumns: GridColDef[] = [
  { 
    field: 'id', 
    headerName: 'ID', 
    flex: 0.5,
  },
  {
    field: 'depthOrHeight',
    headerName: "Depth or Height",
    type: 'number',
    flex: 1,
    editable: true,
  },
  {
    field: 'currentSpeed',
    headerName: "Current Speed",
    type: 'number',
    flex: 1,
    editable: false,
  },
  {
    field: 'currentDirection',
    headerName: "Current Direction",
    type: 'number',
    flex: 1,
    editable: false,
  },
  {
    field: 'ambientSalinity',
    headerName: "Ambient Salinity",
    type: 'number',
    flex: 1,
    editable: true,
  },
  {
    field: 'ambientTemperature',
    headerName: "Ambient Temperature",
    type: 'number',
    flex: 1,
    editable: true,
  },
  {
    field: 'pollutionDecayRate',
    headerName: "Pollution Decay Rate",
    type: 'number',
    flex: 1,
    editable: true,
  },
  {
    field: 'farFieldCurrentSpeed',
    headerName: "Far Field Current Speed",
    type: 'number',
    flex: 1,
    editable: true,
  },
  {
    field: 'farFieldCurrentDir',
    headerName: "Far Field Current Dir.",
    type: 'number',
    flex: 1,
    editable: true,
  },
  {
    field: 'farFieldDiffCoeff',
    headerName: "Far Field Diffusion Coefficient",
    type: 'number',
    flex: 1,
    editable: true,
  },
]

type Props = {}

const AmbientTable: React.FC<Props> = ({ }) => {

  const { ambientRows, setAmbientRows } = useAppContext();

  const handleAddRow = () => {
    ambientInputRowId += 1;
    let new_row = {
      id: ambientInputRowId,
    }
    setAmbientRows((rows:GridRowsProp) => [...ambientRows, new_row]);
  }

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setAmbientRows(
      ambientRows.map((row:any) =>
        row.id === newRow.id ? updatedRow : row
      )
    );
    return updatedRow;
  };

 

  return (
    <div style={{width:'100%'}}>
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={ambientRows}
          editMode="cell"
          columns={ambInputColumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5, // TODO: Parameterize
              },
            },
          }}
          pageSizeOptions={[5,10]}
          checkboxSelection
          disableRowSelectionOnClick
          processRowUpdate={processRowUpdate}
        />
        <Button 
            onClick={handleAddRow}
        >
            Add Row
        </Button>
      </ThemeProvider>
    </div>
  )
}

export default AmbientTable