import { useEffect, useState } from "react";
import 'firebase/auth'
import { getAuth, onAuthStateChanged } from "firebase/auth";

import firebaseConfig from '../../../firebase__config'
import { initializeFirestore } from "firebase/firestore"; //db
import { initializeApp } from "firebase/app";

import axios from 'axios'

import logo from '../../../assets/brand.svg';
import token from '../../../assets/usdt.png';
import qr from '../../../assets/qr.png';
import { doc, setDoc } from "firebase/firestore";

export default (user__:any) => {

    const [signed, setSigned] = useState('')
    const [address, setAddress] = useState('Loading...')
    const [amount, setAmount] = useState('Loading...')
    const [status, setStatus] = useState('Creating...')
    const [challenge, setChallenge] = useState<String | null>('Loading...')
    const [payID__, setPayID__] = useState('Loading')

    const app = initializeApp(firebaseConfig);
    const db = initializeFirestore(app, {
        experimentalForceLongPolling: true
    });

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setSigned(uid)
        } else {
            window.location.href='/login'    
        }
    });

    const create__gateway = () => {
        console.log('se hace')
        if(payID__ == 'Loading'){
            const data = {
                price_amount: 152.48,
                price_currency: 'usd',
                pay_amount: 152.48, //amount payed
                pay_currency: 'USDTTRC20', //coin and Address
                ipn_callback_url: 'https://nowpayments.io',
                order_id: 'STAR',
                order_description: 'STAR Trader'
            };
    
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
                setPayID__(response['data']['payment_id'])
    
                const addPayment = async () => { //create plan
                    await setDoc(doc(db, "payments", response['data']['payment_id']), {
                        balance: 10000, 
                        status: 'waiting',
                        uid: signed
                    })
                    .then(docRef => {
                        console.log("Pago creado");
                        setStatus('Awaiting Payment')
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
    
    useEffect(() => {
        create__gateway()
    }, [])

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        console.log(urlParams.get("challenge"))
        setChallenge(urlParams.get("challenge"));
    }, []);

    useEffect(() => {
        const get__status = () => {
            axios.get('https://api-sandbox.nowpayments.io/v1/payment/' + payID__, {
                headers: {
                    'x-api-key': 'NXR10KS-FJEMT1T-P99QD90-SKRKP1T',
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                    if (response['data']['payment_status'] != 'waiting'){
                        let str = response['data']['payment_status']
                        str = str.charAt(0).toUpperCase() + str.slice(1);
                        setStatus(str)
                        if (response['data']['payment_status'] == 'finished')
                            setTimeout(() => {
                                window.location.href = "/dashboard"
                            }, 2000)
                    }
            }).catch(error => {
                    console.log(error);
            });
        }
        const interval = setInterval(() => {
            if(payID__)
                get__status();
        }, 5000);
        console.log(payID__)
        return () => clearInterval(interval);
    }, [payID__]);

    return(
        <div className="w-full flex justify-center">
            <div className="w-full max-w-[1600px] justify-between flex items-center min-h-[calc(100vh_-_3.5rem)] mb-72 px-14 text-white">
                <div className="w-1/2 flex flex-col font-normal">
                    <div className="flex items-center">
                        <div className="w-14 h-14 rounded-[50%] bg-gray-800 flex justify-center items-center">
                            <img src={logo} alt="" className='brand w-8' />
                        </div>
                        <p className='ml-4 text-xl'>NuTrustX Star</p>
                    </div>

                    <p className="flex items-center mt-12"><div className="w-2 h-2 rounded-xl mr-2 bg-green-500"></div> {status}</p>
                    <p className="text-sm text-pro-100 mt-2">Note: Cuando un pago sea ingresado bajo el monto y la dirección establecida tu plan será agregado. No es necesario mantener esta pestaña abierta luego del pago.</p>
                    <p className='mt-12 text-xl'>Star Trader</p>
                    <p className='text-5xl'>$10,000.00</p>
                    <p className='text-sm text-pro-100 leading-4'>For mid-professional <br/>traders</p>

                    <span className='text-sm mt-12 text-pro-100'>Minimum Trading Days</span>
                    <p className='text-sm'>10</p>

                    <span className='text-sm mt-4 text-pro-100'>Other Req</span>
                    <p className='text-sm'>Req Response</p>

                </div>
                <div className="w-1/3 border border-transparent border-l-gray-500 pl-7 flex flex-col justify-center py-7 font-normal h-full">
                    <p className='text-lg font-medium w-full flex items-center justify-between'>Pay with Cryptocurrencies <span className="text-sm text-pro-100">ID: {payID__}</span></p>
                    <span className='mt-6'>Payment Method</span>
                    <div className="flex items-center mt-2">
                        <img src={token} alt="" className='w-6'/>
                        <p className='font-medium ml-2'>USDT</p>
                    </div>

                    <span className='mt-6'>Network</span>
                    <p className='font-medium mt-1'>TRC20</p>
                    
                    <div className="flex items-center mt-10">
                        <img src={qr} alt="" />
                        <div className='text-sm ml-4'>
                            <p className='text-pro-100'>USDT - TRC20</p>
                            <p>Scan this Address</p>
                        </div>
                    </div>

                    <span className='mt-6'>Address</span>
                    <p>{address}</p>

                    <span className='mt-6'>Amount to receive</span>
                    <p>{amount} USDT</p>

                    <button className='mt-4 rounded-md bg-green-500 py-2.5 w-full font-bold text-black'>I Have Paid</button>
                    <p className='text-pro-100 text-sm mt-4'>This address is being synced every 5 seconds in our systems. When the payment is confirmed on the blockchain, you will be automatically redirected. The button will send an immediate sync.</p>
                </div>
            </div>
        </div>
    )
}