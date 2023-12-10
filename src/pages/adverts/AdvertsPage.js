import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { getLatestAdverts } from './service';
import AdvertCard from './AdvertCard';
import './NewAdvertsPage.css';

function AdvertsPage() {
  const [allAdverts, setAllAdverts] = useState([]);
  const [adverts, setAdverts] = useState([]);
  const [filters, setFilters] = useState({});
  const [availableTags, setAvailableTags] = useState(['mobile', 'lifestyle', 'motor', 'work']);

  // Referencias para los campos de formulario
  const nameInputRef = useRef();
  const minPriceInputRef = useRef();
  const maxPriceInputRef = useRef();

  useEffect(() => {
    getLatestAdverts().then(advertsData => {
      setAllAdverts(advertsData);
      setAdverts(advertsData);

      const tagsSet = new Set();
      advertsData.forEach(advert => {
        advert.tags.forEach(tag => tagsSet.add(tag));
      });
      setAvailableTags(Array.from(tagsSet));
    });
  }, []);

  const filterAdverts = () => {
    let filteredAdverts = allAdverts;

    if (filters.name) {
      filteredAdverts = filteredAdverts.filter(ad => 
        ad.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.minPrice) {
      filteredAdverts = filteredAdverts.filter(ad => 
        ad.price >= filters.minPrice
      );
    }

    if (filters.maxPrice) {
      filteredAdverts = filteredAdverts.filter(ad => 
        ad.price <= filters.maxPrice
      );
    }

    if (filters.sale) {
      const isSale = filters.sale === 'venta';
      filteredAdverts = filteredAdverts.filter(ad => 
        ad.sale === isSale
      );
    }

    if (filters.tags && filters.tags.length > 0) {
      filteredAdverts = filteredAdverts.filter(ad =>
        filters.tags.some(tag => ad.tags.includes(tag))
      );
    }

    setAdverts(filteredAdverts);
  };

  const resetFilters = () => {
    setFilters({});
    setAdverts(allAdverts);

    // Restablecer los valores de los campos de formulario
    if (nameInputRef.current) nameInputRef.current.value = '';
    if (minPriceInputRef.current) minPriceInputRef.current.value = '';
    if (maxPriceInputRef.current) maxPriceInputRef.current.value = '';
    // Nota: Para los componentes Select de react-select, necesitarás una lógica adicional
  };

  const handleFilterChange = (name, selectedOption) => {
    if (name === 'tags') {
      const values = selectedOption ? selectedOption.map(option => option.value) : [];
      setFilters(filters => ({ ...filters, [name]: values }));
    } else {
      const value = selectedOption ? selectedOption.value : '';
      setFilters(filters => ({ ...filters, [name]: value }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(filters => ({ ...filters, [name]: value }));
  };

  const applyFilters = (e) => {
    e.preventDefault();
    filterAdverts();
  };

  // Define tagOptions based on availableTags for use with react-select
  const tagOptions = availableTags.map(tag => ({ value: tag, label: tag }));
  const saleOptions = [
    { value: '', label: 'Todos' },
    { value: 'venta', label: 'Venta' },
    { value: 'compra', label: 'Compra' }
  ];

  return (
    <div className="adverts-page-container">
      <div>
        <h2>Filtros</h2>
        <form onSubmit={applyFilters}>
          {/* Filtros aquí */}
          <input ref={nameInputRef} type="text" name="name" placeholder="Buscar por nombre" onChange={handleInputChange} />
          <input ref={minPriceInputRef} type="number" name="minPrice" placeholder="Precio mínimo" onChange={handleInputChange} />
          <input ref={maxPriceInputRef} type="number" name="maxPrice" placeholder="Precio máximo" onChange={handleInputChange} />
          {/* Filtro compra/venta */}
          <Select
            name="sale"
            options={saleOptions}
            className="basic-single-select"
            classNamePrefix="select"
            placeholder="Estado de venta"
            onChange={selectedOption => handleFilterChange('sale', selectedOption)}
          />
          {/* Filtro por tags */}
          <Select
            isMulti
            name="tags"
            options={tagOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Selecciona tags"
            onChange={selectedOption => handleFilterChange('tags', selectedOption)}
          />
          <br/>
          <button type="submit" style={{ marginRight: '10px' }}>Aplicar Filtros</button>
          <button type="button" onClick={resetFilters}>Restablecer Filtros</button>
        </form>
      </div>
      <br/>
      {adverts.length === 0 ? (
        <div>No hay anuncios disponibles. <Link to="new">Crear anuncio</Link></div>
      ) : (
        <div className="adverts-list">
          {adverts.map((advert) => (
            <AdvertCard key={advert.id} advert={advert} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AdvertsPage;
