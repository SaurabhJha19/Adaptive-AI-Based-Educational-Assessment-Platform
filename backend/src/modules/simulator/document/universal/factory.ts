import { randomUUID } from "crypto";

import { UDMNode } from "./interfaces";

export function createNode(
  type: string
): UDMNode {

  return {

    id: randomUUID(),

    type,

    page: 0,

    metadata: {},

    children: [],

  };

}