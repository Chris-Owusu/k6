import http from 'k6/http';
import { check } from 'k6';

export default function() {

    const body = JSON.stringify({
        "username": "testgd2323fgsdf",
        "password": "ksksks"
    })
    // const body = JSON.stringify({
    //     "username": "test_" + Date.now(),
    //     "password": "3423423423"
    // })

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

   

    let res = http.post("https://test-api.k6.io/auth/token/login/", body, params);

    console.log(`Access token is: ${res.json().access}`)

     check (res, {
        "Response code": (r) => r.status === 200,
    })

}