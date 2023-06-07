<template>
    <v-app>
        <navigation-bar></navigation-bar>
        <v-main class="pt-8">
            <v-container fluid>
                <router-view v-slot="{ Component }">
                    <transition name="fade">
                        <component :is="Component">
                        </component>
                    </transition>
                </router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import {defineComponent} from "vue";
import WrapperAuthForm from "@/components/WrapperAuthForm.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import {fpjsGetVisitorDataExtendedMixin} from "@fingerprintjs/fingerprintjs-pro-vue-v3";

export default defineComponent({
    components: {NavigationBar, WrapperAuthForm},
    mixins: [fpjsGetVisitorDataExtendedMixin],
    watch: {
        'visitorDataExtended.data': {
            deep: true,
            handler(data) {
            },
        },
    },
    methods: {
        getData() {
            return this.$getVisitorDataExtended?.();
        },
    },
    mounted() {
        this.getData()
    }
})
</script>
<style>
:root {
    background: #121212;
}

.fade-enter-active, .fade-leave-active {
    transition-property: opacity;
    transition-duration: .25s;
}

.fade-enter-active {
    transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
    opacity: 0
}
</style>