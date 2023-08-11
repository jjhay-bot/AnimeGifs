// import theme from "../assets/theme";
// import { themeVar } from "./reactiveVars";

import { requestOption } from "../utils/request";
import { resultVar } from "./reactiveVars";

// export const setTheme = () => {
//   themeVar(!themeVar()?.breakpoints ? theme : {});
// };
const endpoint = `${process.env.G_URL}?key=${
  "AIzaSyCby2V5i-dXhY9r8Z6Aej9N3X2i-ZItKn0" //temporary
  // process.env.KEY
}&cx=${process.env.CX}`;
// &anime%20portrait%20gif%20zom%20100&start=0
export const getSearchData = async ({ query = "Zom 100", type }) => {
  const start = resultVar().length + 1;

  //q={searchTerms}&num={count?}&start={startIndex?}&imgType=gif&alt=json

  const API_URI = `${endpoint}&start=${start}&searchType=image&fileType=gif&alt=json&q=gif%20${query
    .replace(/ /g, "%20")
    .toLowerCase()}`;
  try {
    const data = await requestOption(API_URI);
    // console.log(JSON.parse(data));
    const result =
      type === "search" ? JSON.parse(data).items : [...resultVar(), ...JSON.parse(data).items];
    resultVar(result);
  } catch (error) {
    console.log("ERR", error);
  }
};
