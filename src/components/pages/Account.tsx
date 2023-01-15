import { useEffect, useState } from "react";

import firebaseConfig from '../../firebase__config'
import { initializeFirestore, getDocs, collection } from "firebase/firestore"; //db
import { initializeApp } from "firebase/app";

export default (props:any) => {

    const [plans, setPlans] = useState([])

    const app = initializeApp(firebaseConfig);
    const db = initializeFirestore(app, {
        experimentalForceLongPolling: true
    });

    useEffect(() => {
        
        const getPlans = async() => {
            await getDocs(collection(db, 'plans'))
            .then((QuerySnapshot) => {
                let aux__:any = []
                QuerySnapshot.forEach((i) => {
                    const plan = i.data()
                    if (plan.uid == props.user__.uid){
                        aux__.push(plan)
                    }
                })
                setPlans(aux__);
            })
        }
        getPlans()
    }, [props.user__.uid]);

    return(
        <div className="w-96 mt-4 border rounded-xl p-4 flex flex-col bg-white text-black">
            <p className="text-2xl">Tus planes:</p>
            {
                plans.map((plan:any, key) => {
                    return (
                        <div key={key} className="border border-black p-4 rounded-sm">
                            <h1>Plan X</h1>
                            <p>Balance: {plan.account__balance}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}
