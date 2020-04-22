import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/core';
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const TabForm: React.FC = () => {
  const { register, login } = useAuth();

  return (
    <Tabs>
      <TabList>
        <Tab>Register</Tab>
        <Tab>Login</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <RegisterForm onSubmit={register} />
        </TabPanel>
        <TabPanel>
          <LoginForm onSubmit={login} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabForm;
