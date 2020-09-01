/** @jsx jsx */
import { jsx, IconButton, Text, Flex, Avatar } from 'theme-ui';
import { IoIosContact } from 'react-icons/io';
import { useHistory } from 'react-router-dom';
import { useWallet } from '~/config/wallet';

export default function CurrentUser() {
  const [fcl, currentUser] = useWallet();
  const history = useHistory();
  const handleClick = async () => {
    if (!currentUser?.loggedIn) {
      const cu = await fcl.authenticate();
      if (cu.loggedIn) history.push(`/users/${cu.addr}/certificates`);
      return;
    }
    const willLogout = window.confirm('Log out?');
    if (willLogout) fcl.unauthenticate();
  };

  return (
    <Flex
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={handleClick}
    >
      <Text pr="2">{currentUser?.identity?.name || 'Log In'}</Text>
      {currentUser?.identity?.avatar && (
        <Avatar
          sx={{ size: 60 }}
          src={currentUser?.identity?.avatar}
        />
      )}
      {!currentUser?.identity?.avatar && (
        <IconButton
          sx={{ size: 60 }}
        >
          <IoIosContact size="100%" />
        </IconButton>
      )}
    </Flex>
  );
}
