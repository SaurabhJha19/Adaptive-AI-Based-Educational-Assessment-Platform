interface Props {

    headers: string[];

    rows: string[][];

}

export default function TableRenderer({

    headers,

    rows,

}: Props) {

    return (

        <table className="mb-6 w-full border-collapse border">

            <thead>

                <tr>

                    {headers.map(header => (

                        <th
                            key={header}
                            className="border p-2"
                        >
                            {header}
                        </th>

                    ))}

                </tr>

            </thead>

            <tbody>

                {rows.map((row, index) => (

                    <tr key={index}>

                        {row.map((cell, i) => (

                            <td
                                key={i}
                                className="border p-2"
                            >
                                {cell}
                            </td>

                        ))}

                    </tr>

                ))}

            </tbody>

        </table>

    );

}