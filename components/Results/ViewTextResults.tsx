import { useAppContext } from '@/context/state';
import { Grid, Box, Paper, Typography, Button } from '@mui/material';
import * as React from 'react';

type Props = {};

const ViewTextResults: React.FC<Props> = ({}) => {
  const { textOutput, outputID } = useAppContext();

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([textOutput], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "visual-plumes-output.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  let API_URL = process.env.API_URL;
  if (API_URL === undefined) {
    API_URL = 'http://localhost:3000/app/download_zip_archive';
  } else {
    API_URL = `${API_URL}/download_zip_archive`;
  }
  
  return (
    <div>
      <Grid
        container
        justifyContent="flex-start"
        spacing={1}
      >
        <Grid item xs={2}>
          <Paper style={{maxHeight: 800, width: 1100, overflow: 'scroll', padding: '1em'}}>
            <Box sx={{ display: { xs: 'block', md: 'block', width: '1500px' }}} >
            <Typography
              variant    ="body1"
              style      = {{whiteSpace: 'pre-wrap'}}
              fontFamily = "'Roboto Mono', monospace;"
            >
              {textOutput}
            </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Button variant="contained" onClick={downloadTxtFile} sx={{marginTop:'1em'}}>Download Text</Button>
      <Button variant="contained" href={`${API_URL}/${outputID}`} sx={{marginTop:'1em',marginLeft:'1em'}}>Download CSV Files</Button>
    </div>
  )
}

export default ViewTextResults