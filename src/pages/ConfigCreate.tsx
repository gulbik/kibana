import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { BASE_HREF } from '../const';
import { configFields, } from '../configModel';
import { checkValues, validateField } from '../utils';
import { useNavigate } from 'react-router-dom';

export interface ConfigFormValues {
  [key: string]: any;
}

const ConfigCreate: React.FC = () => {
  const { register, handleSubmit, formState: {errors} } = useForm<ConfigFormValues>();
  const navigate = useNavigate(); 

  const submit = async (data: ConfigFormValues) => {
    const token = localStorage.getItem('token');
    try {
      const config = checkValues(data);
    
      await axios.post(`${BASE_HREF}/configs/testing1.yml`, config, {headers: { Authorization: `Bearer ${token}` }});
      alert('конфигурационный файл успешно создан');

    } catch (error: any) {
      if (error.response?.statusText === 'Unauthorized') {
          navigate('/login');
        }
      console.error('Ошибка ', error);
      alert('Не удалось создать конфигурационный файл.');
    }
  };


  return (
    <Form onSubmit={handleSubmit(submit)} className='container'>
      <h2>Создать новый конфигурационный файл</h2>
      <h6 className='mb-4'>*Некоторые поля опциональные, если вы оставите их пустыми, они не будут в итоговой конфигурации</h6>
      {configFields.map((field) => {
        const error = errors[field.key];

        return (
          <Form.Group controlId={field.key} key={field.key} className='d-flex mb-4 align-items-center' >
              <Form.Label className='col-2'>{field.key}</Form.Label>
              <Form.Control className='w-50'
                {...register(field.key, { required: field.required, validate: validateField(field.type)})}
                type="text"
                isInvalid={!!error}
              />

            {error && (
              <Form.Control.Feedback type="invalid">
                {error.message || 'Обязательное поле'}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        );
      })}

      <Button type="submit">
        Создать
      </Button>
    </Form>
  );
};

export default ConfigCreate;