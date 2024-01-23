import http from 'k6/http';
import { check } from 'k6';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';


export default function() {
    let res = http.get("https://test-api.k6.io/public/crocodiles/")
    const crocodiles = res.json();
    const crocodileIds = crocodiles.map(item => item.id)
    const crocodileID = randomItem(crocodileIds);
    console.log(crocodileIds);

    res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileID}/`)

    check(res, {
        'Status code 200': (r) => r.status === 200,
        'crocodile has the correct id': (r) => r.json().id === crocodileID
    })

}