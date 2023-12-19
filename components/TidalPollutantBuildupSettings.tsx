import { useAppContext } from '@/context/state';
import { TextField } from '@mui/material';
import * as React from 'react';

type Props = {};

const TidalPollutantBuildupSettings: React.FC<Props> = () => {

  const { tidalPollutantBuildup, setTidalPollutantBuildup } = useAppContext();

  const updateSegmentLength = (event:React.ChangeEvent<HTMLInputElement>) => {
    let tmpTidalPollutantBuildup = {... tidalPollutantBuildup};
    tmpTidalPollutantBuildup['segment_length'] = event.target.value
    setTidalPollutantBuildup(tmpTidalPollutantBuildup);
  }
  const updateUpstreamDir = (event:React.ChangeEvent<HTMLInputElement>) => {
    let tmpTidalPollutantBuildup = {... tidalPollutantBuildup};
    tmpTidalPollutantBuildup['upstream_dir'] = event.target.value
    setTidalPollutantBuildup(tmpTidalPollutantBuildup);
  }
  const updateCoastBin = (event:React.ChangeEvent<HTMLInputElement>) => {
    let tmpTidalPollutantBuildup = {... tidalPollutantBuildup};
    tmpTidalPollutantBuildup['coast_bin'] = event.target.value
    setTidalPollutantBuildup(tmpTidalPollutantBuildup);
  }
  const updateCoastConcentration = (event:React.ChangeEvent<HTMLInputElement>) => {
    let tmpTidalPollutantBuildup = {... tidalPollutantBuildup};
    tmpTidalPollutantBuildup['coast_concentration'] = event.target.value
    setTidalPollutantBuildup(tmpTidalPollutantBuildup);
  }
  const updateMixZoneDepth = (event:React.ChangeEvent<HTMLInputElement>) => {
    let tmpTidalPollutantBuildup = {... tidalPollutantBuildup};
    tmpTidalPollutantBuildup['mixing_zone_ceil'] = event.target.value
    setTidalPollutantBuildup(tmpTidalPollutantBuildup);
  }

  return (
    <div>
      <TextField 
        id="segment_length"
        label="Channel seg. length (m)"
        variant="outlined"
        type="string"
        fullWidth={true}
        value = {tidalPollutantBuildup['segment_length']}
        onChange={updateSegmentLength}
        sx={{paddingBottom:'1em', marginTop:'1em'}}
      />
      <TextField 
        id="upstream_dir"
        label="Upstream dir (deg)"
        variant="outlined"
        type="string"
        fullWidth={true}
        value = {tidalPollutantBuildup['upstream_dir']}
        onChange={updateUpstreamDir}
        sx={{paddingBottom:'1em'}}
      />
      <TextField 
        id="coast_bin"
        label="Coast bin (10-99)"
        variant="outlined"
        type="string"
        fullWidth={true}
        value = {tidalPollutantBuildup['coast_bin']}
        onChange={updateCoastBin}
        sx={{paddingBottom:'1em'}}
      />
      <TextField 
        id="coast_concentration"
        label="Coast concentration"
        variant="outlined"
        type="string"
        fullWidth={true}
        value = {tidalPollutantBuildup['coast_concentration']}
        onChange={updateCoastConcentration}
        sx={{paddingBottom:'1em'}}
      />
      <TextField 
        id="mixing_zone_ceil"
        label="Mixing zone depth (m)"
        variant="outlined"
        type="string"
        fullWidth={true}
        value = {tidalPollutantBuildup['mixing_zone_ceil']}
        onChange={updateMixZoneDepth}
        sx={{paddingBottom:'1em'}}
      />
    </div>
  )
}

export default TidalPollutantBuildupSettings