import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'

import { useFirebaseApp } from 'reactfire'
import { getAuth, signOut } from "firebase/auth";

import Navbar from './components/Navbar';
import Footer from './components/Footer';

//Home
import Login from './components/pages/home/Login';
import Signup from './components/pages/home/Signup';
import Home from './components/pages/home/Home';
import Challenges from './components/pages/home/Challenges';

//Interface
import Dashboard from './components/pages/interface/Dashboard';
import Products from './components/pages/home/Products';
import Pay from './components/pages/Pay';
import Account from './components/pages/Account';
import Gateway from './components/pages/interface/Gateway';
import Trade from './components/pages/interface/Trade';

function App() {

  const firebase = useFirebaseApp();

  const [user__, setUser__] = useState({}) //for logout
  const [uid, setUid] = useState('')
  const auth = getAuth();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
        if (user)
          setUser__(user)
    });
  }, [user__]);

  const logout = async() => {
    signOut(auth).then(() => {
        setUser__({})
        console.log('Desloguea3')
    }).catch((error) => {
        console.log('error papu')
    })
  }
  
  return (
    <div className="App pt-14">
      <Navbar user__={user__} auth={auth} logout={logout}/>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login user__={user__}/>}/>
        <Route path="/signup" element={<Signup user__={user__} />}/>

        <Route path="/pay" element={<Pay user__={user__} />}/>
        <Route path="/account" element={<Account user__={user__} />}/>
        <Route path="/dashboard" element={<Dashboard user__={user__} />}/>
        <Route path="/products" element={<Products user__={user__} />}/>
        <Route path="/challenges" element={<Challenges />}/>

        <Route path="/gateway" element={<Gateway user__={user__} />}/>
        <Route path="/trade" element={<Trade user__={user__} />}/>
      </Routes>
      {window.location.pathname !== '/trade' && <Footer/>}
    </div>
  )
}

export default App