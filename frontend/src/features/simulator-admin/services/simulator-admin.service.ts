import api from "@/lib/api";

import {
  CreateOfficialExamPayload,
  OfficialExam,
} from "../types";

const BASE = "/simulator-admin";

export const getOfficialExams = async (): Promise<
  OfficialExam[]
> => {
  const { data } = await api.get(BASE);

  return data;
};

export const getOfficialExam = async (
  id: string
) => {
  const { data } = await api.get(
    `${BASE}/${id}`
  );

  return data;
};

export const createOfficialExam =
async (
    payload: CreateOfficialExamPayload
) => {

    const form =
        new FormData();

    form.append(
        "examCode",
        payload.examCode
    );

    form.append(
        "title",
        payload.title
    );

    form.append(
        "examType",
        payload.examType
    );

    form.append(
        "duration",
        String(
            payload.duration ?? 180
        )
    );

    form.append(
        "questionPdf",
        payload.questionPdf
    );

    if (payload.answerPdf) {

        form.append(
            "answerPdf",
            payload.answerPdf
        );

    }

    const { data } =
        await api.post(
            BASE,
            form,
            {

                headers: {

                    "Content-Type":
                        "multipart/form-data",

                },

            }
        );

    return data;

};

export const publishOfficialExam =
  async (id: string) => {
    const { data } = await api.post(
      `${BASE}/${id}/publish`
    );

    return data;
  };

export const parseOfficialExam =
async (
    id: string
) => {

    const { data } =
        await api.post(
            `${BASE}/${id}/parse`
        );

    return data;

};

export const archiveOfficialExam =
  async (id: string) => {
    const { data } = await api.post(
      `${BASE}/${id}/archive`
    );

    return data;
  };

export const deleteOfficialExam =
  async (id: string) => {
    const { data } = await api.delete(
      `${BASE}/${id}`
    );

    return data;
  };

  export const updateOfficialExam = async (
  id: string,
  payload: Partial<OfficialExam>
) => {
  const { data } = await api.patch(
    `${BASE}/${id}`,
    payload
  );

  return data;
};