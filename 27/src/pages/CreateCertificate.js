/** @jsx jsx */
import { jsx, Box, Label, Input, Textarea, Button } from 'theme-ui';
import { useHistory } from 'react-router-dom';
import { useRef } from 'react';
import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import Layout from '~/components/Layout';
import HeroText from '~/components/HeroText';
// import createCertificate from '~/contracts/createCertificate'; 
import { useWallet } from '~/config/wallet';
import certificates, { walletId1, walletId2 } from '~/config/tmpCerts';

export default function CreateCertificate() {
  const [fcl, currentUser] = useWallet();
  const history = useHistory();
  const title = useRef();
  const description = useRef();
  const img = useRef();
  const recipient = useRef();

  // if (!currentUser?.loggedIn) {
  //   return <Redirect to="/" />;
  // }

  return (
    <Layout>
      <HeroText>Create Certificate</HeroText>
      <Box
        as='form'
        onSubmit={async (e) => {
          // TODO: Error handling
          e.preventDefault();
          // const certificate = await fcl.send([
          //   createCertificate({
          //     title: title.current.value,
          //     description: description.current.value,
          //     img: img.current.value,
          //     recipient: recipient.current.value,
          //   }),
          //   fcl.proposer(fcl.currentUser().authorization),
          //   fcl.payer(fcl.currentUser().authorization),
          // ]).then(fcl.decode);
          // console.log(certificate);

          const id = uuid();
          certificates.unshift({
            id,
            title: title.current.value,
            description: description.current.value,
            img: img.current.value,
            recipient: recipient.current.value,
            grantedAt: format(new Date(), 'MM/dd/yyyy'),
            grantedBy: walletId2,
            ownedBy: [{ id: walletId1, avatar: 'https://avatars.onflow.org/avatar/179b6b1cb6755e31.svg' }],
            events: [
              {
                id: '3',
                createdBy: walletId2,
                change: 'CREATED',
              },
              {
                id: '4',
                from: walletId2,
                to: walletId1,
                change: 'TRANSFERRED',
              },
            ],
          });

          history.push(`/certificates/${id}`);
        }}
      >
        <Label htmlFor='title'>Title</Label>
        <Input
          ref={title}
          name='title'
          id='title'
          mb={3}
        />
        <Label htmlFor='description'>Description</Label>
        <Textarea
          ref={description}
          name='description'
          id='description'
          rows='6'
          mb={3}
        />
        <Label htmlFor='img'>SVG Image</Label>
        <Textarea
          ref={img}
          name='img'
          id='img'
          rows='6'
          mb={3}
        />
        <Label htmlFor='recipient'>Recipient Address</Label>
        <Input
          ref={recipient}
          name='recipient'
          id='recipient'
          mb={3}
        />
        <Button>
          Submit
        </Button>
      </Box>
    </Layout>
  );
}
