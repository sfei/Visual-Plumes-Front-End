import * as React from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Scatter, ScatterChart, ZAxis } from 'recharts';
// import getClickedPoint from "./getClickedPoint";


type coordinates = {
  x: number;
  y: number;
}

type Props = {
  width: number;
  height: number;
  data: any;
  saveRef: any;
}

// const MIN_ZOOM = 5; // adjust based on your data
// const DEFAULT_ZOOM = { x1: null, y1: null, x2: null, y2: null };

const GraphPlanView: React.FC<Props> = ({width, height, data, saveRef}) => {

  // Example zoom code:
  // https://codesandbox.io/s/recharts-scatter-plot-zoom-and-click-v68gk?file=/src/App.js:2772-2835

  // const [filteredPathData, setFilteredPathData]   = React.useState(data['path']);
  // const [filteredPathvData, setFilteredPathvData] = React.useState(data['pathv']);
  // const [filteredOut1Data, setFilterOut1Data]       = React.useState(data['out1']);
  // const [filteredOut2Data, setFilterOut2Data]       = React.useState(data['out2']);

  // selected data point
  // const [selectedPoint, setSelectedPoint] = React.useState(data[1]);

  // zoom coordinates
  // const [zoomArea, setZoomArea] = React.useState(DEFAULT_ZOOM);
  // flag if currently zooming (press and drag)
  // const [isZooming, setIsZooming] = React.useState(false);
  // flag if zoomed in
  // const isZoomed = filteredPathData?.length !== data['path']?.length || filteredPathvData?.length !== data['pathv']?.length || filteredOut1Data?.length !== data['out1']?.length || filteredOut2Data?.length !== data['out2']?.length;

  // flag to show the zooming area (ReferenceArea)
  // const showZoomBox = isZooming
    // isZooming &&
    // !(Math.abs(zoomArea.x1 - zoomArea.x2) < MIN_ZOOM) &&
    // !(Math.abs(zoomArea.y1 - zoomArea.y2) < MIN_ZOOM);

  // reset the states on zoom out
  // function handleZoomOut() {
  //   setFilteredPathData(data);
  //   setZoomArea(DEFAULT_ZOOM);
  // }

  /**
   * Two possible events:
   * 1. Clicking on a dot(data point) to select
   * 2. Clicking on the plot to start zooming
   */
  // function handleMouseDown(e:any) {
  //   setIsZooming(true);
  //   const { chartX, chartY, xValue, yValue } = e || {};
  //   const clickedPoint = getClickedPoint(chartX, chartY, filteredPathData);

  //   if (clickedPoint) {
  //     setSelectedPoint(clickedPoint);
  //   } else {
  //     // console.log("zoom start");
  //     setZoomArea({ x1: xValue, y1: yValue, x2: xValue, y2: yValue });
  //   }
  // }

  // Update zoom end coordinates
  // function handleMouseMove(e:any) {
  //   if (isZooming) {
  //     // console.log("zoom selecting");
  //     setZoomArea((prev) => ({ ...prev, x2: e?.xValue, y2: e?.yValue }));
  //   }
  // }

  // When zooming stops, update with filtered data points
  // Ignore if not enough zoom
  // function handleMouseUp(e:any) {
  //   if (isZooming) {
  //     setIsZooming(false);
  //     let { x1, y1, x2, y2 } = zoomArea;

  //     if (typeof(x1) !== null && typeof(x2) !== null && typeof(y1) !== null && typeof(y2) !== null) {
  //       // ensure x1 <= x2 and y1 <= y2
  //       if (x1 > x2) [x1, x2] = [x2, x1];
  //       if (y1 > y2) [y1, y2] = [y2, y1];

  //       if (x2 - x1 < MIN_ZOOM || y2 - y1 < MIN_ZOOM) {
  //         // console.log("zoom cancel");
  //       } else {
  //         // console.log("zoom stop");
  //         const dataPointsInRange = filteredPathData.filter(
  //           (d:any) => d.x >= x1 && d.x <= x2 && d.y >= y1 && d.y <= y2
  //         );
  //         setFilteredPathData(dataPointsInRange);
  //         setZoomArea(DEFAULT_ZOOM);
  //       }
  //     }
  //   }
  // }

  return (
    <ResponsiveContainer width="100%" height="100%">

      <ScatterChart
        width={width}
        height={height}
        margin={{
          top: 5,
          right: 30,
          bottom: 30,
          left: 25,
        }}
        ref = {saveRef}
        // onMouseDown={handleMouseDown}
        // onMouseMove={handleMouseMove}
        // onMouseUp={handleMouseUp}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" type="number" name="x" label={{ value:`${data['x_label']} (${data['x_units']})`, offset: 25, position: "bottom"}}/>
        <YAxis dataKey="y" type="number" name="y"  label={{ value:`${data['y_label']} (${data['y_units']})`, angle: -90, position: "left"}}/>
        <ZAxis range={[30, 31]} /> {/* Hack for smaller dots */}
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter name='path' data={data['path']} fill="#8884d8" line />
        <Scatter name='out1' data={data['out1']} fill="#CA472F" line />
        <Scatter name='out2' data={data['out2']} fill="#0B84A5" line />
        <Scatter name='pathv' data={data['pathv']} fill="#FF9F56" line />
      </ScatterChart>

    </ResponsiveContainer>
  )
}

export default GraphPlanView;