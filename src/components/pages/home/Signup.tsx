import {useState, useEffect} from "react";

import 'firebase/auth'
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendEmailVerification } from "firebase/auth";
import firebaseConfig from '../../../firebase__config'
import { initializeApp } from "firebase/app";
import { collection, getDocs, initializeFirestore } from "firebase/firestore"; 

import logo from '../../../assets/brand.svg';
import google from '../../../assets/google.png'
import apple from '../../../assets/apple.png'
import bg1 from '../../../assets/test.png'

export default (props:any) => {

    const { user__ } = props;

    const [sign__email, setSignEmail] = useState('')
    const [sign__password, setSignPassword] = useState('')
    const [exchange__account, setExchange__account] = useState('')

    const app = initializeApp(firebaseConfig);
    const db = initializeFirestore(app, {
        experimentalForceLongPolling: true
    });

    const auth = getAuth();
    if(auth.currentUser) window.location.href='/dashboard'
    useEffect(() => {
        if(auth.currentUser) window.location.href='/dashboard'
    }, [user__]);

    const submitGoogle = () => {
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential:any = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            window.location.href='/dashboard'
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

    const submitEmail = () => {
        createUserWithEmailAndPassword(auth, sign__email, sign__password).then((userCredential) => {
            window.location.href='/dashboard'
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }

    const read = async() => {
        await getDocs(collection(db, 'users'))
            .then((QuerySnapshot) => {
                const data = QuerySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id}))
                console.log(data)
            })
    }

    return(
        <div className="w-full flex justify-center">
            <div className="w-full max-w-[1600px] flex items-center justify-center pb-[40rem] lg:pb-[30rem] relative overflow-hidden px-7">
                <div className="w-96 flex flex-col items-center mt-10 z-10">
                    <img src={logo} alt="" className="my-8 brand"/>
                    <h1 className="text-6xl text-white">Sign Up</h1>
                    <p className="text-sm mt-8 text-center font-normal">Lorem ipsum dolor sit amet, consectetur adipisicing elit. vel laborum iure error consectetur.</p>
                    <button onClick={submitGoogle} className="cursor-pointer py-2.5 text-white rounded-md w-full bg-gray-800 border border-gray-500 mt-8 flex items-center justify-center font-normal"><img className="w-5 invert mr-4" src={google} alt="" /> Sign Up with Google</button>
                    <button className="cursor-pointer py-2.5 text-white rounded-md w-full bg-gray-800 border border-gray-500 mt-3 flex items-center justify-center font-normal"><img className="w-6 -mt-1 invert mr-4" src={apple} alt="" /> Sign Up with Apple</button>

                    <p className="my-3 font-normal">Or</p>

                    <input type="email" id="email" onChange={(ev)=>setSignEmail(ev.target.value)} placeholder="Email" className="text-white placeholder:text-pro-100 placeholder:font-normal focus:border-b-green-500 w-full bg-transparent py-3 border border-transparent border-b-gray-500 outline-none text-center"/>
                    <input type="password" id="password" onChange={(ev)=>setSignPassword(ev.target.value)} placeholder="Password" className="text-white placeholder:text-pro-100 placeholder:font-normal focus:border-b-green-500 w-full bg-transparent py-3 border border-transparent border-b-gray-500 outline-none text-center"/>
                    <button onClick={submitEmail} className="w-full py-2.5 rounded-md mt-4 bg-green-500 font-bold text-black">Sign Up with Email</button>
                </div>
                <img src={bg1} className="absolute -bottom-[30%] left-[30rem] w-[80rem] rotate-[10deg] " />
            </div>
        </div>

    )
}
/***
 *             <div className="w-96 bg-gray-800 flex flex-col p-7 mt-20">
                <p>Register</p>
                <label htmlFor="email">Correo</label>
                <input className="h-12 px-4" type="email" id="email" onChange={(ev)=>setSignEmail(ev.target.value)}/>

                <label htmlFor="password">Password</label>
                <input className="h-12 px-4" type="password" id="password" onChange={(ev)=>setSignPassword(ev.target.value)}/>

                <button onClick={submit} className="w-full py-2 bg-violet-500 text-black font-bold mt-4">Registrate papu</button>
                <button onClick={read}>Read Papu</button>
                <button onClick={subacc} className="mt-8 p-4 w-full bg-white text-black">subaccount papu</button>
            </div>
 */