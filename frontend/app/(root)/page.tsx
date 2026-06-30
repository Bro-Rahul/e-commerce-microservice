import { BackToTop } from '@/components/homeScreen/BackToTop'
import { BestSellerBooks } from '@/components/homeScreen/BestSellerBooks'
import { CategoryGrid } from '@/components/homeScreen/CategoryGrid'
import { DealsSection } from '@/components/homeScreen/DealsSection'
import { HeroSection } from '@/components/homeScreen/HeroSection'
import { RecommendationSection } from '@/components/homeScreen/RecommendationSection'

const page = () => {
  return (
    <main className="w-full bg-background">
      <HeroSection />

      <div className="commerce-container">
        <CategoryGrid />
        <DealsSection />
        <BestSellerBooks />
        <RecommendationSection />
      </div>

      <BackToTop />
    </main>
  )
}

export default page