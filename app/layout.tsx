import './globals.css';

export const metadata = {
  title: "Products APP",
};

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="py-10 px-10">
        {children}
      </body>
    </html>
  );
};

export default ProductLayout;
