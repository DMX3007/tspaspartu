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

function parseCookies(cookieString) {
  const cookieSets = cookieString.split(", ");

  const cookies = cookieSets.map((cookieSet) => {
    const cookiePairs = cookieSet.split("; ");

    const cookie = {};
    cookiePairs.forEach((pair) => {
      const [name, value] = pair.split("=");
      cookie[name.trim()] = value;
    });

    return cookie;
  });

  return cookies;
}

function getMainCookieString(parsedCookies) {
  const mainKeys = ["A1", "L", "Z1"];

  const mainCookiePairs = mainKeys.map((key) => {
    const cookie = parsedCookies.find((cookie) => cookie.hasOwnProperty(key));
    if (cookie) {
      return `${key}=${cookie[key]}`;
    }
    return "";
  });

  const mainCookieString = mainCookiePairs
    .filter((pair) => pair !== "")
    .join("; ");
  return mainCookieString + ";";
}

function cookieObjectToString(cookieObject: Cookie) {
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
  if (cookieStr.endsWith(";")) {
    cookieStr = cookieStr.slice(0, -1);
  }

  return cookieStr;
}

function xmlToJson(xml: string) {
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
const myHeaders = new Headers();
myHeaders.append("Accept-Encoding", "gzip");

const requestOptions: RequestInit = {
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
      return res.headers.get("set-cookie")!;
    })
    .catch((error) => console.log("error", error));
  return freshCookies;
}

const refreshedHeaders = new Headers();

async function getData(endPoint: string) {
  const rawRefreshedCookies = (await getFreshCookie()) as string;
  const objCookies = parseCookies(rawRefreshedCookies);
  const preparedCookies = getMainCookieString(objCookies);
  refreshedHeaders.append("Cookie", preparedCookies);

  const requestOptions: RequestInit = {
    method: "GET",
    headers: refreshedHeaders,
    redirect: "follow",
  };

  const data = await fetch(base + endPoint, requestOptions)
    .then(async (response) => {
      if (response.status === 401) {
        const newCookie = await getFreshCookie();
        const newHeaders = new Headers();
        newHeaders.append("Cookie", newCookie);
        const data = await fetch(base + endPoint, {
          method: "GET",
          headers: newHeaders,
        });
      }
      if (response.headers.get("content-type")!.includes("text/xml")) {
        return response.text().then((xmlText) => xmlToJson(xmlText));
      } else if (response.headers.get("content-type")!.includes("javascript")) {
        const jsToText = await response.text();
        if (typeof jsToText === "string") return jsToText;
        throw new Error(
          "Custom Error: getDate - const jsToText != string type"
        );
      } else {
        return response.json();
      }
    })
    .catch((error) => console.log("errorCustom", error.message));
  return data;
}

export default getData;
