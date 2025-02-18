import { Form, Link, useActionData, useSearchParams, useNavigation } from 'react-router';

import classes from './AuthForm.module.css';

function AuthForm() {
  const data = useActionData();
  const {state} = useNavigation();
  const [searchParams] = useSearchParams();

  const isLogin = searchParams.get('mode') ==='login';
  const isSubmitting = state=== 'submitting';


  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        {data && data.errors && <ul>
          {Object.values(data.errors).map(error => <li key={error}>{error}</li>)}
          </ul>}
        {data && data.message  && <p>{data.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? 'signup':'login'}`}>{!isLogin ? 'Login': 'Sign up'}</Link>
          <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
