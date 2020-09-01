<template>
    <v-app>
        <v-main>
            <Header class="header" />
            <router-view class="content" />
            <Footer class="footer" />
        </v-main>
    </v-app>
</template>

<script>
import Header from "@/components/core/header";
import Footer from "@/components/core/footer";
import { mapMutations, mapActions, mapGetters } from "vuex";
import * as fcl from "@onflow/fcl";

export default {
    components: {
        Header,
        Footer,
    },
    computed: {
        ...mapGetters(["address"]),
    },
    methods: {
        ...mapMutations(["setUser", "setMoments"]),
        ...mapActions(["sendScript", "sendTransaction", "getMoment"]),
        async loadMomentMetadata() {
            const vm = this;
            const momentIds = await vm.sendScript(`
                import TopShot from 0x179b6b1cb6755e31

                pub fun main(): [UInt64] {

                    let acct = getAccount(0x${vm.address}) 
                    let collectionRef = acct.getCapability(/public/MomentCollection)!
                                            .borrow<&{TopShot.MomentCollectionPublic}>()!

                    log(collectionRef.getIDs())

                    return collectionRef.getIDs()
                }
            `);

            const moments = [];

            for (const momentId of momentIds) {
                const metadata = await vm.getMoment(momentId);
                moments.push(metadata);
            }
            return moments;
        },
        setupTopShotAndSignatureAccount() {
            const vm = this;
            vm.sendTransaction(`
                import TopShot from 0x179b6b1cb6755e31
                import Autograph from 0xf3fcd2c1a78f5eee

                transaction {

                    prepare(acct: AuthAccount) {

                        // First, check to see if a moment collection already exists
                        if acct.borrow<&TopShot.Collection>(from: /storage/MomentCollection) == nil {

                            // create a new TopShot Collection
                            let collection <- TopShot.createEmptyCollection() as! @TopShot.Collection

                            // Put the new Collection in storage
                            acct.save(<-collection, to: /storage/MomentCollection)

                            // create a public capability for the collection
                            acct.link<&{TopShot.MomentCollectionPublic}>(/public/MomentCollection, target: /storage/MomentCollection)
                        }

                        if acct.borrow<&Autograph.Collection>(from: /storage/AutographCollection) == nil {

                            // create a new Autograph Collection
                            let collection <- Autograph.createEmptyCollection() as! @Autograph.Collection

                            // Put the new Collection in storage
                            acct.save(<-collection, to: /storage/AutographCollection)

                            // create a public capability for the collection
                            acct.link<&{Autograph.AutographCollectionPublic}>(/public/AutographCollection, target: /storage/AutographCollection)
                        }
                    }
                }
            `);
        },
    },
    mounted() {
        const vm = this;

        fcl.currentUser().subscribe(async (user) => {
            vm.setUser(user);
            if (user.loggedIn) {
                await vm.setupTopShotAndSignatureAccount();
                if (vm.$route.name !== "Account") {
                    vm.$router.push("/account");
                }
                vm.setMoments(await vm.loadMomentMetadata());
            } else {
                if (vm.$route.name !== "Home") {
                    vm.$router.push("/");
                }
                vm.setMoments([]);
            }
        });
    },
};
</script>

<style>
.pointer:hover {
    cursor: pointer;
}
.header {
    position: fixed;
    top: 0px;
    width: 100%;
    height: 50px;
    z-index: 2;
}
.content {
    margin-top: 100px;
}
.footer {
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 50px;
}
</style>
 