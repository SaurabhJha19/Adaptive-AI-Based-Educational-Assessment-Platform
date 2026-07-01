import { api }
from "@/services/api";

export const getDocuments =
  async () => {

    const response =
      await api.get(
        "/documents"
      );

    return response.data;
  };

export const uploadDocument =
  async (
    file: File,
    onUploadProgress?: (
      progress: number
    ) => void
  ) => {

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    const response =
      await api.post(
        "/documents/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },

          onUploadProgress:
            (event) => {

              if (
                event.total &&
                onUploadProgress
              ) {

                onUploadProgress(
                  Math.round(
                    event.loaded *
                      100 /
                      event.total
                  )
                );
              }
            },
        }
      );

    return response.data;
  };

export const deleteDocument =
  async (
    id: string
  ) => {

    const response =
      await api.delete(
        `/documents/${id}`
      );

    return response.data;
  };

export const getDocument =
  async (
    id: string
  ) => {

    const response =
      await api.get(
        `/documents/${id}`
      );

    return response.data;
  };

export const getChunks =
  async (
    id: string
  ) => {

    const response =
      await api.get(
        `/documents/${id}/chunks`
      );

    return response.data;
  };