import React from 'react'
import { Spacer } from '../../components/users/common/spacer/spacer'
import Testimonals from '../../components/users/common/testimonals/testimonals'
import FeaturedProperties from '../../components/users/home/featured-properties/featured-properties'
import Slider from '../../components/users/home/slider/slider'
import OurPartners from '../../components/users/ourpartners/ourpartners'
import WhyChooseUs from '../../components/users/common/whychooseus/whychooseus'


const HomePage = () => {
  return (

  <>
   <Slider/>
   <Spacer/>
   <FeaturedProperties/>
   <Spacer/>
   <WhyChooseUs/>
   <Spacer/>
   <Testimonals/>
   <Spacer/>
   <OurPartners/>
   <Spacer/>
  </>

  )
}

export default HomePage
