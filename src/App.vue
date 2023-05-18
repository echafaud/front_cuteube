<template>
    <div id="app">
        <navigation-bar></navigation-bar>
        <router-view v-slot="{ Component }">
            <transition name="fade">
                <component :is="Component">

                </component>
            </transition>
        </router-view>
    </div>
</template>

<script>
import {defineComponent} from "vue";
import WrapperAuthForm from "@/components/WrapperAuthForm.vue";
import NavigationBar from "@/components/NavigationBar.vue";

export default defineComponent({
    components: {NavigationBar, WrapperAuthForm}
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