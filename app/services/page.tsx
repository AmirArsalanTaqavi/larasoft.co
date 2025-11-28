import DotPattern from '@/components/ui/dot-pattern';
import { getServices } from '@/lib/wordpress';
import Link from 'next/link';

export default async function ServicesIndexPage() {
  const services = await getServices();
  return (
    <main className='p-10 pt-30'>
      <div className='relative'>
        <article className='bg-accent/75 mx-auto max-w-5xl rounded-md p-12 shadow-2xl'>
          <h2 className='font-larasoft text-primary mb-2 text-5xl tracking-tight md:text-6xl lg:text-7xl'>
            سرویس ها
          </h2>
          <p className='font-space text-secondary/60 text-sm md:text-base'>
            / Services
          </p>
        </article>
        <div className='mx-auto grid max-w-4xl grid-cols-1 gap-8 px-4 py-12'>
          {services.length > 0 ? (
            services.map((service) => (
              <div key={service.id}>
                <Link
                  href={`/services/${service.slug}`}
                  key={service.id}
                  className='group bg-forefround/20 hover:bg-secondary/80 block rounded-md border p-6 shadow-lg backdrop-blur-2xl transition-all duration-300'
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: service.excerpt?.rendered ?? '',
                    }}
                    className='text-text/70 mt-4 text-right'
                  />
                  <DotPattern width={10} height={10} />
                  <div className='flex items-baseline gap-3 md:gap-6'>
                    <span className='font-space text-foreground/30 group-hover:text-foreground/50 text-sm transition-colors md:text-base'>
                      {service.id}
                    </span>
                    <div>
                      <h3
                        className='font-vazirmatn text-foreground mb-1 text-2xl font-light transition-transform duration-300 group-hover:translate-x-2 md:text-3xl lg:text-4xl'
                        dangerouslySetInnerHTML={{
                          __html: service.title.rendered,
                        }}
                      />
                      <p className='font-space text-foreground/50 text-xs md:text-sm'>
                        short desc
                      </p>
                    </div>
                  </div>
                  <span className='text-accent mt-4 block text-right font-medium'>
                    اطلاعات بیشتر &larr;
                  </span>
                </Link>
              </div>
            ))
          ) : (
            <p className='text-text/70 text-center'>No services found.</p>
          )}
        </div>
      </div>
    </main>
  );
}
