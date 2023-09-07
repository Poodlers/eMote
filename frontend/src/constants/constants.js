const BASE_URL = 'http://localhost:8080';  

let user =
{
    code : '',
    hasAccessToApp : false,
    role: -1,
    emotionDiaryEntries: [],
    foodDiaryEntries: [],
    modulosProgress : [],
    favoriteExercises : []
}


export {
    BASE_URL,
    user
}