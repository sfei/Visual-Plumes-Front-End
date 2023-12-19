import * as React from 'react';
import { ResponsiveContainer, ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Scatter, ZAxis } from 'recharts';

type Props = {
  width: number;
  height: number;
  data: any;
  saveRef: any;
}

const GraphAmbient: React.FC<Props> = ({width, height, data, saveRef}) => {
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
        <YAxis dataKey="y" type="number" name="y"  label={{ value:`${data['y_label']} (${data['y_units']})`, angle: -90, position: "left"}} reversed = {true}/>
        <ZAxis range={[30, 31]} /> {/* Hack for smaller dots */}
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter name='ambdensity' data={data['ambdensity']} fill="#8884d8" line shape="triangle"/>
        <Scatter name='density' data={data['density']} fill="#CA472F" line shape="triangle"/>
      </ScatterChart>
    </ResponsiveContainer>
  )
}

export default GraphAmbient;
