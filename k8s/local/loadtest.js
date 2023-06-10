import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 10 },    // ramp up to 10 users over 1 minute
    { duration: '1m', target: 20 },    // ramp up to 20 users over 1 minute
    { duration: '1m', target: 40 },    // ramp up to 40 users over 1 minute
    { duration: '1m', target: 80 },    // ramp up to 80 users over 1 minute
    { duration: '1m', target: 0 },     // ramp down to 0 users over 1 minute
  ],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  const res = http.get('http://localhost:8080/tweet');
  sleep(1);
}
