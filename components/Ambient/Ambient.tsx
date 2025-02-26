import * as React from 'react';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, ThemeProvider } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

/* Tabs imports */
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

/* VP Components */
import AmbientTableInput from './AmbientTableInput';
import AmbientTimeSeries from './AmbientTimeSeries';
import AmbientStore from './AmbientStore';
import { useAppContext } from '@/context/state';
import { useTheme } from '@mui/material/styles';

const rowSpacing = 0;
// const ambientWidth = 1900;
const inputMaxWidth = 95;
const ambientMargins = '0px';
const numCols = 11;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  console.log(`TabPanel - value: ${value}, index: ${index}`);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
// END ADD CONTENT

type Props = {}

// const Post: React.FC<Props> = ({ post, deletePost }) => {
const Ambient: React.FC<Props> = ({ }) => {
  const {ambientWidth} = useAppContext();
  const {ambientStore, setAmbientStore, ambientStoreProfileTemplate, ambientInputTemplate, ambientTabTemplate} = useAppContext();
  const {selectedAmbientProfileTab, setSelectedAmbientProfileTab} = useAppContext();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const addTab = () => {
    console.log("Add tab clicked.");

    let newTabID = ambientStore.currTabID + 1;

    let newTab = { ...ambientTabTemplate };
    newTab.id = newTabID;
    // newTab.key = newTabID;

    /* Copy Ambient Store, update store and data */
    let newAmbientStore = { ...ambientStore};
    newAmbientStore.tabs.push(newTab);
    newAmbientStore.currTabID = newTabID;
    setAmbientStore(newAmbientStore);

    console.log(newAmbientStore);
  }

  
  /* Delete Ambient Profile tab button */
  const getAmbProfileDeleteButton = (profileID: number) => {
    const deleteTab = (currID:number) => {
      /* Copy store structure */
      let tmpAmbientStore = {... ambientStore};

      /* Filter out deleted tab by ID */
      tmpAmbientStore.tabs = tmpAmbientStore.tabs.filter((tab:any) => tab.id !== currID);

      /* Set current tab to 0 index */
      // tmpAmbientStore.currTab = tmpAmbientStore.tabs[0].id;
      setValue(0);

      /* Update tab store */
      setAmbientStore(tmpAmbientStore);

      handleClose();
    }

    return (
      <Box>
        <Button
          sx={{marginTop: '1em', marginBottom: '1em'}}
          onClick={() => {handleClickOpen(profileID)}}
          variant="contained"
          color="error"
          disabled={ambientStore.tabs.length === 1}
        >
          DELETE AMBIENT CONDITION {profileID}
        </Button>
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
              Delete ambient profile input row. This will permanently delete the current ambient profile tab. This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error"><ClearIcon/> No</Button>
            <Button onClick={() => {deleteTab(currID)}} autoFocus color="success">
              <CheckIcon/> Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    )
  }

  /* Clear time series file dialog variables */
  const [currID, setCurrID] = React.useState(-1);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id:number) => {
    setCurrID(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addAmbientInputRow = (profileID:number) => {
    let newAmbientStore = { ...ambientStore};

    let newAmbientInputRow = { ...ambientInputTemplate };

    /* Increment current input table ID, assign to input row */
    ambientStore.tabs[profileID].currInputID += 1;
    newAmbientInputRow.id = ambientStore.tabs[profileID].currInputID

    newAmbientStore.tabs[profileID].data.push(newAmbientInputRow);

    setAmbientStore(newAmbientStore);
  }

  const getDepthOrHeightSelect = (profile:any, idx:number) => {
    const updateDepthOrHeight = (event:SelectChangeEvent) => {
      let tmpAmbientStore = {...ambientStore};
      tmpAmbientStore.tabs[idx].store['depth_or_height']['z_is_depth'] = event.target.value === "depth";
      setAmbientStore(tmpAmbientStore);
    }
    return (
      <Select
        inputProps={{ 'aria-label': 'Without label' }}
        labelId={`ambient-depth-or-height-label`}
        id={`ambient-depth-or-height`}
        value = {"depth"}
        onChange={updateDepthOrHeight}
        fullWidth={true}
      >
        <MenuItem value="depth" key="depth">Depth</MenuItem>
        <MenuItem value="height" key="height">Height</MenuItem>
      </Select>
    )
  }

  const tableTheme = useTheme();
  tableTheme.typography.body1 = {
    fontSize: '0.8rem'
  }
  tableTheme.typography.subtitle2 = {
    fontSize: '0.8rem'
  }

  return (
    <div style={{width:"100%"}}>
      <Typography variant="h5" color="text.primary" gutterBottom>
        Ambient Condition Values
      </Typography>
      <Card elevation={0} sx={{marginBottom:"2em", marginTop:"2em", border:1, borderColor:"grey.400"}}>
        <CardContent>
          <Typography sx={{fontSize:"0.8rem"}}>
            <p>At least one row of data is required in the Ambient Data Table. All rows must have the <em>Depth or Height</em> field populated with a valid number in order of increasing depth (or decreasing height).</p>
            <p>Unless derived from the Time Series Table, all columns must have at least one valid value. Blank cells will be linearly interpolated if they fall between two specified values and will be extrapolated towards the surface or bottom as specified in the <em>Extrapolation (sfc)</em> and <em>(btm)</em> dropdowns.</p>
            <p><em>Far Field</em> values are only required if <em>Brooks Far Field</em> is selected from the <em>Model Configuration</em> in the <em>Model Selection</em> page.</p>
            <p>If any of the values are provided in the Time Series Table, then the corresponding value in the Ambient Table is not required.</p>
            <p>Time series data must have at least two rows. The first row defines the depth layers, listing the depth (or height) values by column. All subsequent rows constitute the values, with each row being the value after one time increment and each column the value at each depth layer. The <em>Time Increment</em>, <em>Depth or Height</em>, <em>Depth Units</em>, and <em>Measurement Units</em> for the Time Series table must be selected in the UI and are not determined by the time series file.</p>
          </Typography>
        </CardContent>
      </Card>
      
      <Box sx={{ maxWidth: 1, overflow: 'scroll', maxHeight: '800px' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            {ambientStore.tabs.map((profile:any) => {
              return(
                <Tab key={profile.id} label={`Ambient Cond ${profile.id}`} {...a11yProps(0)} />
              );
            })}
            <Tab label="+add" {...a11yProps(2)} onClick={addTab}/>
          </Tabs>
        </Box>
        
        <ThemeProvider theme={tableTheme}>
          {ambientStore.tabs.map((profile:any, idx:number)=>{
            return (
              <TabPanel key={profile.id} value={value} index={idx}>
                <div style={{width:ambientWidth, maxHeight: '800px'}}>
                  <Box sx={{ marginBottom: rowSpacing, width: ambientWidth}}>
                    <Grid
                      container
                      justifyContent="flex-start"
                      spacing={1}
                      columns={numCols}
                    >
                      <Grid item xs={1}></Grid>
                      <Grid item xs={1}>
                        <FormControl sx={{ m: 1, width: inputMaxWidth, margin:ambientMargins  }}>
                          {getDepthOrHeightSelect(profile, idx)}
                        </FormControl>
                      </Grid>
                      <Grid item xs={1}>
                        <FormControl sx={{ m: 1, width: inputMaxWidth, margin:ambientMargins  }}>
                          <Typography variant="subtitle2" color="text.primary" gutterBottom>
                            Current Speed
                          </Typography>
                        </FormControl>
                      </Grid>
                      <Grid item xs={1}>
                        <FormControl sx={{ m: 1, width: inputMaxWidth, margin:ambientMargins  }}>
                          <Typography variant="subtitle2" color="text.primary" gutterBottom>
                            Current Direction
                          </Typography>
                        </FormControl>
                      </Grid>
                      <Grid item xs={1}>
                        <FormControl sx={{ m: 1, width: inputMaxWidth, margin:ambientMargins  }}>
                          <Typography variant="subtitle2" color="text.primary" gutterBottom>
                            Ambient Salinity
                          </Typography>
                        </FormControl>
                      </Grid>
                      <Grid item xs={1}>
                        <FormControl sx={{ m: 1, width: inputMaxWidth, margin:ambientMargins  }}>
                          <Typography variant="subtitle2" color="text.primary" gutterBottom>
                            Ambient Temperature
                          </Typography>
                        </FormControl>
                      </Grid>
                      <Grid item xs={1}>
                        <FormControl sx={{ m: 1, width: inputMaxWidth, margin:ambientMargins  }}>
                          <Typography variant="subtitle2" color="text.primary" gutterBottom>
                            Background Concentration
                          </Typography>
                        </FormControl>
                      </Grid>
                      <Grid item xs={1}>
                        <FormControl sx={{ m: 1, width: inputMaxWidth, margin:ambientMargins  }}>
                          <Typography variant="subtitle2" color="text.primary" gutterBottom>
                            Pollution Decay Rate
                          </Typography>
                        </FormControl>
                      </Grid>
                      <Grid item xs={1}>
                        <FormControl sx={{ m: 1, width: inputMaxWidth, margin:ambientMargins  }}>
                          <Typography variant="subtitle2" color="text.primary" gutterBottom>
                            Far Field Current Speed
                          </Typography>
                        </FormControl>
                      </Grid>
                      <Grid item xs={1}>
                        <FormControl sx={{ m: 1, width: inputMaxWidth, margin:ambientMargins  }}>
                          <Typography variant="subtitle2" color="text.primary" gutterBottom>
                            Far Field Current Direction
                          </Typography>
                        </FormControl>
                      </Grid>
                      <Grid item xs={1}>
                        <FormControl sx={{ m: 1, width: inputMaxWidth, margin:ambientMargins  }}>
                          <Typography variant="subtitle2" color="text.primary" gutterBottom>
                            Far Field Diff Coeff
                          </Typography>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                </div>
                <AmbientStore id={idx} />
                {/* <Divider /> */}
                <AmbientTableInput 
                  id={idx}
                  addRowFunc={addAmbientInputRow} 
                />
                {getAmbProfileDeleteButton(profile.id)}
              </TabPanel>
            )
          })}
          </ThemeProvider>
      </Box>
      <Box sx={{ width: 1 }}>
        <AmbientTimeSeries></AmbientTimeSeries>
      </Box>
    </div>
  )
}

export default Ambient