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

    let re = http.post(
        "https://test-api.k6.io/my/crocodiles/",
        JSON.stringify
        ({
            "name": "qweu",
            "sex": 'M',
            "date_of_birth": '2002-10-12'
        }),
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }
    );

    const newCrocodileId = re.json().id;
    console.log(`The ID is: ${newCrocodileId}`);

    re = http.get(
        `https://test-api.k6.io/my/crocodiles/${newCrocodileId}/`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }
    );

    check (re, {
        "Status code 200": (r) => r.status === 200
    });

    re = http.put(
        `https://test-api.k6.io/my/crocodiles/${newCrocodileId}/`,
        JSON.stringify
        ({
            "name": "New qweu",
            "sex": 'M',
            "date_of_birth": '2002-10-12'
        }),
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }
    );

    const newCrocodileName = re.json().name;
    console.log(`The name is: ${newCrocodileName}`);

    check (re, {
        "Put request status code 200": (r) => r.status === 200
    });

    re = http.patch(
        `https://test-api.k6.io/my/crocodiles/${newCrocodileId}/`,
        JSON.stringify
        ({
            "sex": 'F'
        }),
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }
    );

    const newCrocodileSex = re.json().name;
    console.log(`The sex is: ${newCrocodileSex}`);

    check (re, {
        "Patch request status code 200": (r) => r.status === 200
    });
}
