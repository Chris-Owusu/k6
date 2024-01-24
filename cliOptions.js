import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 10,
    duration: '60s'
}


export default function() {
    http.get('https://test.k6.io');
    sleep(1);
}

// the run command: k6 run --vus 1 --duration 10s --iterations 1 cliOptions.js