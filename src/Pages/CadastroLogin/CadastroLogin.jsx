import styles from './CadastroLogin.module.css'
import axios from 'axios'

import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CadastroLogin = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmSenha, setConfirmSenha] = useState('')
    const [erro, setErro] = useState('')

    const [concluido, setConcluido] = useState(false)

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const handleSubmit = (e) => {
        e.preventDefault()

        setErro('')

        if(email === '' || senha === '' || confirmSenha === '') {
            setErro('Preencha todos os campos')
            return
        } else if (!emailRegex.test(email)) {
            setErro('Por favor, insira um e-mail válido.');
            return;
        } else if(senha !== confirmSenha) {
            setErro('As senhas precisam ser iguais.')
            return
        }

        const novoUsuario = {
           EMAIL: email,
            SENHA: senha
        }


        axios.post('http://localhost:3000/usuario', novoUsuario, {
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
    }


  return (
    <body className={styles.body}>
        
        <button onClick={() => navigate('/')} className={styles.linkHome}>
        <i class="bi bi-house-door-fill"></i>
        </button>
        <div className={styles.containerCadastrar}>       
        {!concluido ? <>
            <p>Inscreva-se agora</p>
            <Form className={styles.form}>
            <Form.Group controlId="formBasicEmail" className={styles.grupo}>
                <Form.Label className={styles.label}>Email: </Form.Label>
                <Form.Control
                  className={styles.input}
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ex@exemplo.com" />
              </Form.Group>
              <div className={styles.flexCampos}>
              <Form.Group controlId="formBasicEmail" className={styles.grupo}>
                <Form.Label className={styles.label}>Senha: </Form.Label>
                <Form.Control
                  className={styles.input}
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Digite sua senha" />
              </Form.Group>
              <Form.Group controlId="formBasicEmail" className={styles.grupo}>
                <Form.Label className={styles.label}>Confirmar Senha: </Form.Label>
                <Form.Control
                  className={styles.input}
                  type="password"
                  value={confirmSenha}
                  onChange={(e) => setConfirmSenha(e.target.value)}
                  placeholder="Confirme sua senha" />
              </Form.Group>
              </div>
            </Form>
            
            <Button className={styles.botaoConcluir} onClick={handleSubmit} variant="primary">Concluir</Button>
            </> : <>
            <div className={styles.msgConcluido}>
              <p>Cadastro efetuado com sucesso!</p>
              <p>Volte para a tela de login para iniciar sua sessão.</p>
            </div>
            <Button className={styles.botaoConcluir} onClick={() => navigate('/')} variant="primary">Voltar</Button></>}
            {erro && <p className={styles.erro}>{erro}</p>}
        </div>
        
    </body>
  )
}

export default CadastroLogin