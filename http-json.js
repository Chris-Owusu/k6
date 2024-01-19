import http from 'k6/http';
import { check } from 'k6';

export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/');

    const crocodile = res.json();
    const crocodileName = crocodile[0].name;
    const crocodilesId = crocodile[0].id

    res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodilesId}/`);

    check (res, {
        "Response is 200": (r) => r.status === 200,
        "Response id": (r) => r.body.includes(crocodilesId),
        "Response name": (r) => r.body.includes(crocodileName)
    })
}