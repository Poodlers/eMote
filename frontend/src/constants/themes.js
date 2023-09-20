import checkOrange from "../assets/images/avancar_laranja.png"
import checkPurple from "../assets/images/avancar_rosa.png"
import checkGreen from "../assets/images/avancar_verde.png"
import checkBlue from "../assets/images/avancar.png"

export let modulesThemes = [
    {
        name: "Psicoeducação",
        theme: "orange",
        color1: "#f48d0d",
        color2: "#f3b890",
        color3: "#f9b12c",
        check: checkOrange,
        link: '/module1',
        introlink: '/submoduleintro1',
        exerciselink: '/submoduleexercise1',
        feedbacklink: '/feedback1'
    },
    {
        name: "Mindfulness",
        theme: "green",
        color1: "#519a96",
        color2: "#9bcdbb",
        color3: "#77bdb1",
        check:checkGreen,
        link: '/module2',
        introlink: '/submoduleintro2',
        exerciselink: '/submoduleexercise2',

        feedbacklink: '/feedback2'
    },
    {
        name: "Regulação emocional",
        theme: "purple",
        color1: "#a87e95",
        color2: "#f5c3e8",
        color3: "#d2aed1",
        check: checkPurple,
        link: '/module3',
        introlink: '/submoduleintro3',
        exerciselink: '/submoduleexercise3',
        feedbacklink: '/feedback3'
    },
    {
        name: "Tolerância a estados emocionais dolorosos",
        theme: "blue",
        color1: "#52b9c4",
        color2: "#d7fcfa",
        color3: "#8ce4ea",
        check: checkBlue,
        link: '/module4',
        introlink: '/submoduleintro4',
        exerciselink: '/submoduleexercise4',
        feedbacklink: '/feedback4'
    },
]
