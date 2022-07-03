import { Button, Card, Col, Row, useTheme } from '@nextui-org/react'
import axios from 'axios'
import { useMap } from 'hook/useMap'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DataRespon, PlaceLocation } from 'types'
import ModalMap from './Modal'

type Props = {
  onClickPin: (lat: string, lng: string, img: string, place: string) => void
}

function Map({ onClickPin }: Props) {
  const { isDark } = useTheme()
  const { createMap, createMarker, getGeoLocation, createNullMarker } = useMap()
  const [mark, setMark] = useState<DataRespon[]>([])
  const [pinIndex, setPinIndex] = useState<{ index: number; maxIndex: number }>({
    index: 0,
    maxIndex: 0,
  })
  const [isVisable, setIsVisable] = useState(false)
  const [reload, setReload] = useState(false)
  const [newMark, setNewMark] = useState<PlaceLocation>({
    latitude: '',
    longitude: '',
  })
  const [mapData, setMapData] = useState<google.maps.Map>()

  async function initMap(data: DataRespon[]) {
    const mapDiv = document.getElementById('map') as HTMLElement
    const map = await createMap(mapDiv)
    setMapData(map)
    let newmark = createNullMarker(map)
    map.addListener('click', async (event: google.maps.MapMouseEvent) => {
      const location = event.latLng ?? ({ lat: 0, lng: 0 } as google.maps.LatLngLiteral)
      newmark.setMap(null)
      newmark = createNullMarker(map, location, () => {
        setIsVisable(true)
      })
      if (event.latLng) {
        setNewMark({
          latitude: event.latLng.lat().toString(),
          longitude: event.latLng.lng().toString(),
        })
      }

      map.panTo(location)
    })

    const markers: google.maps.Marker[] = []
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        markers.push(
          createMarker(map, data[i], i, onClickPin, (index) => {
            setPinIndex({ index, maxIndex: data.length })
          })
        )
      }
      setMark(data)
      const { latitude, longitude, image } = data[data.length - 1]
      const place = await getGeoLocation({
        location: {
          lat: Number(latitude),
          lng: Number(longitude),
        } as google.maps.LatLngLiteral,
      })
      onClickPin(latitude, longitude, image, place)
      setPinIndex({ index: data.length - 1, maxIndex: data.length })
      map.setZoom(16)
      map.panTo({
        lat: Number(latitude),
        lng: Number(longitude),
      } as google.maps.LatLngLiteral)
    }
  }
  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get<DataRespon[]>('http://159.223.2.234:8085/getimage')
      initMap(data)
    })()
  }, [isDark, reload])

  return (
    <Card css={{ width: '100%', height: '600px' }}>
      <ModalMap
        onClose={(close) => {
          setReload(!reload)
          setIsVisable(close)
        }}
        isVisable={isVisable}
        location={newMark}
      ></ModalMap>
      <Card.Body css={{ p: 0 }}>
        <MapDiv style={{ minWidth: '400px' }} id="map"></MapDiv>
      </Card.Body>
      <Card.Footer
        isBlurred
        css={{
          position: 'absolute',
          bgBlur: '#0f111466',
          borderTop: '$borderWeights$light solid $gray800',
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Row>
          <Col>
            <Row justify="flex-start">
              <Button.Group color="secondary" bordered>
                <Button
                  icon={<span className="material-symbols-rounded">arrow_back_ios</span>}
                  disabled={pinIndex.index == 0}
                  onClick={async () => {
                    const newIndex = pinIndex.index - 1
                    const { latitude, longitude, image } = mark[newIndex]
                    const location = {
                      lat: Number(latitude),
                      lng: Number(longitude),
                    } as google.maps.LatLngLiteral
                    const place = await getGeoLocation({
                      location,
                    })
                    onClickPin(latitude, longitude, image, place)
                    setPinIndex({ ...pinIndex, index: newIndex })
                    mapData?.setZoom(16)
                    mapData?.panTo(location)
                  }}
                >
                  Prev
                </Button>
                <Button
                  disabled={pinIndex.index == pinIndex.maxIndex - 1}
                  iconRight={
                    <span className="material-symbols-rounded">arrow_forward_ios</span>
                  }
                  onClick={async () => {
                    const newIndex = pinIndex.index + 1
                    const { latitude, longitude, image } = mark[newIndex]
                    const location = {
                      lat: Number(latitude),
                      lng: Number(longitude),
                    } as google.maps.LatLngLiteral
                    const place = await getGeoLocation({
                      location,
                    })
                    onClickPin(latitude, longitude, image, place)
                    setPinIndex({ ...pinIndex, index: newIndex })
                    mapData?.setZoom(16)
                    mapData?.panTo(location)
                  }}
                >
                  Next
                </Button>
              </Button.Group>
            </Row>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  )
}

const MapDiv = styled.div`
  height: 100%;
  width: 100%;
`
export default Map
