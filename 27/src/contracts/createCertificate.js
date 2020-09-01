import * as fcl from '@onflow/fcl';

export default function createCertificate(props = {}) {
  const {
    title,
    description,
    img,
    recipient,
  } = props;

  return fcl.transaction(`
    import NonFungibleToken from 0x01cf0e2f2f715450

    // This transaction checks if an NFT exists in the storage of the given account
    // by trying to borrow from it
    transaction {
      prepare(acct: AuthAccount) {
        if acct.borrow<&NonFungibleToken.NFT>(from: /storage/NFT1) != nil {
          log("The token exists!")
        } else {
          log("No token found!")
        }
      }
    }
  `);

  // TODO: Check if creator has vault, if not create then create it
  // If a recipient exists, transfer to recipient
  // return fcl.transaction(`
  //   transaction {
  //     prepare(account: AuthAccount){
  //       account.save<@Vedas.CertificateVault>(<- Vedas.createEmptyCertificateVault(), to: /storage/CertificateVault)
  //       account.link<&Vedas.CertificateVault>(/public/CertificateVault, target: /storage/CertificateVault)
  //     }
  //   }
  // `);
};
