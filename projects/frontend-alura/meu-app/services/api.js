const BASE_URL = 'https://parallelum.com.br/fipe/api/v1';

export async function getMarcas() {
  const response = await fetch(`${BASE_URL}/carros/marcas`);
  const marcas = await response.json();
  return marcas;
}

export async function getModelos(marcaId) {
  const response = await fetch(`${BASE_URL}/carros/marcas/${marcaId}/modelos`);
  const modelos = await response.json();
  return modelos.modelos;
}

export async function getAnos(marcaId, modeloId) {
  const response = await fetch(`${BASE_URL}/carros/marcas/${marcaId}/modelos/${modeloId}/anos`);
  const anos = await response.json();
  return anos;
}

export async function getPreco(marcaId, modeloId, ano) {
    try {
      const response = await fetch(`${BASE_URL}/carros/marcas/${marcaId}/modelos/${modeloId}/anos/${encodeURIComponent(ano)}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching price:', error);
      return null; 
    }
  }