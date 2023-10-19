import styles from './Login.module.css'
import { Form, Button } from 'react-bootstrap'
import logo from '../../Assets/Logo/logo.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Login = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    setErro('')

    if (email === '' || senha === '') {
      setErro('Preencha todos os campos.')
      return
    } else if (!emailRegex.test(email)) {
      setErro('Por favor, insira um e-mail válido.');
      return;
    }

    const usuarioLogin = {
      EMAIL: email,
      SENHA: senha
    }

    axios.post('http://localhost:3000/autenticacao/login', usuarioLogin, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        if (response.data) {
          navigate('/parceiros-cadastrados')
        } else {
          setErro('Usuário ou senha incorreto.')
          setEmail('')
          setSenha('')
        }
      })
      .catch(error => {
        console.log('Houve um erro:', error)
        setErro('Erro ao fazer login, tente novamente')
      })

  }

  return (
    <body className={styles.body}>

      <div className={styles.containerLogin}>
        <img src={logo} alt="" />
        <Form className={styles.form}>
          <Form.Group controlId="formBasicEmail" className={styles.grupo}>
            <Form.Label className={styles.label}>Email: </Form.Label>
            <div>
              <Form.Control className={styles.input}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ex@exemplo.com" />
            </div>
          </Form.Group>
          <Form.Group controlId="formBasicEmail" className={styles.grupo}>
            <Form.Label className={styles.label}>Senha: </Form.Label>
            <div>
              <Form.Control className={styles.input}
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha" />
            </div>
          </Form.Group>
        </Form>
        <Button className={styles.botaoLogin} onClick={handleSubmit} variant="primary">Login</Button>
        {erro && <p className={styles.erro}>{erro}</p>}
      </div>

      <a href='/cadastro-login' className={styles.linkCadastrar}>Cadastrar</a>
    </body>
  )
}

export default Login