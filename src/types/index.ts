export interface user {
  name: string
  img: string
  picMarker: picMarker[]
}

interface picMarker {
  index: number
  image: string[]
  name: string
  lat: number
  lng: number
}
