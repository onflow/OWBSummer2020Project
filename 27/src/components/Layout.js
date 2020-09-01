/** @jsx jsx */
import { jsx, Container } from 'theme-ui'
import Nav from '~/components/Nav';

export default function Layout(props) {
  return (
    <Container
      sx={{
        position: 'relative',
      }}
    >
      <Nav />
      {props?.children || null}
    </Container>
  );
}
