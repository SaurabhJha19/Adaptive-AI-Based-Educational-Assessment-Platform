import axios from "axios";

export async function downloadPdf(
  pdfUrl: string
): Promise<Buffer> {
  const response = await axios.get(pdfUrl, {
    responseType: "arraybuffer",
  });

  return Buffer.from(response.data);
}