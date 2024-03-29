import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 1,
    duration: '60s',
    ext: {
        loadimpact: {
            projectID: 3679087
        }
    }
}


export default function() {
    http.get('https://test.k6.io');
    sleep(1);
    http.get('https://test.k6.io/contacts.php')
    sleep(2);
    http.get('https://test.k6.io/news.php')
    sleep(2);
}