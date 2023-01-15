import {useEffect, useState} from "react";
import 'firebase/auth'
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import logo from '../../../assets/brand.svg';
import google from '../../../assets/google.png'
import apple from '../../../assets/apple.png'
import bg1 from '../../../assets/test.png'

export default (user__:any) => {

    const [log__email, setLogEmail] = useState('')
    const [log__password, setLogPassword] = useState('')

    const auth = getAuth();
    if(auth.currentUser) window.location.href='/dashboard'
    useEffect(() => {
        if(auth.currentUser) window.location.href='/dashboard'
    }, [user__]);

    const signInEmail = () => {
        signInWithEmailAndPassword(auth, log__email, log__password)
    }

    const signInGoogle = () => {
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential:any = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    return(
        <div className="w-full flex justify-center">
            <div className="w-full max-w-[1600px] flex items-center justify-center pb-[40rem] lg:pb-[30rem] relative overflow-hidden px-7">
                <div className="w-96 flex flex-col items-center mt-10 z-10">
                    <img src={logo} alt="" className="my-8 brand"/>
                    <h1 className="text-6xl text-white">Sign In</h1>
                    <p className="text-sm mt-8 text-center font-normal">Lorem ipsum dolor sit amet, consectetur adipisicing elit. vel laborum iure error consectetur.</p>
                    <button onClick={signInGoogle} className="cursor-pointer py-2.5 text-white rounded-md w-full bg-gray-800 border border-gray-500 mt-8 flex items-center justify-center font-normal"><img className="w-5 invert mr-4" src={google} alt="" /> Sign In with Google</button>
                    <button className="cursor-pointer py-2.5 text-white rounded-md w-full bg-gray-800 border border-gray-500 mt-3 flex items-center justify-center font-normal"><img className="w-6 -mt-1 invert mr-4" src={apple} alt="" /> Sign In with Apple</button>

                    <p className="my-3 font-normal">Or</p>

                    <input type="email" id="email" onChange={(ev)=>setLogEmail(ev.target.value)} placeholder="Email" className="text-white placeholder:text-pro-100 placeholder:font-normal focus:border-b-green-500 w-full bg-transparent py-3 border border-transparent border-b-gray-500 outline-none text-center"/>
                    <input type="password" id="password" onChange={(ev)=>setLogPassword(ev.target.value)} placeholder="Password" className="text-white placeholder:text-pro-100 placeholder:font-normal focus:border-b-green-500 w-full bg-transparent py-3 border border-transparent border-b-gray-500 outline-none text-center"/>
                    <button onClick={signInEmail} className="w-full py-2.5 rounded-md mt-4 bg-green-500 font-bold text-black">Sign In with Email</button>
                </div>
                <img src={bg1} className="absolute -bottom-[30%] left-[30rem] w-[80rem] rotate-[10deg] " />
            </div>
        </div>

    )
}