import { useMap } from 'hook/useMap'
import { useEffect, useState } from 'react'
import { Popconfirm, Button } from 'antd'
import { userA } from 'mockData/user'
import { user } from 'types'

function Map() {
  const { createMap, createInfoWindows, createMarker } = useMap()
  const [showSide, setShowSide] = useState(false)
  const markers: google.maps.Marker[] = []

  async function initMap(_user: user) {
    const map = await createMap(document.getElementById('map') as HTMLElement)
    // map.addListener('click', async (event: google.maps.MapMouseEvent) => {
    //   const location = event.latLng ?? ({ lat: 0, lng: 0 } as google.maps.LatLngLiteral)
    //   console.log(event.latLng?.lat(), event.latLng?.lng())
    //   map.panTo(location)
    //   markers.push(createMarker(location, map))
    //   showPopconfirm()
    // })
    const { name, img, picMarker } = _user
    for (let i = 0; i < picMarker.length; i++) {
      const { lat, lng } = picMarker[i]
      const location = { lat, lng } as google.maps.LatLngLiteral
      markers.push(createMarker(location, map))
    }
    const { lat, lng } = picMarker[0]
    const location = { lat, lng } as google.maps.LatLngLiteral
    map.panTo(location)
  }
  useEffect(() => {
    initMap(userA)
  }, [])

  return (
    <>
      <div className="absolute z-10 top-0 bg-white shadow-lg shadow-black w-96 h-full flex-col">
        <img src={userA.picMarker[0].image[0]} className=" w-full h-auto"></img>
      </div>
      <div id="map" className=" h-full w-full"></div>
    </>
  )
}

export default Map
