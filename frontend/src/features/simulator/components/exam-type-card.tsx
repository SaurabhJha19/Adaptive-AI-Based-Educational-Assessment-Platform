type Props = {
  title: string;
  active: boolean;
  onClick: () => void;
};

export default function ExamTypeCard({
  title,
  active,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border px-6 py-4 transition ${
        active
          ? "bg-black text-white"
          : "hover:border-black"
      }`}
    >
      {title}
    </button>
  );
}