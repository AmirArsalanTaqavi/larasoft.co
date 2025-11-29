import React from 'react';

export function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ITService', // Tells Google you are an IT company
    name: 'LaraSoft',
    alternateName: ['Lara Security', 'Lara Center'],
    description: 'خدمات حرفه‌ای شبکه، امنیت سایبری و توسعه نرم‌افزار در تهران',
    url: 'https://larasoft.co',
    logo: 'https://larasoft.co/images/logo.png', // Update with real logo URL later
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ferdowsi Sq, Shahroud Alley',
      addressLocality: 'Tehran',
      addressCountry: 'IR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 35.6892, // Approximate Tehran coords
      longitude: 51.389,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'],
      opens: '09:00',
      closes: '18:00',
    },
    founders: [
      {
        '@type': 'Person',
        name: 'Amir Arsalan Taghavi',
      },
    ],
    priceRange: '$$',
  };

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
