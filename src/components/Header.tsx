import { Card, Dropdown, Row, User, Text, Spacer, Switch } from "@nextui-org/react"
import { MoonIcon, SunIcon } from "icons"
import { useTheme as useNextTheme } from 'next-themes'


function Header() {
  const { setTheme } = useNextTheme()

  return (
    <Card.Header>
      <Row justify="flex-end" align="center">
        <Dropdown placement="bottom-left">
          <Dropdown.Trigger>
            <User
              bordered
              as="button"
              size="lg"
              color="primary"
              name="Tony Reichert"
              description="@tonyreichert"
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            />
          </Dropdown.Trigger>
          <Dropdown.Menu color="primary" aria-label="User Actions">
            <Dropdown.Item key="profile" css={{ height: '$18' }}>
              <Text b color="inherit" css={{ d: 'flex' }}>
                Signed in as
              </Text>
              <Text b color="inherit" css={{ d: 'flex' }}>
                zoey@example.com
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="settings" withDivider>
              My Settings
            </Dropdown.Item>
            <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
            <Dropdown.Item key="analytics" withDivider>
              Analytics
            </Dropdown.Item>
            <Dropdown.Item key="system">System</Dropdown.Item>
            <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
            <Dropdown.Item key="help_and_feedback" withDivider>
              Help & Feedback
            </Dropdown.Item>
            <Dropdown.Item key="logout" color="error" withDivider>
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Spacer x={1} />
        <Switch
          checked={true}
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
