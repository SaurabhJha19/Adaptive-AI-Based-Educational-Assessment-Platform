import AppHeader from "./app-header";
import AppSidebar from "./app-sidebar";

type Props = {
  children: React.ReactNode;
};

export default function AppShell({
  children,
}: Props) {

  return (

    <div className="flex min-h-screen bg-background">

      <AppSidebar />

      <div className="flex flex-1 flex-col">

        <AppHeader />

        {children}

      </div>

    </div>

  );

}