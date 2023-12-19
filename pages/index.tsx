import * as React from 'react';
import { ThemeProvider, createTheme, styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import ModelSelect from '../components/ModelSelect';
import LandingPage from '../components/LandingPage';
import Diffuser from '../components/Diffuser/Diffuser';
import Ambient from '../components/Ambient/Ambient';
import RunAnalysis from '@/components/Analysis/RunAnalysis';

import { AppWrapper, useAppContext } from '../context/state';
import ViewResults from '@/components/Results/ViewResults';
import ConfigMenu from '@/components/ProjectMenu/ProjectMenu';
import ViewTextResults from '@/components/Results/ViewTextResults';
import { purple } from '@mui/material/colors';


const drawerWidth = 240;

const pages = ['Model Selection', 'Diffuser, Flow, Mixing Zone Inputs', 'Ambient Values', 'Run Analysis', 'View Graph Results', 'View Text Results'];

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Header = () => {
  // Import result is the URL of your image
  return <img src="/noun-outfall-25100-FFFFFF.png" alt="Outfall Logo" height="64px" style={{ float: "right" }} />;
}

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  theme.typography.body1 = {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: '0.9rem'
  }
  theme.typography.subtitle2 = {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: '0.9rem',
    fontWeight: 600,
  }
  theme.typography.body2 = {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`
  }
  theme.typography.h4 = {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: '1.5rem',
    fontWeight: 600,
  }
  theme.typography.h5 = {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: '1.1rem',
    fontWeight: 600,
  }
  theme.typography.h6 = {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`
  }


  const [open, setOpen] = React.useState(true);
  const [page, setPage] = React.useState("Main");

  const { hasAnalysisData, setHasAnalysisData } = useAppContext();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getListItem = (text: string) => {

    const handlePageUpdate = () => {
      setPage(text);
    }

    const shouldDisable = () => {
      let disable = false
      console.log(`hasAnalysisData: ${hasAnalysisData}, text: ${text}`);
      if (!hasAnalysisData) {
        if (text === 'View Graph Results' || text === 'View Text Results') {
          disable = true;
        }
      }
      return disable;
    }

    if (page === text) {
      return (
        <ListItem
          key={text}
          disablePadding
          onClick={handlePageUpdate}
          sx={{ backgroundColor: "#6200ee", color: "#fff" }}
        >
          <ListItemButton>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      )
    } else {
      return (
        <ListItem
          key={text}
          disablePadding
          onClick={handlePageUpdate}
        >
          <ListItemButton
          // disabled={!hasAnalysisData && (text === 'View Graph Results' || text === 'View Text Results')}
          // disabled={shouldDisable()}
          >
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      )
    }

  }

  return (
    <AppWrapper>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" open={open} style={{ background: '#6200EE' }}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>

              {(page == "Main") &&
                <Typography variant="h4" noWrap component="div" sx={{ width: "100%" }}>
                  Visual Plumes: Landing Page
                </Typography>}
              {(page === "Model Selection") &&
                <Typography variant="h4" noWrap component="div" sx={{ width: "100%" }}>
                  Visual Plumes: Inputs and Model Selector
                </Typography>}
              {(page === "Diffuser, Flow, Mixing Zone Inputs") &&
                <Typography variant="h4" noWrap component="div" sx={{ width: "100%" }}>
                  Visual Plumes: Scenario Selection and Model Run
                </Typography>}
              {(page === "Ambient Values") &&
                <Typography variant="h4" noWrap component="div" sx={{ width: "100%" }}>
                  Visual Plumes: Scenario Selection and Model Run
                </Typography>}
              {(page === "Run Analysis") &&
                <Typography variant="h4" noWrap component="div" sx={{ width: "100%" }}>
                  Visual Plumes: Run Analysis
                </Typography>}
              {(page === "View Graph Results") &&
                <Typography variant="h4" noWrap component="div" sx={{ width: "100%" }}>
                  Visual Plumes: View Graph Results
                </Typography>}
              {(page === "View Text Results") &&
                <Typography variant="h4" noWrap component="div" sx={{ width: "100%" }}>
                  Visual Plumes: View Text Results
                </Typography>}
              <div style={{ width: "64px", height: "64px" }}>
                <Header />
              </div>


            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
            PaperProps={{
              sx: {
                backgroundColor: "#f6f2fb",
                fontWeight: 600,
              }
            }}
          >
            <DrawerHeader>
              {/* Uncomment below to add branding in upper left box */}
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {pages.map((text, index) => (
                getListItem(text)
              ))}
            </List>
            <Divider />
            <ConfigMenu />
          </Drawer>
          {/* <Main open={open} sx={{ width: `80%` }}> */}
          <Main open={open} sx={{ width: `calc(100% - ${drawerWidth}px)` }}>
            <DrawerHeader />
            {(page === "Main") && <LandingPage />}
            {(page === "Model Selection") && <ModelSelect />}
            {(page === "Diffuser, Flow, Mixing Zone Inputs") && <Diffuser />}
            {(page === "Ambient Values") && <Ambient />}
            {(page === "Run Analysis") && <RunAnalysis />}
            {(page === "View Graph Results") && <ViewResults />}
            {(page === "View Text Results") && <ViewTextResults />}
          </Main>
        </Box>
      </ThemeProvider>
    </AppWrapper>
  );
}
