import "./globals.css";
import { RootStyleRegistry } from "./components/RootStyleRegistry";
import Providers from "./components/Providers";

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
        <RootStyleRegistry>
          <Providers>{children}</Providers>
        </RootStyleRegistry>
      </body>
    </html>
  );
}
