import { Hero } from '@/components/home/Hero';
import { Marquee } from '@/components/home/Marquee';
import { AITriggerButton } from '@/components/ai/AITriggerButton';
import { Bestsellers } from '@/components/home/Bestsellers';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { EditorialStrip } from '@/components/home/EditorialStrip';
import { NewArrivals } from '@/components/home/NewArrivals';
import { HowItWorks } from '@/components/home/HowItWorks';
import { Testimonials } from '@/components/home/Testimonials';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <AITriggerButton variant="strip" context="homepage" />
      <Bestsellers />
      <CategoryGrid />
      <EditorialStrip />
      <NewArrivals />
      <HowItWorks />
      <Testimonials />
    </>
  );
}
