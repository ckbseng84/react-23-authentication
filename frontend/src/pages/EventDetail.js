import { Await, redirect, useRouteLoaderData } from "react-router"
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";
import { getAuthToken } from "../util/auth";

export default function EventDetailPage(){
    //obtain the loader data from parent route with name provide
    const {event,events} = useRouteLoaderData('event-detail');
    return (
        <>
            {/* show something on fallback before Await completed */}
            <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
                <Await resolve={event}>
                    {loadedEvent=> <EventItem event={loadedEvent} />}
                </Await>
            </Suspense>
            <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
                <Await resolve={events}>
                    {loadedEvents=> <EventsList events={loadedEvents} />}
                </Await>
            </Suspense>
            
        </>
    )
}
async function loadEvent(id){
    const response = await fetch(`http://localhost:8080/events/${id}`);
   
    if (!response.ok){
        throw new response({message: 'could  not fetch details for selected event'},{
            status: 500
        })
    }
    const resData = await response.json()
    return resData.event;
}
async function loadEvents(){
    const response = await fetch('http://localhost:8080/events');
  
      if (!response.ok) {
        //return {isError: true, message: 'could not fetch events'};
        //another way to handle error
        throw new Response(JSON.stringify({message : 'Could not fetch events'}), {status: 500});
      } else {
        const resData = await response.json();
        return resData.events;
      }
  }
export async function loader({request, params}){
    const id = params.id;
    //defer loaders
    return {
        event: await loadEvent(id),// this will wait until finish before render/show the page
        events: loadEvents() 
    }
}

export async function action({params, request}){
    const id = params.id
    const token = getAuthToken();
    const response = await fetch('http://localhost:8080/events/' + id, {
        method: request.method,
        headers : {
            'authorization' : `bearer ${token}`
        }
    });
    if (!response.ok){
        throw new response({message: 'could not delete event'},{
            status: 500
        })
    }
    return redirect('/events');   
}