import http from "http";
import axios from "axios";

import config from "../../../../config/docling.config";

const client = axios.create({
  baseURL: config.baseURL,
  timeout: 5000,
  httpAgent: new http.Agent({
    keepAlive: false,
  }),
  proxy: false,
});

export async function checkDoclingHealth() {
  const { data } = await client.get("/health");
  return data;
}