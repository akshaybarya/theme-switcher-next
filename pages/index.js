import React, { useState, useEffect } from 'react'
import axios from 'axios';

import { toggleTheme } from '../helpers/index';

const App = ({ data }) => {
  const [primaryClr, setPrimaryClr] = useState(null);
  const [secondaryClr, setSecondaryClr] = useState(null);
  const [bgClr, setBgClr] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const onClick = () => {
    toggleTheme(primaryClr, secondaryClr, bgClr);
  };

  const getTheme = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('https://theme-switcher-server.vercel.app/2');
      
      if (res.data) {
        toggleTheme(res.data?.['--primaryClr'], res.data?.['--secondaryClr'], res.data?.['--primaryBg']);
      }
      
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (data) {
      toggleTheme(data?.['--primaryClr'], data?.['--secondaryClr'], data?.['--primaryBg']);

      setIsLoading(false);
    } else {
      getTheme();
    }
  }, []);

  if (isLoading) {
    return (
      <div style={{"overflow": "hidden"}}>
        <div className="mainContainer">
          <div className="loaderContainer">
              <div className="loaderInner"></div>
          </div>
        </div>

        Groww
      </div>
    );
  }

  return (
    <div style={{height:'100vh', width: '100%', display: 'flex', alignItems: 'start', justifyContent: 'center', paddingTop: '50px', backgroundColor: 'whitesmoke'}}>

    <div className='outermost-container'>
      <div className='header'>
        Payment powered by Groww
      </div>

      <div className='main'>
        <label className='input'>
          Primary Color

          <input value={primaryClr ?? ''} onChange={(e) => setPrimaryClr(e.target.value)} />
        </label>

        <label className='input'>
          Secondary Color
          <input value={secondaryClr ?? ''} onChange={(e) => setSecondaryClr(e.target.value)} />

        </label>

        <label className='input'>
          Background Color
          <input value={bgClr ?? ''} onChange={(e) => setBgClr(e.target.value)} />

        </label>

        <div className='button' onClick={onClick}>Change Theme</div>
      </div>

    </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  let res = null;
  
  try {
    res = await axios.get('https://theme-switcher-server.vercel.app/2');
    
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      data: res?.data
    }
  }
}

export default App;