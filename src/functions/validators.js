import {helpers} from '@vuelidate/validators'
import {unref} from "vue";

function req(value) {
    if (typeof value === 'string') {
        value = value.trim();
    }
    return helpers.req(value);
}

const minLen = (len) => {
    return {
        $validator: value => !helpers.req(value) || helpers.len(value) >= len,
        $message: ({$params}) => `Минимальная длина ${$params.len} символов.`,
        $params: {len}
    }
}
const maxLen = (len) => {
    return {
        $validator: value => !helpers.req(value) || helpers.len(value) <= len,
        $message: ({$params}) => `Максимальная длина ${$params.len} символов.`,
        $params: {len}
    }
}
const required = {
    $validator: req,
    $message: 'Это поле является обязательным'
}
const email = {
    $validator: helpers.regex(/^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i),
    $message: 'Некорректный адрес эл. почты',

}
const nameContains = {
    $validator: helpers.regex(/^[а-яА-ЯёЁa-zA-Z0-9_]*$/),
    $message: 'Поле может содержать только буквы кириллицы, латиницы, цифры и символ "_"',
}
const usernameContains = {
    $validator: helpers.regex(/^[A-Za-z0-9_]*$/),
    $message: 'Поле может содержать только буквы латиницы, цифры и символ "_"',
}
const passwordContains = {
    $validator: helpers.regex(/^[A-Za-z0-9.,;?!+@#$%^&*"'<>{}()|`~/_=\\\-]*$/),
    $message: 'Поле может содержать только буквы латиницы, цифры и специальные символы',
}

const upperCaseContains = {
    $validator: helpers.regex(/(?=.*[A-Z])/),
    $message: 'Поле должно содержать буквы в верхнем регистре',
}
const lowerCaseContains = {
    $validator: helpers.regex(/(?=.*[a-z])/),
    $message: 'Поле должно содержать буквы в нижнем регистре',
}
const specialContains = {

    $validator: helpers.regex(/(?=.*[.,;?!+@#$%^&*"'<>{}()|`~/_=\\\-])/),
    $message: 'Поле должно содержать специальные символы',

}
const numContains = {
    $validator: helpers.regex(/(?=.*[0-9])/),
    $message: 'Поле должно содержать цифры',
}
const validData = (data, errorMessage) => {
    return {
        $validator: () => data,
        $message: ({$params}) => $params.errorMessage,
        $params: {data, errorMessage}
    }
}
const sameAs = (equalTo) => {
    return {
        $validator: value => value===equalTo,
        $message: 'Пароли должны совпадать',
        $params: {equalTo}
    }
}

export {
    minLen,
    maxLen,
    validData,
    sameAs,
    required,
    email,
    nameContains,
    usernameContains,
    passwordContains,
    upperCaseContains,
    lowerCaseContains,
    specialContains,
    numContains,
}