package main
import "fmt"



import "github.com/onflow/flow-go-sdk/crypto"


func main() {
	// deterministic seed phrase
// note: this is only an example, please use a secure random generator for the key seed
	seed := []byte("elephant ears space cowboy octopus rodeo potato cannon pineapple")

	privateKey, err := crypto.GeneratePrivateKey(crypto.ECDSA_P256, seed)
	fmt.Println(err)
	fmt.Println(privateKey)
}