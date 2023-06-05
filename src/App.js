import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import api from './services/api';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if(input === '') {
      toast.info('Preencha algum CEP!')
      return
    }

    try {
      const response =  await api.get(`${input}/json`)
      console.log(response.data);
      setCep(response.data);
      setInput('');
    }catch {
      toast.error('Endereço não encontrado!')
      setInput('');
    }
  }

  return (
    <div className="container">
      <ToastContainer 
        autoClose={3000}
        theme="dark"  
      />
      <h1 className="title">Busca Cep</h1>

      <div className="containerInput">
        <input 
          type="text"
          placeholder="Digite seu Cep..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />

        <button className="btnSearch" onClick={handleSearch}>
          <FiSearch size={25} color='#fff'/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>{cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade} - {cep.uf}</span>
        </main>
      )}
    </div>
  );
}

export default App;
