import React, { useEffect, useRef } from 'react';
import Overlay from 'react-bootstrap/Overlay'
import Alert from 'react-bootstrap/Alert'

export default function AutoHide({
  children,
  onClose,
  visibleTime = null,
  message,
  ...overlayProps
  
}) {

  const timerAutoHide = useRef();
 
  useEffect(() => {
    if (overlayProps.show && visibleTime) {
      setTimer();
    }

    return () => {
        clearTimeout(timerAutoHide.current);
    };
  }, [overlayProps.show, visibleTime]);

  const setTimer = () => {
    if (!onClose || visibleTime == null) {
      return;
    }
    timerAutoHide.current = setTimeout(onClose, visibleTime);
  }

  console.log(overlayProps);

  return (
    <Overlay {...overlayProps}>
      <Alert variant='success'>
      {message}
      </Alert>
    </Overlay>
  )
}
