// src/app/fonts.ts

import localFont from 'next/font/local';

export const vazirmatn = localFont({
  src: [
    {
      path: '../fonts/vazirmatn/Vazirmatn-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/vazirmatn/Vazirmatn-Bold.woff2',
      weight: '700', // 700 is the numeric value for 'bold'
      style: 'normal',
    },
    {
      path: '../fonts/vazirmatn/Vazirmatn-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/vazirmatn/Vazirmatn-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    // You can add the other weights (Black, Thin, etc.) here if you need them
  ],
  // This creates a CSS variable for us to use
  variable: '--font-vazirmatn',
});