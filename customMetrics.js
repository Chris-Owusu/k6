import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';
import { Counter } from 'k6/metrics'

export const options = {
    vus: 5,
    duration: '5s',
    thresholds: {
        http_req_duration: ['p(95)<300'],
        my_counter: ['count>5']
    }
}

let myCounter = new Counter('my_counter');

export default function () {
    const res = http.get("https://test.k6.io");
    myCounter.add(1);
    sleep(2);
}

