import http from "k6/http";
import { sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 500 },
    { duration: "30s", target: 1000 },
    { duration: "30s", target: 1500 },
    { duration: "30s", target: 2000 },
  ],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  const res = http.get("http://localhost:8080/tweet");
  sleep(1);
}
