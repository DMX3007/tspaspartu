import { Cookie as _Cookie } from "tough-cookie";
import { parseString } from "xml2js";
interface Cookie {
  key: string;
  value: string;
  expires: string;
  domain: string;
  path: string;
  httpOnly: boolean;
  extensions: string[];
  creation: string;
}

function cookieObjectToString(cookieObject:Cookie) {
  let cookieStr = `${cookieObject.key}=${cookieObject.value};`;

  if (cookieObject.expires) {
    const expires = new Date(cookieObject.expires).toString();
    cookieStr += ` Expires=${expires};`;
  }

  if (cookieObject.domain) {
    cookieStr += ` Domain=${cookieObject.domain};`;
  }

  if (cookieObject.path) {
    cookieStr += ` Path=${cookieObject.path};`;
  }

  if (cookieObject.httpOnly) {
    cookieStr += ` HttpOnly;`;
  }

  if (cookieObject.extensions) {
    for (const extension of cookieObject.extensions) {
      cookieStr += ` ${extension};`;
    }
  }

  // Remove the last semicolon if it exists
  if (cookieStr.endsWith(';')) {
    cookieStr = cookieStr.slice(0, -1);
  }

  return cookieStr;
}

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

const base = "http://export.bgoperator.ru";
let Cookie = _Cookie;
const myHeaders = new Headers();
myHeaders.append("Accept-Encoding", "gzip");

const requestOptions:RequestInit = {
  method: "POST",
  headers: myHeaders,
  redirect: "manual",
};

async function getFreshCookie() {
  let freshCookies = await fetch(
    "https://login.bgoperator.ru/auth?login=a20615&pwd=Qwertyu123456)",
    requestOptions
  )
    .then((res) => {
      return Cookie.parse(res.headers.get("set-cookie")!);
    })
    .catch((error) => console.log("error", error));
    console.log(freshCookies)
  return freshCookies;
}


async function getData(endPoint:string) {
  const rawRefreshedCookies = await getFreshCookie();
  const mHeaders = new Headers();
  const strCookieObject = JSON.stringify(rawRefreshedCookies);
  const cookieObj = JSON.parse(strCookieObject) as Cookie;
  mHeaders.append("Cookie", cookieObjectToString(cookieObj));

  const requestOptions:RequestInit = {
    method: "GET",
    headers: mHeaders,
    redirect: "follow",
  };

  const data = await fetch(base + endPoint, requestOptions)
    .then(async (response) => {
      if (response.headers.get("content-type")!.includes("text/xml")) {
        return response.text().then((xmlText) => xmlToJson(xmlText));
      } else if (response.headers.get('content-type')!.includes('javascript')) {
        const jsToText = await response.text()
        if (typeof jsToText === 'string') return jsToText;
        throw new Error('Custom Error: getDate - const jsToText != string type')
      } else {
        return response.json();
      }
    })
    .catch((error) => console.log("errorCustom", error.message));
  console.log(data);
  return data;
}

export default getData
