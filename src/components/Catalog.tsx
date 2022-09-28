import React from 'react'
import {useSelector} from 'react-redux'
 
const Catalog: React.FC = () => {

  const catalog = useSelector(state => state)
  console.log("🚀 ~ file: Catalog.tsx ~ line 7 ~ catalog", catalog)


  return (
    <h1>Catalog</h1>
  )
}

export default Catalog