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
import { Card, CardContent } from '@mui/material';

const tableWidth = 1370;

type Props = {}

const Diffuser: React.FC<Props> = (props) => {
  return (
    <div style={{width:"100%"}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', maxWidth: 1}}>
        <Typography variant="h5" color="text.primary" gutterBottom>
          Diffuser, Flow, Mixing Zone Inputs
        </Typography>
        <Card elevation={0} sx={{marginBottom:"2em", marginTop:"2em", border:1, borderColor:"grey.400"}}>
          <CardContent>
            <Typography sx={{fontSize:"0.8rem"}}>
              <p>If the <em>Num of Ports</em> is limited to one, the <em>Port Spacing</em> field is not required.</p>
              <p>If Time Series* data are supplied, whether in Diffuser or Ambient settings, the <em>Start Time</em>, <em>End Time</em>, and <em>Time Increment</em> must be provided. Valid values for <em>Start Time</em> begin at 0. <em>End Time</em> values must be positive and equal to or greater than the <em>Start Time</em>. The <em>Time Increment</em> must be a positive, nonzero value.</p>
              <p><em>Port Depth</em>, <em>Effluent Flow</em>, <em>Effluent Salinity</em>, <em>Effluent Tems</em>, and <em>Effluent Cone</em> may be defined in the Time Series table. If this is the case, these values are not required in the Diffuser Table.</p>
              <p>*Time Series data must have at least one valid row, with each subsequent row being the value after one time increment. The time increment and units for time series data must be supplied in the UI and are not needed to be written in the time series file.</p>
            </Typography>
          </CardContent>
        </Card>
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