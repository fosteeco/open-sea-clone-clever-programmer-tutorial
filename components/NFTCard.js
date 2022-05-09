import React from 'react'
import { useEffect } from 'react'

const NFTCard = ({ nftItem }) => {
  console.log('nftItem :', nftItem)
  return <img src={nftItem.image} />
}

export default NFTCard
