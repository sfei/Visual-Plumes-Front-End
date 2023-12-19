import * as React from 'react';
import { useAppContext } from '@/context/state';
import { Grid, Typography, Switch, TextField, FormControlLabel } from '@mui/material';

type Props = {};

const OutputGraphOptions: React.FC<Props> = () => {

  const { elevationProjPlane, setElevationProjPlane } = useAppContext();
  const updateElevationProjPlane = (event: React.ChangeEvent<HTMLInputElement>) => {
    setElevationProjPlane(event.target.value);
  };

  const { useShoreVector, setUseShoreVector } = useAppContext();
  const updateUseShoreVector = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUseShoreVector(event.target.checked);
  }

  const { distToShore, setDistToShore } = useAppContext();
  const updateDistToShore = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDistToShore(event.target.value);
  };

  const { dirToShore, setDirToShore } = useAppContext();
  const updateDirToShore = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDirToShore(event.target.value);
  };

  return (
    <Grid
      container
      justifyContent="flex-start"
      spacing={1}
      alignItems="center"
    >
      <Grid item xs={12}>
        <Typography variant="h5" color="text.primary" sx={{'marginTop': '1em'}} gutterBottom>Output Graph Options</Typography>
      </Grid>

      {/* <Grid item xs={12}>
        <Typography variant="h6" color="text.primary" sx={{'marginTop': '1em'}} gutterBottom>Shore vector (m, deg)</Typography>
      </Grid> */}

      <Grid item xs={3}>
        <Grid
          container
          justifyContent="flex-start"
          spacing={1}
          alignItems="center"
        >
          <Grid item xs={12}>
            <TextField
              id="outlined-number"
              type="number"
              label="Elevation Projection Plane (deg)"
              variant="outlined"
              fullWidth={true}
              value={elevationProjPlane}
              onChange={updateElevationProjPlane}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* Use Shore Vector */}
      <Grid item xs={3}>
        <Grid
          container
          justifyContent="flex-start"
          spacing={1}
          alignItems="center"
        >
          <Grid item xs={12}>
            <FormControlLabel 
              control={
              <Switch 
                inputProps={{ 'aria-label': 'Use shore vector' }}
                defaultChecked 
                checked = {useShoreVector}
                onChange = {updateUseShoreVector}
              />
              } 
              label="Use shore vector"
              labelPlacement="start"
            />
          </Grid>
        </Grid>
      </Grid>

      {/* Distance to shore */}
      {useShoreVector && <Grid item xs={3}>
        <Grid
          container
          justifyContent="flex-start"
          spacing={1}
          alignItems="center"
        >
          <Grid item xs={12}>
            <TextField
              id="outlined-number"
              label="Distance to Shore (m)"
              variant="outlined"
              type="number"
              fullWidth={true}
              value={distToShore}
              onChange={updateDistToShore}
            />
          </Grid>
        </Grid>
      </Grid>}

      {/* Direction to shore */}
      {useShoreVector && <Grid item xs={3}>
        <Grid
          container
          justifyContent="flex-start"
          spacing={1}
          alignItems="center"
        >
          <Grid item xs={12}>
            <TextField
              id="outlined-number"
              label="Direction to Shore (deg)"
              variant="outlined"
              type="number"
              InputProps={{ inputProps: { min: -360, max: 360 } }}
              fullWidth={true}
              value={dirToShore}
              onChange={updateDirToShore}
            />
          </Grid>
        </Grid>
      </Grid>}

    </Grid>
  )
}

export default OutputGraphOptions