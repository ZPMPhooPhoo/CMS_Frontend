import {UserListContent} from './userListContent'
import { Sidebar } from '../../layout/sidebar.layout'
import { Header } from '../../layout/header.layout'
import { useState ,useEffect} from 'react'

// type BurgerPropsType = {
//   onClick :() => void;
// }
export const UserList = () => {

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const handleBurgerClick = () => {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <>
      {/* <ClientList /> */}
      <div className='pj-container'>
        <div className={`bar-div ${sidebarOpen ? '' : 'close'} `}><Sidebar /></div>
        <div className='content'>
          <div> <Header clickHandler={handleBurgerClick}  text='User List'/> </div>
          <div className='board-div'><UserListContent /></div>
          {/* <div> <Header clickHandler={handleBurgerClick} text='Client Lists' /> </div>
          <div className='board-div'><UserEdit /></div> */}
        </div>

      </div>
    </>
  )
}