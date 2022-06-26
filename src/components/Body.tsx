import { Card, Dropdown, Row, User, Text, Spacer, Switch, Grid } from '@nextui-org/react'
import { MoonIcon, SunIcon } from 'icons'
import { useTheme as useNextTheme } from 'next-themes'
import Map from './Map'

function Body() {
  return (
    <Card.Body>
      <Grid.Container gap={2} justify="center">
        <Grid sm>
          <Card css={{ h: '$20', $$cardColor: '$colors$primary' }}>
            <Card.Body>
              <Text h6 size={15} color="white" css={{ m: 0 }}>
                "Show data"
              </Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid sm={9}>
          <Map></Map>
        </Grid>
      </Grid.Container>
    </Card.Body>
  )
}

export default Body
