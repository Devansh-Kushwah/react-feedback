import React, { useRef, useState } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import Modal from '../Modal';
import {
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  Button,
} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import './Canva.css';
import DrawIcon from '@mui/icons-material/Draw';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import eraserIcon from "../../images/eraser.png";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
const CanvasEditor = ({handleSave, screenCapture, openCanvaModal, setCanvaOpenModal, setFormSubmit }) => {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState('pencil'); // Current tool: pencil or eraser
  const [panningDisabled, setPanningDisabled] = useState(false);
  const [alignment, setAlignment] = React.useState('Enhancements');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  

  const handleToolChange = (selectedTool) => {
    setTool(selectedTool);
    setPanningDisabled(selectedTool !== 'move');
    if (canvasRef.current) {
      if (selectedTool === 'eraser') {
        canvasRef.current.eraseMode(true);
      } else {
        canvasRef.current.eraseMode(false);
      }
    }
  };

  const handleUndo = () => {
    if (canvasRef.current) {
      canvasRef.current.undo();
    }
  };

  const handleRedo = () => {
    if (canvasRef.current) {
      canvasRef.current.redo();
    }
  };

  const handleClear = () => {
    if (canvasRef.current) {
      canvasRef.current.clearCanvas();
    }
  }

  const options = [
    {
      value: 'low',
      label: 'Low',
    },
    {
      value: 'medium',
      label: 'Medium',
    },
    {
      value: 'high',
      label: 'High',
    },
  ]

  const handleSubmit = async () => {

    let dataURL;
    if (canvasRef.current) { 
      dataURL  = await canvasRef.current.exportImage();
      handleSave(dataURL);
    }
  
    const issueType = document.getElementById('issueType').value;
    const impact = document.getElementById('impact').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const section = document.getElementById('section').value;
    const subSection = document.getElementById('subSection').value;
  
    const body = `Issue Type: ${issueType}\nImpact: ${impact}\nTitle: ${title}\nDescription: ${description}\nSection: ${section}\nSub Section: ${subSection}\nImage: ${dataURL}`;
  
    window.open(`mailto:devanshkushwah222@gmail.com?subject=Form Submission&body=${encodeURIComponent(body)}`);  
    setCanvaOpenModal(false);
    setFormSubmit(true);
  };

  return (
    <Modal 
      openModal={openCanvaModal}
      setOpenModal={setCanvaOpenModal}
      showCloseIcon={true}
      customClass={"CanvaModal"}
    >
      <div className='CanvaMain'>
        <div className='canvaArea'>
          <TransformWrapper
           className='canvaWrapper'
            panning={{
              disabled: false,
              wheelPanning: false,
              lockAxisX: true,
              lockAxisY: true,
              fullWidth: true,
            }}
            pinch={{ disabled: false, wheelPanning: false }}
          >
            {({ zoomIn, zoomOut }) => (
              <React.Fragment className="reactFragment">
                <TransformComponent className="canvaComponent">
                  <ReactSketchCanvas
                    ref={canvasRef}
                    width="800px"
                    height="400px"                    
                    backgroundImage={screenCapture}
                    cursor={tool}

                  />
                </TransformComponent>
                <div className='toolbox'>
                  <DrawIcon className='tools' onClick={() => handleToolChange('pencil')} disabled={tool === 'pencil'}/>
                  <img  className='tools' src={eraserIcon} onClick={() => handleToolChange('eraser')} disabled={tool === 'eraser'}/>
                  <UndoIcon className='tools' onClick={handleUndo}/>
                  <Button onClick={handleClear} >Clear</Button>
                  <RedoIcon className='tools' onClick={handleRedo}/>
                  <ZoomInIcon className='tools' onClick={() => zoomIn()}/>
                  <ZoomOutIcon className='tools' onClick={() => zoomOut()}/>
                </div>
              </React.Fragment>
            )}
          </TransformWrapper>
        </div>

        <form className='formArea'>
          <div>
            <p>Issue Type</p>
            <ToggleButtonGroup
              id="issueType"
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              style={{gap:"16px"}}
            >
              <ToggleButton className='issueBtn' value="Bugs">Bugs</ToggleButton>
              <ToggleButton className='issueBtn' value="Enhancements">Enhancements</ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div>
            <InputLabel shrink htmlFor="impact">
              Impact
            </InputLabel>
            <TextField
              id="impact"
              placeholder='Enter the impact of the issue'
              defaultValue=""
              variant="outlined"
              fullWidth
              size="small"
            />
          </div>
          <div>
            <InputLabel shrink htmlFor="title">
              Title
            </InputLabel>
            <TextField
              id="title"
              placeholder='Enter the title of the issue'
              defaultValue=""
              variant="outlined"
              fullWidth
              size="small"
            />
          </div>
          <div>
            <InputLabel shrink htmlFor="description">
              Description
            </InputLabel>
            <TextField
              id="description"
              multiline={true}
              rows={4}
              placeholder='Enter the impact of the issue'
              defaultValue=""
              variant="outlined"
              fullWidth
              size="small"
            />
          </div>
          <div>
            <InputLabel shrink htmlFor="section">
              Section
            </InputLabel>
            <TextField
              id="section"
              select
              defaultValue="low"
              variant="outlined"
              fullWidth
              size="small"
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>  
          <div>
            <InputLabel shrink htmlFor="subSection">
              Sub-Section
            </InputLabel>
            <TextField
              id="subSection"
              select
              defaultValue="low"
              variant="outlined"
              fullWidth
              size="small"
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField> 
          </div>
          <div style={{display:"flex", gap:"8px"}}>
            <Button onClick={() => setCanvaOpenModal(false)}>Cancel</Button>
            <Button 
                onClick={handleSubmit} 
                variant='contained'
            >
              Raise Ticket
            </Button>
          </div>
        </form> 

      </div>
    </Modal>
  );
};

export default CanvasEditor;