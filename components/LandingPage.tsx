import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

type Props = {}

const DeltaImg = () => {
  // Import result is the URL of your image
  return <img src="/CA-Delta.jpg" alt="CA Delta" style={{float:"right",width:"100%"}}/>;
}

const ModelSelect: React.FC<Props> = ({ }) => {
  return (
        <Grid
          container
        >
          <Grid item xs={6} sx={{paddingRight:"1em"}}>
            <Typography variant="h4" sx={{marginBottom:"0.5em"}}>Overview</Typography>
            
            <Typography paragraph>
              Visual Plumes is an open-source, server-based application for simulating jets and plumes in water columns. Such simulations are critical for the preparation of mixing zone analyses, TMDLs, and other water-quality applications.
            </Typography>
            <Typography paragraph>
              The application was originally developed under the stewardship of US EPA, D.J. Baumgartner, Walter Frick, Phillip Roberts, L.R. Davis, J. Keyes, and K.P. George in the 1990s as a Microsoft Windows-based software tool. As of January 2024, the tool now continues as an open-source product, available to all for examination and re-use. Furthermore, you may find a working version of the software in its hosted environment at <a href="https://visualplumes.sfei.org/">visualplumes.sfei.org</a> where it may be used free of charge.
            </Typography>
            <Typography paragraph>
              The tool is a mixing zone modeling system. VP simulates single and merging submerged plumes in arbitrarily stratified ambient flow and buoyant surface discharges. The system offers basic data visualization, time-series input files, user specified units, a conservative tidal background-pollutant build-up capability, a sensitivity analysis capability, and a multi-stressor pathogen decay model that predicts coliform mortality based on temperature, salinity, solar insolation, and water column light absorption.
            </Typography>
            <Typography paragraph>
              VP addresses the issue of model consistency in a unique way by including other models in its suite of models. In this way, it promotes the idea that in the future modeling, consistency will be achieved by recommending particular models in selected flow categories. This approach is intended to encourage the continued improvement of plume models. Consistent with this goal, VP includes the surface discharge model PDS (Davis, 1999), the three-dimensional UM3 model based on UM, and the NRFIELD model based on RSB. These models may be run consecutively and compared graphically to help verify their performance. The Brooks equations are retained to simulate far-field behavior.
            </Typography>
            <Typography paragraph>
              The time-series file-linking capability provides a way to simulate outfall performance over long periods of time. Most effluent and ambient variables can be input from files that store data that change with time. This is the heart of the pollutant-buildup capability, designed for one-dimensional tidal rivers or estuaries to estimate background pollution from the source in question. It is also the basis for utilizing the Progressive Vector Diagram (PVD) approach. The time-series file linking capability is served by &quot;summary&quot; charts that focus on overall performance indicators, like mixing zone dilutions or concentrations. These implementations allow plumes to be depicted in the far-field as individual plumes (for one or two runs) or as concentration &quot;clouds&quot; for many runs. This capability is useful for estimating beach impacts in situations exhibiting simply bathymetries.
            </Typography>

            <Typography variant="h4" sx={{marginBottom:"0.5em"}}>General Guidance</Typography>
            <Typography paragraph>
              Visual Plumes solicits user input to produce results.
            </Typography>
            <Typography paragraph>
              Using the menu on the left, input the values required to run the selected model. You may do so manually or by importing a text file.
            </Typography>
            <Typography paragraph>
              Once your input set is complete, you may run the model, view its results, and download the associated information in a structured format.
            </Typography>
            <Typography paragraph>
              Furthermore, you may <em>Save your project configuration</em> at any time using the menu at the left. This is useful for future reference, since you can then <em>load your Project</em> file via the same menu.
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{marginTop:"3em"}}>
            <DeltaImg/>
            <Typography variant="h6" sx={{float:"right"}}>
              California Delta. Credit: <a href="https://flic.kr/p/snha6v" target="_blank">Formulanone</a>
            </Typography>
          </Grid>
        </Grid>
  )
}

export default ModelSelect