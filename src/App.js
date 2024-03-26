import React,{useEffect, useState} from 'react';
import { useScreenshot } from "use-screenshot-hook";
import { SnackbarProvider, MaterialDesignContent, enqueueSnackbar } from 'notistack';

// import ScreenShot from './Components/ScreenShot';
import { ScreenCapture } from 'react-screen-capture';
import Welcome from './Components/Welcome/Welcome';
import FloatingButton from './Components/FloatingButton/FloatingButton';
import BottomButtons from './Components/BottomButtons/BottomButtons';
import Canvas from './Components/Canvas/index';
import { styled } from '@mui/material';
const App = () => {
  const [type, setType] = useState('none');
  const [screenshot, setscreenshot] = useState({});
  const [screenCaptured, setscreenCaptured] = useState(false);
  const [openCanvaModal, setopenCanvaModal] = useState(false);
  const [openSSModal, setopenSSModal] = useState(false);
  const { image, takeScreenshot } = useScreenshot();
  const [FormSubmit, setFormSubmit] = useState(false);
  const handleScreenCapture = screenCapture => {
    setscreenshot({screenCapture});
    setscreenCaptured(true);
    setopenSSModal(true);
    setType("shotTaken");
  };

  const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
		'&.notistack-MuiContent-success': {
			backgroundColor: '#26B56A',
		},
		'&.notistack-MuiContent-error': {
			backgroundColor: '#970C0C',
		},
	}));

  const handleFullScreenCapture = () => {
    takeScreenshot().then((image) => {
      setscreenshot({ screenCapture: image });
    });
    setscreenCaptured(true);
    setopenSSModal(true);
    setType("shotTaken");
  }
  const handleSave = (imgUrl) => {
    const downloadLink = document.createElement('a');
    const fileName = 'react-screen-capture.png';
  
    downloadLink.href = imgUrl;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  const { screenCapture } = screenshot;

  if(FormSubmit){
    setFormSubmit(false);
    enqueueSnackbar("Form Submited successfully", {
      variant: "success",
    });    
  }
  
  return (
    <SnackbarProvider
        autoHideDuration={2000}
        maxSnack={3}
        Components={{
          success: StyledMaterialDesignContent,
          error: StyledMaterialDesignContent,
        }}
      >
      <ScreenCapture onEndCapture={handleScreenCapture}>
        {({ onStartCapture }) => (
          <div>
            <Welcome />
            <FloatingButton setType={setType} />
            <BottomButtons 
              handleFullScreenCapture={handleFullScreenCapture} 
              type={type}  
              setType={setType} 
              onStartCapture={onStartCapture} 
              setCanvaOpenModal={setopenCanvaModal}
              openSSModal={openSSModal}
              setSSOpenModal={setopenSSModal}
              screenCapture={screenCapture}
              />
            <Canvas handleSave={handleSave} screenCapture={screenCapture} openCanvaModal={openCanvaModal} setCanvaOpenModal={setopenCanvaModal} setFormSubmit={setFormSubmit}/>
          </div>
        )}
      </ScreenCapture>
    </SnackbarProvider>
  );
};

export default App;