
import React, { useState } from 'react';
import { fetchAddressByCep, formatCep } from '@/services/cepService';

interface AddressFormProps {
  onAddressSubmit: (addressData: any) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onAddressSubmit }) => {
  const [address, setAddress] = useState({
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
  });
  const [cepError, setCepError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedCep = formatCep(value);
    
    setAddress({ ...address, cep: formattedCep });
    setCepError('');
    
    if (value.replace(/\D/g, '').length === 8) {
      setLoading(true);
      try {
        const addressData = await fetchAddressByCep(value);
        setLoading(false);
        
        if (addressData) {
          setAddress({
            ...address,
            cep: formattedCep,
            street: addressData.logradouro,
            complement: addressData.complemento,
            neighborhood: addressData.bairro,
            city: addressData.localidade,
            state: addressData.uf,
          });
        } else {
          setCepError('CEP not found. Please enter address manually.');
        }
      } catch (error) {
        setLoading(false);
        setCepError('Error fetching address. Please enter manually.');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddressSubmit(address);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="cep" className="block text-sm font-medium mb-1">
          CEP
        </label>
        <div className="relative">
          <input
            id="cep"
            type="text"
            name="cep"
            value={address.cep}
            onChange={handleCepChange}
            placeholder="12345-678"
            className="input-field"
            maxLength={9}
            required
          />
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        {cepError && <p className="text-destructive text-sm mt-1">{cepError}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="street" className="block text-sm font-medium mb-1">
            Street
          </label>
          <input
            id="street"
            type="text"
            name="street"
            value={address.street}
            onChange={handleInputChange}
            placeholder="Street address"
            className="input-field"
            required
          />
        </div>
        <div>
          <label htmlFor="number" className="block text-sm font-medium mb-1">
            Number
          </label>
          <input
            id="number"
            type="text"
            name="number"
            value={address.number}
            onChange={handleInputChange}
            placeholder="House number"
            className="input-field"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="complement" className="block text-sm font-medium mb-1">
          Complement (Optional)
        </label>
        <input
          id="complement"
          type="text"
          name="complement"
          value={address.complement}
          onChange={handleInputChange}
          placeholder="Apt, Suite, etc."
          className="input-field"
        />
      </div>

      <div>
        <label htmlFor="neighborhood" className="block text-sm font-medium mb-1">
          Neighborhood
        </label>
        <input
          id="neighborhood"
          type="text"
          name="neighborhood"
          value={address.neighborhood}
          onChange={handleInputChange}
          placeholder="Neighborhood"
          className="input-field"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium mb-1">
            City
          </label>
          <input
            id="city"
            type="text"
            name="city"
            value={address.city}
            onChange={handleInputChange}
            placeholder="City"
            className="input-field"
            required
          />
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium mb-1">
            State
          </label>
          <input
            id="state"
            type="text"
            name="state"
            value={address.state}
            onChange={handleInputChange}
            placeholder="State"
            className="input-field"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="accent-button w-full mt-4"
      >
        Save Address
      </button>
    </form>
  );
};

export default AddressForm;
