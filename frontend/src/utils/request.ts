//Verifica se a variavel de anbiente BACKEND_URL existe no netlify (anbiente de deploy), se não existir 
//significa que é um projeto local e o valor será o localhost

//export const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080'
export const BASE_URL = 'https://sds3-leonardo-lacerda.herokuapp.com';