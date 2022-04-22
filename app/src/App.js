import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  Button,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import { connectWallet, multiBridge } from './MultiBridge';
import Home from './components/Home';
import { connectToWallet } from './walletUtils';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Button onClick={connectWallet}>Connect wallet</Button>
            <Home />
            {/* <Button onClick={multiBridge}>Multi Bridge</Button> */}
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
