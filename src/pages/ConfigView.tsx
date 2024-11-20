import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_HREF } from '../const';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { renderValue } from '../utils';

const ConfigView: React.FC = () => {
  const [config, setConfig] = useState<Record<string, any> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConfigs = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${BASE_HREF}/configs/kibana-2.yml`, {headers: { Authorization: `Bearer ${token}` }});
        setConfig(response.data);
      } catch (error: any) {
        if (error.response.statusText === 'Unauthorized') {
          navigate('/login');
        }
        console.error('Error:', error);
      }
    };
    fetchConfigs();
  }, [navigate]);

  if (!config) {
    return <div className="container pt-5">Загрузка...</div>;
  }

  return (
    <div className="container mt-4">
      <div className='text-center my-3'>
        <Button onClick={() => navigate('/create')}>Создать файл</Button>
      </div>
      
      <h2 className="text-center">Данные конфигурационного файла</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Название</th>
            <th>Значение</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(config).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{renderValue(value)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ConfigView;