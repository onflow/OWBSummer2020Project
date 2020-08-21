package main

import (
    "crypto/rand"
    "fmt"  
    "github.com/onflow/flow-go-sdk/crypto"
  )
  
func main() {

    // This seed must be kept safe if you want to use it to regenerate your private key
    seed := make([]byte, crypto.MinSeedLength)

    _, err := rand.Read(seed)
    if err != nil {
        panic(err)
    }

    // Remember to save your private key somewhere safe
    privateKey, err := crypto.GeneratePrivateKey(crypto.ECDSA_P256, seed)
    if err != nil {
        panic(err)
    }
    fmt.Printf("Private key\n")
    fmt.Printf("%x", privateKey.Encode())
    fmt.Printf("\n")
    // This will be your public key, and what you need to send to us
    fmt.Printf("Public key\n")
    fmt.Printf("%x", privateKey.PublicKey().Encode())
}
