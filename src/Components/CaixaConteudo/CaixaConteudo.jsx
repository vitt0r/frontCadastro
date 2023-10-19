import styles from './CaixaConteudo.module.css'

const CaixaConteudo = ({children}) => {
  return (
    <div className={styles.conteudo}>{children}</div>
  )
}

export default CaixaConteudo