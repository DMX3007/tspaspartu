import tough from "tough-cookie";
import { parseString } from "xml2js";

function xmlToJson(xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
const urlAuth =
  "https://login.bgoperator.ru/auth?" +
  `${process.env.BG_LOGIN}` +
  "&" +
  `${process.env.BG_PWD}`;
const base = "http://export.bgoperator.ru";
let Cookie = tough.Cookie;
var myHeaders = new Headers();
myHeaders.append("Accept-Encoding", "gzip");

var requestOptions = {
  method: "POST",
  headers: myHeaders,
  redirect: "manual",
};


export async function getFreshCookie() {
  let freshCookies = await fetch(urlAuth, requestOptions)
    .then((res) => {
      if (res.status >= 400) {
        throw new Error(`${res.status} статус`)
      } 
      if (!res) throw new Error("38 строка getdata api упало");
      return Cookie.parse(res.headers.get("set-cookie"));
    })
    .catch((error) => console.log("error", error));
  return freshCookies;
}

async function getData(endPoint) {
  const refreshedCookies = await getFreshCookie();
  const headers = new Headers();
  headers.append("Cookie", refreshedCookies);

  const requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  const data = await fetch(base + endPoint, requestOptions)
    .then((response) => {
      console.log(response.status)
      if (!response.headers.get("content-type").includes("text/xml")) {
        return response.json();
      } else {
        return response.text().then((xmlText) => xmlToJson(xmlText));
      }
    })
    .catch((error) => console.log("errorCustom", error.message));
  return data;
}

export default getData;
