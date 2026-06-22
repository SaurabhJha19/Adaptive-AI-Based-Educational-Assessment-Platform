import "./globals.css";

import {
  QueryProvider,
} from "@/providers/query-provider";

import {
  AuthProvider,
} from "@/providers/auth-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}