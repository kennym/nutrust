import {useState, useEffect } from "react";
import axios from 'axios';

import firebaseConfig from '../../firebase__config'
import { initializeFirestore, doc, setDoc } from "firebase/firestore"; //db
import { initializeApp } from "firebase/app";

// IPN 5lDiNNH82gEbto+6950NZpob5BaV3uhI

export default (props:any) => {

    const [pay, setPay] = useState('')
    const [amount, setAmount] = useState('')
    const [address, setAddress] = useState('')
    const [currency, setCurrency] = useState('') //currency + network

    const[payID__, setPayID__] = useState('')
    const[payment__status, setPayment__status] = useState(null)

    const app = initializeApp(firebaseConfig);
    const db = initializeFirestore(app, {
        experimentalForceLongPolling: true
    });

    const data = {
        price_amount: 12,
        price_currency: 'usd',
        pay_amount: 12, //amount to pay in USDT
        pay_currency: 'USDTTRC20', //coin and Address
        ipn_callback_url: 'https://nowpayments.io',
        order_id: 'SILVER',
        order_description: 'Silver Plan'
    };

    const pay__ = () => {
        if (!pay){
            setPay('paying')
            axios({
                method: 'POST',
                url: 'https://api-sandbox.nowpayments.io/v1/payment',
                headers: {
                  'x-api-key': 'NXR10KS-FJEMT1T-P99QD90-SKRKP1T',
                  'Content-Type': 'application/json',
                },
                data,
            }).then(response => {
                setAmount(response['data']['pay_amount'])
                setAddress(response['data']['pay_address'])
                setCurrency(response['data']['pay_currency'] + ' Network: ' + response['data']['network'])
                setPayID__(response['data']['payment_id'])

                const addPayment = async () => { //create plan
                        await setDoc(doc(db, "payments", response['data']['payment_id']), {
                            balance: 10000, 
                            status: 'waiting',
                            uid: props.user__.uid
                        })
                        .then(docRef => {
                            console.log("Document has been added successfully");
                        })
                        .catch(error => {
                            console.log(error);
                        })
                    }
                    addPayment()
                    
                })
                .catch(error => {
                    console.log(error);
            });
        }
    }

    const confirm__payment = () => {
        //check the api
    }

    useEffect(() => {
        const get__status = () => {
            axios.get('https://api-sandbox.nowpayments.io/v1/payment/' + payID__, {
                headers: {
                    'x-api-key': 'NXR10KS-FJEMT1T-P99QD90-SKRKP1T',
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                    setPayment__status(response['data']['payment_status'])
            }).catch(error => {
                    console.log(error);
            });
        }
        const interval = setInterval(() => {
            if(payID__)
                get__status();
        }, 5000);
        return () => clearInterval(interval);
    }, [payID__]);

    return(
        <div className="w-full h-screen flex flex-col items-center justify-center">
        {
            !pay && payment__status != 'finished' &&
            
            <div className="w-96 mt-4 border rounded-xl p-4 flex flex-col bg-white text-black">
                <p className="text-3xl">Plan Details: Silver</p>
                <p>You will have 10,000$ for trade</p>
                <p>Max drawdown de 10%</p>
                <p>You will pay: 10$</p>
                <button onClick={pay__} className="mt-20 h-10 rounded-xl w-full bg-green-500 font-bold text-sm">Pay</button>
            </div>
            
        }
        {
            pay && payment__status != 'finished' &&
            <div className="w-96 mt-4 border rounded-xl p-4 flex flex-col bg-white text-black">
                <p className="text-3xl">Your link has been created</p>
                <p>Amount to pay: {amount}</p>
                <p>Address to Pay: {address}</p>
                <p>Currency: <span className="uppercase">{currency}</span></p>
                <p className="mt-16 text-xs">Note: nuestros sistemas reciben una notificación de nuestro proveedor de pagos cuando el pago está siendo confirmado o ya ha sido procesado.</p>
                <p>Payment Status: {payment__status} </p>
                <button onClick={confirm__payment} className="mt-4 h-10 rounded-xl w-full bg-green-500 font-bold text-sm">I have paid</button>
            </div>
        }
        {
            payment__status == 'finished' &&
            <div className="w-96 mt-4 border rounded-xl p-4 flex flex-col bg-white text-black">
                <p className="text-3xl">Has pagado!! Plan acreditado Comienza a operar</p>
                <p>''RECIBO''</p>
                <button className="mt-4 h-10 rounded-xl w-full bg-green-500 font-bold text-sm">Account</button>
            </div>
        }
        </div>
        
    )
}


    /*const db = initializeFirestore(app, {
        experimentalForceLongPolling: true
    });*/

    //check pending payments [en el futuro]
    /*(async () => { //create user doc in firebase
        if (props.user__) {
            const test = await getDoc(doc(db, "users", props.user__));
            console.log(test.data())
        }
    })();*/