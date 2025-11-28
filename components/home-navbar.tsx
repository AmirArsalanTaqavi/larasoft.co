'use client';

import { MagneticButton } from '@/components/magnetic-button';
import { useState } from 'react';
import { useScroll } from '@/components/scroll-context';
import { LogoInline } from './svgs';

export default function HomeNavbar() {
  const { scrollToSection, currentSection } = useScroll();
  const [isLoaded, setIsLoaded] = useState(true);

  return;
}
