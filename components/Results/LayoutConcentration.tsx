import { useAppContext } from '@/context/state';
import { Button, Grid } from '@mui/material';
import * as React from 'react';
import { Tooltip as MuiTooltip } from '@mui/material';
import { ResponsiveContainer, ScatterChart, CartesianGrid, XAxis, YAxis, ZAxis, Tooltip, Legend, Scatter } from 'recharts';
import FileSaver from 'file-saver';
import { useCurrentPng } from 'recharts-to-png';
import DownloadIcon from '@mui/icons-material/Download';

type Props = {}

const LayoutConcentration: React.FC<Props> = ({}) => {

  const { concentrationGraphData } = useAppContext();

  // Concentration View Chart
  const [getConcentrationPng, { ref: concentrationRef }] = useCurrentPng();
  const handleConcentrationDownload = React.useCallback(async () => {
    console.log('Concentration download initiated...');
    const png = await getConcentrationPng();
    if (png) {
      FileSaver.saveAs(png, "concentration-chart.png");
    }
  }, [getConcentrationPng]);

  return (
    <Grid item xs={10}>
      <Grid
        container
        justifyContent="flex-start"
        spacing={1}
      >
        <Grid item xs={12} sx={{ "width": "1000px", "height": "800px" }}>
          <h3>
            Concentration
            <Button sx={{float:"right"}} onClick={handleConcentrationDownload}>
              <MuiTooltip title="Download Concentration Chart">
                <DownloadIcon/>
              </MuiTooltip>
            </Button>
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              width={1000}
              height={1000}
              margin={{
                top: 5,
                right: 30,
                bottom: 50,
                left: 25,
              }}
              ref = {concentrationRef}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" type="number" name="x" label={{ value:`${concentrationGraphData['x_label']}`, offset: 25, position: "bottom"}}/>
              <YAxis dataKey="y" type="number" name="y"  label={{ value:`${concentrationGraphData['y_label']} (${concentrationGraphData['y_units']})`, angle: -90, position: "left"}}/>
              <ZAxis range={[30, 31]} /> {/* Hack for smaller dots */}
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter name='concentration' data={concentrationGraphData['concentration']} fill="#8884d8" line />
              <Scatter name='mzconcentration' data={concentrationGraphData['mzconcentration']} fill="#0B84A5" line />
            </ScatterChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LayoutConcentration;