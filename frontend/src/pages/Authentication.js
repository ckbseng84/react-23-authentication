import { redirect } from 'react-router';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({request}){
  // use browser function to get searchParams
  const searchParams = new URL(request.url).searchParams
  const mode = searchParams.get('mode') || 'login';

  if (mode !== 'login' && mode !== 'signup'){
    throw Response({message: 'unsupported mode'},{status: 422})//422 invalid user input
  }

  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password')
  };
  console.log(JSON.stringify(authData))
  const response = await fetch('http://localhost:8080/'+ mode, {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(authData)
  })
  if (response.status === 422 || response.status === 401){
    return response
  }

  if (!response.ok){
    throw Response({message:'Could not authenticate user'},{status: 500});
  }
  //extract token from response
  const resData = await response.json();
  const token = resData.token;
  //save token into local storage
  localStorage.setItem('token', token);

  const expiration = new Date();
  expiration.setHours(expiration.getHours() +1);
  localStorage.setItem('expiration', expiration.toISOString());

  return redirect('/')
}