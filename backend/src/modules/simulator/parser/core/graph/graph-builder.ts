import {
    EventBus,
    ParserEventType,
} from "../events";

import {
    createExam,
    createSection,
    Exam,
    ExamSection,
    ExamType,
    SectionType,
} from "../uem";

export class GraphBuilder {

    private readonly exam = createExam();

    private currentSection: ExamSection | null = null;

    constructor() {

        this.exam.type = ExamType.SAT;

    }

    build(
        events: EventBus
    ): Exam {

        for (

            const event of events.getEvents()

        ) {

            switch (event.type) {

                case ParserEventType.SECTION_START:

                    this.handleSection(
                        event.payload.title as string,
                        event.page
                    );

                    break;

            }

        }

        return this.exam;

    }

    private handleSection(
        title: string,
        page: number
    ) {

        const section =
            createSection();

        section.title =
            title;

        section.pageStart =
            page;

        section.pageEnd =
            page;

        section.type =
            title === "Math"

                ? SectionType.MATH

                : SectionType.READING_WRITING;

        this.exam.sections.push(
            section
        );

        this.currentSection =
            section;

    }

}