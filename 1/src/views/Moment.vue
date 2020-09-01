<template>
    <div>
        <v-card max-width="1200" class="mx-auto">
            <v-row>
                <v-col cols="12" lg="12">
                    <v-card-actions>
                        <v-btn @click="showSignaturePad = true">Sign it</v-btn>
                    </v-card-actions>
                    <SignaturePad v-if="showSignaturePad" @newSignature="createSignature" />
                </v-col>
                <v-col cols="12" lg="6">
                    <v-img :src="moment.Hero" max-height="400" max-width="400"></v-img>
                </v-col>
                <v-col cols="12" lg="6">
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title class="headline">{{ moment.FullName }}</v-list-item-title>
                            <v-list-item-subtitle>{{ moment.CurrentTeam }}</v-list-item-subtitle>
                            <v-card-text>
                                <v-spacer></v-spacer>
                                {{ moment.PlayCategory}}
                                <v-spacer></v-spacer>
                                {{moment.Rarity }} | {{moment.DateOfMoment}}
                                <v-spacer></v-spacer>
                            </v-card-text>
                        </v-list-item-content>
                    </v-list-item>
                </v-col>
            </v-row>
            <v-row>
                <v-col>Autographs:</v-col>
            </v-row>
            <v-row v-for="autograph in moment.autographs" :key="autograph.document">
                <v-col>
                    {{ autograph.author }}
                    <v-img :src="autograph.document" />
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";
import SignaturePad from "@/components/core/signature-pad";

export default {
    data() {
        return {
            showSignaturePad: false,
        };
    },
    components: {
        SignaturePad,
    },
    computed: {
        ...mapGetters(["address"]),
        ...mapState(["moments"]),
        momentId() {
            const vm = this;
            return vm.$route.query.momentId;
        },
        moment() {
            const vm = this;
            return vm.moments.filter((moment) => moment.id === vm.momentId)[0];
        },
    },
    methods: {
        ...mapActions(["sendTransaction"]),
        ...mapMutations(["setMoments"]),
        async createSignature(blobText) {
            const vm = this;
            await vm.sendTransaction(`
                import TopShot from 0x179b6b1cb6755e31
                import Autograph from 0xf3fcd2c1a78f5eee

                // This transaction is how a TopShot + Autograph user would mint
                // an autograph to a moment in their account

                // Parameters:
                //
                // momentID: The id of the moment to attach autograph
                // document: String of Autograph document

                transaction() {
                    prepare(acct: AuthAccount) {
                        // borrow a reference to the owner's collection
                        let collectionRefTopShot = acct.borrow<&TopShot.Collection>(from: /storage/MomentCollection)
                            ?? panic("Could not borrow a reference to the stored TopShot collection")
                        
                        // Borrow a reference to the specified moment
                        let moment = collectionRefTopShot.borrowMoment(id: ${vm.momentId})
                            ?? panic("Could not borrow a reference to the specified moment")

                        // Save author resource
                        acct.save(<-Autograph.createAuthor(), to: /storage/AutographAuthor)
                        let authorRef = acct.borrow<&Autograph.Author>(from: /storage/AutographAuthor)!

                        // Mint a new NFT
                        let autograph <- Autograph.mintAutograph(document: "${blobText}", author: authorRef)

                        // destroy the author resource
                        destroy <-acct.load<@Autograph.Author>(from: /storage/AutographAuthor)
                        
                        // Deposit the autograph to the moment
                        moment.depositAutograph(autograph: <-autograph)
                    }
                }
            `);
            vm.showSignaturePad = false;
            const newMoment = { ...vm.moment };
            newMoment.autographs.push({
                author: `0x${vm.address}`,
                document: blobText,
            });
            const newMoments = [...vm.moments];
            const momentIndex = newMoments.findIndex(
                (moment) => moment.id === newMoment.id
            );
            newMoments.splice(momentIndex, 1, newMoment);
            vm.setMoments(newMoments);
        },
    },
    mounted() {
        const vm = this;
        if (vm.$route.query.sign) {
            vm.showSignaturePad = true;
        }
    },
};
</script>

<style>
</style>