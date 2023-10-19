import styles from './ParceirosCadastrados.module.css'
import Menu  from '../../Components/Menu/Menu'
import Cabecalho from '../../Components/Cabecalho/Cabecalho'
import CaixaConteudo from '../../Components/CaixaConteudo/CaixaConteudo'

import {useState ,useEffect } from 'react';

import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import axios from 'axios';

const ParceirosCadastrados = () => {
  const [parceiros, setParceiros] = useState([])

    useEffect(()=>{
      axios.get('http://localhost:3000/pessoa',{
        headers: {
          'Authorization': 3,
        }
      })
      .then(response =>{
        setParceiros(response.data.retorno)
        console.log(response.data)
      })
      .catch(error => {
        console.log('Houve um erro:', error)
      })
    },[]);


    const formatCPF = (cpf) => {
      if (cpf && cpf.length === 11) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      }
    };
    
    const formatPhoneNumber = (phoneNumber) => {
      if (phoneNumber && phoneNumber.length === 11) {
        const ddd = phoneNumber.slice(0, 2);
        const firstPart = phoneNumber.slice(2, 7);
        const secondPart = phoneNumber.slice(7, 11);
        return `(${ddd}) ${firstPart}-${secondPart}`;
      }
    };
    
      useEffect(() => {
        if (parceiros.length > 0 && !$.fn.DataTable.isDataTable('#tabela')) {
          $('#tabela').DataTable({
            columnDefs: [{
              targets: -1,
              className: styles.acao
          }],
            language: {
              search: '',
              searchPlaceholder: `Procurar...`,
              emptyTable: "Nenhum registro encontrado",
              zeroRecords: "Nenhum registro correspondente encontrado",
            },
            lengthChange: false,
            info: false    
          });
        }
       }, [parceiros]);
    
      const showTable = () => {
        return parceiros.map((pessoa, index) => {
          return (
            <tr key={index}>
              <td className={styles.hidden}>{index}</td>
              <td>{pessoa.NOME || '-'}</td>
              <td>{pessoa.SOBRENOME || '-'}</td>
              <td>{formatCPF(pessoa.CPF) || '-'}</td>
              <td>{formatPhoneNumber(pessoa.TELEFONE) || '-'}</td>     
              <td><i className="bi bi-pen" onClick={() => alert(`O index é ${pessoa.NOME}`)}></i></td>
            </tr>
          );
        });
      };


    const children = (
        <div className={styles.container}>
          <p>PARCEIROS CADASTRADOS</p>
          <div className={`container-fluid py-4 ${styles.boxTable}`}>
            <div className={styles.tableContainer}>
              <table id='tabela'
              className={`table align-items-center justify-content-center mb-0 ${styles.table}`}>
                <thead>
                  <tr>
                    <th className={styles.hidden}></th>
                    <th>Nome</th>
                    <th>Sobrenome</th>
                    <th>CPF</th>
                    <th>Telefone</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                  <tbody>{showTable()}</tbody>
                </table>
              </div>
            </div>
          </div>
    )

  return (
    <body className={styles.body}>
        <Menu/>
        <Cabecalho/>
        <CaixaConteudo children={children}/>
    </body>
  )
}

export default ParceirosCadastrados