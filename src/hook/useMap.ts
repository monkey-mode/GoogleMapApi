import { Loader } from '@googlemaps/js-api-loader'

export const loader = new Loader({
  apiKey: 'AIzaSyBdgJbPj0ZeGqENbTIDPDl_QAgj4_6f5d0',
  region: 'TH',
  language: 'th',
  version: 'weekly',
  libraries: ['places', 'geometry'],
})

export function useMap() {
  async function createMap(element: HTMLElement) {
    const google = await loader.load()
    const map = new google.maps.Map(element, {
      zoom: 18,
      mapTypeId: 'roadmap',
      center: { lat: 13.736717, lng: 100.523186 },
      disableDefaultUI: true,
      keyboardShortcuts: false,
      clickableIcons: false,
    })
    return map
  }

  async function getGeoLocation(request: google.maps.GeocoderRequest) {
    const google = await loader.load()
    const geocoder = new google.maps.Geocoder()
  }

  function createMarker(
    position: google.maps.LatLngLiteral | google.maps.LatLng,
    map: google.maps.Map
  ) {
    const marker = new google.maps.Marker({
      position,
      map,
    })

    return marker
  }

  return { createMap, createMarker }
}
