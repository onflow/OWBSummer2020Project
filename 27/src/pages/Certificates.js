/** @jsx jsx */
import { jsx, Flex, Heading } from 'theme-ui';
import { useParams } from 'react-router-dom';
import Layout from '~/components/Layout';
import UserCertifications from '~/components/UserCertifications';

export default function Certificates() {
  const { addr } = useParams();
  return (
    <Layout>
      <Flex
        sx={{
          height: '20vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Heading>Certificates</Heading>
      </Flex>
      <UserCertifications addr={addr} />
    </Layout>
  );
}
