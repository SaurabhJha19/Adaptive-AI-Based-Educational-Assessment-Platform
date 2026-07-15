import * as fs from "fs";

const raw = JSON.parse(
    fs.readFileSync("./docling-output.json", "utf8")
);

interface Match {
    path: string;
    value: string;
}

const matches: Match[] = [];

function walk(obj: any, path: string) {

    if (obj == null) {
        return;
    }

    if (typeof obj === "string") {

        if (/^[ABCD]\)/.test(obj.trim())) {

            matches.push({
                path,
                value: obj
            });

        }

        return;
    }

    if (Array.isArray(obj)) {

        obj.forEach((item, index) =>
            walk(item, `${path}[${index}]`)
        );

        return;
    }

    if (typeof obj === "object") {

        for (const [key, value] of Object.entries(obj)) {

            walk(value, `${path}.${key}`);

        }

    }

}

walk(raw, "root");

fs.writeFileSync(
    "./option-paths.json",
    JSON.stringify(matches, null, 2),
    "utf8"
);

console.log(`Found ${matches.length} matches.`);
console.log("Saved to option-paths.json");