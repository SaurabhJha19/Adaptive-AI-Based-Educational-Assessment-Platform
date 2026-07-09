interface Props {

    url: string;

    caption?: string;

}

export default function ImageRenderer({

    url,

    caption,

}: Props) {

    return (

        <figure className="mb-6">

            <img

                src={url}

                alt={caption}

                className="max-w-full"

            />

            {caption && (

                <figcaption className="mt-2 text-sm text-gray-500">

                    {caption}

                </figcaption>

            )}

        </figure>

    );

}