<template>
    <v-card>
        <VueSignaturePad
            ref="signaturePad"
            id="signature"
            width="100%"
            height="500px"
            :options="options"
        />
        <v-btn @click="submitSignature">Submit</v-btn>
        <v-btn @click="clearSignature">Clear</v-btn>
        <!--<video ref="video" />
        <v-btn
            @click="stopRecording"
            v-if="mediaRecorder && mediaRecorder.state === 'recording'"
        >Stop</v-btn>
        <v-btn @click="startRecording" v-else>Start</v-btn>-->
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            stream: null,
            recordedBlobs: [],
            canvas: null,
            mediaRecorder: null,
            options: {
                penColor: "#c0f",
            },
        };
    },
    methods: {
        clearSignature() {
            const vm = this;
            vm.$refs.signaturePad.clearSignature();
        },
        async submitSignature() {
            const vm = this;

            const blobUrl = await vm.scaleImage(
                vm.canvas.toDataURL("image/png"),
                0.3
            );
            vm.$emit("newSignature", blobUrl);
            vm.$refs.signaturePad.clearSignature();
        },
        scaleImage(dataUrl, scaleRatio, imageType, imageArguments) {
            return new Promise((resolve) => {
                var image,
                    oldWidth,
                    oldHeight,
                    newWidth,
                    newHeight,
                    canvas,
                    ctx,
                    newDataUrl;

                // Provide default values
                imageType = imageType || "image/png";
                imageArguments = imageArguments || 0.7;

                // Create a temporary image so that we can dimensions of new image.
                image = new Image();
                image.onload = function () {
                    oldWidth = image.width;
                    oldHeight = image.height;
                    newWidth = Math.floor(oldWidth * scaleRatio);
                    newHeight = Math.floor(oldHeight * scaleRatio);

                    // Create a temporary canvas to draw the downscaled image on.
                    canvas = document.createElement("canvas");
                    canvas.width = newWidth;
                    canvas.height = newHeight;

                    // Draw the scaled image on the canvas and trigger the callback function.
                    ctx = canvas.getContext("2d");
                    ctx.drawImage(image, 0, 0, newWidth, newHeight);
                    newDataUrl = canvas.toDataURL(imageType, imageArguments);
                    resolve(newDataUrl);
                };
                image.src = dataUrl;
            });
        },

        ///RECORDING METHODS FOR FUTURE USE

        startRecording() {
            const vm = this;

            const options = { mimeType: "video/webm" };
            vm.mediaRecorder = new MediaRecorder(vm.stream, options);

            console.log(
                "Created MediaRecorder",
                vm.mediaRecorder,
                "with options",
                options
            );
            vm.mediaRecorder.onstop = vm.handleStop;
            vm.mediaRecorder.ondataavailable = vm.handleDataAvailable;
            vm.mediaRecorder.start(100); // collect 100ms of data
            console.log("MediaRecorder started", vm.mediaRecorder);
        },
        stopRecording() {
            const vm = this;

            vm.mediaRecorder.stop();
            console.log("Recorded Blobs: ", vm.recordedBlobs);
            //vm.$refs.video.controls = true;
        },
        handleDataAvailable(event) {
            const vm = this;

            if (event.data && event.data.size > 0) {
                vm.recordedBlobs.push(event.data);
            }
        },
        async handleStop(event) {
            const vm = this;

            console.log("Recorder stopped: ", event);
            const superBuffer = new Blob(vm.recordedBlobs, {
                type: "video/webm",
            });
            //vm.$refs.video.src = window.URL.createObjectURL(superBuffer);
        },
    },
    mounted() {
        const vm = this;
        vm.canvas = vm.$refs.signaturePad.$el.querySelector("canvas");
        vm.stream = vm.canvas.captureStream();
    },
};
</script>

<style>
</style>
