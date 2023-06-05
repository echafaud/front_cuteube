<template>
    <v-list bg-color="transparent" lines="false" class="pt-0">
        <comment v-for="comment in comments"
                 :comment="comment"
                 :key="comment.id"
        ></comment>

    </v-list>

</template>

<script>
import Comment from "@/components/Comment.vue";
import {mapState} from "vuex";

export default {
    components: {Comment},
    computed: {
        ...mapState({
            comments: state => state.comments.comments
        }),
    },
}
</script>