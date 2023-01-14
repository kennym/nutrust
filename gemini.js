import crypto from 'crypto'
import axios from 'axios'

const base_url = "https://api.sandbox.gemini.com"

const gemini_api_key = 'master-IgbpoqzmEuahOH64b8dR';
const gemini_api_secret = '49xp4UyYzTPsNmcZkS2zNairZk7t';


export const Auth = (key, secret, endpoint, data) => {

  const signature = crypto.createHmac('sha384', gemini_api_secret).update(data).digest('hex');

  const headers = {
      'Content-Type': 'text/plain',
      'Content-Length': '0',
      'X-GEMINI-APIKEY': gemini_api_key,
      'X-GEMINI-PAYLOAD': data,
      'X-GEMINI-SIGNATURE': signature,
      'Cache-Control': 'no-cache'
  };

  return headers

}

//1. ============= /v1/account/create CREATE SUB ACCOUNT - Handling this
export const subAccount__create = (subAccount_name) => {
  return new Promise((resolve, reject) => {
    const subEndpoint = "/v1/account/create"

    const data = Buffer.from(JSON.stringify({
        request: subEndpoint,
        nonce: Date.now()/1000,
        name: subAccount_name,
        type: 'exchange'
    })).toString('base64');

    const options = {
        url: base_url + subEndpoint,
        method: 'POST',
        headers: Auth(gemini_api_key, gemini_api_secret, subEndpoint, data)
    };

    axios(options)
    .then(function (response) {
        resolve(response.data);
    })
    .catch(function (error) {
        reject(error);
    });
  });
}

/* REQUEST EXAMPLE
subAccount__create('subAccount_name')
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
});*/


//3. ============= /v1/account/transfer/:currency TRANSFER FUNDS FROM MASTER
export const subAccount__deposit = (subAccount, amount) => {
  return new Promise((resolve, reject) => {
    const subEndpoint = "/v1/account/transfer/usd"

    const data = Buffer.from(JSON.stringify({
      request: subEndpoint,
      nonce: Date.now()/1000,
      sourceAccount: "primary",
      targetAccount: subAccount,
      amount: amount,
    })).toString('base64');

    const options = {
        url: base_url + subEndpoint,
        method: 'POST',
        headers: Auth(gemini_api_key, gemini_api_secret, subEndpoint, data)
    };

    axios(options)
    .then(function (response) {
        resolve(response.data);
    })
    .catch(function (error) {
        reject(error);
    });
  });
}

/* REQUEST EXAMPLE
subAccount__deposit('test2', 10000)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
});*/


//4. ============= /v1/order/new OPEN/CLOSE SWAP OPERATION
export const subAccount__newOrder = (subAccount, amount, type) => {
  return new Promise((resolve, reject) => {
    const subEndpoint = "/v1/order/new"

    const data = Buffer.from(JSON.stringify({
      request: subEndpoint,
      nonce: Date.now()/1000,
      symbol: "btcusd",
      amount: amount,
      price: "20000",
      side: type,
      type: "exchange limit",
      options: ["maker-or-cancel"],
      account: subAccount
    })).toString('base64');

    const options = {
        url: base_url + subEndpoint,
        method: 'POST',
        headers: Auth(gemini_api_key, gemini_api_secret, subEndpoint, data)
    };

    axios(options)
    .then(function (response) {
        resolve(response.data);
    })
    .catch(function (error) {
        reject(error);
    });
  });
}

/*subAccount__newOrder('test2', 0.05)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
});*/


//5. ============= El usuario cierra su operación [será la operación inversa de la abierta]

//creacion cuenta
/*subAccount__create('subAccount_name')
  .then(response => {
    console.log('cuenta creada: ',response);
  })
  .catch(error => {
    console.log(error);
});

//fondeo
subAccount__deposit('test2', 10000)
  .then(response => {
    console.log('fondeo :', response);
  })
  .catch(error => {
    console.log(error);
});

//trade open
subAccount__newOrder('test2', 0.05, 'buy')
  .then(response => {
    console.log('trade abierto por usuario: ', response);
  })
  .catch(error => {
    console.log(error);
});

//trade close
subAccount__newOrder('test2', 0.05, 'sell')
  .then(response => {
    console.log('trade cerrado por usuario: ',response);
  })
  .catch(error => {
    console.log(error);
});*/