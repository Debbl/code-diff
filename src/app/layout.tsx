import "~/styles/globals.css";
import { Provider } from "jotai";
import nextConfig from "../../next.config.mjs";

const { basePath } = nextConfig;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <title>code-diff</title>
        <link
          rel="shortcut icon"
          href={`${basePath!}/logo.svg`}
          type="image/x-icon"
        />
      </head>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
