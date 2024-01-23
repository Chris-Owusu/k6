import http from 'k6/http';

export default function() {

    // console.log(__ENV.BASE_URL)

    http.get(`${__ENV.BASE_URL}/public/crocodiles/`);
}


//Run command: k6 run -e BASE_URL=https://test-api.k6.io environmentVariable.js