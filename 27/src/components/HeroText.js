/** @jsx jsx */
import { jsx, Flex, Heading } from 'theme-ui';

export default function HeroText(props = {}) {
  return (
    <Flex
      sx={{
        height: '20vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Heading>{props?.children || null}</Heading>
    </Flex>
  );
}
