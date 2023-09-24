import checkOrange from "../assets/images/avancar_laranja.png"
import checkPurple from "../assets/images/avancar_rosa.png"
import checkGreen from "../assets/images/avancar_verde.png"
import checkBlue from "../assets/images/avancar.png"

export let modulesThemes = [
    {
        moduloId: 1,
        name: "Psicoeducação",
        theme: "orange",
        color1: "#f48d0d",
        color2: "#f3b890",
        color3: "#f9b12c",
        check: checkOrange,
        link: '/module1',
        introlink: '/submoduleintro/1',
        exerciselink: '/submoduleexercise/1',
        feedbacklink: '/feedback/1'
    },
    {
        moduloId: 2,
        name: "Mindfulness",
        theme: "green",
        color1: "#519a96",
        color2: "#9bcdbb",
        color3: "#77bdb1",
        check:checkGreen,
        link: '/module/2',
        introlink: '/submoduleintro/2',
        exerciselink: '/submoduleexercise/2',

        feedbacklink: '/feedback/2'
    },
    {
        moduloId: 3,
        name: "Regulação emocional",
        theme: "purple",
        color1: "#a87e95",
        color2: "#f5c3e8",
        color3: "#d2aed1",
        check: checkPurple,
        link: '/module3',
        introlink: '/submoduleintro/3',
        exerciselink: '/submoduleexercise/3',
        feedbacklink: '/feedback3'
    },
    {
        moduloId: 4,
        name: "Tolerância a estados emocionais dolorosos",
        theme: "blue",
        color1: "#52b9c4",
        color2: "#d7fcfa",
        color3: "#8ce4ea",
        check: checkBlue,
        link: '/module4',
        introlink: '/submoduleintro/4',
        exerciselink: '/submoduleexercise/4',
        feedbacklink: '/feedback/4'
    },
]
