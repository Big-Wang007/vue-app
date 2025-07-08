import request from "./request.js";

export const getRule = (params) =>
  request({
    url: "rule",
    method: "get",
    params,
  });
