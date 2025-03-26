
// CEP service for Brazilian address lookup
interface AddressData {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export const fetchAddressByCep = async (cep: string): Promise<AddressData | null> => {
  try {
    // Clean CEP format (remove non-numeric characters)
    const cleanCep = cep.replace(/\D/g, '');
    
    if (cleanCep.length !== 8) {
      throw new Error('CEP must have 8 digits');
    }
    
    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data = await response.json();
    
    if (data.erro) {
      throw new Error('CEP not found');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching address by CEP:', error);
    return null;
  }
};

// Format CEP with mask (12345-678)
export const formatCep = (cep: string): string => {
  const cleanCep = cep.replace(/\D/g, '');
  if (cleanCep.length <= 5) {
    return cleanCep;
  }
  return `${cleanCep.slice(0, 5)}-${cleanCep.slice(5, 8)}`;
};
