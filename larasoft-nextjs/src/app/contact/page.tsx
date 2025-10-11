import ContactForm from '@/components/ContactForm';
import { getPageBySlug, WpPost } from '@/lib/wordpress'; 
import { notFound } from 'next/navigation';
// NOTE: We will import the ContactForm component later

export default async function ContactPage() {
    // Fetch the contact page content by its clean slug 'contact'
    const contactContent: WpPost | null = await getPageBySlug('contact');

    if (!contactContent) {
        notFound();
    }

    return (
        <main className="min-h-screen p-10 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-6">
                {contactContent.title.rendered}
            </h1>
            
            {/* Display static content (e.g., address, phone) */}
            <div 
                className="prose mx-auto mb-10 text-gray-700 text-center"
                dangerouslySetInnerHTML={{ __html: contactContent.content.rendered }}
            />
            
            <h2 className="text-2xl font-semibold mb-4 text-center">ارسال پیام</h2>
            
            <div className="border p-8 rounded-lg shadow-lg bg-white">
                <ContactForm /> {/* <-- Now the component is active */}
            </div>
            
        </main>
    );
}