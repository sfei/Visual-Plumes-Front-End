import { useAppContext } from '@/context/state';
import { Select, MenuItem, Typography, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Card, CardContent } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import Papa from 'papaparse';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

const diffTSPaddingLeft = "6px !important";
type Props = {}

const DiffuserTimeSeries: React.FC<Props> = ({}) => {

  const { diffuserTable, setDiffuserTable } = useAppContext();
  const { diffuserTimeSeries, setDiffuserTimeSeries } = useAppContext();
  const { defaultFileName } = useAppContext();

  /* Upload a file, set appropriate diffuser information */
  const getFileUpload = (field:string) => {

    /* File handler */
    const handleDiffuserFile = (event:any) => {

      /* Add file to approprite file field */
      let newDiffuserTimeSeries = { ...diffuserTimeSeries };
      newDiffuserTimeSeries[field]['file'] = event.currentTarget.files[0];

      /* Add filename to UI for reference */
      let fileName = event.currentTarget.files[0].name;
      if (fileName.length > 17) {
        fileName = `${fileName.slice(0,14)}...`;
      }
      newDiffuserTimeSeries[field]['filename'] = fileName;

      /* Update state */
      setDiffuserTimeSeries(newDiffuserTimeSeries);

      /* Create file reader */
      const reader = new FileReader();

      /* Add event listener for actions post file read */
      reader.addEventListener("load", (e:any) => {

        /* Read file contents as JSON */
        let jsonData = Papa.parse(reader.result as string, { header: true });
        
        /* Calculate cycling period, increment by 1 to account for metadata */
        let newDiffuserTimeSeries = { ...diffuserTimeSeries };
        newDiffuserTimeSeries[field]['time_cycling_period'] = (jsonData.data.length * newDiffuserTimeSeries[field]['increment']) + 1;
        newDiffuserTimeSeries[field]['num_lines_in_file'] = jsonData.data.length;

        /* Update input time related input cells */
        let newDiffuserTable = { ...diffuserTable };
        newDiffuserTable['store']['start_time']['isEnabled'] = true;
        newDiffuserTable['store']['end_time']['isEnabled'] = true;
        newDiffuserTable['store']['time_increment']['isEnabled'] = true;
        if (field==='effluent_concentration'){
          newDiffuserTable['store']['effluent_conc']['isEnabled'] = false;
        } else {
          newDiffuserTable['store'][field]['isEnabled'] = false;
        }
        // newDiffuserTable['store'][field]['isEnabled'] = false;
        setDiffuserTable(newDiffuserTable);
        setDiffuserTimeSeries(newDiffuserTimeSeries);
      });

      /* Read text if a file is present */
      if (event.currentTarget.files.length > 0) {
        reader.readAsText(event.currentTarget.files[0]);
      }
    }
    return (
      <input 
        id       = {`diffuser-file-${field}`}
        type     = "file"
        ref      = {diffuserTimeSeries[field]['file_ref']}
        onChange = {handleDiffuserFile}
        hidden
      />
    )
  }

  /* Diffuser Time Series Increment value */
  const getDiffuserTSIncrement = (field:string) => {
    const updateDiffuserTSIncrementValue = (event:any) => {
      let newDiffuserTimeSeries = { ...diffuserTimeSeries };
      newDiffuserTimeSeries[field]['increment'] = event.target.value;

      if (newDiffuserTimeSeries[field]['num_lines_in_file'] > 0) {
        newDiffuserTimeSeries[field]['time_cycling_period'] = newDiffuserTimeSeries[field]['num_lines_in_file'] * event.target.value;
      }
      setDiffuserTimeSeries(newDiffuserTimeSeries);
    }
    return (
      <TextField
        id="outlined-number"
        type= "number"
        fullWidth={true}
        InputLabelProps={{
          shrink: true,
        }}
        value={diffuserTimeSeries[field]['increment']}
        onChange={updateDiffuserTSIncrementValue}
      />
    )
  }

  const getDiffuserTSMeasurementUnit = (field:string) => {

    const updateDiffuserMeasurementUnit = (event:any) => {
      let newDiffuserTimeSeries = { ...diffuserTimeSeries };
      newDiffuserTimeSeries[field]['measurement_unit'] = event.target.value;
      setDiffuserTimeSeries(newDiffuserTimeSeries);
    }

    return (
      <Select
        inputProps = {{ 'aria-label': 'Without label' }}
        labelId    = "demo-simple-select-label"
        id         = "demo-simple-select"
        value      = {diffuserTimeSeries[field]['measurement_unit']}
        sx={{width: 1}}
        autoWidth  = {false}
        onChange   = {updateDiffuserMeasurementUnit}
      >
        {diffuserTimeSeries[field]['measurement_unit_opts'].map((val:string)=>{
          return <MenuItem value={val} key={val}>{val}</MenuItem>
        })}
      </Select>
    )
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


  const getClearDiffTSFileButton = (field:string) => {    
    return (
        <Button
          onClick={() => {handleClickOpen(field)}}
          variant="contained"
          fullWidth={true}
          color="error"
        >
          CLEAR
        </Button>
    )
  }

  let resetDiffuserTSFile = (field:string) => {
    console.log(`clear diff ts field; ${field}`);
    
    /* Clear state info */
    let tmpDiffuserTimeSeries = {...diffuserTimeSeries};
    tmpDiffuserTimeSeries[field]['file'] = null;
    tmpDiffuserTimeSeries[field]['filename'] = defaultFileName;
    tmpDiffuserTimeSeries[field]['increment'] = 1;
    tmpDiffuserTimeSeries[field]['time_cycling_period'] = '';
    tmpDiffuserTimeSeries[field]['num_lines_in_file'] = 0;
    tmpDiffuserTimeSeries[field]['measurement_unit'] = tmpDiffuserTimeSeries[field]['measurement_unit_opts'][0];
    setDiffuserTimeSeries(tmpDiffuserTimeSeries);

    /* Enable/disable corresponding diffuser field */
    let tmpDiffuserTable = {...diffuserTable};
    if (field==='effluent_concentration'){
      tmpDiffuserTable['store']['effluent_conc']['isEnabled'] = true;
    } else {
      tmpDiffuserTable['store'][field]['isEnabled'] = true;
    }
    setDiffuserTable(tmpDiffuserTable);

    /* Update input values */
    let inputRef = diffuserTimeSeries[field]['file_ref'];
    if (inputRef.current) {
      inputRef.current.value = ""; 
      inputRef.current.type = "file";
    }

    /* Close dialog */
    handleClose();
    
  }

  return (
    <div style={{width:'100%', marginTop: '1.5em'}}>
      <Typography variant="h5" color="text.primary" gutterBottom sx={{marginTop: '2em'}}>
        Diffuser Time Series Files (optional)
      </Typography>
      <Card elevation={0} sx={{marginBottom:"2em", marginTop:"2em", border:1, borderColor:"grey.400"}}>
        <CardContent>
          <Typography paragraph  sx={{fontSize:"0.8rem"}}>
            <p>Time Series data must have at least one valid row, with each subsequent row being the value after one time increment. The time increment and units for time series data must be supplied in the UI and are not needed to be written in the time series file.</p>
          </Typography>
        </CardContent>
      </Card>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
        sx={{marginTop:"1em"}}
      >
        <Grid item xs={2}></Grid>
        <Grid item xs={2} sx={{paddingLeft:diffTSPaddingLeft}}>
          <Typography variant="subtitle2" color="text.primary" sx={{minHeight:'1.5rem'}}>
            Port Depth
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{paddingLeft:diffTSPaddingLeft}}>
          <Typography variant="subtitle2" color="text.primary" sx={{minHeight:'1.5rem'}}>
            Effluent Flow
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{paddingLeft:diffTSPaddingLeft}}>
          <Typography variant="subtitle2" color="text.primary" sx={{minHeight:'1.5rem'}}>
            Effluent Salinity
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{paddingLeft:diffTSPaddingLeft}}>
          <Typography variant="subtitle2" color="text.primary" sx={{minHeight:'1.5rem'}}>
            Effluent Temp
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{paddingLeft:diffTSPaddingLeft}}>
          <Typography variant="subtitle2" color="text.primary" sx={{minHeight:'1.5rem'}}>
            Effluent Concentration
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={2} sx={{paddingLeft:diffTSPaddingLeft}}></Grid>
        {Object.keys(diffuserTimeSeries).map((field:any,index:number) => {
          return (
            <Grid item key={field} xs={2} sx={{paddingTop:"1em",paddingBottom:"1em"}}>
              <Button 
                fullWidth={true}
                component="label" 
                variant="contained"
              >
                Load File
                {getFileUpload(field)}
              </Button>
            </Grid>
          )
        })}
      </Grid>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={2}></Grid>
        {Object.keys(diffuserTimeSeries).map((field:any,index:number) => {
          return (
            <Grid item key={field} xs={2} sx={{paddingLeft:diffTSPaddingLeft}}>
              {diffuserTimeSeries[field]['filename']}
            </Grid>
          )
        })}
      </Grid>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={2}>
          Increment (hrs)
        </Grid>
        {Object.keys(diffuserTimeSeries).map((field:any,index:number) => {
          return (
            <Grid item key={field} xs={2} sx={{paddingLeft:diffTSPaddingLeft}}>
              {getDiffuserTSIncrement(field)}
            </Grid>
          )
        })}
      </Grid>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={2}>
          Cycling period (hrs)
        </Grid>
        {Object.keys(diffuserTimeSeries).map((field:any,index:number) => {
          return (
            <Grid item key={field} xs={2} sx={{paddingLeft:diffTSPaddingLeft}}>
              <TextField
                  id="outlined-number"
                  type={(field === 'port_alias') ? "string" : "number"}
                  fullWidth={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={diffuserTimeSeries[field]['time_cycling_period']}
                  disabled
                />
            </Grid>
          )
        })}
      </Grid>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={2}>
          Measurement unit
        </Grid>
        {Object.keys(diffuserTimeSeries).map((field:any,index:number) => {
          return (
            <Grid item key={field} xs={2} sx={{width: 170, paddingLeft:diffTSPaddingLeft}}>
              {getDiffuserTSMeasurementUnit(field)}
            </Grid>
          )
        })}
      </Grid>

      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={2}>
          &nbsp;
        </Grid>
        {Object.keys(diffuserTimeSeries).map((field:string) => {
          return (
            <Grid item key={field} xs={2} sx={{paddingLeft:diffTSPaddingLeft}}>
              {getClearDiffTSFileButton(field)}
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Delete diffusion input row?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Delete diffusion table input row. This will permanently delete associated diffuser input row data. This action cannot be undone.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="error"><ClearIcon/> No</Button>
                  <Button onClick={() => {resetDiffuserTSFile(currField)}} autoFocus color="success">
                    <CheckIcon/> Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          )
        })}
      </Grid>

    </div>
  )
}

export default DiffuserTimeSeries