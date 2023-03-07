import axios from "axios";

export default function apiAxios(actionType, url, param) {
  console.log(actionType, url, param.body.userName);
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
        });
      break;
    case "POST":
      axios.post(url, param.body).then((result) => {
        console.log(result.data);
      });
      break;
  }
}
