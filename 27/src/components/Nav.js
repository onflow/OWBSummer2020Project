/** @jsx jsx */
import { jsx, Flex, NavLink } from 'theme-ui';
import { Link } from 'react-router-dom';
import CurrentUser from '~/components/CurrentUser';
import { useWallet } from '~/config/wallet';

export default function Nav() {
  const [, currentUser] = useWallet();
  return (
    <Flex
      as='nav'
      sx={{
        alignItems: 'center',
        justifyContent: currentUser?.loggedIn ? 'space-between' : 'flex-end',
        height: 60,
        backgroundColor: 'background',
        position: 'sticky',
        top: 0,
      }}
    >
      {currentUser?.loggedIn && (
        <Flex>
          <NavLink as={Link} to="/certificates/create">
            Create
          </NavLink>
          <NavLink as={Link} to={`/users/${currentUser.addr}/certificates`}>
            My Certificates
          </NavLink>
        </Flex>
      )}
      <CurrentUser />
    </Flex>
  );
}