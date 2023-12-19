import { useAppContext } from '@/context/state';
import { Button, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Typography } from '@mui/material';
import * as React from 'react';
// import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
// const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400},];

// const renderLineChart = (
//   <LineChart width={600} height={300} data={data}>
//     <Line type="monotone" dataKey="uv" stroke="#8884d8" />
//     <CartesianGrid stroke="#ccc" />
//     <XAxis dataKey="name" />
//     <YAxis />
//   </LineChart>
// );
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import GraphDilution from './GraphDilution';
import GraphPlanView from './GraphPlanView';
import GraphElevation from './GraphElevation';
import GraphAmbient from './GraphAmbient';
import Layout4Panel from './Layout4Panel';
import LayoutDilution from './LayoutDilution';
import LayoutConcentration from './LayoutConcentration';
import FileSaver from 'file-saver';
import { useCurrentPng } from 'recharts-to-png';

type Props = {}
const data = [
  {
    name: '0',
    Centerline1: 4000,
    Centerline2: 2400,
    amt: 2400,
  },
  {
    name: '10',
    Centerline1: 3000,
    Centerline2: 1398,
    amt: 2210,
  },
  {
    name: '20',
    Centerline1: 2000,
    Centerline2: 9800,
    amt: 2290,
  },
  {
    name: '30',
    Centerline1: 2780,
    Centerline2: 3908,
    amt: 2000,
  },
  {
    name: '40',
    Centerline1: 1890,
    Centerline2: 4800,
    amt: 2181,
  },
  {
    name: '50',
    Centerline1: 2390,
    Centerline2: 3800,
    amt: 2500,
  },
  {
    name: '60',
    Centerline1: 3490,
    Centerline2: 4300,
    amt: 2100,
  },
  {
    name: '70',
    Centerline1: 3490,
    Centerline2: 4300,
    amt: 2100,
  },
  {
    name: '80',
    Centerline1: 3490,
    Centerline2: 4300,
    amt: 2100,
  },
  {
    name: '90',
    Centerline1: 3490,
    Centerline2: 4300,
    amt: 2100,
  },
  {
    name: '100',
    Centerline1: 3490,
    Centerline2: 4300,
    amt: 2100,
  },
];



const ViewResults: React.FC<Props> = ({ }) => {
  const { hasAnalysisData } = useAppContext();
  const { resultData, setResultData } = useAppContext();
  const { dilutionGraph, planGraphData, ambientGraphData, elevationGraphData } = useAppContext();
  const { graphStyles, graphStyle, setGraphStyle } = useAppContext();

  const handleGraphStyle = (event:SelectChangeEvent) => {
    setGraphStyle(event.target.value);
  }

  return (
    <div>
      {
        !hasAnalysisData &&
        <Typography variant="h5" color="text.primary" gutterBottom>Please run an analysis to see graphs.</Typography>
      }
      { hasAnalysisData &&
      <Grid
        container
        justifyContent="flex-start"
        spacing={1}
      >
        <Grid item xs={2}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Graphic Settings</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              value={graphStyle}
              onChange={handleGraphStyle}
            >
              {Object.keys(graphStyles).map( (key:string) => {
                if (key === "custom") {
                  return <FormControlLabel key={key} value={key} control={<Radio />} label={graphStyles[key]} disabled />
                } else {
                  return <FormControlLabel key={key} value={key} control={<Radio />} label={graphStyles[key]} />
                }
              })}
            </RadioGroup>
          </FormControl>
          <br/><br/>
            
        </Grid>
              
        {/* 4 Panel Graphs */}
        { (graphStyle === "4panel") && <Layout4Panel /> }

        {/* Dilution */}
        { (graphStyle === "dilution") && <LayoutDilution /> }

        {/*Concentration */}
        { (graphStyle === "concentration") && <LayoutConcentration /> }
        
      </Grid>}
    </div>
  );
}

export default ViewResults