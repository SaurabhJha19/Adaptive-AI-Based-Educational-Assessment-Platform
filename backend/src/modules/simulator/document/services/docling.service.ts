import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import http from "http";

import config from "../../../../config/docling.config";

const client = axios.create({

    baseURL:
        config.baseURL,

    timeout:
        config.timeout,

    proxy: false,

    httpAgent:
        new http.Agent({

            keepAlive: false,

        }),

});

class DoclingService {

    async parse(
        pdfPath: string
    ) {

        const form =
            new FormData();

        form.append(

            "file",

            fs.createReadStream(
                pdfPath
            )

        );

        const { data } =
            await client.post(

                "/parse",

                form,

                {

                    headers:
                        form.getHeaders(),

                    maxBodyLength:
                        Infinity,

                    maxContentLength:
                        Infinity,

                }

            );

        return data;

    }

}

export default new DoclingService();