import {
  Card, Row,
  Spacer,
  Switch, useTheme
} from '@nextui-org/react'
import { MoonIcon, SunIcon } from 'icons'
import { useTheme as useNextTheme } from 'next-themes'

function Header() {
  const { setTheme } = useNextTheme()
  const { isDark } = useTheme()

  return (
    <Card.Header>
      <Row justify="flex-end" align="center">
        <Spacer x={1} />
        <Switch
          checked={isDark}
          size="xl"
          iconOn={<SunIcon filled />}
          iconOff={<MoonIcon filled />}
          onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
        />
      </Row>
    </Card.Header>
  )
}

export default Header
