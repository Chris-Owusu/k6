import http from 'k6/http';
import { check } from 'k6';

export default function() {
    // const body = JSON.stringify({
    //     "username": "test_" + Date.now(),
    //     "first_name": "Bon",
    //     "last_name": "go",
    //     "email": "bon@gmail.com",
    //     "password": "3423423423"
    // })

    const body = JSON.stringify({
        "username": "testgd2323fgsdf",
        "password": "ksksks"
    })

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    http.post("https://test-api.k6.io/user/register/", body, params);
}
