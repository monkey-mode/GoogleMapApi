import { Loader } from '@googlemaps/js-api-loader'
import { lightMapStyle, darkMapStyle } from 'consts/map'
import { useTheme } from '@nextui-org/react'

export const loader = new Loader({
  apiKey: 'AIzaSyBhn-5MT9GLGn2VJTN33fgVStXzMb9ZuN8',
  region: 'TH',
  language: 'th',
  version: 'weekly',
  libraries: ['places', 'geometry'],
})

export function useMap() {
  const { isDark } = useTheme()

  async function createMap(element: HTMLElement) {
    const google = await loader.load()
    const map = new google.maps.Map(element, {
      zoom: 18,
      mapTypeId: 'terrain',
      center: { lat: 13.736717, lng: 100.523186 },
      disableDefaultUI: true,
      keyboardShortcuts: false,
      clickableIcons: false,
      styles: isDark ? darkMapStyle : lightMapStyle,
    })
    return map
  }

  async function getGeoLocation(request: google.maps.GeocoderRequest) {
    const google = await loader.load()
    const geocoder = new google.maps.Geocoder()
  }

  function createMarker(
    position: google.maps.LatLngLiteral | google.maps.LatLng,
    map: google.maps.Map,
    onClick?: string | Element | Text
  ) {
    const marker = new google.maps.Marker({
      position,
      map,
    })
    if (onClick) {
      const infowindow = createInfoWindows(onClick)
      marker.addListener('click', () => {
        console.log('onclock')
        infowindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
        })
      })
    }

    return marker
  }

  function createInfoWindows(content: string | Element | Text) {
    return new google.maps.InfoWindow({
      content,
    })
  }

  return { createMap, createMarker, createInfoWindows }
}
