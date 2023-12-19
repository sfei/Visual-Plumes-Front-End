import { useAppContext } from '@/context/state';
import { Button, Grid } from '@mui/material';
import { Tooltip as MuiTooltip } from '@mui/material';
import * as React from 'react';
import { ResponsiveContainer, ScatterChart, CartesianGrid, XAxis, YAxis, ZAxis, Tooltip, Legend, Scatter } from 'recharts';
import FileSaver from 'file-saver';
import { useCurrentPng } from 'recharts-to-png';
import DownloadIcon from '@mui/icons-material/Download';

type Props = {}

const LayoutDilution: React.FC<Props> = ({}) => {
  const { dilutionFullPanelGraphData } = useAppContext();

  // Dilution View Chart
  const [getDilutionPng, { ref: dilutionRef }] = useCurrentPng();
  const handleDilutionDownload = React.useCallback(async () => {
    console.log('Dilution download initiated...');
    const png = await getDilutionPng();
    if (png) {
      FileSaver.saveAs(png, "dilution-chart.png");
    }
  }, [getDilutionPng]);

  return (
    <Grid item xs={10}>
      <Grid
        container
        justifyContent="flex-start"
        spacing={1}
      >
        <Grid item xs={12} sx={{ "width": "1000px", "height": "800px" }}>
          <h3>
            Dilution
            <Button sx={{float:"right"}} onClick={handleDilutionDownload}>
              <MuiTooltip title="Download Dilution Chart">
                <DownloadIcon/>
              </MuiTooltip>
            </Button>
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              width  = {1000}
              height = {1000}
              margin = {{
                top: 5,
                right: 30,
                bottom: 50,
                left: 25,
              }}
              ref = {dilutionRef}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" type="number" name="x" label={{ value:`${dilutionFullPanelGraphData['x_label']}`, offset: 25, position: "bottom"}}/>
              <YAxis dataKey="y" type="number" name="y"  label={{ value:`${dilutionFullPanelGraphData['y_label']}`, angle: -90, position: "left"}}/>
              <ZAxis range={[30, 31]} /> {/* Hack for smaller dots */}
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter name='enddilution' data={dilutionFullPanelGraphData['enddilution']} fill="#8884d8" line />
              <Scatter name='mzdilution' data={dilutionFullPanelGraphData['mzdilution']} fill="#0B84A5" line />
            </ScatterChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LayoutDilution;
