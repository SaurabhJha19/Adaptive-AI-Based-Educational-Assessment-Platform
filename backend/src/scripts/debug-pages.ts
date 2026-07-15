import fs from "fs";

const raw = JSON.parse(
    fs.readFileSync(
        "./docling-output.json",
        "utf8"
    )
);

const pageMap = new Map<number, number>();

function addProv(prov: any[] = []) {

    for (const p of prov) {

        const page =
            p.page_no;

        pageMap.set(
            page,
            (pageMap.get(page) ?? 0) + 1
        );

    }

}

(raw.texts ?? []).forEach((t: any) => addProv(t.prov));
(raw.tables ?? []).forEach((t: any) => addProv(t.prov));
(raw.pictures ?? []).forEach((p: any) => addProv(p.prov));

const pages =
    [...pageMap.keys()].sort(
        (a, b) => a - b
    );

console.log("\nDetected Pages");
console.log("====================");
console.log(pages);

console.log("\nTotal Pages");
console.log("====================");
console.log(pages.length);

console.log("\nMissing Pages");
console.log("====================");

const max =
    Math.max(...pages);

const missing = [];

for (let i = 1; i <= max; i++) {

    if (!pageMap.has(i)) {

        missing.push(i);

    }

}

console.log(missing);

console.log("\nBlocks Per Page");
console.log("====================");

for (const page of pages) {

    console.log(
        `Page ${page}: ${pageMap.get(page)}`
    );

}