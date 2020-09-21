import React from 'react';
import styles from './loading.module.css';

export default function LoadingWrapper({loading, children}) {
  return (loading ? 
    <div className = "position-relative ">
      <div className = {styles.overlay} /> 
      {children}
    </div> : children
  )
}
