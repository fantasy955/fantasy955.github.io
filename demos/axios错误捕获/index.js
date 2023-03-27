const axios = require("axios");

function a(){
    return axios.post('https:baidu.com', {
        data: 123,
    }, {
        timeout: 200
    });
}

function b(fn){
    const task = fn();
    task.catch((e)=>{
        console.log('catch', e);
    })
}

b(a);