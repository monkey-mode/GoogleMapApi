import { Loader } from '@googlemaps/js-api-loader'
import { useTheme } from '@nextui-org/react'
import { darkMapStyle, lightMapStyle } from 'consts/map'
import { DataRespon } from 'types'

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
      zoom: 15,
      mapTypeId: 'terrain',
      center: { lat: 13.736717, lng: 100.523186 },
      disableDefaultUI: true,
      keyboardShortcuts: false,
      clickableIcons: false,
      scaleControl: true,
      styles: isDark ? darkMapStyle : lightMapStyle,
    })
    return map
  }

  function createMarker(
    map: google.maps.Map,
    data: DataRespon,
    index?: number,
    onClick?: (lat: string, lng: string, img: string, place: string) => void,
    onSetIndex?: (index: number) => void
  ) {
    const { latitude, longitude, image } = data
    const position = {
      lat: Number(latitude),
      lng: Number(longitude),
    } as google.maps.LatLngLiteral

    const marker = new google.maps.Marker({
      position,
      map,
    })
    if (onClick && onSetIndex && index) {
      marker.addListener('click', async () => {
        const place = await getGeoLocation({
          location: position,
        })
        onClick(latitude, longitude, image, place)
        onSetIndex(index)
      })
    }

    return marker
  }

  function createNullMarker(
    map: google.maps.Map,
    position?: google.maps.LatLngLiteral | google.maps.LatLng,
    onClick?: () => void
  ) {
    const marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      map,
      position,
    })

    const infowindow = createInfoWindows(
      `<h5 class="nextui-c-PJLV nextui-c-PJLV-ijtkusk-css">Click On This Pin</h5>
      <h6 class="nextui-c-PJLV nextui-c-PJLV-ijtkusk-css">To Upload Your Image</h6>
      `
    )
    infowindow.open({
      anchor: marker,
      map,
      shouldFocus: false,
    })
    onClick
      ? marker.addListener('click', () => {
          onClick()
          infowindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
          })
        })
      : () => {}

    return marker
  }

  function createInfoWindows(content: string | Element | Text) {
    return new google.maps.InfoWindow({
      content,
    })
  }

  async function getGeoLocation(request: google.maps.GeocoderRequest) {
    const google = await loader.load()
    const geocoder = new google.maps.Geocoder()
    const { results } = await geocoder.geocode({ ...request, region: 'th' })
    if (results) {
      return results[0]['formatted_address']
    } else {
      return ''
    }
  }

  return { createMap, createMarker, createInfoWindows, getGeoLocation, createNullMarker }
}
