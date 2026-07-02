export default function DashboardPage() {

  return (
    <div>

      <h1
        className="
        text-3xl
        font-bold
        mb-6
        "
      >
        Welcome Back
      </h1>

      <div
        className="
        grid
        grid-cols-3
        gap-4
        "
      >

        <div className="border rounded-lg p-4">
          Documents
        </div>

        <div className="border rounded-lg p-4">
          Exams
        </div>

        <div className="border rounded-lg p-4">
          Analytics
        </div>

      </div>

    </div>
  );
}