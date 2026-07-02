import PageHeader from "@/components/ui/page-header";

export default function DashboardHero() {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <PageHeader
      title={`${greeting} 👋`}
      description="Continue improving your preparation."
    />
  );
}