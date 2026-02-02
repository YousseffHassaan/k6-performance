import { sleep } from 'k6';
import http from 'k6/http';


export const options = {
    thresholds: {
        http_req_duration: ['p(95)<300'],
        'http_req_duration{status:200}': ['p(95)<300'],
        'http_req_duration{status:201}': ['p(95)<305']

    }
}

export default function () {
    http.get('https://quickpizza.grafana.com/test.k6.io/');
    sleep(1)
    http.get('https://quickpizza.grafana.com/news.php');
}