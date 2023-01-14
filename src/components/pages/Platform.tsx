import { useEffect, useState } from "react";

import firebaseConfig from '../../firebase__config'
import { initializeFirestore, doc, setDoc, getDocs, collection, updateDoc } from "firebase/firestore"; //db
import { initializeApp } from "firebase/app";

export default (props:any) => {

    const [plans, setPlans] = useState([])
    const [selected__, setSelected__] = useState(null)
    const [trades, setTrades] = useState([])
    const [update, setUpdate] = useState(0)
    const [price, setPrice] = useState(0);
    

    const app = initializeApp(firebaseConfig);
    const db = initializeFirestore(app, {
        experimentalForceLongPolling: true
    });

    useEffect(() => {
        const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');
        ws.onmessage = (e) => {
            setPrice(JSON.parse(e.data).c)
        }
    }, [])

    const create__trade = async() => {
        const trade = {
            quantity: 100, 
            plan_id: selected__,
            status: 'open',
            uid: props.user__.uid,
            open_at: Date.now(),
            open_price: price,
        }

        if (selected__ == null) return console.log('Select a plan')

        await setDoc(doc(db, "trades", Math.random().toString(36)), trade)
        .then(async() => {
            console.log('trade open');
            setUpdate(update+1)
        })
        .catch(error => {
            console.log(error);
        })
    }

    const handleSelect = (e:any) => {
        const id__ = e.target.value;
        setSelected__(id__);
    };

    const close__trade = async(__plan:any) => {
        const trade = {
            status: 'closed',
            closed_at: Date.now(),
            closed_price: price
        }

        await updateDoc(doc(db, "trades", __plan), trade)
        .then(async() => {
            setUpdate(update+1)
            getPlans()
        })
        .catch(error => {
            console.log(error);
        })
    }

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

    const getTrades = async() => {
        await getDocs(collection(db, 'trades'))
        .then((QuerySnapshot) => {
            let aux__:any = []
            QuerySnapshot.forEach((i) => {
                const plan = i.data()
                const plan_id = i.id
                if ((plan.uid == props.user__.uid) && (plan.status == 'open')){
                    aux__.push({plan: plan, id: plan_id})
                }
            })
            setTrades(aux__);
        })
    }

    useEffect(() => {
        getPlans()
        getTrades()
    }, [props.user__.uid]);

    useEffect(() => {
        getTrades()
    }, [update]);

    return(
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-96 border p-4 text-white flex flex-col">
                <p>Elige con que cuenta operar</p>
                <select className="text-black" onChange={handleSelect}>
                    <option value="">Select one</option>
                    {
                        plans.map((plan:any, key) => {
                            return (
                                <option key={key} value={plan.id}>{plan.plan.account__balance} ({plan.id})</option>
                            )
                        })
                    }
                </select>

                <p className="mt-12">Buy 1000 in BTC</p>
                <p className="text-end w-full">Bitcoin price: {price}</p>
                <button onClick={create__trade} className="p-3 text-black font-bold w-full bg-green-500">Buy BTC</button>
            </div>
            <div className="w-96 border p-4 text-white flex flex-col ml-12">
                <p>Mis ordenes:</p>
                {
                    trades.map((planex:any, key) => {
                        return (
                            <div key={key} className="w-full border flex flex-col">
                                <p>ID: {planex.id}</p>
                                <p>Quantity: {planex.plan.quantity}</p>
                                <button onClick={() => close__trade(planex.id)} className="w-fit p-3 px-7 bg-red-500">Close</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}