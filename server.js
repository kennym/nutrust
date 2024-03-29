import express from 'express';
const app = express();

import firestore from 'firebase-admin';
import axios from 'axios'

import cors from 'cors'
import WebSocket from 'ws'



firestore.initializeApp({
    credential: firestore.credential.cert({
        "type": "service_account",
        "project_id": "nutrustx",
        "private_key_id": "b88a48a6fd2e35a182a4a8003b3f1b99bb548d90",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCeurHP5DLV/FUd\nUQ9w42umO7QUmNIRSW/HOxzA5uQmBS/2UtylEZ1x9DaT9tGeM8/06Y1diRHn1vdb\nQIlMVIF6Gis+3TabABiyRgOXCBxPvVfuH8Plo2W0dapVDI0FL3nIpa5U+eiNbU+t\n/i70DPShhRyBhOy86xJPMBiPZQEiCjN7OFXVTVXeaXnAQKIuWVFOm85Fq0O5cz4E\nCRZFs9ClrVcQSEKzGi6m1mTeS1SXne1QHSSLsunxwzui8Xm8k/88t+WqAXshzgOy\nNoYEdNZgwpjDOgU1X3Jhie7Y+/vv12+yDtjH1C2Vq4TJdAnvmptYEaK8OvIUPXWM\nteHtbF2nAgMBAAECggEAAU8f3UuQAcTJfOroujEd96qBYzQZc2wMIHQD2jFtS0T6\nrsjjKfdZuZFei9zawLfDrMzqTg2t2KAkvRtspnUB9lxV4/hWFXQsP/gk2m+GMEAr\nA/s+FdxBn/nidD4cwaCxG+8F34yKFvSCVjiE8Z1TvStIX2cVvr8fkQigAzq9hibV\nDyxpNQtzqM14ekfpAVeY7VUMGJDZd0hugTnzYjRivyUDHqXan9hkTP9ZDF8w3v4C\nBgptWXOkVReAkokpuq7ydN5aty0mJ8UqkMwD+/9x8D6IDJp55jsx9t8U3CUCYl/5\nYfwtvZOYPNg7Ck2hMBwt6KCkAXh7nMJnjieSzReGFQKBgQDQfMgO57uLl8wMb/Ev\nDG9NfWLlwNy2s0FrUJ8PhGFslaGlR3nW7AV3IQG4F2+XFr7pcdBsbZxaBa/hQ2FX\nkANSl6yKr8UguqzC8yJ7tDc8Fgex83WRi7WiSXd3oGGO4nzLmu1sn5sdkpkJRjFO\nwxIDXwH2HvyLJ+q8qanM0dr2xQKBgQDC5wH5+7QIM5ui88SJ+/mEcVLBY+o+VoY7\nEAfuhrNFvFOP1/mhND8JwEEdooMOK+kw1zfuZ/q4TquMj4aJBpc9MNs91ZfYMPut\nOfLAqCIpehue/e9Qg/bsPmo3LFnC1cTZoWctR4+WykA+KTCAF8GoZ6G6TAVKJ0hj\n12HU2g1pewKBgQCAknNNvdsK2zIa+W3jdeeuAgVbavSyNxnA9JcjGqB6NkzZgJrC\n0AsOzGwi+1D1/DEABhBizbX+TkOIx+Tf+xARfzgIzxzicjzYfNhnMVxe0bctJtb6\nSw5YZrYmL+H6G/KaHZENy9/8/MsjzQXbbLFPIugywCk+J/+7GWZ9yW0fgQKBgAM5\nRvMXkrbAA8cCOTH/FPV32mKQgINfcwDvFvJ/D+ALaWZrsBlWf+RtZaZT1c8aMtU3\n+hjbZ248/uFoTlVd4oqEkFvJeKV+yernlnhRT59YAbTzhk3SoPbvYVpgRWvPlV30\nKXy6PknENqPQkpjLy8w5SpeGQmAjnjLokRmwMaCZAoGACJdBx093HBy5qgiClhbQ\nkGulC0VYKmryo5CWyQ/B0xSGcwmhUE3JWxWD8zz9UrDo/YJbml1M+Cff9d0X1TC2\nRzIualFrq2hJuf+EkjKUwMY2h3iLaxkzdID6+2Fnlzs9v5XHmUIVgG20M7oIxxCI\nr3Ier2cW2F5cWBE3okbEyoE=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-3m2le@nutrustx.iam.gserviceaccount.com",
        "client_id": "114511918736178396173",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-3m2le%40nutrustx.iam.gserviceaccount.com"
    })
});

const db = firestore.firestore(); 
const payments__ = db.collection('payments');





let price = 0
let ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');
ws.on('open', function open() {
    console.log('Conexión establecida con éxito');
});
ws.on('message', function incoming(data) {
    price = JSON.parse(data).c
});




app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello world Express');
})

app.get('/test', (req, res) => {
    res.json([
        {"data":price}
    ]);
});




app.listen(3000, () => {

    console.log('listening')

    const interval = setInterval(async() => {
        
        const snapshot = await payments__.get();
        snapshot.forEach(document => {
            axios.get('https://api-sandbox.nowpayments.io/v1/payment/' + document.id, {
                headers: {
                    'x-api-key': 'NXR10KS-FJEMT1T-P99QD90-SKRKP1T',
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                if (response['data']['payment_status'] == 'finished'){

                    const id = Math.random().toString(36)

                    const item__ref = db.collection('plans').doc(id);
                    const add = async() => {
                        await item__ref.set({
                            'account__balance': document.data()['balance'], 
                            'password': Math.random().toString(36),
                            'uid': document.data()['uid'] 
                        });
                    }
                    add()

                    const remove = async() => {
                        await db.collection('payments').doc(document.id).delete();
                    }
                    remove()
                }
            }).catch(error => {
                    console.log('error');
            });
        });
    }, 3000);
    interval

})

