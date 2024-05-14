import { useRouter } from 'next/router';

const Resultado = ({ data }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundColor: '#fcf4fc' }}>
      <div className="p-8 rounded-lg shadow-lg max-w-md w-full space-y-4 bg-white">
        <h1 className="text-center text-2xl font-bold mb-4">Preço do Carro</h1>
        {data ? (
          <div className="space-y-2">
            <p><strong>Marca:</strong> {data.Marca}</p>
            <p><strong>Modelo:</strong> {data.Modelo}</p>
            <p><strong>Ano Modelo:</strong> {data.AnoModelo}</p>
            <p><strong>Preço:</strong> {data.Valor}</p>
          </div>
        ) : (
          <p className="text-center text-red-500">Não foi possível obter o preço do carro.</p>
        )}
        <button
          onClick={() => router.push('/')}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Nova Busca
        </button>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { marca, modelo, ano } = context.query;
  let data = null;

  try {
    data = await getPreco(marca, modelo, ano);
    console.log("Received data:", data);
  } catch (error) {
    console.error("Error fetching price:", error);
  }

  return { props: { data } };
}

export default Resultado;
