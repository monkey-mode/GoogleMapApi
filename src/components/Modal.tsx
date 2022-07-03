import { Modal } from '@nextui-org/react'
import React, { useEffect } from 'react'
import DropZone from './DropZone'

type Props = {
  onClose: (close: boolean) => void
  isVisable: boolean
  location: { latitude: string; longitude: string }
}

export default function ModalMap({ onClose, isVisable, location }: Props) {
  const [visible, setVisible] = React.useState(isVisable)
  const closeHandler = () => {
    onClose(false)
    setVisible(false)
  }
  useEffect(() => {
    setVisible(isVisable)
  }, [isVisable])
  return (
    <div>
      <Modal width="550px" noPadding open={visible} onClose={closeHandler}>
        <DropZone location={location}></DropZone>
      </Modal>
    </div>
  )
}
