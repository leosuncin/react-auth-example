import { Avatar, Box, Flex, Text } from '@chakra-ui/core';
import React from 'react';
import { MdAccountBox } from 'react-icons/md';
import { useAuth } from '../hooks/useAuth';
import TabForm from './TabForm';

const UserBox: React.FC = () => {
  const { authenticated, user } = useAuth();
  return authenticated ? (
    <Box
      maxWidth={400}
      p={4}
      borderRadius={4}
      borderWidth={2}
      borderStyle="solid"
      m="auto"
      my={4}
    >
      <Flex mt={2}>
        <Avatar
          size="lg"
          name={user?.name}
          src={`https://api.adorable.io/avatars/64/${encodeURIComponent(
            user?.email as string,
          )}`}
        />
        <Box ml={4} as={MdAccountBox} color="orange.400" />
        <Text
          ml={2}
          textTransform="uppercase"
          fontSize="sm"
          fontWeight="bold"
          color="brand.800"
        >
          {user?.name}
        </Text>
      </Flex>
    </Box>
  ) : (
    <TabForm />
  );
};

export default UserBox;
