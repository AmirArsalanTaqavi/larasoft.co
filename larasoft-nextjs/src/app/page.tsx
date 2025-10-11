import { getPageBySlug, getPages, getPosts,WpPost} from '@/lib/wordpress'; 

export default async function Home() {
    // --- 1. Fetch Key Data ---
    // Fetch the main content of the Homepage using the English slug 'home'
    const homepageContent = await getPageBySlug('home'); 
    
    // Fetch all the service pages (for the Features section)
    const services = await getPages(); 

    // Fetch the latest blog posts
    const latestPosts = await getPosts();

    return (
        <main className="min-h-screen bg-gray-50 p-8">
            
            {/* --- 2. Display Homepage Content (The Welcome Message) --- */}
            {homepageContent && (
                <div className="text-center mb-16 bg-indigo-100 p-8 rounded-xl shadow-inner">
                    <h1 className="text-5xl font-extrabold text-indigo-900 mb-4">
                        {homepageContent.title.rendered}
                    </h1>
                    <div 
                        className="text-xl text-gray-700"
                        dangerouslySetInnerHTML={{ __html: homepageContent.content.rendered }}
                    />
                </div>
            )}

            {/* --- 3. Services/Features Section --- */}
            <h2 className="text-3xl text-right my-8">خدمات تخصصی لارا سافت</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {services.map((service: WpPost) => ( (
                    <div key={service.id} className="p-4 border shadow-md text-right bg-white rounded-lg">
                        <h3 className="text-xl font-bold">{service.title.rendered}</h3>
                        {/* Note: Using excerpt for a short description on the homepage */}
                        <div 
                            dangerouslySetInnerHTML={{ __html: service.excerpt.rendered }} 
                            className="text-gray-600 mt-2"
                        />
                        <a href={`/services/${service.slug}`} className="text-indigo-600 hover:text-indigo-800 mt-3 block">بیشتر &rarr;</a>
                    </div>
                )))}
            </div>

            {/* --- 4. Blog/Posts Section --- */}
            <h2 className="text-3xl text-right my-8 mt-12">آخرین مقالات</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {latestPosts.map((post) => (
                    <article key={post.id} className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3 text-right">
                            {post.title.rendered}
                        </h3>
                        <a href={`/post/${post.slug}`} className="text-indigo-600 hover:text-indigo-800 font-medium block mt-3">ادامه مطلب &rarr;</a>
                    </article>
                ))}
            </div>
        </main>
    );
}