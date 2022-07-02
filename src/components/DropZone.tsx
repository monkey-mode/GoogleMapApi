import { Dropzone, FileItem, FileValidated, FullScreenPreview } from '@dropzone-ui/react'
import { useState } from 'react'
export default function DropZone() {
  const [files, setFiles] = useState<FileValidated[]>([])
  const [imageSrc, setImageSrc] = useState<string>()
  const updateFiles = (incommingFiles: FileValidated[]) => {
    console.log('incomming files', incommingFiles)
    setFiles(incommingFiles)
  }
  const onDelete = (id: string | number | undefined) => {
    setFiles(files.filter((x) => x.id !== id))
  }
  const handleSee = (imageSource: string) => {
    setImageSrc(imageSource)
  }
  const handleClean = (files: FileValidated[]) => {
    console.log('list cleaned', files)
  }
  return (
    <Dropzone
      style={{ minWidth: '550px' }}
      config={{
        body: { lat: '1234', lng: '4321' },
      }}
      onChange={updateFiles}
      footer={false}
      minHeight="195px"
      onClean={handleClean}
      value={files}
      maxFiles={5}
      maxFileSize={2998000}
      accept=".png,image/*"
      url="http://localhost:8080/create"
      disableScroll
    >
      {files.map((file) => (
        <FileItem
          {...file}
          key={file.id}
          onDelete={onDelete}
          onSee={handleSee}
          resultOnTooltip
          preview
          info
          hd
        />
      ))}
      <FullScreenPreview
        imgSource={imageSrc}
        openImage={imageSrc ? true : false}
        onClose={(e: any) => handleSee('')}
      />
    </Dropzone>
  )
}
