import React, { useState, useEffect } from 'react'
import { Avatar, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { SearchOutlined } from '@mui/icons-material';
import SidebarChat from './SidebarChat';
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import SearchBar from './SearchBar';

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{user}, dispatch] = useStateValue();
  const [searchResults, setSearchResults] = useState([]);
  
  //Empty dependencies for running only at refresh.
  useEffect(() => {
    const unsubscribe = db.collection('rooms').onSnapshot((snapshot) => 
        setRooms(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
        })))
    )

    const filter = db.collection('rooms').onSnapshot((snapshot) => 
        setSearchResults(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
        })))
    )
    // cleanup for optimization
    return () => {
      unsubscribe();
      filter();
    }
  }, [])

  return (
    <div id='sidebar' className='basis-4/12 flex flex-col border-r border-solid border-black h-full'>
        <div id='sidebar_header' className='flex justify-between p-5 border-r border-solid border-slate-300'>
            <Avatar src={user?.photoURL} />
            <div id="sidebar_header_right" className='flex-1 items-left justify-between'>
                <p className='font-bold ml-3 mt-2' >{user?.displayName}</p>
            </div>
            <div id="sidebar_header_right" className='flex flex-row-reverse items-right justify-between'>
                <IconButton className='' onClick={() => window.location.reload(false)} >
                  <LogoutIcon/>
                </IconButton>
            </div>
        </div>
        <div id="sidebar_search" className='flex items-center p-2.5 h-10'>
          <div id='sidebar_search_container' className='flex items-center bg-white w-full h-9 rounded-2xl'>
            <SearchOutlined className='ml-3 text-red-900'/>
            <SearchBar rooms={rooms} setSearchResults={setSearchResults} />
          </div>
        </div>
        <div id="sidebar_chats" className='flex-1 overflow-auto'>  {/* flex de olabilir flex-1 de olabilir !!!!!!!!!!!!!!!!!!! */}
          <SidebarChat addNewChat/>
          {searchResults.map((room) => (
            <SidebarChat key={room.id} id={room.id} name={room.data.name} />
          ))}
        </div>
    </div>
  );
}

export default Sidebar