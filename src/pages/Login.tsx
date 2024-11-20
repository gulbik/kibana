import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { BASE_HREF } from '../const';
import { useNavigate } from 'react-router-dom';
import { Button, Form, } from 'react-bootstrap';

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<LoginForm>({mode: 'onBlur'});
  const navigate =  useNavigate();

  const submit = async (data: LoginForm) =>{
    try {
      const response = await axios.post(`${BASE_HREF}/getAuthToken`, data);
      const { token, expiry } = response.data.authentication_token;
      const expiryTime = new Date(expiry).getTime
      
      localStorage.setItem('token', token);
      localStorage.setItem('expiry', expiryTime.toString() );

      navigate('/'); 
    } catch (error) {
      console.log('Error with login', error)
    }
  }

  return (
    <>
      <h1 className='text-center py-4 bg-dark text-light'>Kibana Test Task</h1>
      <div className="card p-5 mx-auto">
        <h2 className="text-center mb-4">Login</h2>
        <Form onSubmit={handleSubmit(submit)}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="email">Почта</Form.Label>
            <Form.Control
              type="email"
              id="email"
              {...register('email', {
                required: 'Почта обязательна',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Неправильный формат почты',
                },
              })}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="password" >Пароль</Form.Label >
            <Form.Control
              type="password"
              id="password"
              {...register('password', {
                required: 'Пароль обязателен',
              })}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" className="btn-secondary w-100">
            Login
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Login;