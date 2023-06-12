<template>
    <v-list :item-value="modelValue"
            :selected="modelValue"
            class="d-flex align-center pt-0"
            active-class="v-list-item--disabled opacity"
            bg-color="transparent"
            mandatory
            @update:selected="updateValue">
        <v-list-item rounded class="mr-2" :value="1">Популярное</v-list-item>
        <v-list-item rounded class="mr-2" :value="2">Недавнее</v-list-item>
        <v-list-item rounded class="mr-2" :value="3">Понравившиеся пользователям</v-list-item>
    </v-list>
</template>

<script>
export default {
    props: {
        modelValue: Array
    },
    methods: {
        updateValue(event) {
            this.$emit("update:modelValue", event)
        },
    },
}
</script>

<style scoped>
.opacity {
    opacity: 1
}
</style>