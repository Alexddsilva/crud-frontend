import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import { Div } from './styles';

const List = (props) => {
  const [pessoas, setPessoas] = useState([]);

  let count = 0;

  useEffect(() => {
    fetch('http://localhost:8080/pessoas')
      .then((res) => res.json())
      .then((data) => setPessoas(data));
  }, []);

  async function deletePessoa(id){
    await api.delete(`pessoas/${id}`);
    const findPessoa = pessoas.findIndex((pessoa) => pessoa.id === id);
    pessoas.splice(findPessoa, 1);
    setPessoas([...pessoas]);
  }

  function edit(pessoa, id){
    setTimeout(() => {
      window.location.href = `/edit/${id}`;
    }, 100);
  }

  function addNew() {
    setTimeout(() => {
      window.location.href = '/register';
    }, 100);
  }

  return (
    <>
      <Div className="addPessoa">
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Sobrenome</th>
              <th scope="col">Email</th>
              <th scope="col">Telefone</th>
              <th scope="col">Endereço</th>
              <th scope="col">CPF</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {pessoas.map((pessoa) => (
              <tr key={pessoa.id}>
                <th scope="row">{count+=1}</th>
                <td>{pessoa.nome}</td>
                <td>{pessoa.sobrenome}</td>
                <td>{pessoa.email}</td>
                <td id="telefone">{pessoa.telefone}</td>
                <td>{pessoa.endereco}</td>
                <td id="CPF" >{pessoa.cpf}</td>
                <td className="actions">
                  <button
                    onClick={() => deletePessoa(pessoa.id)}
                    type="button"
                    className="btn btn-danger btn-sm"
                  >
                    Excluir
                  </button>
                  <button onClick={()=> edit(pessoa, pessoa.id)}type="button" className="btn btn-warning btn-sm">
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() => addNew()}
          type="button"
          className="btn btn-success btn-sm addPessoa"
        >
          Adicionar
        </button>
      </Div>
    </>
  );
};

export default List;
