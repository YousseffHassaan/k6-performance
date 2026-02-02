import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';
import  exec  from 'k6/execution';

export const options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(95)<300'],
        http_req_duration: ['max<2000'],
        http_req_failed: ['rate<0.01'],
        http_reqs: ['count>20'],
        http_reqs: ['rate>4'],
        vus: ['value<9'],
        checks: ['rate>=0.99']

    }
}
export default function () {
    const res=http.get('https://quickpizza.grafana.com/test.k6.io/' + (exec.scenario.iterationInTest === 1 ? 'foo':''));
    console.log(exec.scenario.iterationInTest)
    check(res, {
        'status is 200': (r)=> r.status === 200
    })

    check(res, {
        'page is startpage': (r)=> r.body.includes("This is a replacement of")
    })

    check(true, {
        'true is true': (value)=> value === true
    })
    console.log(res.status)
    console.log(res.body)
    sleep(1);
}