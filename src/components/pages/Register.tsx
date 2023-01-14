import {useState} from "react";

import 'firebase/auth'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from '../../firebase__config'
import { initializeApp } from "firebase/app";
import { collection, getDocs } from "firebase/firestore"; 

export default () => {

    const [sign__email, setSignEmail] = useState('')
    const [sign__password, setSignPassword] = useState('')
    const [exchange__account, setExchange__account] = useState('')

    const app = initializeApp(firebaseConfig);

    const auth = getAuth();

    const submit = () => {

        createUserWithEmailAndPassword(auth, sign__email, sign__password).then((userCredential) => {

            /*const user = userCredential.user;
            const user__data = {
                pay_gateway: ''
            };

            (async () => { //create user doc in firebase
                await setDoc(doc(db, "users", sign__email), user__data);
            })();*/

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

    const subacc = async() => {
        console.log('trying')
    }

    return(
        <div className="w-full flex items-center justify-center">
            <div className="w-96 bg-gray-800 flex flex-col p-7 mt-20">
                <p>Register</p>
                <label htmlFor="email">Correo</label>
                <input className="h-12 px-4" type="email" id="email" onChange={(ev)=>setSignEmail(ev.target.value)}/>

                <label htmlFor="password">Password</label>
                <input className="h-12 px-4" type="password" id="password" onChange={(ev)=>setSignPassword(ev.target.value)}/>

                <button onClick={submit} className="w-full py-2 bg-violet-500 text-black font-bold mt-4">Registrate papu</button>
                <button onClick={read}>Read Papu</button>
                <button onClick={subacc} className="mt-8 p-4 w-full bg-white text-black">subaccount papu</button>
            </div>
        </div>
    )
}