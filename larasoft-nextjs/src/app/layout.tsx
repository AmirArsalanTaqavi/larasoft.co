import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      {/* Apply custom colors to the body */}
      <body className="bg-background text-text"> 
        
        <Header />
        
        {/* The main content area of the current page */}
        <main>{children}</main> 
        
        <Footer />
      </body>
    </html>
  );
}