import http from 'k6/http';
import { check } from 'k6';

export default function() {
    let res;

    const credentials = {
        "username": "test_" + Date.now(),
        "password": "password_" + Date.now()
    };

    const params = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    http.post(
        "https://test-api.k6.io/user/register/",
        JSON.stringify(credentials), 
        params
     );

    res = http.post(
        "https://test-api.k6.io/auth/token/login/", 
        JSON.stringify
        ({
            username: credentials.username, 
            password: credentials.password
        }),
        params
    );

    
    const accessToken = res.json().access;
    console.log(`Access token is: ${accessToken}`)

     check (res, {
        "Response code": (r) => r.status === 200
    });

    http.get(
        "https://test-api.k6.io/my/crocodiles/",
        {
            headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }
    );

    http.post(
        "https://test-api.k6.io/my/crocodiles/",
        JSON.stringify
        ({
            "name": "qwertyu",
            "sex": 'M',
            "date_of_birth": '2002-10-12'
        }),
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }
    )
}