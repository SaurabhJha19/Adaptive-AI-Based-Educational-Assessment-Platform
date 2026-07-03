type Props = {
    value: string;

    onChange: (value: string) => void;

    items: {
        type: string;
        name: string;
    }[];
};

export default function ExamTypeTabs({
    value,
    onChange,
    items,
}: Props) {
    return (
        <div className="flex flex-wrap gap-3">
            {items.map((item) => (
                <button
                    key={item.type}
                    onClick={() => onChange(item.type)}
                    className={`rounded-full border px-6 py-3 transition-all ${
                        value === item.type
                            ? "bg-primary text-primary-foreground"
                            : "hover:border-primary"
                    }`}
                >
                    {item.type}
                </button>
            ))}
        </div>
    );
}