import { Card, Container, Grid, Image, Spacer, Text } from '@nextui-org/react'
import { defaultPin } from 'consts/map'
import { useState } from 'react'
import { positionType } from 'types'
import Map from './Map'

function Body() {
  const [position, setPosition] = useState<positionType>(defaultPin)
  return (
    <Card.Body>
      <Grid.Container gap={2} justify="center">
        <Grid sm={5}>
          <Card
            isHoverable
            css={{
              height: '600px',
              background: '$background',
            }}
          >
            <Card.Body>
              <Image
                objectFit={'cover'}
                showSkeleton
                height={600}
                css={{ minWidth: '350px' }}
                src={`https://storage.googleapis.com/projectbucketmap/${position.img}`}
                maxDelay={10000}
                alt="Default Image"
              />
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
              <Container fluid>
                <Spacer y={1} />
                <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                  Show Your Beautiful Picture
                </Text>
                <Text h5 color="white">
                  {position.place}
                </Text>
                <Spacer y={1} />
              </Container>
            </Card.Footer>
          </Card>
        </Grid>
        <Grid sm={7}>
          <Map
            onClickPin={(lat, lng, img, place) => setPosition({ lat, lng, img, place })}
          ></Map>
        </Grid>
      </Grid.Container>
    </Card.Body>
  )
}

export default Body
