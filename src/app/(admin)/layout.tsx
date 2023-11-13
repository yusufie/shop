interface AdminLayoutProps {
  readonly children: React.ReactNode;
}

export const metadata = {
  title: "Admin",
  description: "E-commerce website admin",
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
