import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';
import exec from 'k6/execution';

export const options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(95)<300'],
        http_req_failed: ['rate<0.01'],
        http_reqs:['count>30'],
        http_reqs:['rate>4'],
        vus: ['value>9'],
        checks: ['rate>=0.98']
    }
}

export default function () {
    const res = http.get("https://test.k6.io" + (exec.scenario.iterationInTest === 1 ? 'foo' : ''));
    check(res, {
        "Response is 200": (value) => value.status === 200,
        "Page started successfullly": (value) => value.body.includes("Collection of simple web-pages")
    });
    sleep(2);
}





// Note for Types
// Counter --> Keeps track of count.
// Gauges --> 
// Rate -->