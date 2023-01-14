import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'

import { useFirebaseApp } from 'reactfire'
import { getAuth, signOut } from "firebase/auth";

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import Pay from './components/pages/Pay';
import Account from './components/pages/Account';
import Platform from './components/pages/Platform';
import Products from './components/pages/Products';
import Challenges from './components/pages/Challenges';

function App() {

  const firebase = useFirebaseApp();

  const [user__, setUser__] = useState('') //for logout
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
        setUser__('')
    }).catch((error) => {
        console.log('error papu')
    })
  }
  
  return (
    <div className="App pt-14">
      <Navbar user__={user__} auth={auth} logout={logout}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/pay" element={<Pay user__={user__} />}/>
        <Route path="/account" element={<Account user__={user__} />}/>
        <Route path="/platform" element={<Platform user__={user__} />}/>
        <Route path="/products" element={<Products user__={user__} />}/>
        <Route path="/challenges" element={<Challenges user__={user__} />}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App