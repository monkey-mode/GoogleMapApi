import { Row, Card, Container, Spacer } from '@nextui-org/react'
import Body from 'components/Body'
import DropZone from 'components/DropZone'
import Header from 'components/Header'
import ModalMap from 'components/Modal'

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
          <ModalMap></ModalMap>
          <DropZone></DropZone>
        </Card.Footer>
      </Card>
    </Container>
  )
}

export default Home
