import React, { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);
 const Login = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const emailRef = useRef();

  const handleLogInSubmit =(event)=>{
    event.preventDefault();
 
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    setError('');
    setSuccess('');
    if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
      setError('Please add at least one uppercase');
      return;
    }
    else if(!/(?=.*[0-9].*[0-9])/.test(password)){
      setError('Please add at least two number');
      return;
    }
    else if(password.length < 6){
     setError("Password must be 6 characters in your password" )
     return;
    }
  signInWithEmailAndPassword(auth, email, password)
   .then((result) => {
    const loggedUser = result.user;
    console.log(loggedUser);
    setSuccess('User login successfully ')
    setError('');
  })
   .catch((error) => {
      setError(error.message);
  });

  }  
  const handleResetPassword = (event) =>{
      const email = (emailRef.current.value);
      if(!email){
        alert('Please provide your email address to reset your email')
        return;
      }
        sendPasswordResetEmail(auth,email)
        .then(()=> {
          alert('please check your email')
      
        })
        .catch(error => {
          setError(error.message)
        })
      
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
    <Form onSubmit={handleLogInSubmit}>
      <h2>Please Login Here</h2>
      <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" ref={emailRef} placeholder="Enter email" required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
      <p><small>Forget Password? Please<button className='btn btn-link' onClick={handleResetPassword}>Reset Password</button></small></p>
      <p><small>New to this website? Please <Link to="/register">Register</Link></small></p>
      <p className='text-danger'>{error}</p>
      <p className='text-success'>{success}</p>
    </Form>
  </div>
  );
};

export default Login;