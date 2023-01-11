import {useState} from "react";
import axios from 'axios';

import 'firebase/auth'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from '../../firebase__config'
import { initializeFirestore, QuerySnapshot } from "firebase/firestore"; //db
import { initializeApp } from "firebase/app";
import { collection, doc, setDoc, getDocs } from "firebase/firestore"; 
import { createSubaccount } from "../Subaccount";

axios.post('https://test.deribit.com/api/v2/private/set_password_for_subaccount', {
  params: {
    sid: 48437,
    password: 'ABCDEFGHIJKLMO'
  },
  headers: {
    Authorization: 'Bearer 1673995935739.1LfwMeJO.NOB4u4H98usgHrtjPJqGDwzXRPyNbLxtqu5uG7Pw5WS_O6UTvd4PdGx-6W3FhO4i_IilQqnknvr4Tuz4rKr82l0IMoLC5l1Mq3D-yjL2W4RacDy44qw3sBMqh63XMZagskrLZZbuhLHCdFTrJbvHwuZm4lU3ammXLKRMmAb0q2NIcl42O36k06GChCN7O7Qq-pl3zTL7kcEKe6pXKj7mw2BV001opTN57_3OLLLJglS0uD_mHyQGTkRF39mmlELUUvy0h1l1tn7UFv5dGeYtrRfF-qZWyxwxY6RQMsyjy0WNtbAVbzXVA9PaKQOmsK-uGBLEgGDhNW8oL1-JdQgd24r2ntms0w","expires_in":899,"access_token":"1673392035739.1LG9x0kT.Qny_5ZZ1oXhwCBxUWIbcPbNtwnNlBEpALwx6lRUeI78vGo8sWTkaYVhSZCQTdA_A4eQx-3pHtpqMrvaOP5xTrm46N25z5cy1fK6XiGaI0tTJyIicE6vFAJ0MRwZWMgGTJfRCoGcaLluPAikqpYclAV9VSTLAQ_3lf5SU11RP-X18tOq0wLBvaaPB4YPvRN5TCoY9fc1qxVkJvDi6bfiJlLlgMfyJAXYC_IB9x1O5gGDE3JgIWcU59-4NTAcybD9mtoEnHSs3m75qTadxRoyRFqgauiAGDZS372sKwxgbnvrcPvCz9Ifa7VYAgc5Z9cBFhkcw3yx18pvp0FAG_NRzOJxH2AhkIPg',
    'Content-Type': 'application/json'
  }
})
.then(response => {
    console.log(response);
})
.catch(error => {
    console.log(error);
});

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
        createSubaccount()
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