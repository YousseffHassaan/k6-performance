import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';


export default function () {
    const res=http.get('https://quickpizza.grafana.com/test.k6.io/');
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