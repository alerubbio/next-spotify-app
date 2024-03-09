"use client"
import React, {useEffect} from 'react';

const home = () =>{
    useEffect(()=>{
        async function fetchData(){
            const response = await fetch('/api/test');
            const json = await response.json();
            console.log(json);
        }
        
        fetchData()

    }, []);
    return <div>Hello</div>
}



export default home;