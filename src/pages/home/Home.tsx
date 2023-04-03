//アロー関数はrface
import React from 'react';
import "./Home.css"
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Timeline from '../../components/timeline/Timeline'
import Topbar from '../../components/topbar/Topbar'

const Home = () => {
  return (
    <>
    <Topbar />
    <div className="homeContainer">
    <Sidebar />
    {/* <Timeline />
    <Rightbar /> */}
    </div>
    </>
  )
}

export default Home
