import { useRouteError } from "react-router";
import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";

export default function ErrorPage(){
    const error = useRouteError()
    
    let title = 'An error occurred!'
    let message = 'Something went wrong'

    if (error.status === 404){
        title= 'Not found!'
        message='Could not find resource or page'
    }
    return <>
        <MainNavigation></MainNavigation>
        <main>
            <PageContent title={title}>
                <p>{error.status}</p>
                <p>{message}</p>
            </PageContent>
        </main>
    </>
}