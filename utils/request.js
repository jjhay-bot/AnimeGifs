import axios from "axios";
import { last, split } from "lodash";
import { getData, storeData } from "./storage";

export const requestOption = async (url = "", data, options = {}) => {
  const { refetch = false, formdata, uniq = "", type = null } = options;
  const method = type ? type : data ? "post" : "get";

  const newContentType = async () =>
    await (formdata ? "application/x-www-form-urlencoded" : "application/json");

  const headers = {
    "Content-Type": await newContentType(),
    // "Authorization": localStorage.getItem("token"),
  };

  // hasLocal data (session) || fetch
  const localKey = last(split(url, "/")) + uniq;
  let sessionData = refetch ? null : await getData(localKey); //check local

  // FETCH
  try {
    sessionData && console.log("has sessionData");
    const res = sessionData || (await axios(url, { data, method, headers }));
    !sessionData && (await storeData(localKey, res.data));

    // console.log("sessionData", sessionData ? res : await res.data);
    return sessionData ? res : JSON.stringify(await res.data);
  } catch (error) {
    console.log("ERROR:", error);
  }
};
