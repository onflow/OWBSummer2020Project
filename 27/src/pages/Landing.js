/** @jsx jsx */
import { jsx } from 'theme-ui';
import Layout from '~/components/Layout';
import RecentCertifications from '~/components/RecentCertifications';
import HeroText from '~/components/HeroText';

export default function Landing() {
  return (
    <Layout>
      <HeroText>CertaFox</HeroText>
      <RecentCertifications />
    </Layout>
  );
}
