import React, { useEffect, useState } from "react";
import EightPartyCard from "../../../components/Raid/EightPartyCard";
import axios from "axios";
export default function ChanmiNoonNa() {
  const [party, setParty] = useState([{}]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/character?name=123", {
        headers: {
          //Authorization: "AIzaSyAp7b4zwx3v_22j0xuX3qrmkvB0mst9gfI",
          AccessControlAllowOrigin: false,
        },
      })
      .then((res) => {
        setParty(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return party.map((item, index) => {
    return (
      <>
        <EightPartyCard party={item} />
      </>
    );
  });
  // 230117 | 작업필요 | 카드들넣어야함.
}
