/* eslint-disable no-return-assign */
import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Div } from './styles';

import api from '../../services/api';

const Register = () => {
  const [err, setErr]= useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cpf, setCpf] = useState('');

  const pessoa = {
    nome,
    sobrenome,
    email,
    telefone,
    endereco,
    cpf,
  };

  function errorHandling(e){
    if(e.response.status === 400) {
      setErr(e.response.data.error);
    }
  }

  async function handleCadastro(e){
    e.preventDefault();
    const request = await api.post('/pessoas', pessoa)
    .then(response => { 
      if(response.status === 200){
        back();
      }
    })
    .catch(error => {
      errorHandling(error);
    });

  }

  function back() {
    setTimeout(() => {
      window.location.href = '/';
    }, 100);
  }

  return (
    <>
      <Div>
          <Form onSubmit={handleCadastro}>
            <Form.Group controlId="formBasic">
              <Row>
                <Col>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    onChange={(event) => setNome(event.target.value)}
                    placeholder="Nome"
                    required
                    maxLength="30"
                  />
                </Col>
                <Col>
                  <Form.Label>Sobrenome</Form.Label>
                  <Form.Control
                    onChange={(event) => setSobrenome(event.target.value)}
                    placeholder="Sobrenome"
                    required
                    maxLength="50"
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="formBasic">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter email"
                required
                maxLength="50"
              />
            </Form.Group>

            <Form.Group controlId="formBasic">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                onChange={(event) => setTelefone(event.target.value)}
                placeholder="Escreva seu telefone"
                required
                maxLength="13"
              />
            </Form.Group>

            <Form.Group controlId="formBasic">
              <Form.Label>Endereço</Form.Label>
              <Form.Control
                type="text"
                onChange={(event) => setEndereco(event.target.value)}
                placeholder="Escreva seu endereço"
                required
                maxLength="50"
              />
            </Form.Group>

            <Form.Group controlId="formBasic">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                type="text"
                onChange={(event) => setCpf(event.target.value)}
                placeholder="Escreva seu CPF"
                required
                maxLength="14"
              />
            </Form.Group>
            <Div>
              <Button variant="primary" type="submit">
                Enviar
              </Button>
              <Button onClick={back} className="cancelar" variant="primary" >
                Voltar
              </Button>
              </Div>
          </Form>
          <p className="form-err">{err}</p>
        </Div>
    </>
  );
};

export default Register;
