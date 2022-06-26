import { useMap } from 'hook/useMap'
import { useEffect } from 'react'
import { userA } from 'mockData/user'
import { user } from 'types'
import styled from 'styled-components'
import { Card, Col, useTheme, Text, Row, Button } from '@nextui-org/react'

function Map() {
  const { createMap, createMarker } = useMap()
  const { isDark } = useTheme()

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
    const { picMarker } = _user
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
  }, [isDark])

  return (
    <Card css={{ w: '100%', h: '400px' }}>
      <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
        <Col>
          <Text size={12} weight="bold" transform="uppercase">
            Your day your way
          </Text>
          <Text h3>
            Your checklist for better sleep
          </Text>
        </Col>
      </Card.Header>
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
            <Row>
              <Col span={3}>
                <Card.Image
                  src="https://nextui.org/images/breathing-app-icon.jpeg"
                  css={{ bg: 'black', br: '50%' }}
                  height={40}
                  width={40}
                  alt="Breathing app icon"
                />
              </Col>
              <Col>
                <Text size={12}>
                  Breathing App
                </Text>
                <Text  size={12}>
                  Get a good night's sleep.
                </Text>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row justify="flex-end">
              <Button flat auto rounded >
                <Text
                  size={12}
                  weight="bold"
                  transform="uppercase"
                >
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
