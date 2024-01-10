import http from 'k6/http';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        'http_req_duration{status:200}': ['p(95)<1000'],
        'http_req_duration{status:201}': ['p(95)<1000']
    }
}

export default function () {
    http.get('https://run.mocky.io/v3/3f484bcd-9883-40e4-91a8-25315e4e999f')
    http.get('https://run.mocky.io/v3/c13a1c6f-4335-44a0-ba9a-480c5dda24a2?mocky-delay=2000ms')
}

