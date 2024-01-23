import http from 'k6/http';
import { SharedArray } from 'k6/data';
import { check } from 'k6';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

const userCredentials = new SharedArray('user credential', function() {
    return JSON.parse(open('./users.json')).users;
})

console.log(userCredentials);

export default function() {
    const user = randomItem(userCredentials);
    userCredentials.forEach((item) => {
        const credentials = {
            "username": item.username,
            "password": item.password
        };
    
        let res = http.post(
            "https://test-api.k6.io/user/register/",
            JSON.stringify(credentials), 
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
         );

         check(res, {
            "Status code 201": (r) => r.status === 201
         })
    })

    let res = http.post(
        "https://test-api.k6.io/auth/token/login/", 
        JSON.stringify
        ({
            username: user.username, 
            password: user.password
        }),
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    );
}