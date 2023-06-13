import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: "30s", target: 500 },  // ramp up to 500 users
    { duration: "30s", target: 1000 }, // ramp up to 1000 users
    { duration: "30s", target: 1500 }, // ramp up to 1500 users 
    { duration: "30s", target: 2000 }, // ramp up to 2000 users
  ],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  const res = http.get('http://localhost:8080/tweet');
  sleep(1);
}
