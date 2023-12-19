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

/* VP components */
import { useAppContext } from '../../context/state';
import AmbientTableInputRow from './AmbientTableInputRow';
import { Box, Grid, Paper } from '@mui/material';

type Props = {
  'addRowFunc': any,
  'id': number,
};

const AmbientTableInput2: React.FC<Props> = ({id, addRowFunc}) => {
  const {ambientWidth} = useAppContext();
  const {ambientStore, setAmbientStore, ambientInputTemplate} = useAppContext();

  return (
    <Box style={{width: ambientWidth}}>
      <br/>
      {ambientStore.tabs[id].data.map((record:any) => {
        return(
          <AmbientTableInputRow 
            record={record} 
            id={id} 
            key={record.id} 
            allowDelete={(ambientStore.tabs[id].data.length > 1)}
          />
        )
      })}
      <Box sx={{ width: '100%', marginBottom: 5 }}>
          <Grid
            container
            justifyContent="center"
            spacing={1}
          >
            <Grid item xs={12} justifyContent="center">
              <Button 
                sx={{float:"center"}}
                variant="contained"
                onClick={() => addRowFunc(id)}
              >Add Row</Button>
            </Grid>
          </Grid>
      </Box>
    </Box>
  )
}

export default AmbientTableInput2