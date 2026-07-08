import { ParsedPage } from "./split-pages";

export interface DetectedModule {
    title: string;
    order: number;
    pages: ParsedPage[];
}

export interface ExamStructure {
    modules: DetectedModule[];
}

function normalize(text: string) {

    return text
        .replace(/\s+/g, " ")
        .toLowerCase();

}

export function detectStructure(
    pages: ParsedPage[]
): ExamStructure {

    let rw1 = -1;
    let rw2 = -1;
    let math1 = -1;
    let math2 = -1;

    for (const page of pages) {

        const text =
            normalize(page.content);

        if (
            rw1 === -1 &&
            text.includes("reading") &&
            text.includes("writing") &&
            text.includes("module 1")
        ) {

            rw1 = page.page;
            continue;

        }

        if (
            rw2 === -1 &&
            text.includes("reading") &&
            text.includes("writing") &&
            text.includes("module 2")
        ) {

            rw2 = page.page;
            continue;

        }

        if (
            math1 === -1 &&
            text.includes("math") &&
            text.includes("module 1")
        ) {

            math1 = page.page;
            continue;

        }

        if (
            math2 === -1 &&
            text.includes("math") &&
            text.includes("module 2")
        ) {

            math2 = page.page;
            continue;

        }

    }

    if (
        rw1 === -1 ||
        rw2 === -1 ||
        math1 === -1 ||
        math2 === -1
    ) {

        throw new Error(
            `Unable to detect all SAT modules.

RW1=${rw1}
RW2=${rw2}
Math1=${math1}
Math2=${math2}`
        );

    }

    console.log("Detected Module Boundaries");

    console.log(
        "RW1:",
        rw1
    );

    console.log(
        "RW2:",
        rw2
    );

    console.log(
        "Math1:",
        math1
    );

    console.log(
        "Math2:",
        math2
    );

    const modules: DetectedModule[] = [

        {

            title:
                "Reading & Writing Module 1",

            order: 1,

            pages:
                pages.filter(
                    page =>
                        page.page >= rw1 &&
                        page.page < rw2
                ),

        },

        {

            title:
                "Reading & Writing Module 2",

            order: 2,

            pages:
                pages.filter(
                    page =>
                        page.page >= rw2 &&
                        page.page < math1
                ),

        },

        {

            title:
                "Math Module 1",

            order: 3,

            pages:
                pages.filter(
                    page =>
                        page.page >= math1 &&
                        page.page < math2
                ),

        },

        {

            title:
                "Math Module 2",

            order: 4,

            pages:
                pages.filter(
                    page =>
                        page.page >= math2
                ),

        },

    ];

    console.log("");

    for (const module of modules) {

        console.log(

            module.title,

            "Pages",

            module.pages[0]?.page,

            "-",

            module.pages[
                module.pages.length - 1
            ]?.page

        );

    }
    return {

        modules,

    };


}