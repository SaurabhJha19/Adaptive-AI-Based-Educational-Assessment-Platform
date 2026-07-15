import {
  AnyBlock,
} from "./document.interfaces";

export function sortBlocks(
  blocks: AnyBlock[]
) {

  return blocks.sort(

    (a, b) => {

      const ay =
        a.provenance[0]?.bbox.top ?? 0;

      const by =
        b.provenance[0]?.bbox.top ?? 0;

      if (
        ay !== by
      ) {

        return by - ay;

      }

      const ax =
        a.provenance[0]?.bbox.left ?? 0;

      const bx =
        b.provenance[0]?.bbox.left ?? 0;

      return ax - bx;

    }

  );

}