import { useMap } from 'hook/useMap'
import { useEffect, useState } from 'react'
import { Popconfirm, Button } from 'antd'

function Map() {
  const { createMap, createInfoWindows, createMarker } = useMap()
  let markers: google.maps.Marker[] = []

  async function initMap() {
    document.getElementById('show-markers')?.addEventListener('click', showMarkers)
    document.getElementById('hide-markers')?.addEventListener('click', hideMarkers)
    document.getElementById('delete-markers')?.addEventListener('click', deleteMarkers)

    const contentString = (
      `<div>
        งานหีหมา
        <div class=" text-3xl">content</div>
        <button>ปุ่มตกลง</button>
        <button>ปุ่มยกเลิก</button>
        <input type="text" class="border-2 border-black"></input>
      </div>`
    )

    const map = await createMap(document.getElementById('map') as HTMLElement)
    map.addListener('click', async (event: google.maps.MapMouseEvent) => {
      const location = event.latLng ?? ({ lat: 0, lng: 0 } as google.maps.LatLngLiteral)
      console.log(event.latLng?.lat(), event.latLng?.lng())
      markers.push(createMarker(location, map, contentString))
      showPopconfirm()
    })

    function setMapOnAll(map: google.maps.Map | null) {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map)
      }
    }

    function hideMarkers(): void {
      setMapOnAll(null)
    }

    function showMarkers(): void {
      setMapOnAll(map)
    }

    function deleteMarkers(): void {
      hideMarkers()
      markers = []
    }
  }
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const showPopconfirm = () => {
    setVisible(true)
  }

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setVisible(false)
      setConfirmLoading(false)
    }, 2000)
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setVisible(false)
  }
  useEffect(() => {
    initMap()
  }, [])

  return (
    <>
      <div></div>
      <div id="map" className=" h-5/6"></div>
      <input id="hide-markers" type="button" value="Hide Markers" />
      <input id="show-markers" type="button" value="Show Markers" />
      <input id="delete-markers" type="button" value="Delete Markers" />
      {/* <Popconfirm
        title="Title"
        visible={visible}
        onConfirm={handleOk}
        okButtonProps={{ loading: confirmLoading }}
        onCancel={handleCancel}
      >
        <Button type="primary" onClick={showPopconfirm}>
          Open Popconfirm with async logic
        </Button>
      </Popconfirm> */}
    </>
  )
}

export default Map
