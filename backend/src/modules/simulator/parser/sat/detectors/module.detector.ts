import {
    ParsedDocument,
    BlockType,
} from "../../../document/core";

import {
    Exam,
    ExamType,
    SectionType,
    createSection,
    createModule,
} from "../../core/uem";

export class SATModuleDetector {

    detect(
        document: ParsedDocument,
        exam: Exam
    ) {

        exam.type = ExamType.SAT;

        const headers = document.pages
            .flatMap(page => page.blocks)
            .filter(
                block =>
                    block.type === BlockType.SECTION_HEADER
            );

        const rw = headers.find(
            h =>
                h.text
                    .toLowerCase()
                    .includes("reading and writing")
        );

        const math = headers.find(
            h =>
                h.text
                    .toLowerCase()
                    .includes("math")
        );

        if (!rw || !math) {

            throw new Error(
                "Unable to locate SAT sections."
            );

        }

        const rwSection =
            createSection();

        rwSection.type =
            SectionType.READING_WRITING;

        rwSection.title =
            "Reading & Writing";

        rwSection.pageStart =
            rw.page;

        rwSection.pageEnd =
            math.page - 1;

        const rwModule1 =
            createModule();

        rwModule1.index = 1;

        rwModule1.title =
            "Module 1";

        rwModule1.pageStart =
            rw.page;

        const rwModule2 =
            createModule();

        rwModule2.index = 2;

        rwModule2.title =
            "Module 2";

        const mathSection =
            createSection();

        mathSection.type =
            SectionType.MATH;

        mathSection.title =
            "Math";

        mathSection.pageStart =
            math.page;

        mathSection.pageEnd =
            document.metadata.pageCount;

        const mathModule1 =
            createModule();

        mathModule1.index = 1;

        mathModule1.title =
            "Module 1";

        mathModule1.pageStart =
            math.page;

        const mathModule2 =
            createModule();

        mathModule2.index = 2;

        mathModule2.title =
            "Module 2";

        rwSection.modules.push(
            rwModule1,
            rwModule2
        );

        mathSection.modules.push(
            mathModule1,
            mathModule2
        );

        exam.sections.push(
            rwSection,
            mathSection
        );

    }

}