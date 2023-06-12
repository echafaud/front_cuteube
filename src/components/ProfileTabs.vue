<template>
    <v-tabs
            v-model="tab"
            align-tabs="center"
            @update:modelValue="updateValue"
    >
        <v-tab :value="1">Видео</v-tab>
    </v-tabs>
</template>

<script>
export default {
    props: {
        modelValue: null
    },
    data() {
        return {
            tab: null
        }
    },
    methods: {
        updateValue(event) {
            this.$emit("update:modelValue", event)
        }
    }
}
</script>