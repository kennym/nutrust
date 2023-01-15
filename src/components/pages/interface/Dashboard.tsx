import { useState, useEffect } from "react";
import 'firebase/auth'
import { getAuth, onAuthStateChanged } from "firebase/auth";

import firebaseConfig from '../../../firebase__config'
import { collection, getDocs, initializeFirestore } from "firebase/firestore"; //db
import { initializeApp } from "firebase/app";
import { Link } from "react-router-dom";


export default (props:any) => {

    const [signed, setSigned] = useState('')
    const [plans, setPlans] = useState([])
    const [price, setPrice] = useState(0);

    const app = initializeApp(firebaseConfig);
    const db = initializeFirestore(app, {
        experimentalForceLongPolling: true
    });

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setSigned(uid)
            console.log(uid)
        } else {
            window.location.href='/login'    
        }
    });

    const contable = async(plan:any, plan_id: any) => {
        await getDocs(collection(db, 'trades'))
        .then((QuerySnapshot) => {
            QuerySnapshot.forEach((i:any) => {
                const trade = i.data()
                if (trade.plan_id == plan_id){
                    if (trade.closed_price) {
                        const __profit = ((parseFloat(trade.closed_price) * 100 / parseFloat(trade.open_price))-100) * trade.quantity/100
                        plan.account__balance = Math.round((plan.account__balance - __profit) * 100) / 100
                    } else {
                        const __profit = ((price * 100 / parseFloat(trade.open_price))-100) * trade.quantity/100
                        plan.account__balance = Math.round((plan.account__balance - __profit) * 100) / 100
                    }
                }
            })
        })
    }

    const getPlans = async() => {
        await getDocs(collection(db, 'plans'))
        .then((QuerySnapshot) => {
            let aux__:any = []
            QuerySnapshot.forEach((i) => {
                const plan = i.data()
                const plan_id = i.id
                if (plan.uid == props.user__.uid){
                    contable(plan, plan_id)
                    aux__.push({plan: plan, id: plan_id})
                }
            })
            setPlans(aux__);
        })
    }

    useEffect(() => {
        const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');
        ws.onmessage = (e) => {
            setPrice(JSON.parse(e.data).c)
        }
    }, [])
    
    useEffect(() => {
        getPlans()
        console.log('oasa')
    }, [props.user__.uid]);

    return(
        <div className="w-full flex justify-center text-white font-normal">
            <div className="fixed top-14 left-0 w-64 h-screen border border-transparent border-r-gray-500 flex flex-col p-6">
                <p className="mt-4 font-medium">Hi, Juan.</p>

                <Link to="/" className="flex items-center mt-12">
                    <div className="w-5 h-5 border"></div>
                    <p className="ml-4 text-sm">My Plans</p>
                </Link>
                <Link to="/" className="flex items-center mt-5">
                    <div className="w-5 h-5 border"></div>
                    <p className="ml-4 text-sm">Trading</p>
                </Link>
                <Link to="/" className="flex items-center mt-5">
                    <div className="w-5 h-5 border"></div>
                    <p className="ml-4 text-sm">Buy Plans</p>
                </Link>
            </div>
            <div className="w-[calc(100%_-_16rem)] ml-64 min-h-screen max-w-[1600px] flex flex-col mb-72 p-7 text-white">
                <p className="text-xl mb-16">My Plans</p>
                {
                    plans.map((plan:any, key) => {
                        return (
                            <div key={key} className="plan w-full py-4 flex justify-between items-center border border-transparent border-b-gray-500">
                                <div className="flex flex-col">
                                    <p className="text-lg">Star Trader #{plan.id}</p>
                                    <p className="text-5xl mt-2 flex items-center">${plan.plan.account__balance} <span className="text-green-500 ml-4 text-sm">Active</span> </p>
                                </div>
                                <Link to="/trade" className="py-2 px-4 rounded-md bg-green-500 text-black font-semibold">Trade</Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

/**
 *                 <div className="plan w-full py-4 flex justify-between items-center border border-transparent border-b-gray-500">
                    <div className="flex flex-col">
                        <p className="text-lg">Star Trader #31278312</p>
                        <p className="text-5xl mt-2 flex items-center">$10,052.00 <span className="text-green-500 ml-4 text-sm">Active</span> </p>
                    </div>
                    <button className="py-2 px-4 rounded-md bg-green-500 text-black font-semibold">Trade</button>
                </div>
                <div className="plan w-full py-4 flex justify-between items-center border border-transparent border-b-gray-500">
                    <div className="flex flex-col">
                        <p className="text-lg">Star Trader #31278312</p>
                        <p className="text-5xl mt-2 flex items-center">$10,052.00 <span className="text-red-500 ml-4 text-sm">Not Passed</span> </p>
                    </div>
                    <button className="py-2 px-4 rounded-md bg-green-500 text-black font-semibold">Trade</button>
                </div>
 */
