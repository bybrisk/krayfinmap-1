const axios = require('axios');



export async function makePostRequest(params) {

    let res = await axios.post('https://developers.bybrisk.com', params,{
        headers: {
          'Content-type': 'application/json; charset=utf-8',
          'Access-Control-Allow-origin':'*' ,
          'Access-Control-Allow-Headers':'Access-Control-Allow-Headers',
          "Access-Control-Allow-Methods":"PUT,DELETE,GET,POST,OPTIONS" 

          
        }});

console.log(res)
    console.log(res.data);
}

