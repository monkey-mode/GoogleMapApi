type Props = {
  children: React.ReactNode
}

export default function Root({ children }: Props) {
  return <div className=" h-screen w-screen flex items-center justify-center flex-col">{children}</div>
}
