import checkOrange from "../assets/images/avancar_laranja.png"
import checkPurple from "../assets/images/avancar_rosa.png"
import checkGreen from "../assets/images/avancar_verde2.png"
import checkBlue from "../assets/images/avancar.png"

export let modulesThemes = [
    {
        moduloId: 1,
        name: "Psicoeducação",
        theme: "orange",
        color1: "#F1880C",
        color2: "#F2B891",
        color3: "#F9B02D",
        color4: "#F59D01",
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
        color1: "#509B96",
        color2: "#9BCCBA",
        color3: "#D1F2E1",
        color4: "#A2DBC0",
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
        color1: "#A87E95",
        color2: "#E3C0D6",
        color3: "#F5CAEB",
        color4: "#DDACCF",
        check: checkPurple,
        link: '/module/3',
        introlink: '/submoduleintro/3',
        exerciselink: '/submoduleexercise/3',
        feedbacklink: '/feedback/3'
    },
    {
        moduloId: 4,
        name: "Tolerância a estados emocionais dolorosos",
        theme: "blue",
        color1: "#53B8C4",
        color2: "#D7FCFA",
        color3: "#B1F5F4",
        color4: "#8CE5EB",
        check: checkBlue,
        link: '/module4',
        introlink: '/submoduleintro/4',
        exerciselink: '/submoduleexercise/4',
        feedbacklink: '/feedback/4'
    },
]
