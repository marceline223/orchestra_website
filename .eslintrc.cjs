module.exports = {
    "root": true,
    "parser": "vue-eslint-parser",
    "extends": [
        "plugin:vue/vue3-recommended",
        "eslint:recommended",
        'prettier'
    ],
    "plugins": ["prettier"],
    "rules": {
        "vue/html-indent": 0,
        "vue/html-closing-bracket-spacing": 0,
    }
}
