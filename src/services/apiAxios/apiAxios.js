import axios from "axios";

export default function apiAxios(actionType, url, param) {
  url =
    window.location.hostname === "localhost"
      ? url
      : "http://loacatcountryserver.cafe24app.com" + url.replace("/api", "");

  switch (actionType) {
    case "GET":
    default:
      axios
        .get(url, {
          headers: {
            //Authorization: "AIzaSyAp7b4zwx3v_22j0xuX3qrmkvB0mst9gfI",
            AccessControlAllowOrigin: false,
          },
          params: param,
        })
        .then((result) => {
          return result.data;
        });
      break;
    case "POST":
      axios.post(url, param).then((result) => {
        return result.data;
      });
      break;
  }
}
export function apiAxiosPromise(actionType, url, param) {
  url =
    window.location.hostname === "localhost"
      ? url
      : "http://loacatcountryserver.cafe24app.com" + url.replace("/api", "");
  const promise = new Promise((resolve, reject) => {
    switch (actionType) {
      case "GET":
      default:
        axios
          .get(url, {
            headers: {
              //Authorization: "AIzaSyAp7b4zwx3v_22j0xuX3qrmkvB0mst9gfI",
              AccessControlAllowOrigin: false,
            },
            params: param,
          })
          .then((result) => {
            //console.log(result.data);
            resolve(result.data);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
        break;
      case "POST":
        axios
          .post(url, param, {
            headers: {
              //Authorization: "AIzaSyAp7b4zwx3v_22j0xuX3qrmkvB0mst9gfI",
              AccessControlAllowOrigin: false,
            },
          })
          .then((result) => {
            //console.log("test", result.data);
            resolve(result.data);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
        break;
    }
  });
  return promise;
}
