import * as React from 'react';
import { useAppContext } from '@/context/state';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from 'recharts';
import { Label } from '@mui/icons-material';

type Props = {
  width: number;
  height: number;
  data: any;
  saveRef: any;
}

const GraphDilution: React.FC<Props> = ({width, height, data, saveRef}) => {

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart
        width={width}
        height={height}
        margin={{
          top: 5,
          right: 30,
          bottom: 50,
          left: 25,
        }}
        ref = {saveRef}
      >
        <CartesianGrid strokeDasharray="3 3" />
        {/* <XAxis dataKey="x" type="number" name="x" unit={data['x_units']}/> */}
        <XAxis dataKey="x" type="number" name="x" label={{ value:`${data['x_label']} (${data['x_units']})`, offset: 25, position: "bottom"}}/>

        <YAxis dataKey="y" type="number" name="y"  label={{ value:`${data['y_label']}`, angle: -90, position: "left"}}/>
        <ZAxis range={[30, 31]} /> {/* Hack for smaller dots */}
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter name='dilution' data={data['dilution']} fill="#8884d8" line />
        <Scatter name='cldilution' data={data['cldilution']} fill="#CA472F" line />
      </ScatterChart>
    </ResponsiveContainer>
  )
}

export default GraphDilution;