type Props = {
  children: React.ReactNode
}

export default function Root({ children }: Props) {
  return <div className="mx-16 h-auto w-auto flex items-center justify-center my-8">{children}</div>
}
