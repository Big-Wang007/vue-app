import Mock from "mockjs";
import { ruleData } from "./data";

/**
 * # 根据url获取query参数
 * @param {Url} urlStr get请求获取参数 eg:"/video/childcomments?sort=1&start=2&count=5&childCount=14&commenIndex=0"
 * @returns Object
 */
const getQuery = (urlStr) => {
  const startIndex = urlStr.indexOf("?");
  const strSub = urlStr.substring(startIndex + 1);
  const strReplace = strSub.replaceAll("=", ":");
  const arr = strReplace.split("&");

  arr.forEach((it, i) => {
    const startIndex = it.indexOf(":");
    let k = it.substring(0, startIndex),
      v = it.substring(startIndex + 1),
      isNullStr = Object.is(v, "");

    k = `"${k}"`;
    !isNullStr ? (v = Number(v)) : (v = `"${v}"`);
    arr[i] = k + ":" + v;
  });

  const arrToStr = arr.join(",");
  const resStr = `{${arrToStr} }`;
  const resObj = JSON.parse(resStr);
  return resObj;
};

const getRule = (params) => {
  const query = getQuery(params.url);
  let filterData = ruleData;
  if (query.status !== "" && query.status != null) {
    filterData = filterData.filter((val) => val.status === String(query.status));
  }
  const data = filterData.slice(
    (query.current - 1) * query.pageSize,
    query.current * query.pageSize
  );
  return {
    data: data,
    total: filterData.length,
    success: true,
    pageSize: query.pageSize,
    current: query.current,
  };
};

Mock.mock(/admin\/v1\/rule/, "get", getRule);
