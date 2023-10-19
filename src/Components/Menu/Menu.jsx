
//STYLES
import styles from './Menu.module.css'

//MODULES
import Nav from 'react-bootstrap/Nav';

//HOOKS
import { useNavigate } from 'react-router-dom'

//COMPONENTS
import logo from '../../Assets/Logo/logo.png'
import { useState } from 'react';


const Menu = () => {

    const navigate = useNavigate()

      //seta estado do hamburguerMenu como aberto ou fechado 
    const [show, setShow] = useState(false);

  return (
    <body>
    {!show ? (<i className={`bi bi-list ${styles.abrirMenu}`} onClick={() => setShow(true)}></i>) : 
    (<i className={`bi bi-x ${styles.fecharMenu}`} onClick={() => setShow(false)}></i>)}

      <aside className={show ? styles.hamburguerMenu : styles.menu}>

        <div className={styles.imgContainer}>
            <img src={logo} alt=""/>
        </div>
        <Nav defaultActiveKey="/" className={styles.nav}>

          <Nav.Link
            key='parceiros-cadastrados'
            className={styles.navItem}
            onClick={() => navigate('/parceiros-cadastrados')}> 
            Parceiros Cadastrados</Nav.Link>
            <Nav.Link
            key='parceiros-adicionar'
            className={styles.navItem}
            onClick={() => navigate('/parceiros-adicionar')}> 
            Adicionar Parceiro</Nav.Link>

        </Nav>

        </aside>


    </body>
  )
}

export default Menu
