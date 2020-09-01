/** @jsx jsx */
import { jsx, Box, Label, Input, Button } from 'theme-ui';
import { useParams } from 'react-router-dom';
import Layout from '~/components/Layout';
import CertificateLI from '~/components/CertificateLI';
import HeroText from '~/components/HeroText';
import certificates from '~/config/tmpCerts';

export default function TransferCertificate() {
  const { certificateId } = useParams();
  const certificate = certificates.find((c) => c.id === certificateId);
  return (
    <Layout>
      <HeroText>Transfer Certificate</HeroText>
      <CertificateLI certificate={certificate} />
      <Box
        as='form'
        onSubmit={(e) => e.preventDefault()}
      >
        <Label htmlFor='addr'>Send to Address</Label>
        <Input
          name='addr'
          id='addr'
          mb={3}
        />
        <Button>
          Submit
        </Button>
      </Box>

    </Layout>
  );
}
