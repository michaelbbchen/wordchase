import React from 'react'
import { useNavigate } from "react-router-dom";



export default function Home() {
    const navigate = useNavigate();
    const generateRandomString = () : string => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let randomString = '';
        
        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }
        return randomString;
    };

    const gotoRoom = () => {
        let path : string = generateRandomString();
        navigate('room/' + path);
    }

    return (
        <div>
        <button onClick = {gotoRoom}>Create Room</button>
        </div>
    )
}