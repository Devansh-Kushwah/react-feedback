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
import { Cookie } from '@mui/icons-material';
const CanvasEditor = ({handleSave, screenCapture, openCanvaModal, setCanvaOpenModal, setFormSubmit }) => {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState('pencil'); // Current tool: pencil or eraser
  const [panningDisabled, setPanningDisabled] = useState(false);
  const [issueType, setIssueType] = useState('Bugs');
  const [impact, setImpact] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [section, setSection] = useState('low');
  const [subSection, setSubSection] = useState('low');

  const handleChange = (event, newAlignment) => {
    setIssueType(newAlignment);
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
    const formData = {
      issueType,
      impact,
      title,
      description,
      section,
      subSection,
      image: dataURL, 
    };
    console.log("FormData:", formData);
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
                  <Button  onClick={handleClear} >Clear</Button>
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
              value={issueType}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              style={{gap:"16px"}}
              className='IssueGroup'
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
              value={impact}
              onChange={(e) => setImpact(e.target.value)}
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              value={section}
              onChange={(e) => setSection(e.target.value)}
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
              value={subSection}
              onChange={(e) => setSubSection(e.target.value)}>

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