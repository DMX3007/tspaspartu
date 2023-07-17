import { error } from "console";
import tough from "tough-cookie";
import { parseString } from "xml2js";

function xmlToJson(xml:string) {
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
let myHeaders = new Headers();
myHeaders.append("Accept-Encoding", "gzip");

const requestOptions: RequestInit = {
  method: "POST",
  headers: myHeaders,
  redirect: "manual",
};

const COOKIE_FROM_HEADER = "set-cookie";

export async function getFreshCookie():Promise<void | tough.Cookie> {
  let freshCookies = await fetch(urlAuth, requestOptions)
    .then((res) => {
      if (res.status >= 400) {
        throw new Error(`${res.status} status getFreshCookie fn`)
      } 
      if (!res) {
        throw new Error("getdata api down getFreshCookie fn");
      }
      return Cookie.parse(res.headers.get(COOKIE_FROM_HEADER)!);
    })
    .catch((error) => console.log("error", error));
  return freshCookies;
}


async function getData(endPoint:string) {
  const refreshedCookies = await getFreshCookie();
  const headers = new Headers();
  const some = JSON.stringify(refreshedCookies)
  if (refreshedCookies) {
    headers.append("Cookie", some);
  }

  const requestOptions:RequestInit = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  const data = await fetch(base + endPoint, requestOptions)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      if (response.headers.get("content-type")!.includes("text/xml")) {
        const xmlText = await response.text();
        const str = await xmlToJson(xmlText);
        console.log(typeof str);
        console.log(xmlText)
        console.log(str)
        if (typeof str === 'string') return str;
        throw new Error('Custom Error: getData - const str != string')
      } else if (response.headers.get('content-type')!.includes('javascript')) {
        const jsToText =await response.text()
        if (typeof jsToText === 'string') return jsToText;
        throw new Error('Custom Error: getDate - const jsToText != string type')
      } else {  
        const obj = await response.json()
        if (typeof obj === "object") {
          return obj;
        }
        throw new Error('Custom Error: getData - const obj is not typeof Object')
      }
    })
    .catch((error) => console.log("Error happen getData", error.message));
  return data;
}

export default getData;
