// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components
import {createBrowserRouter, RouterProvider} from 'react-router'
import HomePage from './pages/Home';
import ErrorPage from './pages/Error';
import EventsPage,{loader as eventsLoader} from './pages/Events';
import EventDetailPage ,{loader as eventDetailLoader, action as deleteEventAction}from './pages/EventDetail';
import NewEventPage from './pages/NewEvent';
import EditEventPage from './pages/EditEvent';
import RootLayout from './pages/Root';
import EventsRootLayout from './pages/EventsRoot';
import {action as manipulateEventAction} from './components/EventForm'
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';
import Authentication,{action as authAction} from './pages/Authentication';
import {action as logoutAction} from './pages/Logout'
import {checkAuthLoader, tokenLoader} from './util/auth'

const router = createBrowserRouter([{
  id:'root',
  path:'/', 
  element: <RootLayout/>,
  errorElement: <ErrorPage/>,
  loader: tokenLoader,
  children :[
    //optional to declare index: true, as default route when entering '/' only
    {index: true, path: '/', element: <HomePage />},
    {
      path: '/events', 
      element: <EventsRootLayout/>,
      children:[
        {index: true, element: <EventsPage />, loader: eventsLoader},
        {
          id: 'event-detail',
          path: ':id',
          loader: eventDetailLoader,
          children: [
            {
              index: true, 
              element: <EventDetailPage />,
              action: deleteEventAction
            },{
              path: 'edit', element: <EditEventPage />,
              action: manipulateEventAction,
              loader: checkAuthLoader
            },

          ],
        },
        {path: 'new', element: <NewEventPage />, action: manipulateEventAction, loader: checkAuthLoader},
      ]},
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      {
        path: '/auth',
        element: <Authentication />,
        action: authAction
      },
      {
        path: '/logout',
        action: logoutAction
      },

  ]
}])
function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App;
