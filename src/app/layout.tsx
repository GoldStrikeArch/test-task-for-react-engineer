import "./globals.css";
import { RootStyleRegistry } from "./components/RootStyleRegistry";

export const metadata = {
  title: "Test Task For React Engineer",
  description: "Test Task For React Engineer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RootStyleRegistry>{children}</RootStyleRegistry>
      </body>
    </html>
  );
}
