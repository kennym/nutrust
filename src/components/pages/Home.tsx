import {useState} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

export default () => {

    return(
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <p>This is home, here are one plan for you</p>
            <div className="w-96 border rounded-xl p-4 flex flex-col bg-white text-black">
                <p className="text-3xl">Silver</p>
                <p>10,000$</p>
                <p>Price: 10$</p>
                <Link to='/pay' className="mt-20 h-10 rounded-xl w-full bg-green-500 font-bold text-sm flex items-center justify-center">Get Funded</Link>
            </div>
        </div>
    )
}