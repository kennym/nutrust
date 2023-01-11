import {useState} from "react";
import 'firebase/auth'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default () => {

    const [log__email, setLogEmail] = useState('')
    const [log__password, setLogPassword] = useState('')

    const auth = getAuth();

    const submit = () => {
        signInWithEmailAndPassword(auth, log__email, log__password)
    }

    return(
        <div className="w-full flex items-center justify-center">
            <p>Sign in into your account</p>

            <div className="w-96 bg-gray-800 flex flex-col p-7 mt-20">
                <p>Login</p>
                <label htmlFor="email">Correo</label>
                <input className="h-12 px-4" type="email" id="email" onChange={(ev)=>setLogEmail(ev.target.value)}/>

                <label htmlFor="password">Password</label>
                <input className="h-12 px-4" type="password" id="password" onChange={(ev)=>setLogPassword(ev.target.value)}/>

                <button onClick={submit} className="w-full py-2 bg-violet-500 text-black font-bold mt-4">Logeate papu</button>
            </div>
            
        </div>
    )
}