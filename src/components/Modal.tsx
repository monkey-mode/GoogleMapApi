import React from 'react'
import { Modal, Button, Image, Text, Link } from '@nextui-org/react'
import DropZone from './DropZone'

export default function ModalMap() {
  const [visible, setVisible] = React.useState(false)
  const handler = () => setVisible(true)
  const closeHandler = () => {
    setVisible(false)
    console.log('closed')
  }
  return (
    <div>
      <Button auto flat color="error" onClick={handler}>
        Open modal
      </Button>
      <Modal width="550px" noPadding open={visible} onClose={closeHandler}>
        <DropZone></DropZone>
      </Modal>
    </div>
  )
}
