import React from "react";
//stapi functions
import loginUser from '../strapi/loginUser';
import registerUser from '../strapi/registerUser';
//handle user
import { UserContext } from '../context/user';

import { useHistory } from 'react-router-dom';

export default function Login() {
  const { userLogin, alert, showAlert } = React.useContext(UserContext);
  const history = useHistory();
  //setup user context

  //state values
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('default');
  const [isMember, setIsMember] = React.useState(true);

  let isEmpty = alert.show || !email || !password || (!isMember && !username);

  const toggleMember = () => {
    console.log("-------")
    setIsMember((prevMember) => {
      console.log("-->", prevMember);
      let isMember = !prevMember;
      isMember ? setUsername('default') : setUsername('');
      return isMember;
    });
  }

  const handleSubmit = async (e) => {
    showAlert({ mag: 'accessing user data, please wait' })
    //alert
    e.preventDefault();
    let response;
    if (isMember) {
      response = await loginUser({ email, password })
    } else {
      response = await registerUser({ email, password, username })

    }
    if (response) {
      //success

      const { jwt: token, user: { username } } = response.data;
      const newUser = {
        token, username
      }
      userLogin(newUser);
      showAlert({ msg: `you are logged in: ${username}` })
      history.push('/products');
    } else {
      //show alert
      showAlert({ type: 'danger', msg: `there was an error, please try again` })
    }
  }


  console.log(isMember)
  return <section className='form section'>
    <h2 className='section-title'>{isMember ? 'sign in' : 'register'}</h2>
    <form className='login'>
      {/*single input */}
      <div className='form-control'>
        <label htmlFor='email'>email</label>
        <input type='email' id='email' value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      {/*single input */}

      <div className='form-control'>
        <label htmlFor='password'>password</label>
        <input type='password' id='password' value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      {/*single input */}
      {!isMember && <div className='form-control'>
        <label htmlFor='username'>username</label>
        <input type='text' id='username' value={username} onChange={e => setUsername(e.target.value)} />
      </div>}

      {/*empty form text */}
      {isEmpty && <p className='form-empty'>please fill out the form</p>}

      {
        !isEmpty && <button className='btn btn-block btn-primary' type='submit' onClick={handleSubmit}>submit</button>
      }



      <p className='register-link'>
        {isMember ? "need to register" : "already a member"}
        <button type='button' disabled={false} onClick={() => toggleMember()}>submit</button>
      </p>
    </form>
  </section>;
}
