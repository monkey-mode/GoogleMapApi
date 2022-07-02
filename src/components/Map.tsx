import { useMap } from 'hook/useMap'
import { useEffect } from 'react'
import { userA } from 'mockData/user'
import { user } from 'types'
import styled from 'styled-components'
import { Card, Col, useTheme, Text, Row, Button } from '@nextui-org/react'
import axios from 'axios'

type Props = {
  onClickPin: (lat: string, lng: string, img: string, place: string) => void
  onClickMap: (lat: string, lng: string, img: string, place: string) => void
}

function Map({ onClickPin, onClickMap }: Props) {
  const { createMap, createMarker } = useMap()
  const { isDark } = useTheme()

  const markers: google.maps.Marker[] = []

  async function initMap(_user: user) {
    const { data } = await axios.get<
      { latitude: string; longitude: string; image: string }[]
    >('http://159.223.2.234:8085/getimage')
    console.log(data)
    const mapDiv = document.getElementById('map') as HTMLElement
    const map = await createMap(mapDiv)

    // map.addListener('click', async (event: google.maps.MapMouseEvent) => {
    //   const location = event.latLng ?? ({ lat: 0, lng: 0 } as google.maps.LatLngLiteral)
    //   console.log(event.latLng?.lat(), event.latLng?.lng())
    //   map.panTo(location)
    //   createMarker(location, map)
    // })

    for (let i = 0; i < data.length; i++) {
      const { latitude, longitude, image } = data[i]
      const location = {
        lat: Number(latitude),
        lng: Number(longitude),
      } as google.maps.LatLngLiteral
      markers.push(
        createMarker(
          location,
          map,
          `https://storage.googleapis.com/projectbucketmap/${image}`,
          onClickPin
        )
      )
    }
  }
  useEffect(() => {
    initMap(userA)
  }, [isDark])

  return (
    <Card css={{ w: '100%', h: '400px' }}>
      <Card.Body css={{ p: 0 }}>
        <MapDiv id="map"></MapDiv>
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
            <Row justify="flex-end">
              <Button flat auto rounded>
                <Text size={12} weight="bold" transform="uppercase">
                  Get App
                </Text>
              </Button>
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
