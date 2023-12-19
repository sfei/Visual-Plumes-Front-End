import * as React from 'react';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

/* Tabs imports */
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

/* VP Components */
import AmbientTableInput from './AmbientTableInput';
// import AmbientTableOptions from './AmbientTableOptions';
// import AmbientTableOptionsDG from './AmbientTableOptionsDG';
// import AmbientTimeSeriesOld from './AmbientTimeSeriesOld';
import AmbientTimeSeries from './AmbientTimeSeries';
import AmbientStore from './AmbientStore';
import { useAppContext } from '@/context/state';

const rowSpacing = 2;
// const ambientWidth = 1900;

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

  return (
    <div style={{width:"100%"}}>
      <Typography paragraph>
        Enter ambient values here.
      </Typography>
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

        {ambientStore.tabs.map((profile:any, idx:number)=>{
          return (
            <TabPanel key={profile.id} value={value} index={idx}>
               <div style={{width:ambientWidth, maxHeight: '800px'}}>
                <Box sx={{ marginBottom: rowSpacing, width: ambientWidth, }}>
                  <Grid
                    container
                    justifyContent="flex-start"
                    spacing={1}
                  >
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}>
                      {getDepthOrHeightSelect(profile, idx)}
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="subtitle2" color="text.primary" gutterBottom>
                        Current Speed
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="subtitle2" color="text.primary" gutterBottom>
                        Current Direction
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="subtitle2" color="text.primary" gutterBottom>
                        Ambient Salinity
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="subtitle2" color="text.primary" gutterBottom>
                        Ambient Temperature
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="subtitle2" color="text.primary" gutterBottom>
                        Background Concentration
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="subtitle2" color="text.primary" gutterBottom>
                        Pollution Decay Rate
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="subtitle2" color="text.primary" gutterBottom>
                        Far Field Current Speed
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="subtitle2" color="text.primary" gutterBottom>
                        Far Field Current Direction
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="subtitle2" color="text.primary" gutterBottom>
                        Far Field Diff Coeff
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </div>
              <AmbientStore id={idx} />
              <Divider />
              <AmbientTableInput 
                id={idx}
                addRowFunc={addAmbientInputRow} 
              />
              {getAmbProfileDeleteButton(profile.id)}
              
            </TabPanel>
          )
        })}
        
      </Box>
      <Box sx={{ width: 1 }}>
        <AmbientTimeSeries></AmbientTimeSeries>
      </Box>
    </div>
  )
}

export default Ambient