
import { useLoaderData, Await } from 'react-router';
import EventsList from '../components/EventsList';
import { Suspense } from 'react';

// function EventsPage() {
//     //todo convert custom 
//   const [isLoading, setIsLoading] = useState(false);
//   const [fetchedEvents, setFetchedEvents] = useState();
//   const [error, setError] = useState();

//   useEffect(() => {
//     async function fetchEvents() {
//       setIsLoading(true);
//       const response = await fetch('http://localhost:8080/events');

//       if (!response.ok) {
//         setError('Fetching events failed.');
//       } else {
//         const resData = await response.json();
//         setFetchedEvents(resData.events);
//       }
//       setIsLoading(false);
//     }

//     fetchEvents();
//   }, []);
//   return (
//     <>
//       <div style={{ textAlign: 'center' }}>
//         {isLoading && <p>Loading...</p>}
//         {error && <p>{error}</p>}
//       </div>
//       {!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />}
//     </>
//   );
// }
export default function EventsPage(){
    const {events} = useLoaderData();
    
    return (
      <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
        <Await resolve={events}>
            {(loadedEvents)=> <EventsList events={loadedEvents}/>} 
        </Await>
      </Suspense>
    )
}
//common pattern, write code that belongs to the object
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
export async function loader(){
  return {
    events: loadEvents()
  };
}
