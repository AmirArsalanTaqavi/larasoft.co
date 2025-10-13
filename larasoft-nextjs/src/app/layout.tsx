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
      <body className="bg-background text-text">
        <Header />
        <main 
            className="min-h-screen relative">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}