import { useAppContext } from '@/context/state';
import { Typography, Grid, TextField, MenuItem, Select, SelectChangeEvent, Switch } from '@mui/material';
import * as React from 'react';

type Props = {};

const BrooksFarFieldSettings: React.FC<Props> = () => {

  const { farfieldCoeff, setFarfieldCoeff } = useAppContext();

  const {estimateFarfieldBackground, setEstimateFarfieldBackground} = useAppContext();
  const updateEstimateFarfieldBackground = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEstimateFarfieldBackground(event.target.checked);
  };

  const { outputAllFarfieldTimeIncrements, setOutputAllFarfieldTimeIncrements } = useAppContext();
  const updateOutputAllFarfieldTimeIncrements = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOutputAllFarfieldTimeIncrements(event.target.checked);
  };

  const { farfieldDiffusivity, setFarfieldDiffusivity, farfieldDiffusivityOpts } = useAppContext();
  const updateFarfieldDiffusivity = (event:SelectChangeEvent) => {
    setFarfieldDiffusivity(event.target.value);
  }

  const updateFarfieldCoeff = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFarfieldCoeff(event.target.value);
  }

  return (
    <div>
      <TextField 
        id="ff_increment"
        label="Farfield Increment (m)"
        variant="outlined"
        type="number"
        fullWidth={true}
        value = {farfieldCoeff}
        onChange={updateFarfieldCoeff}
        sx={{paddingBottom:'1em', marginTop:'1em'}}
      />

      {/* Estimate fairfield background */}
      <Grid item xs={12}>
        <Grid
          container
          justifyContent="flex-start"
          spacing={1}
          alignItems="center"
        >
          <Grid item xs={6}>
            <Typography color="text.primary" gutterBottom>
              Estimate far-field background
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Switch 
              inputProps={{ 'aria-label': 'Estimate far-field background' }}
              defaultChecked 
              checked = {estimateFarfieldBackground}
              onChange = {updateEstimateFarfieldBackground}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* Output all fairfield time increments */}
      <Grid item xs={12}>
        <Grid
          container
          justifyContent="flex-start"
          spacing={1}
          alignItems="center"
        >
          <Grid item xs={6}>
            <Typography color="text.primary" gutterBottom>
            Output all far-field time increments
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Switch 
              inputProps={{ 'aria-label': 'Output all fairfield time increments' }}
              defaultChecked 
              checked = {outputAllFarfieldTimeIncrements}
              onChange = {updateOutputAllFarfieldTimeIncrements}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* Farfield diffusivity option */}
      <Grid item xs={12}>
        <Grid
          container
          justifyContent="flex-start"
          spacing={1}
          alignItems="center"
        >
          <Grid item xs={6}>
            <Typography color="text.primary" gutterBottom>
              Far-field diffusivity option
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Select
              inputProps={{ 'aria-label': 'Without label' }}
              labelId="farfield-diffusivity-option-label"
              id="farfield-diffusivity-option"
              value={farfieldDiffusivity}
              // sx={{width: 150}}
              onChange = {updateFarfieldDiffusivity}
            >
              <MenuItem value={"CONSTANT"} key={"CONSTANT"}>constant</MenuItem>
              <MenuItem value={"POWER_4_3"} key={"POWER_4_3"}>4/3rd Power</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Grid>
    </div>
    

  )
}

export default BrooksFarFieldSettings