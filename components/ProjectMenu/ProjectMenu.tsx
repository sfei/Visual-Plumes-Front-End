import * as React from 'react';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useAppContext } from '../../context/state';
import Papa from 'papaparse';

type Props = {};

/**
 * Project Menu Component
 * Used to save and load visual plumes project information.
 * @returns React component
 */
const ProjectMenu: React.FC<Props> = () => {

  /* Getters and setters for configuration data */
  const {

    projectName,
    setProjectName,

    tidalPollutantBuildup,
    setTidalPollutantBuildup,

    reportEffectiveDillution,
    setReportEffectiveDillution,

    currentVectorAveraging,
    setCurrentVectorAveraging,

    timeseriesRows,
    setTimeseriesRows,

    specialSettingsRows,
    setSpecialSettingsRows,

    bacterialModelValue,
    setBacterialModelValue,

    farfieldDiffusivity, setFarfieldDiffusivity,

    diffuserTable, 
    setDiffuserTable,

    diffuserTimeSeries, setDiffuserTimeSeries,
    diffuserTimeSeriesDefaults,

    diffPortContCoeff, setDiffPortContCoeff,
    lightAbsorpCoeff, setLightAbsorpCoeff,
    farfieldCoeff, setFarfieldCoeff,
    um3AspCoeff, setUm3AspCoeff,

    elevationProjPlane, setElevationProjPlane,
    useShoreVector, setUseShoreVector,
    distToShore, setDistToShore,
    dirToShore, setDirToShore,

    ambientStore,
    setAmbientStore,

    ambientFiles, setAmbientFiles,

    modelConfigType,
    setModelConfigType,

    maxDilutionReported,
    setMaxDilutionReported,

    writeStepFreq,
    setWriteStepFreq,

    stopOnBottomHit,
    setStopOnBottomHit,

    maxReverals,
    setMaxReverals,

    dontStopOnSurfaceHit,
    setDontStopOnSurfaceHit,

    allowInducedCurrent,
    setAllowInducedCurrent,
    //TODO: Figure out how to handle time series files.

  } = useAppContext();

  /**
   * Download File
   * Function creates a blob object, inserts link into DOM then fires a click event.
   * Adapted from code found at:
   * https://theroadtoenterprise.com/blog/how-to-download-csv-and-json-files-in-react
   * @param data Stringified JavaScript parameters.
   * @param fileName String representing filename.
   * @param fileType String representing file type.
   */
  const downloadFile = ( data:string, fileName:string, fileType:string ) => {

    /* Create a blob with the data we want to download as a file */
    const blob = new Blob([data], { type: fileType });

    /* Create link element */
    const a = document.createElement('a');

    /* Name the download */
    a.download = fileName;

    /* Link to blob */
    a.href = window.URL.createObjectURL(blob);

    /* Add click event listener */
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    /* Trigger the event */
    a.dispatchEvent(clickEvt);

    /* Remove link */
    a.remove()
  }

  /**
   * Export to JSON
   * Export state variables to JSON file, trigger download.
   * @param event 
   */
  const exportToJson = (event:any) => {
    event.preventDefault();
    let profileData = {
      "diffuserTable":diffuserTable,
      // "diffuserTimeSeries": diffuserTimeSeries,
      "diffPortContCoeff":diffPortContCoeff,
      "lightAbsorpCoeff":lightAbsorpCoeff,
      "farfieldCoeff":farfieldCoeff,
      "um3AspCoeff":um3AspCoeff,
      "projectName":projectName,
      "tidalPollutantBuildup":tidalPollutantBuildup,
      "reportEffectiveDillution":reportEffectiveDillution,
      "currentVectorAveraging":currentVectorAveraging,
      "timeseriesRows":timeseriesRows,
      "specialSettingsRows":specialSettingsRows,
      "bacterialModelValue":bacterialModelValue,
      "ambientStore":ambientStore,
      // "ambientFiles": ambientFiles,
      "modelConfigType": modelConfigType,
      "maxDilutionReported": maxDilutionReported,
      "writeStepFreq": writeStepFreq,
      "stopOnBottomHit": stopOnBottomHit,
      "maxReverals": maxReverals,
      "dontStopOnSurfaceHit": dontStopOnSurfaceHit,
      "allowInducedCurrent": allowInducedCurrent,
      "elevationProjPlane": elevationProjPlane,
      "useShoreVector": useShoreVector,
      "distToShore": distToShore,
      "dirToShore": dirToShore,
      "farfieldDiffusivity": farfieldDiffusivity,
    }

    downloadFile(
      JSON.stringify(profileData),
      'visual-plumes.json',
      'text/json',
    )
  }

  const loadDiffuserTimeSeries = (jsonData:any) => {

    /* Load empty diffuser TS template */
    let newDiffuserTimeSeries = diffuserTimeSeriesDefaults;

    {Object.keys(jsonData['diffuserTimeSeries']).map((field:any,index:number) => {
      if (jsonData['diffuserTimeSeries'][field].file !== null) {

        /* Add filename to UI for reference */
        newDiffuserTimeSeries[field]['filename'] = jsonData['diffuserTimeSeries']['filename'];
        setDiffuserTimeSeries(newDiffuserTimeSeries);

        /* Create file reader */
        const reader = new FileReader();

        /* Add event listener for actions post file read */
        reader.addEventListener("load", (e:any) => {

          /* Read file contents as JSON */
          let jsonData = Papa.parse(reader.result as string, { header: true });
          
          /* Calculate cycling period, increment by 1 to account for metadata */
          let newDiffuserTimeSeries = { ...diffuserTimeSeries };
          newDiffuserTimeSeries[field]['time_cycling_period'] = (jsonData.data.length * newDiffuserTimeSeries[field]['increment']) + 1;
          newDiffuserTimeSeries[field]['num_lines_in_file'] = jsonData.data.length;

          /* Update input time related input cells */
          let newDiffuserTable = { ...diffuserTable };
          newDiffuserTable['store']['start_time']['isEnabled'] = true;
          newDiffuserTable['store']['end_time']['isEnabled'] = true;
          newDiffuserTable['store']['time_increment']['isEnabled'] = true;
          newDiffuserTable['store'][field]['isEnabled'] = false;
          setDiffuserTable(newDiffuserTable);
          setDiffuserTimeSeries(newDiffuserTimeSeries);
        });

        /* Read text if a file is present */
        reader.readAsText(newDiffuserTimeSeries[field]['filename']);
      }
    })}
  }

  /**
   * Import from JSON
   * 
   * @param event 
   */
  const importFromJson = (event:any) => {
    // event.preventDefault();
    console.log("JSON Uploaded!");
    console.log(event.currentTarget.files);

    const reader = new FileReader();

    let jsonData = '';

    reader.addEventListener("load", (e:any) => {

      interface jsonDataInterface {
        projectName              : string;
        tidalPollutantBuildup    : boolean;
        reportEffectiveDillution : boolean;
        currentVectorAveraging   : boolean;
        timeseriesRows           : number[];
        specialSettingsRows      : number[];
        bacterialModelValue      : string;
        diffuserTable            : any;
        diffuserTimeSeries       : any;
        diffPortContCoeff        : string;
        lightAbsorpCoeff         : string;
        farfieldCoeff            : string;
        um3AspCoeff              : string;
        ambientStore             : any;
        ambientFiles             : any;
        modelConfigType          : string;
        maxDilutionReported      : number;
        writeStepFreq            : number;
        stopOnBottomHit          : boolean;
        maxReverals              : string;
        dontStopOnSurfaceHit     : boolean;
        allowInducedCurrent      : boolean;
        elevationProjPlane       : number;
        useShoreVector           : boolean;
        distToShore              : number;
        dirToShore               : number;
        farfieldDiffusivity      : string;
      } 

      /* Load JSON Data */
      let jsonData: jsonDataInterface = JSON.parse(reader.result as string);

      /* Set state variables from loaded JSON */
      setProjectName              ( jsonData["projectName"]              );
      setTidalPollutantBuildup    ( jsonData["tidalPollutantBuildup"]    );
      setReportEffectiveDillution ( jsonData["reportEffectiveDillution"] );
      setCurrentVectorAveraging   ( jsonData["currentVectorAveraging"]   );
      setTimeseriesRows           ( jsonData["timeseriesRows"]           );
      setSpecialSettingsRows      ( jsonData["specialSettingsRows"]      );
      setBacterialModelValue      ( jsonData["bacterialModelValue"]      );
      setDiffuserTable            ( jsonData["diffuserTable"]            );
      // setdiffuserTimeSeries       ( jsonData["diffuserTimeSeries"]       );
      setDiffPortContCoeff        ( jsonData["diffPortContCoeff"]        );
      setLightAbsorpCoeff         ( jsonData["lightAbsorpCoeff"]         );
      setFarfieldCoeff            ( jsonData["farfieldCoeff"]            );
      setUm3AspCoeff              ( jsonData["um3AspCoeff"]              );
      setAmbientStore             ( jsonData["ambientStore"]             );
      // setAmbientFiles             ( jsonData["ambientFiles"]             );
      setModelConfigType          ( jsonData["modelConfigType"]          );
      setMaxDilutionReported      ( jsonData["maxDilutionReported"]      );
      setWriteStepFreq            ( jsonData["writeStepFreq"]            );
      setStopOnBottomHit          ( jsonData["stopOnBottomHit"]          );
      setMaxReverals              ( jsonData["maxReverals"]              );
      setDontStopOnSurfaceHit     ( jsonData["dontStopOnSurfaceHit"]     );
      setAllowInducedCurrent      ( jsonData["allowInducedCurrent"]      );
      setElevationProjPlane       ( jsonData["elevationProjPlane"]       );
      setUseShoreVector           ( jsonData["useShoreVector"]           );
      setDistToShore              ( jsonData["distToShore"]              );
      setDirToShore               ( jsonData["dirToShore"]               );
      setFarfieldDiffusivity      ( jsonData["farfieldDiffusivity"]      );
    });

    if (event.currentTarget.files.length > 0) {
      reader.readAsText(event.currentTarget.files[0]);
    }
  }

  return (

      <List>
        <ListItem
          key={"Save Project Config"}
          disablePadding
        >
          <ListItemButton
            onClick={exportToJson}
          >
            <ListItemText primary={"Save Project Config"} />
          </ListItemButton>
        </ListItem>
        <ListItem
          key={"Load Project Config"}
          disablePadding
        >
          <ListItemButton
            component="label"
          >
            <ListItemText primary={"Load Project Config"} />
            <input 
              id="project-json-file"
              type="file"
              hidden
              onChange={importFromJson}
            />
          </ListItemButton>
        </ListItem>
      </List>

  )
 }

 export default ProjectMenu