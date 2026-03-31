
import { RoughNotation } from 'react-rough-notation'
import SeasonalFruits from './seasonalFruits/SeasonalFruits'
import SeasonalVegetables from './seasonalVegetables/SeasonalVegetables'
import { getSeasonalProducts } from '@/lib/getSeasonalProducts'


const SeasonalHighlights = async () => {
await new Promise(r => setTimeout(r, 3000));

  const { fruits, vegetables } = await getSeasonalProducts();
    return (
    <div className="px-5 w-full sm:px-6 lg:px-5 pb-10 my-6 md:my-0">
  <div className="flex flex-col w-full gap-10">
    <SeasonalFruits fruits={fruits} />
    <SeasonalVegetables vegetables={vegetables} />
  </div>
</div>

    )
}

export default SeasonalHighlights