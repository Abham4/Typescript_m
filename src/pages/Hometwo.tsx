
import React from 'react'
import {Tabs,Tab,AppBar, Typography} from  "@material-ui/core";
import Familly from './Family';
import Identities from './Identities';
import {useState} from 'react'
import Footer from '../components/Layout/Footer';
import Container from '@mui/material/Container';
import News from '../components/News';
import Notification from '../components/Notification';
import './but.css';
const Home = () => {
  return (
   
    
 
    <>
  
   <div className='imga'>
    
   <div className='e'> <img src={require('../pages/image/eag.jpg')} className="max-w-[24%] float-left " /></div> 
     <div className='d'>  <img src={require('../pages/image/micro.jpg')} className=" max-w-[22%] float-left " /></div>
   <div className='e'> <img src={require('../pages/image/douu.jpg')} className="max-w-[27%] float-left " /></div>
   
  </div>
  <div className='ham'>

  </div >
  <div>
      <Container className=" mt-28 pt-20 p-10 min-h-full position: relative " maxWidth="xl">
        <div className="flex flex-row m-2">
          <div className="basis-4/5 ">
           
            <img src={require('../pages/image/dash.jpg')} className="max-w-[100%] float-left pr-4" />
           
          </div>
          <div className="basis-2/5">
            <Typography className="text-gray-400 p-2 ml-10" variant="h4">
              {" "}
              News{" "}
            </Typography>
            <Notification />
            <Notification />
            <Notification />
          </div>
        </div>
      </Container>
      </div>
      
    </>
    
  );
}

export default Home