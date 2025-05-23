import { Form, NavLink, useRouteLoaderData } from 'react-router';
import classes from './MainNavigation.module.css';
import NewsletterSignup from './NewsletterSignup';

function MainNavigation() {
  const token = useRouteLoaderData('root');

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li><NavLink to='/' className={({isActive})=> isActive ? classes.active: undefined}>home</NavLink></li>
          <li><NavLink to='/events' className={({isActive})=> isActive ? classes.active: undefined}>events</NavLink></li>
          <li><NavLink to="/newsletter" className={({ isActive }) => isActive ? classes.active : undefined}>Newsletter</NavLink></li>
          {!token && <li><NavLink to="/auth?mode=login" className={({ isActive }) => isActive ? classes.active : undefined}>Authentication</NavLink></li>}
          {token && 
            <li>
            <Form action='/logout' method='post'> 
              <button>logout</button>
            </Form>
          </li>
          }
          
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}

export default MainNavigation;
