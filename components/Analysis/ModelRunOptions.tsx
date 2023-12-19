import { useAppContext } from '@/context/state';
import { Grid, Typography, TextField, Select, MenuItem, Switch, SelectChangeEvent, InputLabel, FormControlLabel } from '@mui/material';
import * as React from 'react';

type Props = {};

const ModelRunOptions: React.FC<Props> = () => {

  const {currentVectorAveraging, setCurrentVectorAveraging} = useAppContext();
  const updateCurrentVectorAveraging = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentVectorAveraging(event.target.checked);
  };

  const { writeStepFreq, setWriteStepFreq } = useAppContext();
  const updateWriteStepFreq = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWriteStepFreq(event.target.value);
  };

  const { maxReverals, setMaxReverals, maxReversalOpts } = useAppContext();
  const updateMaxReverals = (event: SelectChangeEvent) => {
    setMaxReverals(event.target.value);
  };

  const { maxDilutionReported, setMaxDilutionReported } = useAppContext();
  const updateMaxDilutionReported = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxDilutionReported(event.target.value);
  };

  const { stopOnBottomHit, setStopOnBottomHit } = useAppContext();
  const updateStopOnBottomHit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStopOnBottomHit(event.target.checked);
  };

  const { dontStopOnSurfaceHit, setDontStopOnSurfaceHit } = useAppContext();
  const updateDontStopOnSurfaceHit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDontStopOnSurfaceHit(event.target.checked);
  };

  const { allowInducedCurrent, setAllowInducedCurrent } = useAppContext();
  const updateAllowInducedCurrent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAllowInducedCurrent(event.target.checked);
  };


  return (
    <Grid
      container
      justifyContent="flex-start"
      spacing={1}
      alignItems="center"
    >
      <Grid item xs={12}>
        <Typography variant="h5" color="text.primary" sx={{'marginTop': '1em'}} gutterBottom>Model Run Options</Typography>
      </Grid>

      <Grid item xs={6}>
        <Grid
          container
          justifyContent="flex-start"
          spacing={1}
          alignItems="center"
        >
          {/* Output each number of steps */}
          {/* writeStepFreq, setWriteStepFreq */}
          <Grid item xs={12}>
            <Grid
              container
              justifyContent="flex-start"
              spacing={1}
              alignItems="center"
            >
              <Grid item xs={6}>
                <TextField
                  id="outlined-number"
                  label="Output each number of steps"
                  type="number"
                  fullWidth={true}
                  variant="outlined"
                  value={writeStepFreq}
                  onChange={updateWriteStepFreq}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Maximum dilution reported */}
          <Grid item xs={12}>
            <Grid
                container
                justifyContent="flex-start"
                spacing={1}
                alignItems="center"
              >
                <Grid item xs={6}>
                  <TextField
                    id="outlined-number"
                    label="Maximum dilution reported"
                    type="number"
                    variant="outlined"
                    fullWidth={true}
                    value={maxDilutionReported}
                    onChange={updateMaxDilutionReported}
                  />
                </Grid>
            </Grid>
          </Grid>

          {/* Max vertical reversals */}
          <Grid item xs={12}>
            <Grid
              container
              justifyContent="flex-start"
              spacing={1}
              alignItems="center"
            >
              <Grid item xs={6}>
                <InputLabel id="max-reversals-select-label">Max vertical reversals</InputLabel>
                <Select
                  inputProps={{ 'aria-label': 'Without label' }}
                  labelId="max-reversals-select-label"
                  id="max-reversals-select"
                  value={maxReverals}
                  // sx={{width: 150}}
                  onChange = {updateMaxReverals}
                >
                  <MenuItem value={"INITIAL_TRAP_LEVEL"}>Initial trap level</MenuItem>
                  <MenuItem value={"MAX_RISE_OR_FALL"}>Max rise or fall</MenuItem>
                  <MenuItem value={"SECOND_TRAP_LEVEL"}>Second trap level</MenuItem>
                  <MenuItem value={"SECOND_MAX_RISE_OR_FALL"}>Second max rise or fall</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>


      <Grid item xs={6}>
        <Grid
          container
          justifyContent="flex-start"
          spacing={1}
          alignItems="center"
        >

          {/* Stop on bottom hit */}
          <Grid item xs={12}>
            <Grid
              container
              justifyContent="flex-start"
              spacing={1}
              alignItems="center"
            >
              <Grid item xs={9}>
                <FormControlLabel 
                  control={
                    <Switch 
                    inputProps={{ 'aria-label': 'Stop on bottom hit' }}
                    defaultChecked 
                    checked = {stopOnBottomHit}
                    onChange = {updateStopOnBottomHit}
                  />
                  } 
                  label="Stop on bottom hit"
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Do not stop on surface hit */}
          <Grid item xs={12}>
            <Grid
              container
              justifyContent="flex-start"
              spacing={1}
              alignItems="center"
            >
              <Grid item xs={9}>
                <FormControlLabel 
                  control={
                    <Switch 
                      inputProps={{ 'aria-label': 'Do not stop on surface hit' }}
                      defaultChecked 
                      checked = {dontStopOnSurfaceHit}
                      onChange = {updateDontStopOnSurfaceHit}
                    />
                  } 
                  label="Do not stop on surface hit"
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Allow induced current (multiport) */}
          <Grid item xs={12}>
            <Grid
              container
              justifyContent="flex-start"
              spacing={1}
              alignItems="center"
            >
              <Grid item xs={9}>
                <FormControlLabel 
                  control={
                    <Switch 
                      inputProps={{ 'aria-label': 'Allow induced current (multiport)' }}
                      defaultChecked 
                      checked = {allowInducedCurrent}
                      onChange = {updateAllowInducedCurrent}
                    />
                  } 
                  label="Allow induced current (multiport)"
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid
              container
              justifyContent="flex-start"
              spacing={1}
              alignItems="center"
            >
              <Grid item xs={9}>
                <FormControlLabel 
                  control={
                    <Switch 
                      inputProps={{ 'aria-label': 'Estimate fairfield background' }}
                      defaultChecked 
                      checked  = {currentVectorAveraging}
                      onChange = {updateCurrentVectorAveraging}
                    />
                  } 
                  label="Current vector averaging"
                />
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    </Grid>
  )

}

export default ModelRunOptions