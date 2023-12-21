import React, { useState, useEffect } from 'react';
import socket from './Socket'

export default function Room() {
    const [isReady, setIsReady] = useState(true);
    const toggleState = () => {
        setIsReady(!isReady);
    };

    
    return (
        <div>
            <p>Room!</p>
            <button onClick={toggleState}>
                {isReady ? 'Ready' : 'Unready'}
            </button>
        </div>
    )
}