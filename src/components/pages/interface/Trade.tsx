import "firebase/auth";

import "../../../Platform.css";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  initializeFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import dropdown from "../../../assets/arrow-right.png";
import token from "../../../assets/usdt.png";
import firebaseConfig from "../../../firebase__config";

//db


export default (props: any) => {
  const [plans, setPlans] = useState([]);
  const [selected__, setSelected__] = useState<string | null>(null);
  const [trades, setTrades] = useState([]);
  const [update, setUpdate] = useState(0);
  const [price, setPrice] = useState(0);
  const [signed, setSigned] = useState("");

  const app = initializeApp(firebaseConfig);
  const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
  });

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setSigned(uid);
    } else {
      window.location.href = "/login";
    }
  });

  const create__trade = async () => {
    const trade = {
      quantity: 100,
      plan_id: selected__,
      status: "open",
      uid: props.user__.uid,
      open_at: Date.now(),
      open_price: price,
    };

    if (selected__ == null) return console.log("Select a plan");

    await setDoc(doc(db, "trades", Math.random().toString(36)), trade)
      .then(async () => {
        console.log("trade open");
        setUpdate(update + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = async (e: any) => {
    console.log("xd");
    const selectedPlanId = e.target.id;
    console.log("Selected plan id: ", selectedPlanId);
    setSelected__(selectedPlanId);
  };

  const close__trade = async (__plan: any) => {
    const trade = {
      status: "closed",
      closed_at: Date.now(),
      closed_price: price,
    };

    await updateDoc(doc(db, "trades", __plan), trade)
      .then(async () => {
        setUpdate(update + 1);
        getPlans();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const contable = async (plan: any, plan_id: any) => {
    console.log("sucede");
    await getDocs(collection(db, "trades")).then((QuerySnapshot) => {
      QuerySnapshot.forEach((i: any) => {
        const trade = i.data();
        if (trade.plan_id == plan_id) {
          console.log("sucede");
          if (trade.closed_price) {
            const __profit =
              (((parseFloat(trade.closed_price) * 100) /
                parseFloat(trade.open_price) -
                100) *
                trade.quantity) /
              100;
            plan.account__balance =
              Math.round((plan.account__balance - __profit) * 100) / 100;
          } else {
            const __profit =
              (((price * 100) / parseFloat(trade.open_price) - 100) *
                trade.quantity) /
              100;
            plan.account__balance =
              Math.round((plan.account__balance - __profit) * 100) / 100;
          }
        }
      });
    });
  };

  const getPlans = async () => {
    console.log("sucede");
    await getDocs(collection(db, "plans")).then((QuerySnapshot) => {
      let aux__: any = [];
      QuerySnapshot.forEach((i) => {
        const plan: any = i.data();
        const plan_id = i.id;
        if (plan.uid == props.user__.uid) {
          console.log("sucede");
          contable(plan, plan_id);
          aux__.push({ plan: plan, id: plan_id });
        }
      });
      setPlans(aux__);
    });
  };

  const getTrades = async () => {
    await getDocs(collection(db, "trades")).then((QuerySnapshot) => {
      let aux__: any = [];
      QuerySnapshot.forEach((i) => {
        const plan = i.data();
        const plan_id = i.id;
        if (plan.uid == props.user__.uid && plan.status == "open") {
          aux__.push({ plan: plan, id: plan_id });
        }
      });
      setTrades(aux__);
    });
  };

  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@ticker");
    ws.onmessage = (e) => {
      setPrice(JSON.parse(e.data).c);
    };
    console.log("sucede");
  }, []);

  useEffect(() => {
    getPlans();
    console.log("sucede");
  }, [props.user__.uid]);

  useEffect(() => {
    getTrades();
    console.log("sucede");
  }, []);

  return (
    <>
      {signed && (
        <div className="flex w-full overflow-x-auto min-w-[1200px] min-h-[600px] h-[calc(100vh_-_3.5rem)] overflow-y-hidden font-normal text-white">
          <div className="top-14 left-0 min-w-[250px] w-[20%] border border-r-gray-800 border-transparent h-[calc(100vh_-_3.5rem)] flex flex-col justify-between">
            <div className="w-full">
              <div className="cursor-pointer font-medium w-full h-14 border border-b-gray-800 border-transparent flex px-4 items-center justify-between">
                <div className="flex items-center">
                  <img src={token} alt="" className="mr-4" />
                  <p className="text-sm">BTCUSDT</p>
                </div>
                <img src={dropdown} alt="" />
              </div>

              <div className="w-full relative">
                <div className="cursor-pointer w-full h-14 border border-b-gray-800 border-transparent flex px-4 items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-sm">Star Trader</p>
                    <p className="text-xs ml-2 text-pro-100">#{selected__}</p>
                  </div>
                  <img src={dropdown} alt="" />
                </div>
                <div className="absolute left-0 w-96 flex flex-col px-4 pt-4 bg-black z-20 border border-gray-500">
                  <p>Your accounts</p>
                  <div
                    key="8327"
                    id="9237283"
                    onClick={(e) => handleChange(e)}
                    className="flex items-center justify-between py-4 border border-transparent border-b-gray-800 hover:border-b-green-500 cursor-pointer"
                  >
                    <p className="text-sm">Star Trader ($10,000.00)</p>
                    <p className="text-xs ml-2 text-pro-100">#9237283</p>
                  </div>
                  {plans.map((plan: any, key) => {
                    return (
                      <div
                        key={plan.id}
                        id={plan.id}
                        onClick={() => setSelected__(plan.id)}
                        className="flex items-center justify-between py-4 border border-transparent border-b-gray-800 hover:border-b-green-500 cursor-pointer"
                      >
                        <p className="text-sm">
                          Star Trader ($
                          {plan.plan.account__balance})
                        </p>
                        <p className="text-xs ml-2 text-pro-100">#{plan.id}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="w-full my-4 shrink-0">
              <div className="w-full flex items-center px-4 text-[14px] ">
                <button className="w-1/2 bg-green-500 font-semibold text-black py-2.5">
                  Long
                </button>
                <button className="w-1/2 bg-white font-semibold text-black py-2.5">
                  Short
                </button>
              </div>

              <p className="text-sm flex items-center justify-between px-4 mt-4">
                Balance ≈ <span>10,000.00</span>
              </p>
              <p className="text-sm flex items-center justify-between px-4 mt-2">
                Order Type <span>Market Order</span>
              </p>

              <div className="w-full flex relative items-center px-4 mt-4">
                <input
                  type="text"
                  placeholder="0.00"
                  className="placeholder:text-pro-100 w-full bg-gray-800 h-10 border border-gray-700 px-4"
                />
                <div className="absolute w-20 h-full border border-gray-700 bg-gray-800 flex items-center justify-center right-4">
                  USDT
                </div>
              </div>
              <div className="w-full flex relative items-center px-4 -mt-[1px]">
                <input
                  type="text"
                  placeholder="0.00"
                  className="placeholder:text-pro-100 w-full bg-gray-800 h-10 border border-gray-700 px-4"
                />
                <div className="absolute w-20 h-full border border-gray-700 bg-gray-800 flex items-center justify-center right-4">
                  USDT
                </div>
              </div>

              <p className="text-sm flex items-center justify-between px-4 mt-4">
                Fee ≈ <span>0.52%</span>
              </p>
              <p className="text-sm flex items-center justify-between px-4 mt-2">
                Total ≈ <span>0.0572 BTC</span>
              </p>

              <div className="w-full px-4 mt-6 text-[14px]">
                <button className="shrink-0 w-full bg-green-500 font-semibold text-black py-2.5">
                  Place Order
                </button>
              </div>
            </div>
          </div>

          <div className="shrink-0 top-14 xl:left-[20%] left-[250px] min-w-[250px] w-[25%] min-h-[600px] h-[calc(100vh_-_3.5rem)]">
            <div className="h-full w-full flex flex-col">
              <div className="w-full h-14 flex items-center px-4 shrink-0">
                <p className="text-sm">24,482.58 USDT</p>
              </div>
              <div className="w-full shrink-0 border h-14 bg-gray-800 border-gray-800 border flex items-center px-4">
                <p className="text-sm">Order Book</p>
              </div>
              <div className="w-full shrink-0  h-72 border border-transparent border-r-gray-800"></div>
              <div className="w-full shrink-0 border h-14 bg-gray-800 border-gray-800 border flex items-center px-4">
                <p className="text-sm">Spread 0.001 USD</p>
              </div>
              <div className="w-full shrink-0  h-72 border border-transparent border-r-gray-800"></div>
            </div>
          </div>

          <div className="mt-14 left-[45%] orderBox w-[55%] h-[calc(100%_-_7rem)]">
            <div className="w-full outline outline-[1px] outline-gray-800 h-[21.5rem] flex items-center justify-center">
              <p className="text-3xl text-pro-100">Provided by Trading View</p>
            </div>
            <div className="w-full border h-14 bg-gray-800 border-gray-800 border flex items-center px-4">
              <p className="text-sm">Order Book</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/**<div className="w-full h-screen flex justify-center items-center">
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
                </div> */
