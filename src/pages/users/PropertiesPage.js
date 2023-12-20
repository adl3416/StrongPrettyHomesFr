import React from 'react'
import PageHeader from '../../components/users/common/page-header/page-header'
import { Spacer } from '../../components/users/common/spacer/spacer'
import Search from '../../components/users/home/search/search-bar'
import Properties2 from '../../components/users/properties/properties2'
import Properties from '../../components/users/properties/properties'
import { useStore } from '../../store'




export const PropertiesPage = () => {
  const {searchFormState,dispatchSearchForm} = useStore();
  const {searchForm} = searchFormState;
  

  return (


    <>
    <PageHeader title="Properties" />
    <Spacer />
    {Object.keys(searchForm).length > 0 ? <Properties/> : <Properties2 />}
    
    <Spacer />
  </>

  )
}

