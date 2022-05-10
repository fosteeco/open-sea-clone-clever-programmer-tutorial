import React from 'react'
import Header from '../../components/Header'
import { useEffect, useMemo, useState } from 'react'
import { useWeb3 } from '@3rdweb/hooks'
import { ThirdwebSDK } from '@3rdweb/sdk'
import { useRouter } from 'next/router'
import NFTImage from '../../components/nft/NFTImage'
import GeneralDetails from '../../components/nft/GeneralDetails'
import ItemActivity from '../../components/nft/ItemActivity'
import Purchase from '../../components/nft/Purchase'

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
}

const Nft = () => {
  const { provider } = useWeb3()
  const [mySigner, setMySigner] = useState()
  const [selectedNft, setSelectedNft] = useState()
  const [listings, setListings] = useState([])
  const router = useRouter()

  useEffect(() => {
    if (!provider) return
    setMySigner(provider.getSigner())
    console.log(mySigner)
  }, [provider])

  const marketPlaceContract = useMemo(() => {
    if (!provider) return
    const sdk = new ThirdwebSDK(provider)
    // const contract = sdk.getMarketplace(
    //   '0x5eF4e865F8590531FedcdD6325F192d8a0bF4ffd'
    // )
    return '000'
  }, [provider])

  const nftModule = useMemo(() => {
    if (!provider) return

    const sdk = new ThirdwebSDK(provider.getSigner())
    return sdk.getNFTModule('0xe38CE3601238f75Cf773AA26Ae9Ba18d1f418769')
  }, [provider])

  // get all NFTS in the collection
  useEffect(() => {
    if (!nftModule) return
    ;(async () => {
      const nfts = await nftModule.getAll()
      const selectedNft = nfts.find((nft) => nft.id === router.query.nftId)
      setSelectedNft(selectedNft)
    })()
  }, [nftModule])

  const marketPlaceModule = useMemo(() => {
    if (!provider) return

    const sdk = new ThirdwebSDK(provider.getSigner())
    return sdk.getMarketplaceModule(
      '0x5eF4e865F8590531FedcdD6325F192d8a0bF4ffd'
    )
  }, [provider])

  // Get all listings in the collection
  useEffect(() => {
    if (!marketPlaceModule) return
    ;(async () => {
      setListings(await marketPlaceModule.getAllListings())
    })()
  }, [marketPlaceModule])

  return (
    <div>
      <Header />
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
              <NFTImage selectedNft={selectedNft} />
            </div>
            <div className={style.detailsContainer}>
              <GeneralDetails selectedNft={selectedNft} />
              <Purchase
                isListed={router.query.isListed}
                selectedNft={selectedNft}
                listings={listings}
                marketPlaceModule={marketPlaceModule}
                marketPlaceContract={marketPlaceContract}
                mySigner={mySigner}
              />
            </div>
          </div>
          <ItemActivity />
        </div>
      </div>
      {/* <NFTImage selectedNft={selectedNft} /> */}
    </div>
  )
}

export default Nft
