import { useAppContext } from '@/context/state';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as React from 'react';

type Props = {
  'field': any,
}

const AmbientTimeSeriesEntry: React.FC<Props> = ({field}) => {

  const {ambientFiles, setAmbientFiles} = useAppContext();

  const handleAmbientFile = (event:any) => {
    console.log("File uploaded!");
    console.log(event.currentTarget.files);
    ambientFiles[field] = event.currentTarget.files[0];
    setAmbientFiles(ambientFiles);
  }

  const getCell = (field:any) => {
    if (field === "current_speed") {
      return (
        <div>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}>Filename</Grid>
          <Grid item xs={1}>Depth or height</Grid>
          <Grid item xs={1}>Depth / height units</Grid>
          <Grid item xs={1}>Increment</Grid>
          <Grid item xs={1}>Cycling period</Grid>
          <Grid item xs={1}>Measurement unit</Grid>
        </div>
      );
    } else {
      return (
        <div>
          <Grid item xs={1} sx={{width: 150}}>
            <Button sx={{float:"right"}} component="label">
              Time Series From File
              <input 
                id="ambient-file-1"
                type="file"
                hidden
                onChange={handleAmbientFile}
              />
            </Button>
          </Grid>

          <Grid item xs={1} sx={{width: 150}}>
            Scenario-file-1
          </Grid>

          <Grid item xs={1} sx={{width: 150}}>
            <Select
              inputProps={{ 'aria-label': 'Without label' }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={"depth"}
              sx={{width: 150}}
              // onChange={handleSelection}
            >
              <MenuItem value={"depth"}>depth</MenuItem>
              <MenuItem value={"height"}>height</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={1} sx={{width: 150}}>
            <Select
              inputProps={{ 'aria-label': 'Without label' }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={"meters"}
              sx={{width: 150}}
              // onChange={handleSelection}
            >
              <MenuItem value={"meters"}>meters</MenuItem>
              <MenuItem value={"feet"}>feet</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={1} sx={{width: 150}}>
            <Select
              inputProps={{ 'aria-label': 'Without label' }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={"4hrs"}
              sx={{width: 150}}
              // onChange={handleSelection}
            >
              <MenuItem value={"4hrs"}>4hrs</MenuItem>
              <MenuItem value={"2hrs"}>2hrs</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={1} sx={{width: 150}}>
            <Select
              inputProps={{ 'aria-label': 'Without label' }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={"72hrs"}
              sx={{width: 150}}
              disabled
            >
              <MenuItem value={"72hrs"}>72hrs</MenuItem>
            </Select>
          </Grid>
          
          <Grid item xs={1} sx={{width: 150}}>
            <Select
              inputProps={{ 'aria-label': 'Without label' }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={"m/s"}
              sx={{width: 150}}
              disabled
            >
              <MenuItem value={"m/s"}>m/s</MenuItem>
              <MenuItem value={"deg"}>deg</MenuItem>
            </Select>
          </Grid>
        </div>
      );
    }
  }

  return (
    <div>
      {getCell(field)}
    </div>
  )
}

export default AmbientTimeSeriesEntry