import { Card, Container, Spacer } from '@nextui-org/react'
import Body from 'components/Body'
import Header from 'components/Header'

function Home() {
  return (
    <Container md>
      <Spacer y={2} />
      <Card>
        <Header></Header>
        <Card.Divider></Card.Divider>
        <Body></Body>
        <Card.Divider></Card.Divider>
        <Card.Footer>
        </Card.Footer>
      </Card>
    </Container>
  )
}

export default Home
