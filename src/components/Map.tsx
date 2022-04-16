import { useMap } from 'hook/useMap'
import { useEffect } from 'react'

function Map() {
  const { createMap, createMarker } = useMap()
  let markers: google.maps.Marker[] = []

  async function initMap() {
    document.getElementById('show-markers')?.addEventListener('click', showMarkers)
    document.getElementById('hide-markers')?.addEventListener('click', hideMarkers)
    document.getElementById('delete-markers')?.addEventListener('click', deleteMarkers)

    const map = await createMap(document.getElementById('map') as HTMLElement)
    map.addListener('click', async (event: google.maps.MapMouseEvent) => {
      const location = event.latLng ?? ({ lat: 0, lng: 0 } as google.maps.LatLngLiteral)

      markers.push(createMarker(location, map))
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

  useEffect(() => {
    initMap()
  })

  return (
    <>
      <div></div>
      <div id="map" className="h-96"></div>
      <input id="hide-markers" type="button" value="Hide Markers" />
      <input id="show-markers" type="button" value="Show Markers" />
      <input id="delete-markers" type="button" value="Delete Markers" />
    </>
  )
}

export default Map