import React from 'react';
import * as styles from './css/FullScreenLoader.module.css';
import { AppIconLogo } from './icons';

function FullScreenLoader({ variant }: { variant: '1' | '2' }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100%',
      background: '#111'
    }}>
      <div >
      <div className={styles.brand_logo}>
        <AppIconLogo />
      </div>
    </div>
      </div>
  )
}

export default FullScreenLoader
