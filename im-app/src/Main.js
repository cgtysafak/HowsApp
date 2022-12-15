 import React, { useState, useEffect } from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, Button, IconButton } from '@mui/material';
import { MessageIcon } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from "./StateProvider";
import firebase from 'firebase/compat/app';

function Main() {
    const [input, setInput] = useState("");
    const {roomID} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        if(roomID){
            //Getting the room name from id
            db.collection('rooms').doc(roomID).onSnapshot(snapshot => 
                setRoomName(snapshot.data().name)
            );

            //Getting room messages from roomID
            db.collection('rooms').doc(roomID).collection('messages').orderBy('typed', 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc =>
                doc.data()))) )
        }
    }, [roomID]);


    const sendMessage = (e) => {
        e.preventDefault(); /* prevent the page from refreshing */

        db.collection('rooms').doc(roomID).collection('messages').add({
            message: input,
            name: user.displayName,
            typed: firebase.firestore.FieldValue.serverTimestamp(),

        })

        setInput('');
    }

    return (
        <div id='chat' className='flex-[0.95] flex flex-col bg-slate-900 h-full'>
            <div id='chatHeader' className='flex p-5 items-center border-b border-solid bg-gradient-to-r from-green-500 to-yellow-500'>
			    <Avatar src={'https://i.pinimg.com/originals/29/4c/53/294c53c2768a90425387bb7579f66cea.png'}/>
                <div id='chatHeaderInfo' className='flex-1 pl-5 text-black'>
                    <h3 className='mb-1 font-medium'>{roomName}</h3>
                    <p className='mb-1 font-normal text-cyan-900 truncate'>Last message {" "} {
                        //Get the last messages timestamp
                        new Date(
                            messages[messages.length-1]?.typed?.toDate()).toUTCString()}
                    
                    </p>
                </div>
            </div>
            <div id='chatBody' className='flex-1 bg-slate-800 p-8 overflow-auto'>
                {messages.map(message => (
                    <p className={'p-2.5 relative bg-white text-base w-fit rounded-lg mb-5 pb-5' + (message.name === user.displayName && " bg-sky-300 ml-auto")}>
                        {message.message}
                        <span id='chatMessageName' className='absolute -top-0 left-0 -mt-4 text-xs text-lime-400 font-extrabold'>
                            {message.name}
                        </span>
                        <span id='chatMessageTimestamp' className='ml-2.5 text-xs text-gray-600'>
                            {new Date(message.typed?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
                
            </div>
            <div id='chatFooter' className='flex justify-between items-center h-16 border-t border-solid border-green-400 bg-gradient-to-r from-green-500 to-yellow-500'>
                <form  id='chatForm' className='flex-1 items-center p-5'>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type='text'
                        id='chatInput'
                        className='flex-1 bg-slate-700 rounded-3xl border-none p-2.5 outline-none text-white w-full'
                        placeholder='    Type a message...'
                        
                    />
                    <button type='submit' onClick={sendMessage} className=''></button>
                </form>
            </div>
        </div>
    )
}

export default Main