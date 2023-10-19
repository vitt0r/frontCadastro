import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Menu from '../../Components/Menu/Menu';
import Cabecalho from '../../Components/Cabecalho/Cabecalho';
import CaixaConteudo from '../../Components/CaixaConteudo/CaixaConteudo';
import styles from './ParceirosAdicionar.module.css';
import axios from 'axios';

const AdicionarParceiro = () => {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [erro, setErro] = useState('');
  const [concluido, setConcluido] = useState(false)



  const buscaCep = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (response.ok) {
        setEndereco(data.logradouro);
        setBairro(data.bairro);
        setComplemento(data.complemento);
        setCidade(data.localidade);
        setEstado(data.uf);
      } else {
        setEndereco('');
        setBairro('');
        setComplemento('');
        setCidade('');
        setEstado('');
        setErro('CEP não encontrado');
      }
    } catch (error) {
      setEndereco('');
      setBairro('');
      setComplemento('');
      setCidade('');
      setEstado('');
      setErro('Erro ao buscar CEP');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErro('');

    if (
      nome === '' ||
      sobrenome === '' ||
      cpf === '' ||
      telefone === '' ||
      cep === '' ||
      endereco === '' ||
      numero === '' ||
      bairro === '' ||
      complemento === '' ||
      cidade === '' ||
      estado === ''
    ) {
      setErro('Preencha todos os campos');
      console.log(erro);
      return;
    }
  };

  const novoParceiro = {
    NOME: nome,
    SOBRENOME: sobrenome,
    CPF: cpf,
    TELEFONE: telefone
  }

  axios.post('http://localhost:3000/pessoa',novoParceiro,{
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => {
    console.log(response.data);
    setConcluido(true)
  })
  .catch(error =>{
    console.log('Houve um erro: ', error)
  })

  const children = (
    <div className={styles.container}>
      <p>ADICIONAR PARCEIRO</p>

      <div className={styles.formContainer}>
        <div className={styles.formColumn}>
          <Form className={styles.form}>
            <Form.Group controlId="formBasicNome" className={styles.grupo}>
              <Form.Label className={styles.label}>Nome:</Form.Label>
              <div>
                <Form.Control
                  className={styles.input}
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
            </Form.Group>
            <Form.Group controlId="formBasicSobrenome" className={styles.grupo}>
              <Form.Label className={styles.label}>Sobrenome:</Form.Label>
              <div>
                <Form.Control
                  className={styles.input}
                  type="text"
                  value={sobrenome}
                  onChange={(e) => setSobrenome(e.target.value)}
                />
              </div>
            </Form.Group>
            <Form.Group controlId="formBasicCpf" className={styles.grupo}>
              <Form.Label className={styles.label}>CPF:</Form.Label>
              <div>
                <Form.Control
                  className={styles.input}
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </div>
            </Form.Group>
            <Form.Group controlId="formBasicTelefone" className={styles.grupo}>
              <Form.Label className={styles.label}>Telefone:</Form.Label>
              <div>
                <Form.Control
                  className={styles.input}
                  type="text"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </div>
            </Form.Group>
          </Form>
        </div>
        <div className={styles.formColumn}>
          <Form className={styles.form}>
            <Form.Group controlId="formBasicCep" className={styles.grupo}>
              <Form.Label className={styles.label}>CEP:</Form.Label>
              <div>
                <Form.Control
                  className={styles.input}
                  type="text"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  onBlur={buscaCep}
                />
              </div>
            </Form.Group>
            <div className={styles.enderecoContainer}>
              <div className={styles.formGroup}>
                <Form.Label className={styles.label}>Endereço:</Form.Label>
                <div>
                  <Form.Control
                    className={`${styles.input} ${styles.inputEndereco}`}
                    type="text"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    readOnly
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <Form.Label className={styles.label}>Número:</Form.Label>
                <div>
                  <Form.Control
                    className={styles.input}
                    type="text"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className={styles.enderecoContainer}>
              <div className={styles.formGroup}>
                <Form.Label className={styles.label}>Bairro:</Form.Label>
                <div>
                  <Form.Control
                    className={`${styles.input} ${styles.inputEndereco}`}
                    type="text"
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                    readOnly
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <Form.Label className={styles.label}>Complemento:</Form.Label>
                <div>
                  <Form.Control
                    className={styles.input}
                    type="text"
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className={styles.enderecoContainer}>
              <div className={styles.formGroup}>
                <Form.Label className={styles.label}>Cidade:</Form.Label>
                <div>
                  <Form.Control
                    className={`${styles.input} ${styles.inputEndereco}`}
                    type="text"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    readOnly
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <Form.Label className={styles.label}>Estado:</Form.Label>
                <div>
                  <Form.Control
                    className={`${styles.input} ${styles.inputEndereco}`}
                    type="text"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <Button
        className={styles.botaoSalvar}
        onClick={handleSubmit}
        variant="primary"
        size="sm"
        block
      >
        Salvar
      </Button>
      {erro && <p className={styles.erro}>{erro}</p>}
    </div>
  );

  return (
    <div className={styles.body}>
      <Menu />
      <Cabecalho />
      <CaixaConteudo children={children} />
    </div>
  );
};

export default AdicionarParceiro;