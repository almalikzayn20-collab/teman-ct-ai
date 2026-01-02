import "../globals.css";

export const metadata = {
  title: "Teman CT AI",
  description: "AI Video Generator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
