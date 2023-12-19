import { Button, Grid, SelectChangeEvent, Tooltip } from '@mui/material';
import * as React from 'react';
import GraphAmbient from './GraphAmbient';
import GraphDilution from './GraphDilution';
import GraphElevation from './GraphElevation';
import GraphPlanView from './GraphPlanView';
import { useAppContext } from '@/context/state';
import FileSaver from 'file-saver';
import { useCurrentPng } from 'recharts-to-png';
import DownloadIcon from '@mui/icons-material/Download';

type Props = {
  // elevationRef:  React.MutableRefObject<any>;     
  // ambientPropRef:  React.MutableRefObject<any>;     
  // planViewRef:  React.MutableRefObject<any>;
  // plumesEffDilPredRef:  React.MutableRefObject<any>;
}

const Layout4Panel: React.FC<Props> = ({}) => {

  const { dilutionGraph, planGraphData, ambientGraphData, elevationGraphData, setGraphStyle } = useAppContext();

  // Elevation View Chart
  const [getElevationPng, { ref: elevationRef }] = useCurrentPng();
  const handleElevationDownload = React.useCallback(async () => {
    const png = await getElevationPng();
    if (png) {
      FileSaver.saveAs(png, "elevation-view-chart.png");
    }
  }, [getElevationPng]);

  // Ambient Properties Chart
  const [getAmbientPropPng, { ref: ambientPropRef }] = useCurrentPng();
  const handleAmbientPropDownload = React.useCallback(async () => {
    const png = await getAmbientPropPng();
    if (png) {
      FileSaver.saveAs(png, "ambient-prop-chart.png");
    }
  }, [getAmbientPropPng]);

  // Plan View Chart
  const [getPlanViewPng, { ref: planViewRef }] = useCurrentPng();
  const handlePlanViewDownload = React.useCallback(async () => {
    const png = await getPlanViewPng();
    if (png) {
      FileSaver.saveAs(png, "plan-view-chart.png");
    }
  }, [getPlanViewPng]);

  // Plumes Effective Dilution Prediction Chart
  const [getPlumesEffDilPredPng, { ref: plumesEffDilPredRef }] = useCurrentPng();
  const handlePlumesEffDilPredDownload = React.useCallback(async () => {
    const png = await getPlumesEffDilPredPng();
    if (png) {
      FileSaver.saveAs(png, "effective-dilution-pred-chart.png");
    }
  }, [getPlumesEffDilPredPng]);

  // const handleGraphStyle = (event:SelectChangeEvent) => {
  //   setGraphStyle(event.target.value);
  // }
  
  return (
    <Grid item xs={10}>
      <Grid
        container
        justifyContent="flex-start"
        spacing={1}
      >

        {/* Elevation View */}
        <Grid item xs={6} sx={{ "width": "400px", "height": "400px" }}>

          <h3>
            Elevation View
            <Button sx={{float:"right"}} onClick={handleElevationDownload}>
              <Tooltip title="Download Elevation Chart">
                <DownloadIcon/>
              </Tooltip>
            </Button>
          </h3>
          <GraphElevation
            width        = {500}
            height       = {300} 
            data         = {elevationGraphData}
            saveRef      = {elevationRef}
          />
        </Grid>

        {/* Ambient Properties */}
        <Grid item xs={6} sx={{ "width": "400px", "height": "400px" }}>
          <h3>
            Ambient Properties
            <Button sx={{float:"right"}} onClick={handleAmbientPropDownload}>
              <Tooltip title="Download Ambient Properties Chart">
                <DownloadIcon/>
              </Tooltip>
            </Button>
          </h3>
          <GraphAmbient
            width        = {500}
            height       = {300} 
            data         = {ambientGraphData}
            saveRef      = {ambientPropRef}
          />
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="flex-start"
        spacing={1}
        sx={{marginTop:"2em"}}
      >

        {/* Plan View */}
        <Grid item xs={6} sx={{ "width": "400px", "height": "400px" }}>
          <h3>
            Plan View
            <Button sx={{float:"right"}} onClick={handlePlanViewDownload}>
              <Tooltip title="Download Plan View Chart">
                <DownloadIcon/>
              </Tooltip>
            </Button>
          </h3>
          <GraphPlanView 
            width  = {500}
            height = {300}
            data   = {planGraphData}
            saveRef      = {planViewRef}
          />
        </Grid>

        {/* Plumes Effective Dilution Prediction */}
        <Grid item xs={6} sx={{ "width": "400px", "height": "400px" }}>
          <h3>
            Plumes Effective Dilution Prediction (m)
            <Button sx={{float:"right"}} onClick={handlePlumesEffDilPredDownload}>
              <Tooltip title="Download Plumes Effective Dilution Prediction Chart">
                <DownloadIcon/>
              </Tooltip>
            </Button>
          </h3>
          <GraphDilution 
            width        = {500}
            height       = {300} 
            data         = {dilutionGraph}
            saveRef      = {plumesEffDilPredRef}
          />
        </Grid>
      </Grid>
      {/* <Grid
        container
        justifyContent="flex-start"
        spacing={1}
      >
        <Grid item xs={4} sx={{ "marginTop": "50px" }}>
          <Button variant="text" onClick={handleElevationDownload}>Download Elevation Chart Chart</Button>
        </Grid>
        <Grid item xs={4} sx={{ "marginTop": "50px" }}>
          <Button variant="text" onClick={handleAmbientPropDownload}>Download Ambient Properties Chart</Button>
        </Grid>
        <Grid item xs={4} sx={{ "marginTop": "50px" }}>
          <Button variant="text" onClick={handlePlanViewDownload}>Download Plan View Chart</Button>
        </Grid>
        <Grid item xs={4} sx={{ "marginTop": "50px" }}>
          <Button variant="text" onClick={handlePlumesEffDilPredDownload}>Download Plumes Effective Dilution Prediction Chart</Button>
        </Grid>
      </Grid> */}
    </Grid>
  )
}

export default Layout4Panel;
