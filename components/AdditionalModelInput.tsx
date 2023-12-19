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

      <Typography variant="h5" color="text.primary" gutterBottom>Additional Model Input</Typography>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
        sx={{marginTop: '1em'}}
      >
        <Grid item xs={6} sx={{width: 150}}>
          <TextField
            id="outlined-number"
            label="Diffuser Port Contraction Coefficient"
            variant="outlined"
            type="number"
            fullWidth={true}
            value={diffPortContCoeff}
            onChange = {updateDiffPortContCoeff}
          />
        </Grid>
        <Grid item xs={6} sx={{width: 150}}>
          <TextField
            id="outlined-number"
            label="Light Absorption Coefficient"
            variant="outlined"
            type="number"
            fullWidth={true}
            value = {lightAbsorpCoeff}
            onChange={updateLightAbsorpCoeff}
          />
        </Grid>
        
        <Grid item xs={6} sx={{width: 150, marginTop: '0.5em'}}>
          <TextField
            id="outlined-number"
            label="UM3 Aspiration Coefficient"
            variant="outlined"
            type="number"
            fullWidth={true}
            value = {um3AspCoeff}
            onChange={updateUm3AspCoeff}
          />
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="flex-start"
        spacing={1}
        sx={{marginTop: "1em"}}
      >
        <Grid item xs={6}>
          <Typography variant="h5" color="text.primary" gutterBottom>
            Bacterial Model
          </Typography>
          <FormControl>
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

          <Typography variant="h5" color="text.primary" gutterBottom>
            Equation of State
          </Typography>
          <FormControl>
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

          <Typography 
            variant="h5" 
            color="text.primary" 
            gutterBottom
            sx={{marginTop: "1em"}}
          >
            Similarity Profile
          </Typography>
          <FormControl>
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