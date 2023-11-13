interface ShopLayoutProps {
    readonly children: React.ReactNode;
  }
  
  export const metadata = {
    title: "Shop",
    description: "E-commerce website Shop",
  };
  
  export default function ShopLayout({ children }: ShopLayoutProps) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }
  