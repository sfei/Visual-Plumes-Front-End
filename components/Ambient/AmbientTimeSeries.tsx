import { Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, MenuItem, TextField, Card, CardContent } from '@mui/material';
import * as React from 'react';
import AmbientTimeSeriesEntry from './AmbientTimeSeriesEntry';
import { useAppContext } from '@/context/state';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Papa from 'papaparse';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

const diffTSPaddingLeft = "6px !important";

type Props = {}

const AmbientTimeSeries: React.FC<Props> = ({ }) => {
  // const {ambientFiles, setAmbientStore, ambientFilesDefault} = useAppContext();

  const {ambientFiles, setAmbientFiles, ambientFilesDefault} = useAppContext();
  const {defaultFileName} = useAppContext();

  const getFileUpload = (field:string) => {
    // console.log(`getFileUpload for ${field}`);
    const handleAmbientFile = (event:any) => {
      console.log(`File uploaded for field "${field}"!`);
      // console.log(event.currentTarget.files);
      // console.log(event.currentTarget.files[0].name);
      let newAmbientFiles = { ...ambientFiles };
      newAmbientFiles[field]['file'] = event.currentTarget.files[0];
      let fileName = event.currentTarget.files[0].name;
      if (fileName.length > 17) {
        fileName = `${fileName.slice(0,14)}...`;
      }
      newAmbientFiles[field]['filename'] = fileName;
      setAmbientFiles(newAmbientFiles);

      /* Update cycling period */
      const reader = new FileReader();
      reader.addEventListener("load", (e:any) => {
        let jsonData = Papa.parse(reader.result as string, { header: true });
        console.log(`jsonData:`);
        console.log(jsonData);
        console.log(`Number of rows in time series file: ${jsonData.data.length}`);

        let newAmbientFiles = { ...ambientFiles };
        newAmbientFiles[field]['cycling_period'] = jsonData.data.length * newAmbientFiles[field]['increment'];
        newAmbientFiles[field]['num_lines_in_file'] = jsonData.data.length;

        setAmbientFiles(newAmbientFiles);

        console.log("Papa json:");
        console.log(jsonData);
      });

      if (event.currentTarget.files.length > 0) {
        reader.readAsText(event.currentTarget.files[0]);
      }

    }
    return (
      <input 
        id       = {`ambient-file-${field}`}
        ref      = {ambientFiles[field]['file_ref']}
        type     = "file"
        onChange = {handleAmbientFile}
        hidden
      />
    )
  }

  const getAmbientTSIncrement = (field:string) => {
    const updateAmbientTSIncrementValue = (event:any) => {
      let newAmbientFiles = { ...ambientFiles };
      newAmbientFiles[field]['increment'] = event.target.value;

      if (newAmbientFiles[field]['num_lines_in_file'] > 0) {
        newAmbientFiles[field]['cycling_period'] = newAmbientFiles[field]['num_lines_in_file'] * event.target.value;
      }
      setAmbientFiles(newAmbientFiles);
    }
    return (
      <TextField
        id="outlined-number"
        type= "number"
        fullWidth={true}
        InputLabelProps={{
          shrink: true,
        }}
        value={ambientFiles[field]['increment']}
        onChange={updateAmbientTSIncrementValue}
      />
    )
  }

  const handleAmbientFileSelectOpt = (field:string, subfield:string, event:SelectChangeEvent) => {
    let tmpAmbientFiles = {... ambientFiles};
    tmpAmbientFiles[field][subfield] = event.target.value;
    setAmbientFiles(tmpAmbientFiles);
  }

  const handleAmbientFileNumericOpt = (field:string, subfield:string, event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let tmpAmbientFiles = {... ambientFiles};
    tmpAmbientFiles[field][subfield] = event.target.value;
    setAmbientFiles(tmpAmbientFiles);
  }

  const resetAmbientTSFile = (field:string) => {

    /* Update Ambient file data structure */
    let tmpAmbientFiles = {...ambientFiles};
    tmpAmbientFiles[field]['file'] = null;
    tmpAmbientFiles[field]['filename'] = defaultFileName;
    tmpAmbientFiles[field]['depth_or_height'] = 'depth';
    tmpAmbientFiles[field]['depth_or_height_units'] = 'm';
    tmpAmbientFiles[field]['increment'] = 1;
    tmpAmbientFiles[field]['cycling_period'] = '';
    tmpAmbientFiles[field]['num_lines_in_file'] = 0;
    tmpAmbientFiles[field]['measurement_unit'] = tmpAmbientFiles[field]['measurement_unit_opts'][0];
    setAmbientFiles(tmpAmbientFiles);

    /* Update Ref */
    let inputRef = ambientFiles[field]['file_ref'];
    if (inputRef.current) {
      inputRef.current.value = ""; 
      // inputFile.current.type = "text"; 
      inputRef.current.type = "file";
    }

    handleClose();
  }
  

  /* Clear time series file dialog variables */
  const [currField, setCurrField] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (field:string) => {
    setCurrField(field);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const getClearAmbTSFileButton = (field:string) => {
    
    return (
      <Button
        onClick={() => {handleClickOpen(field)}}
        variant="contained"
        color="error"
        fullWidth={true}
        sx={{marginTop:"1em"}}
      >
        CLEAR
      </Button>
    )
  }

  return (
    <div style={{width:'100%', marginTop:'1em'}}>
      <Typography variant="h5" color="text.primary" gutterBottom sx={{marginTop:'2em'}}>
        Ambient Time Series Files (optional)
      </Typography>
      <Card elevation={0} sx={{marginBottom:"2em", marginTop:"2em", border:1, borderColor:"grey.400"}}>
        <CardContent>
          <Typography sx={{fontSize:"0.8rem"}}>
            <p>Time series data must have at least two rows. The first row defines the depth layers, listing the depth (or height) values by column. All subsequent rows constitute the values, with each row being the value after one time increment and each column the value at each depth layer. The <em>Time Increment</em>, <em>Depth or Height</em>, <em>Depth Units</em>, and <em>Measurement Units</em> for the Time Series table must be selected in the UI and are not determined by the time series file.</p>
          </Typography>
        </CardContent>
      </Card>
      
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
      >
        {Object.keys(ambientFiles).map((field:any,index:number) => {
          if (field === "depth_or_height") {
            return (<Grid key={field} item xs={2}></Grid>)
          } else {
            return (
              <Grid item key={field} xs={1} sx={{paddingLeft:diffTSPaddingLeft}}>
                <Typography variant="subtitle2" color="text.primary" sx={{minHeight:'1.5rem'}}>
                  {ambientFiles[field].label}
                </Typography>
              </Grid>
            )
          }
        })}
      </Grid>

      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
      >
        {Object.keys(ambientFiles).map((field:any,index:number) => {
          if (field === "depth_or_height") {
            return (<Grid item key={field} xs={2}></Grid>)
          } else {
            return (
              <Grid item xs={1} key={field} sx={{paddingTop:"1em",paddingBottom:"1em",marginTop:"1em", paddingLeft:diffTSPaddingLeft}}>
                <Button 
                  sx={{float:"right"}} 
                  component="label" 
                  variant="contained" 
                  fullWidth={true}
                >
                  Load File
                  {getFileUpload(field)}
                </Button>
              </Grid>
            )
          }
        })}
      </Grid>

      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
      >
        {Object.keys(ambientFiles).map((field:any,index:number) => {
          if (field === "depth_or_height") {
            return (<Grid item key={field} xs={2}>Filename</Grid>)
          } else {
            return (
              <Grid item key={field} xs={1} sx={{paddingLeft:diffTSPaddingLeft}}>{ambientFiles[field]['filename']}</Grid>
            )
          }
        })}
      </Grid>

      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
      >
        {Object.keys(ambientFiles).map((field:any,index:number) => {
          if (field === "depth_or_height") {
            return (<Grid item key={field} xs={2}>Depth or height</Grid>)
          } else {
            return (
              <Grid item key={field} xs={1} sx={{paddingLeft:diffTSPaddingLeft}}>
                <Select
                  inputProps={{ 'aria-label': 'Without label' }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  fullWidth={true}
                  value = {ambientFiles[field]['depth_or_height']}
                  onChange   = {(e) => handleAmbientFileSelectOpt(field, 'depth_or_height', e)}
                >
                  <MenuItem value={"depth"}>depth</MenuItem>
                  <MenuItem value={"height"}>height</MenuItem>
                </Select>
              </Grid>
            )
          }
        })}
      </Grid>

      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
      >
        {Object.keys(ambientFiles).map((field:any,index:number) => {
          if (field === "depth_or_height") {
            return (<Grid item key={field} xs={2}>Depth / height units</Grid>)
          } else {
            return (
              <Grid item key={field} xs={1} sx={{paddingLeft:diffTSPaddingLeft}}>
                <Select
                  inputProps={{ 'aria-label': 'Without label' }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  fullWidth={true}
                  value = {ambientFiles[field]['depth_or_height_units']}
                  onChange   = {(e) => handleAmbientFileSelectOpt(field, 'depth_or_height_units', e)}
                >
                  <MenuItem value={"m"}>meters</MenuItem>
                  <MenuItem value={"ft"}>feet</MenuItem>
                </Select>
              </Grid>
            )
          }
        })}
      </Grid>

      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
      >
        {Object.keys(ambientFiles).map((field:any,index:number) => {
          if (field === "depth_or_height") {
            return (<Grid item key={field} xs={2}>Increment (hrs)</Grid>)
          } else {
            return (
              <Grid item key={field} xs={1} sx={{paddingLeft:diffTSPaddingLeft}}>
                {getAmbientTSIncrement(field)}
                
              </Grid>
            )
          }
        })}
      </Grid>
      
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
      >
        {Object.keys(ambientFiles).map((field:any,index:number) => {
          if (field === "depth_or_height") {
            return (<Grid item key={field} xs={2}>Cycling period (hrs)</Grid>)
          } else {
            return (
              <Grid item xs={1} key={field} sx={{width: 150, paddingLeft:diffTSPaddingLeft}}>
                <TextField
                  id="outlined-number"
                  type={(field === 'port_alias') ? "string" : "number"}
                  fullWidth={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange   = {(e) => handleAmbientFileNumericOpt(field, 'cycling_period', e)}
                  value={ambientFiles[field]['cycling_period']}
                  disabled
                />
              </Grid>
            )
          }
        })}
      </Grid>

      {/* Measurement Unit */}
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
      >
        {Object.keys(ambientFiles).map((field:string,index:number) => {
          if (field === "depth_or_height") {
            return (<Grid item key={field} xs={2}>Measurement unit</Grid>)
          } else {
            return (
              <Grid item key={field} xs={1} sx={{paddingLeft:diffTSPaddingLeft}}>
                <Select
                    inputProps = {{ 'aria-label': 'Without label' }}
                    labelId    = "demo-simple-select-label"
                    id         = "demo-simple-select"
                    onChange   = {(e) => handleAmbientFileSelectOpt(field, 'measurement_unit', e)}
                    value      = {ambientFiles[field]['measurement_unit']}
                    fullWidth={true}
                  >
                    {ambientFiles[field]['measurement_unit_opts'].map((val:string)=>{
                        return <MenuItem value={val} key={val}>{val}</MenuItem>
                    })}
                  </Select>
              </Grid>
            )
          }
        })}
      </Grid>

      {/* Clear */}
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
      >
        {Object.keys(ambientFiles).map((field:string) => {
          if (field === "depth_or_height") {
            return (<Grid item key={field} xs={2}>&nbsp;</Grid>)
          } else {
            // console.log(`Amb ts clear btn field: ${field}`);
            return (
              <Grid item xs={1} key={field} sx={{width: 150, paddingLeft:diffTSPaddingLeft}}>
                {getClearAmbTSFileButton(field)}
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {`Clear ambient time series file?`}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Clear ambient time series file. This will permanently delete associated time series data. This action cannot be undone.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="error"><ClearIcon/> No</Button>
                    <Button onClick={() => {resetAmbientTSFile(currField)}} autoFocus color="success">
                      <CheckIcon/> Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            )
          }
        })}
      </Grid>
    </div>
  )
}

export default AmbientTimeSeries