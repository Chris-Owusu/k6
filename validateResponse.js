import http from 'k6/http';
import { check } from 'k6';


export default function () {
    const res = http.get("https://test.k6.io")
    check(res, {
        "Response is 200": (value) => value.status === 200,
        "Page started successfullly": (value) => value.body.includes("Collection of simple web-pages")
    });
}