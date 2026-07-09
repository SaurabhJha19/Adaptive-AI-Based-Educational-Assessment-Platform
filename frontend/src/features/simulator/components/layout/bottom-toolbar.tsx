interface Props {

    left: React.ReactNode;

    center?: React.ReactNode;

    right: React.ReactNode;

}

export default function BottomToolbar({

    left,

    center,

    right,

}: Props) {

    return (

        <div className="flex items-center justify-between px-8 py-4">

            <div>

                {left}

            </div>

            <div>

                {center}

            </div>

            <div>

                {right}

            </div>

        </div>

    );

}