import * as React from 'react';
import Typography from '@mui/material/Typography';
import DiffuserTable from './DiffuserTable';
import TimeSeries from '../TimeSeries';
import SpecialSettings from './SpecialSettings';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import DiffuserTimeSeries from './DiffuserTimeSeries';
import AdditionalModelInput from './AdditionalModelInput';
import Paper from '@mui/material/Paper';

const tableWidth = 2100;

type Props = {}

const Diffuser: React.FC<Props> = (props) => {
  return (
    <div style={{width:"100%"}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', maxWidth: 1}}>
        <Typography variant="h5" color="text.primary" gutterBottom>
          Diffuser, Flow, Mixing Zone Inputs
        </Typography>
        <Typography paragraph>
            Enter diffuser, flow, and mixing inputs here. Yes, yes.
        </Typography>
        <Paper 
          style={{maxHeight: 500, overflow: 'scroll', padding: '1em', width: "100%"}} 
        >
          <DiffuserTable 
            tableWidth = {tableWidth}
          />
        </Paper>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <DiffuserTimeSeries />
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default Diffuser