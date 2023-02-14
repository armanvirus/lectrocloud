const server = ()=>{
    return import.meta.env.VITE_APP_SERVER_URI;
}
export const serverUrl = server()