import { Card, Grid, Image, Text, Textarea } from '@nextui-org/react'
import axios from 'axios'
import { defaultPin } from 'consts/map'
import { useState } from 'react'
import { positionType } from 'types'
import Map from './Map'

function Body() {
  const [position, setPosition] = useState<positionType>(defaultPin)

  async function upload(file: FileList | null) {
    const formData = new FormData()
    if (file && file.length === 1) {
      formData.append('image', file[0])
      formData.append('latitude', 'file[0]')
      formData.append('longitude', 'file[0]')

      await axios.post('http://159.223.2.234:8085/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    }
  }

  return (
    <Card.Body>
      <Grid.Container gap={2} justify="center">
        <Grid sm={3}>
          <Card isHoverable css={{ height: '600', background: '$background' }}>
            <Card.Body>
              <Image
                width={320}
                height={180}
                src={`${position.img}`}
                alt="Default Image"
                objectFit="cover"
              />
              <Text h6>{position.place}</Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid sm={9} css={{ minWidth: '400px' }}>
          <Map
            onClickPin={(lat, lng, img, place) => {
              setPosition({ lat, lng, img, place })
              console.log(lat, lng, place, 'return onclick')
            }}
            onClickMap={(lat: string, lng: string, img: string, place: string) => {}}
          ></Map>
        </Grid>
      </Grid.Container>
    </Card.Body>
  )
}

export default Body
