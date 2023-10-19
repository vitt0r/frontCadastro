import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import CadastroLogin from './Pages/CadastroLogin/CadastroLogin';
import ParceirosCadastrados from './Pages/ParceirosCadastrados/ParceirosCadastrados';
import ParceirosAdicionar from './Pages/AdicionarParceiro/ParceirosAdicionar'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />    
        <Route path="/cadastro-login" element={<CadastroLogin/>} />  
        <Route path="/parceiros-cadastrados" element={<ParceirosCadastrados/>} />  
        <Route path="/parceiros-adicionar" element={<ParceirosAdicionar/>} />       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
