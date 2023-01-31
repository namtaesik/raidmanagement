import React, { useEffect, useState } from "react";
import EightPartyCard from "../../../components/Raid/EightPartyCard";
import axios from "axios";
export default function ChanmiNoonNa() {
  axios
    .get("http://127.0.0.1:64602/api/RaidCardSelectList", {
      headers: {
        Authorization: "AIzaSyAp7b4zwx3v_22j0xuX3qrmkvB0mst9gfI",
        AccessControlAllowOrigin: false,
      },
    })
    .then((result) => {
      console.log(result.data);
    });
  const party = [
    {
      first: [
        {
          expedition_name: "",
          name: "name1",
          level: 1300.01,
          class: "ShuSha",
          job: "Holi",
        },
        {
          expedition_name: "Expedition2",
          name: "name2",
          level: 1300.0,
          class: "ShuSha",
          job: "Holi",
        },
        {
          expedition_name: "Expedition3",
          name: "name3",
          level: 1300.0,
          class: "ShuSha",
          job: "Holi",
        },
        {
          expedition_name: "Expedition4",
          name: "name4",
          level: 1300.0,
          class: "ShuSha",
          job: "Holi",
        },
      ],
      second: [
        {
          expedition_name: "Expedition5",
          name: "name5",
          level: 1300.0,
          class: "ShuSha",
          job: "Holi",
        },
        {
          expedition_name: "Expedition6",
          name: "name6",
          level: 1300.5,
          class: "ShuSha",
          job: "Holi",
        },
        {
          expedition_name: "Expedition7",
          name: "name7",
          level: 1300.0,
          class: "ShuSha",
          job: "Holi",
        },
        {
          expedition_name: "Expedition8",
          name: "name8",
          level: 1300.0,
          class: "ShuSha",
          job: "Holi",
        },
      ],
    },
    {
      first: [
        {
          expedition_name: "",
          name: "name1",
          level: 1300.01,
          class: "ShuSha",
          job: "Holi",
        },
        {
          expedition_name: "Expedition2",
          name: "name2",
          level: 1300.0,
          class: "ShuSha",
          job: "Holi",
        },
        {
          expedition_name: "Expedition3",
          name: "name3",
          level: 1300.0,
          class: "ShuSha",
          job: "Holi",
        },
        {
          expedition_name: "Expedition4",
          name: "name4",
          level: 1300.0,
          class: "ShuSha",
          job: "Holi",
        },
      ],
      second: [
        {
          expedition_name: "Expedition5",
          name: "name5",
          level: 1300.0,
          class: "ShuSha",
          job: "Holi",
        },
        {
          expedition_name: "Expedition6",
          name: "name6",
          level: 1300.5,
          class: "ShuSha",
          job: "Holi",
        },
        {
          expedition_name: "Expedition7",
          name: "name7",
          level: 1300.0,
          class: "ShuSha",
          job: "Holi",
        },
        {
          expedition_name: "Expedition8",
          name: "name8",
          level: 1300.0,
          class: "ShuSha",
          job: "Holi",
        },
      ],
    },
  ];
  return party.map((item, index) => {
    return (
      <>
        <EightPartyCard party={item} />
      </>
    );
  });
  // 230117 | 작업필요 | 카드들넣어야함.
}
