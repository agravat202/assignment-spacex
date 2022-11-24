import axios from "axios";

const API_URL = "https://api.spacexdata.com/v3";

const getHeader = (ContentType = "application/json") => {
  return {
    headers: {
      "Content-Type": ContentType,
    },
  };
};

export const getAllLaunches = (filter) => {
  const url = API_URL + "/launches";
  return axios
    .get(url, getHeader())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
