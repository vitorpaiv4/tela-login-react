import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getMarcas, getModelos, getAnos } from '../services/api';

export default function Home() {
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [anos, setAnos] = useState([]);

  const [marcaSelecionada, setMarcaSelecionada] = useState('');
  const [modeloSelecionado, setModeloSelecionado] = useState('');
  const [anoSelecionado, setAnoSelecionado] = useState('');

  const router = useRouter();

  useEffect(() => {
    async function loadMarcas() {
      const marcasData = await getMarcas();
      setMarcas(marcasData);
    }
    loadMarcas();
  }, []);

  useEffect(() => {
    async function loadModelos() {
      if (marcaSelecionada) {
        const modelosData = await getModelos(marcaSelecionada);
        setModelos(modelosData);
      }
    }
    loadModelos();
  }, [marcaSelecionada]);

  useEffect(() => {
    async function loadAnos() {
      if (marcaSelecionada && modeloSelecionado) {
        const anosData = await getAnos(marcaSelecionada, modeloSelecionado);
        setAnos(anosData);
      }
    }
    loadAnos();
  }, [marcaSelecionada, modeloSelecionado]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (marcaSelecionada && modeloSelecionado && anoSelecionado) {
      router.push(`/resultado?marca=${marcaSelecionada}&modelo=${modeloSelecionado}&ano=${anoSelecionado}`);
    } else {
      alert("Please select all fields.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundColor: '#fcf4fc' }}>
      <h1 className="text-center text-4xl font-bold mb-4">Tabela Fipe</h1>
      <p className="text-center text-xl font-bold mb-4">Consulte o valor de um veículo de forma gratuita</p>
      <div className="p-8 rounded-lg shadow-lg max-w-md w-full space-y-4 bg-white">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="marca" className="block text-sm font-medium text-gray-700">Marca</label>
            <select
              id="marca"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border-2"
              value={marcaSelecionada}
              onChange={(e) => setMarcaSelecionada(e.target.value)}
            >
              <option value="">Selecione a Marca</option>
              {marcas.map((marca) => (
                <option key={marca.codigo} value={marca.codigo}>{marca.nome}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="modelo" className="block text-sm font-medium text-gray-700">Modelo</label>
            <select
              id="modelo"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border-2"
              value={modeloSelecionado}
              onChange={(e) => setModeloSelecionado(e.target.value)}
              disabled={!marcaSelecionada}
            >
              <option value="">Selecione o Modelo</option>
              {modelos.map((modelo) => (
                <option key={modelo.codigo} value={modelo.codigo}>{modelo.nome}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="ano" className="block text-sm font-medium text-gray-700">Ano</label>
            <select
              id="ano"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border-2"
              value={anoSelecionado}
              onChange={(e) => setAnoSelecionado(e.target.value)}
              disabled={!modeloSelecionado}
            >
              <option value="">Selecione o Ano</option>
              {anos.map((ano) => (
                <option key={ano.codigo} value={ano.codigo}>{ano.nome}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-purple-800 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={!anoSelecionado}
          >
            Consulte o valor
          </button>
        </form>
      </div>
    </div>
  );
}
