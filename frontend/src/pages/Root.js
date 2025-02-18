import { Outlet, useLoaderData, useSubmit } from "react-router"
import MainNavigation from "../components/MainNavigation"
import { useEffect } from "react"

export default function RootLayout(){
    // const navigation= useNavigation()
    const token = useLoaderData();
    const submit = useSubmit();

    useEffect(()=>{
        if (!token) return;
        if (token === 'EXPIRED'){
            submit(null,{action: '/logout', method:'post'})
            return;
        }
        setTimeout(()=> {
            submit(null,{action: '/logout', method:'post'})
        },100)
    }
    ,[token, submit]);
    return <>
        <MainNavigation/>
        <main>
            {/* {navigation.state === 'loading' && <p>Loading</p>} */}
            <Outlet/>  {/* children routes render here */}
        </main>
    </>
}