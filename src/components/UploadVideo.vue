<template>
    <login-modal v-if="!userActive" text="Хотите опубликовать видео?" variant="plain"
                 icon="mdi-video-plus"></login-modal>
    <v-btn v-else variant="plain"
           @click="dialog=true"
           icon>
        <v-icon icon="mdi-video-plus"></v-icon>
        <v-dialog v-model="dialog" class="w-33" persistent>
            <v-card>
                <v-card-title>Загрузка видео</v-card-title>
                <v-form v-model="form" @submit.prevent="formSubmit">
                    <v-card-text class="pb-0">
                        <v-row>
                            <v-col cols="12" class="pb-2">
                                <v-text-field v-model="formData.title"
                                              label="Название"
                                              placeholder="Введите название видео"
                                              variant="solo-filled"
                                              counter="100"
                                              :rules="[false]"
                                              :error-messages="v$.formData.title.$errors.map(e => e.$message)"
                                              @blur="v$.formData.title.$touch"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" class="pt-0 pb-2">
                                <v-textarea v-model="formData.description"
                                            rows="1"
                                            auto-grow
                                            label="Описание"
                                            placeholder="Введите описание"
                                            variant="solo-filled"
                                            counter="5000"
                                            :rules="[false]"
                                            :error-messages="v$.formData.description.$errors.map(e => e.$message)"
                                            @blur="v$.formData.description.$touch"
                                >
                                </v-textarea>
                            </v-col>
                            <v-col cols="12" class="pt-0 pb-2">
                                <v-file-input
                                        v-model="formData.preview_file"
                                        prepend-icon=""
                                        variant="solo-filled"
                                        accept="image/*"
                                        label="Превью"
                                        :rules="[false]"
                                        :error-messages="v$.formData.preview_file.$errors.map(e => e.$message)"
                                        @blur="v$.formData.preview_file.$touch">

                                </v-file-input>
                            </v-col>
                            <v-col cols="12" class="pt-0 pb-2">
                                <v-file-input
                                        v-model="formData.video_file"
                                        prepend-icon=""
                                        variant="solo-filled"
                                        accept="video/*"
                                        label="Видео"
                                        :rules="[false]"
                                        :error-messages="v$.formData.video_file.$errors.map(e => e.$message)"
                                        @blur="v$.formData.video_file.$touch">
                                    >
                                </v-file-input>
                            </v-col>
                            <v-col cols="12" class="pt-0 pb-2">
                                <v-autocomplete
                                        v-model="formData.permission"
                                        :items="states"
                                        color="white"
                                        item-title="name"
                                        item-value="value"
                                        label="Предоставить доступ"
                                        variant="solo-filled"
                                        :rules="[false]"
                                        :error-messages="v$.formData.permission.$errors.map(e => e.$message)"
                                        @blur="v$.formData.permission.$touch">
                                    >
                                </v-autocomplete>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="pl-4 pr-4">
                        <v-col cols="6" class="pl-0">
                            <v-btn
                                    color="error"
                                    size="large"
                                    variant="elevated"
                                    class="w-100"
                                    @click="dialog=false"
                            >
                                Закрыть
                            </v-btn>
                        </v-col>
                        <v-col cols="6" class="pr-0">
                            <v-btn
                                    :disabled="!form"
                                    :loading="loading"
                                    color="success"
                                    size="large"
                                    type="submit"
                                    variant="elevated"
                                    class="w-100"
                            >
                                Опубликовать
                            </v-btn>
                        </v-col>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
        <v-snackbar :color="snackbarColor" location="top" v-model="snackbar">
            {{ snackbarText }}
        </v-snackbar>
    </v-btn>
</template>

<script>
import {useVuelidate} from "@vuelidate/core";
import {isImage, isVideo, maxLen, maxSize, minLen, required} from "@/functions/validators";
import LoginModal from "@/components/LoginModal.vue";
import {mapState} from "vuex";

export default {
    components: {LoginModal},
    setup() {
        return {
            v$: useVuelidate()
        }
    },
    data() {
        return {
            formData: {
                title: '',
                description: '',
                preview_file: null,
                video_file: null,
                permission: ''
            },
            dialog: false,
            form: false,
            loading: false,
            states: [{name: "Всем", value: "for_everyone"},
                {name: "Подписчикам", value: "for_subscribers"},
                {name: "Зарегистрированным пользователям", value: "for_authorized"},
                {name: "Только себе", value: "for_myself"}],
            snackbar: false,
            snackbarText: '',
            snackbarColor: ''

        }
    },
    validations() {
        return {
            formData: {
                title: {
                    required,
                    minLen: minLen(2),
                    maxLen: maxLen(100),
                },
                description: {
                    required,
                    maxLen: maxLen(500),
                },
                preview_file: {
                    required,
                    isImg: isImage,
                    maxSize: maxSize(10)
                },
                video_file: {
                    required,
                    isVideo: isVideo,
                    maxSize: maxSize(100)
                },
                permission: {
                    required
                }
            },
        }
    },
    methods: {
        formSubmit() {
            this.loading = true
            this.uploadVideo()
        },
        async uploadVideo() {
            this.$errorHandler(async () => {
                return await this.$api.video.uploadVideo(this.formData)
            }).then(value => {
                if (value && value.code) {
                    this.loading = false
                    this.snackbarText = "Во время загрузки видео произошла ошибка, попробуйте заново"
                    this.snackbarColor = 'red'
                } else {
                    this.formData.title = ''
                    this.formData.description = ''
                    this.formData.preview_file = null
                    this.formData.video_file = null
                    this.snackbarText = "Поздравляем! Видео успешно загружено, перенаправляем на страницу видео"
                    this.snackbarColor = 'green'
                    this.dialog = false
                    console.log('success')
                    setTimeout(() => {
                        this.$router.push({path: `/video/${value.id}`})
                        this.loading = false
                    }, 3000)
                }

                this.snackbar = true
            })
        }
    },
    computed: {
        ...mapState({
            userActive: state => state.authUser.user.isActive
        }),
    },
}
</script>