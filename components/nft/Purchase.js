import React from 'react'

import { HiTag } from 'react-icons/hi'
import { IoMdWallet } from 'react-icons/io'
import toast, { Toaster } from 'react-hot-toast'
import { useState, useEffect } from 'react'

const style = {
  button: `mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer`,
  buttonIcon: `text-xl`,
  buttonText: `ml-2 text-lg font-semibold`,
}

const Purchase = ({
  isListed,
  selectedNft,
  listings,
  marketPlaceModule,
  marketPlaceContract,
  mySigner,
}) => {
  const [selectedMarketNft, setSelectedMarketNft] = useState()
  const [enableButton, setEnableButton] = useState(false)

  useEffect(() => {
    if (!listings || isListed === 'false') return
    ;(async () => {
      setSelectedMarketNft(
        listings.find(function (marketNft) {
          return marketNft.asset.id === selectedNft.id
        })
      )
    })()
  }, [selectedNft, listings, isListed])

  useEffect(() => {
    if (!selectedMarketNft || !selectedNft) return

    setEnableButton(true)
  }, [selectedMarketNft, selectedNft])

  const confirmPurchase = (toastHandler = toast) => {
    toastHandler.success(`Purchase Successful!`, {
      style: {
        background: '#04111d',
        color: '#fff',
      },
    })
  }

  const getMethods = (obj) => {
    let properties = new Set()
    let currentObj = obj
    do {
      Object.getOwnPropertyNames(currentObj).map((item) => properties.add(item))
    } while ((currentObj = Object.getPrototypeOf(currentObj)))
    return [...properties.keys()].filter(
      (item) => typeof obj[item] === 'function'
    )
  }

  /* 
  const buyItem = async (
    listingId = selectedMarketNft.id,
    quantityDesired = 1,
    module = marketPlaceModule
  ) => {
    console.log('!!!running buyItem')
    // console.log('listingId :', listingId)
    // console.log('module :', module)
    // console.log('mySigner.getGasPrice() :', await mySigner.getGasPrice())
    // console.log(mySigner)
    // console.log(getMethods(mySigner))
    // await marketPlaceModule
    //   ?.buyoutDirectListing({
    //     listingId: listingId,
    //     quantityDesired: quantityDesired,
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
    confirmPurchase()
  }
  */

  const buyItem = async (
    listingId = selectedMarketNft.id,
    quantityDesired = 1,
    module = marketPlaceModule
  ) => {
    await module
      .buyoutDirectListing({
        listingId: listingId,
        quantityDesired: quantityDesired,
      })
      .catch((error) => console.error(error))

    confirmPurchase()
  }

  return (
    <div className="round flex h-20 w-full items-center bg-[#303339] px-12">
      <Toaster position="bottom-left" reverseOrder={false} />
      {isListed === 'true' ? (
        <>
          <div
            onClick={() => {
              enableButton ? buyItem(selectedMarketNft.id, 1) : null
            }}
            className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
          >
            <IoMdWallet className={style.buttonIcon} />
            <div className={style.buttonText}>Buy Now</div>
          </div>
          <div className={`${style.button} bg-[#3] border border-[#151c22]`}>
            <HiTag className={style.buttonIcon} />
            <div className={style.buttonText}>Make Offer</div>
          </div>
        </>
      ) : (
        <div className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}>
          <IoMdWallet className={style.buttonIcon} />
          <div className={style.buttonText}>List Item</div>
        </div>
      )}
    </div>
  )
}

export default Purchase
