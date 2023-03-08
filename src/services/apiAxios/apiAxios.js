import axios from "axios";

export default function apiAxios(actionType, url, param) {
  switch (actionType) {
    case "GET":
      axios
        .get(url, {
          headers: {
            //Authorization: "AIzaSyAp7b4zwx3v_22j0xuX3qrmkvB0mst9gfI",
            AccessControlAllowOrigin: false,
          },
          params: param.query,
        })
        .then((result) => {
          console.log(result.data);
          return result.data;
        });
      break;
    case "POST":
      axios.post(url, param.body).then((result) => {
        //console.log(result.data);
        return result.data;
      });
      break;
  }
}
export function apiAxiosPromise(actionType, url, param) {
  const promise = new Promise((resolve, reject) => {
    switch (actionType) {
      case "GET":
        axios
          .get(url, {
            headers: {
              //Authorization: "AIzaSyAp7b4zwx3v_22j0xuX3qrmkvB0mst9gfI",
              AccessControlAllowOrigin: false,
            },
            params: param.query,
          })
          .then((result) => {
            //console.log(result.data);
            resolve(result.data);
          })
          .catch((err) => {
            reject(err);
          });
        break;
      case "POST":
        axios
          .post(url, param.body)
          .then((result) => {
            //console.log(result.data);
            resolve(result.data);
          })
          .catch((err) => {
            reject(err);
          });
        break;
    }
  });
  return promise;
}
