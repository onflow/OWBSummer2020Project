/** @jsx jsx */
import { jsx, Flex, Box, Heading } from 'theme-ui';

export default function NotFound() {
  return (
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
        }}
      >
        <Heading as="h1">404!</Heading>
        <Heading as="h3">Not Found</Heading>
      </Box>
    </Flex>
  );
}
