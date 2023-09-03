import "~/styles/globals.css";
import { basePath } from "../../next.config";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>code-diff</title>
        <link
          rel="shortcut icon"
          href={`${basePath}/logo.svg`}
          type="image/x-icon"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
