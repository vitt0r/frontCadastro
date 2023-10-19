import { useState } from 'react'
import styles from './Cabecalho.module.css'

const Cabecalho = () => {

  const [showModal, setShowModal] = useState(false)

  const handleLogout = () => {
    alert('Saindo do sistema...')
  }

  return (
    <div className={styles.cabecalho}>
        <input type="search" placeholder='Pesquisar' name="" id="" />
        <i class="bi bi-box-arrow-right" onClick={() => setShowModal(true)}></i>
        {showModal && (
          <div className={styles.modal}>
            <p>Você deseja sair do sistema?</p>
            <div className={styles.modalBtns}>
              <button onClick={handleLogout}>Sim</button>
              <button onClick={() => setShowModal(false)}>Não</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default Cabecalho