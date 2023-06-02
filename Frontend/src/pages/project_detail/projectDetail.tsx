import { Sidebar } from '../../layout/sidebar.layout'
import { Header } from '../../layout/header.layout'
import { useContext, useEffect, useState } from 'react'
import { ProjectDetailContent } from './projectDetailContent';
const ProjectDetail = () => {

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const handleBurgerClick = () => {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <>
      <div className='pj-container'>
        <div className={`bar-div ${sidebarOpen ? '' : 'close'} `}><Sidebar /></div>
        <div className='content'>
          <div> <Header clickHandler={handleBurgerClick} text='Dashboard' /> </div>
          <div className='board-div'><ProjectDetailContent category={''} status={''} description={''} developer_names={[]} /></div>
        </div>

      </div>
    </>
  )
}

export default ProjectDetail;