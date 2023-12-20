import React from 'react'
import OurMission from '../../components/users/about/our-mission/our-mission'
import PageHeader from '../../components/users/common/page-header/page-header'
import { Spacer } from '../../components/users/common/spacer/spacer'
import WhyChooseUs from '../../components/users/common/whychooseus/whychooseus'
import OurPartners from '../../components/users/ourpartners/ourpartners'
import Testimonals from '../../components/users/common/testimonals/testimonals'


const AboutPage = () => {
  return (
    <>
    <PageHeader title="About Us"/>
    <Spacer/>
    <OurMission/>
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

export default AboutPage