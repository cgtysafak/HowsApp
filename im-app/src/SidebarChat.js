import { Avatar } from '@mui/material'
import React, { useState, useEffect } from 'react'
import db from './firebase';
import { Link } from "react-router-dom";

function SidebarChat({id, name , addNewChat}) {
	const [lastMessages, setMessages] = useState("");

	useEffect(() => {
		//Get the last message of the room
		if(id){
			db.collection('rooms').doc(id).collection('messages').orderBy('typed', 'desc').onSnapshot(snapshot => (
				setMessages(snapshot.docs.map((doc) =>
				doc.data()))
			));
		}
	}, [id]);

	const createChat = () => {
    	const roomName = prompt("Please enter name for a new chat room:");

    	if(roomName){
    		db.collection('rooms').add({
				name: roomName,
			})
    	}
  	}

  	return (!addNewChat ? (
		<Link to={`/chat/${id}`}>
			<div
			id='sidebarChat'
			className='flex p-5 cursor-pointer hover:bg-sky-700 border-b border-solid border-slate-800 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out'
			>
				<Avatar src={'https://i.pinimg.com/originals/29/4c/53/294c53c2768a90425387bb7579f66cea.png'}/>
				<div
					id='sidebarChat_info'
					className='ml-3.5'
				>
					<h2 className='mb-2 text-lg font-bold'>{name}</h2>
					<p className='text-sm font-medium'>{lastMessages[0]?.name}{':  '}{lastMessages[0]?.message}</p>
				</div>
			</div>
		
		</Link>
		
		) : (
		<div
			onClick={createChat}
			id='sidebarAddNewChat'
			className='flex p-3 cursor-pointer hover:bg-sky-700 border-b border-solid border-slate-800 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out'
		>
			<h2 className='text-2xl'>Create New Room</h2>
		</div>
	));
}

export default SidebarChat