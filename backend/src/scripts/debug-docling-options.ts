import * as fs from "fs";

const raw = JSON.parse(
    fs.readFileSync("./docling-output.json", "utf8")
);

function search(obj: any, path: string) {

    if (typeof obj === "string") {

        if (
            /^[ABCD]\)/m.test(obj) ||
            /^[ABCD]\./m.test(obj)
        ) {

            console.log("================================");
            console.log(path);
            console.log(obj);
        }

        return;
    }

    if (Array.isArray(obj)) {

        obj.forEach((item, i) =>
            search(item, `${path}[${i}]`)
        );

        return;
    }

    if (obj && typeof obj === "object") {

        for (const [key, value] of Object.entries(obj)) {

            search(value, `${path}.${key}`);

        }

    }

}

search(raw, "root");