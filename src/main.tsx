import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

import {
  FirebaseAppProvider
} from 'reactfire'
import firebaseConfig from './firebase__config'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Suspense fallback={'Conectando la app...'}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </FirebaseAppProvider >
)
