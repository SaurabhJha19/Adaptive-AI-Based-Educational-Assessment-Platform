export function repairJson(
    json: string
): string {

    return json
        .replace(/,\s*}/g, "}")
        .replace(/,\s*]/g, "]")
        .replace(/\u0000/g, "")
        .trim();

}