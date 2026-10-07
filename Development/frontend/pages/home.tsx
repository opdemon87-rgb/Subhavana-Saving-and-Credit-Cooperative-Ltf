import { AnnouncementBar } from '@/components/home/announcement-bar'
import { SiteHeader } from '@/components/home/site-header'
import { Hero } from '@/components/home/hero'
import { FinancialTools } from '@/components/home/financial-tools'
import { ImpactStats } from '@/components/home/impact-stats'
import { SavingsRates } from '@/components/home/savings-rates'
import { Services } from '@/components/home/services'
import { DigitalServices } from '@/components/home/digital-services'
import { Branches } from '@/components/home/branches'
import { Testimonials } from '@/components/home/testimonials'
import { LatestUpdates } from '@/components/home/latest-updates'
import { Notices } from '@/components/home/notices'
import { SiteFooter } from '@/components/home/site-footer'
import { Downloads } from '@/components/home/downloads'
import { GovernmentSchemes } from '@/components/home/government-schemes'

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <Hero />
        <FinancialTools />
        <ImpactStats />
        <SavingsRates />
        <GovernmentSchemes />
        <Services />
        <DigitalServices />
        <Testimonials />
        <LatestUpdates />
        <Downloads />
        <Branches />
        <Notices />
      </main>
      <SiteFooter />
    </>
  )
}
