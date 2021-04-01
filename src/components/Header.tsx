import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { useState } from 'react';

import { useAuth } from '../hooks/useAuth';

function Header() {
  const [show, setShow] = useState(false);
  const { authenticated, logout } = useAuth();
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg">
          React App
        </Heading>
      </Flex>

      <Box display={{ sm: 'block', md: 'none' }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? 'block' : 'none', md: 'block' }}
        mt={{ base: 4, md: 0 }}
      >
        {authenticated && (
          <Button bg="transparent" border="1px" onClick={logout}>
            Log out
          </Button>
        )}
      </Box>
    </Flex>
  );
}

export default Header;
