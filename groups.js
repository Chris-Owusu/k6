import http from 'k6/http';
import { sleep, group, check } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<250'],
        'group_duration{group:::Main page}': ['p(95)<2000'],
        'group_duration{group:::Main page::Assets}': ['p(95)<2000'],
        'group_duration{group:::Contact page}': ['p(95)<2000']
    }
}

export default function () {

    group('Main page', function () {
        let res = http.get('https://test.k6.io/');
        check(res, { 'status is 200': (r) => r.status === 200 });

        group('Assets', function () {
            http.get('https://test.k6.io/static/js/prisms.js');
            http.get('https://test.k6.io/static/css/site.css');
        });
    });

    group('Contact page', function () {
        http.get('https://test.k6.io/contacts.php');
    });
    sleep(1);
}