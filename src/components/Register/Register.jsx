import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';



const auth = getAuth(app)

const Register = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (event) =>{
    event.preventDefault();
    setSuccess('');
    setError('')
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
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
  
  createUserWithEmailAndPassword(auth, email, password)
  .then(result =>{
  const loggedUser = result.user;
  console.log(loggedUser);
  setError('');
  event.target.reset();
  setSuccess('user has create successfully');
  sendUserVerification(result.user)

  
  })
  .catch(error =>{
    console.log(error.message);
    setError(error.message);
  })
}

  const sendUserVerification = (user)=>{
    sendEmailVerification (user)
    .then(result =>{
      alert('Please verify your email.')
      return;
    })
  }



  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
    <Form onSubmit={handleSubmit}>
      <h2>Please Register Here</h2>
      <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email"  placeholder="Enter email" required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Register
      </Button>
      
      <p><small>New to this website? Please <Link to="/login">Sign in</Link></small></p>
      <p className='text-danger'>{error}</p>
      <p className='text-success'>{success}</p>
    </Form>
  </div>
  );
};

export default Register;