import * as fs from "fs";

const raw = JSON.parse(
    fs.readFileSync("./docling-output.json", "utf8")
);

console.log(
    "Body children:",
    raw.body.children.length
);

let optionRefs = 0;

for (const ref of raw.body.children) {

    const id = Number(
        ref.$ref.split("/").pop()
    );

    const node = raw.texts[id];

    if (!node) continue;

    if (
        /^[ABCD]\)/m.test(node.text) ||
        /^[ABCD]\./m.test(node.text)
    ) {

        optionRefs++;

        console.log(node.text);
        console.log("----------------");
    }

}

console.log(
    "Option refs:",
    optionRefs
);