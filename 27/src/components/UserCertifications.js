/** @jsx jsx */
import { jsx, Container } from 'theme-ui';
import CertificateLI from '~/components/CertificateLI';
import certificates from '~/config/tmpCerts';

export default function UserCertifications({ addr } = {}) {
  const currentCerts = certificates.filter((c) => c.ownedBy[0].id === addr);
  return (
    <Container>
      {currentCerts.map((certificate) => (
        <CertificateLI key={certificate.id} certificate={certificate} />
      ))}
    </Container>
  );
}
