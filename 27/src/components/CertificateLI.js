/** @jsx jsx */
import { jsx, Text, Heading, Flex, Box, Image, Avatar } from 'theme-ui';
import { useHistory } from 'react-router-dom';

export default function CertificateLI(props = {}) {
  const history = useHistory();
  const {
    certificate,
    onClick,
  } = props;
  if (!certificate) return null;

  return (
    <Flex
      sx={{
        my: 2,
      }}
      onClick={() => {
        if (onClick) return onClick(certificate);
        history.push(`/certificates/${certificate.id}`);
      }}
    >
      <Box
        sx={{
          position: 'relative',
          marginBottom: 20,
        }}
      >
        <Image
          sx={{
            width: 150,
            mr: 2,
          }}
          src={certificate.img}
        />
        <Avatar
          sx={{
            size: 60,
            right: -20,
            bottom: -20,
            position: 'absolute',
            backgroundColor: 'white',
          }}
          src={certificate.ownedBy[0].avatar}
        />
      </Box>
      <Box
        sx={{
          ml: 20,
          pl: 2,
        }}
      >
        <Heading>{certificate.title}</Heading>
        <Text>{certificate.description}</Text>
        <Text>{certificate.grantedAt}</Text>
      </Box>
    </Flex>
  );
}
