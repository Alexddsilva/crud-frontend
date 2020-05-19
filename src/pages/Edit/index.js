import React, { useState, useEffect } from 'react';
import { Form, Row, Button,Col } from 'react-bootstrap';
import { Div } from './styles';

import api from '../../services/api';

const Edit = (props) => {
  const [err, setErr]= useState('');
  const {id} = props.match.params;
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cpf, setCpf] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8080/pessoas/${id}`)
      .then((res) => res.json())
      .then((data) => {
        let {nome, sobrenome, email, telefone, endereco, cpf} = data;
        setNome(nome);
        setSobrenome(sobrenome);
        setEmail(email);
        setTelefone(telefone);
        setEndereco(endereco);
        setCpf(cpf);
      });
  }, [id]);

  function errorHandling(e){
    if(e.response.status === 400) {
      setErr(e.response.data.error);
    }
  }

  async function handleEdit(e) {
    e.preventDefault();
    await api.put(`/pessoas/${id}`, {
      nome,
      sobrenome,
      email,
      telefone,
      endereco,
      cpf
    }).then(response => {
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
        <Form onSubmit={handleEdit}>
          <Form.Group controlId="formBasic">
            <Row>
              <Col>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  defaultValue={nome}
                  onChange={(event) => setNome(event.target.value)}
                  placeholder="Nome"
                  required
                />
              </Col>
              <Col>
                <Form.Label>Sobrenome</Form.Label>
                <Form.Control
                  defaultValue={sobrenome}
                  onChange={(event) => setSobrenome(event.target.value)}
                  placeholder="Sobrenome"
                  required
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="formBasic">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              defaultValue={email}
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasic">
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              id="telefone"
              defaultValue={telefone}
              type="text"
              onChange={(event) => setTelefone(event.target.value)}
              placeholder="Escreva seu telefone"
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasic">
            <Form.Label>Endereço</Form.Label>
            <Form.Control
              defaultValue={endereco}
              type="text"
              onChange={(event) => setEndereco(event.target.value)}
              placeholder="Escreva seu endereço"
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasic">
            <Form.Label>CPF</Form.Label>
            <Form.Control
              id="CPF"
              defaultValue={cpf}
              type="text"
              onChange={(event) => setCpf(event.target.value)}
              placeholder="Escreva seu CPF"
              required
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

export default Edit;
