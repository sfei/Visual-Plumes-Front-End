import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  DataGrid,
  GridColDef,
  GridColumnMenu,
  GridColumnMenuProps,
  GridColumnMenuItemProps,
} from '@mui/x-data-grid';
import { useAppContext } from '../context/state';

type Props = {};

var rowID = 1;

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

const columns: GridColDef[] = [
  { 
    field: 'id', 
    headerName: 'ID', 
    // width: 75 
    flex: 1,
    editable: true,
  },
  { 
    field: 'portDepth', 
    headerName: 'Port Depth', 
    type: "number",
    flex: 1, 
    editable: true,
  },
  { 
    field: 'effFlow', 
    headerName: 'Effluent Flow', 
    type: "number",
    flex: 1, 
    editable: true,
  },
  { 
    field: 'effSalinity', 
    headerName: 'Effluent Salinity', 
    type: "number",
    flex: 1, 
    editable: true,
  },
  { 
    field: 'effTemp', 
    headerName: 'Effluent Temp', 
    type: "number",
    flex: 1, 
    editable: true,
  },
  { 
    field: 'effConc', 
    headerName: 'Effluent Concentration', 
    type: "number",
    flex: 1, 
    editable: true,
  },
  
]

const SpecialSettings: React.FC<Props> = ({ }) => {

  const { timeseriesRows, setTimeseriesRows } = useAppContext();

  const handleAddRow = () => {
    let new_row = {
        id: ++rowID,
    }
    
    let new_rows = structuredClone(timeseriesRows);
    new_rows.push(new_row);
    setTimeseriesRows(new_rows);
  };

  return (
    <div style={{width:'100%'}}>
      <ThemeProvider theme={theme}>
        
          <Typography variant="h4" color="text.primary" gutterBottom>
            Time Series (optional)
          </Typography>
          <DataGrid
              rows={timeseriesRows}
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
          <Button 
            onClick={handleAddRow}
          >
            Add Row
          </Button>
      </ThemeProvider>
    </div>
  )
}

export default SpecialSettings