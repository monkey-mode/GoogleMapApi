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

export interface positionType {
  lat: string
  lng: string
  img: string
  place: string
}

export interface DataRespon {
  latitude: string
  longitude: string
  image: string
}

export interface DataPlace {
  latitude: string
  longitude: string
  image: string
  place: string
}

export interface PlaceLocation {
  latitude: string
  longitude: string
}
