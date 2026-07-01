type Props = {
  status:
    | "uploaded"
    | "processing"
    | "processed"
    | "failed";
};

export default function StatusBadge({
  status,
}: Props) {

  const styles = {
    uploaded:
      "bg-blue-100 text-blue-700",

    processing:
      "bg-yellow-100 text-yellow-700",

    processed:
      "bg-green-100 text-green-700",

    failed:
      "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}