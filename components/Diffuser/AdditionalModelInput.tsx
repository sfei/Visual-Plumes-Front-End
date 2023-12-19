import { useAppContext } from '@/context/state';
import { Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import * as React from 'react';

type Props = {}

const AdditionalModelInput: React.FC<Props> = ({ }) => {
  const { bacterialModelValue, setBacterialModelValue} = useAppContext();
  const { eqOfState, setEqOfState } = useAppContext();
  const { similarityProfile, setSimilarityProfile } = useAppContext();
  const { diffPortContCoeff, setDiffPortContCoeff } = useAppContext();
  const { lightAbsorpCoeff, setLightAbsorpCoeff } = useAppContext();
  const { farfieldCoeff, setFarfieldCoeff } = useAppContext();
  const { um3AspCoeff, setUm3AspCoeff } = useAppContext();

  const handleBacterialModel = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setBacterialModelValue(event.target.value);
  }

  const handleEqOfState = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setEqOfState(event.target.value);
  }

  const handleSimilarityProfile = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setSimilarityProfile(event.target.value);
  }

  const updateDiffPortContCoeff = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDiffPortContCoeff(event.target.value);
  }
  const updateLightAbsorpCoeff = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLightAbsorpCoeff(event.target.value);
  }
  const updateFarfieldCoeff = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFarfieldCoeff(event.target.value);
  }
  const updateUm3AspCoeff = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUm3AspCoeff(event.target.value);
  }

  const getUM3SpecialSetting = (field:string) => {
    const updateUM3SpecialSetting = (event:any) => {
      console.log(`Setting ${field} set to ${event.target.value}`);
    }
    return (
      <TextField
        id="outlined-number"
        type="number"
        fullWidth={true}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={updateUM3SpecialSetting}
      />
    )
  }

  return (
    <div style={{width:'100%'}}>
      <Typography variant="h4" color="text.primary" gutterBottom>
        Additional Model Input
      </Typography>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={3} sx={{width: 150}}>Diffuser Port Contraction Coefficient</Grid>
        <Grid item xs={3} sx={{width: 150}}>Light Absorption Coefficient</Grid>
        <Grid item xs={3} sx={{width: 150}}>Farfield Increment (m)</Grid>
        <Grid item xs={3} sx={{width: 150}}>UM3 Aspiration Coefficient</Grid>
      </Grid>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={3} sx={{width: 150}}>
          <TextField
            id="outlined-number"
            type="number"
            fullWidth={true}
            InputLabelProps={{
              shrink: true,
            }}
            value={diffPortContCoeff}
            onChange = {updateDiffPortContCoeff}
          />
        </Grid>
        <Grid item xs={3} sx={{width: 150}}>
          <TextField
            id="outlined-number"
            type="number"
            fullWidth={true}
            InputLabelProps={{
              shrink: true,
            }}
            value = {lightAbsorpCoeff}
            onChange={updateLightAbsorpCoeff}
          />
        </Grid>
        <Grid item xs={3} sx={{width: 150}}>
          <TextField
            id="outlined-number"
            type="number"
            fullWidth={true}
            InputLabelProps={{
              shrink: true,
            }}
            value = {farfieldCoeff}
            onChange={updateFarfieldCoeff}
          />
        </Grid>
        <Grid item xs={3} sx={{width: 150}}>
          <TextField
            id="outlined-number"
            type="number"
            fullWidth={true}
            InputLabelProps={{
              shrink: true,
            }}
            value = {um3AspCoeff}
            onChange={updateUm3AspCoeff}
          />
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="flex-start"
        // alignItems="center"
        // alignItems="top"
        spacing={1}
      >
        <Grid item xs={6}>
          <Typography variant="h6" color="text.primary" gutterBottom>
            Bacterial Model
          </Typography>
          <FormControl>
            <FormLabel id="bacterial-model-radio-buttons-group-label">Bacterial Model</FormLabel>
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

        </Grid>
        <Grid item xs={6}>

          <Typography variant="h6" color="text.primary" gutterBottom>
            Equation of State
          </Typography>
          <FormControl>
            <FormLabel id="equation-of-state-radio-buttons-group-label">Equation of State</FormLabel>
            <RadioGroup
              aria-labelledby="equation-of-state-radio-buttons-group-label"
              defaultValue={eqOfState}
              name="equation-of-state-radio-buttons-group"
              onChange={handleEqOfState}
            >
              <FormControlLabel value="S_T" control={<Radio />} label="S, T" />
              <FormControlLabel value="p_S-T" control={<Radio />} label="p, S, T" />
            </RadioGroup>
          </FormControl>

          <Typography variant="h6" color="text.primary" gutterBottom>
            Similarity Profile
          </Typography>
          <FormControl>
            <FormLabel id="similarity-profile-radio-buttons-group-label">Similarity Profile</FormLabel>
            <RadioGroup
              aria-labelledby="similarity-profile-radio-buttons-group-label"
              defaultValue={similarityProfile}
              name="similarity-profile-radio-buttons-group"
              onChange={handleSimilarityProfile}
            >
              <FormControlLabel value="default" control={<Radio />} label="Default profile (k=2.0, …)" />
              <FormControlLabel value="power" control={<Radio />} label="3/2 power profile (k=3.89, …)" />
              <FormControlLabel value="gaussian" control={<Radio />} label="Gaussian profile" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      
    </div>
  )
}

export default AdditionalModelInput