import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { getLatestAdverts } from './service';

function AdvertsPage() {
  const [adverts, setAdverts] = useState([]); // Estado para los anuncios
  const [filters, setFilters] = useState({}); // Estado para los filtros
  const [availableTags, setAvailableTags] = useState(['mobile', 'lifestyle', 'motor', 'work']); 

  useEffect(() => {
    getLatestAdverts().then(advertsData => {
      setAdverts(advertsData);
      console.log(advertsData)
  
      // Crear un nuevo Set para almacenar tags únicos
      const tagsSet = new Set();
      advertsData.forEach(advert => {
        advert.tags.forEach(tag => {
          tagsSet.add(tag);
        });
      });
      
      // Convertir el Set a un array y actualizar el estado de availableTags
      setAvailableTags(Array.from(tagsSet));
    });
  }, []);

  // Define tagOptions based on availableTags for use with react-select
  const tagOptions = availableTags.map(tag => ({ value: tag, label: tag }));
  const saleOptions = [
    { value: '', label: 'Todos' },
    { value: 'venta', label: 'Venta' },
    { value: 'compra', label: 'Compra' }
  ];
  

  const handleFilterChange = (name, selectedOption) => {
    // Si es el filtro de tags, necesitamos manejar un array de valores
    if (name === 'tags') {
      // selectedOption es null cuando no hay opciones seleccionadas
      const values = selectedOption ? selectedOption.map(option => option.value) : [];
      setFilters(filters => ({ ...filters, [name]: values }));
    } else {
      // Para los demás filtros que no son multi-select
      const value = selectedOption.value;
      setFilters(filters => ({ ...filters, [name]: value }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Use the value for input and select, but checked for checkboxes
    setFilters(filters => ({ ...filters, [name]: type === 'checkbox' ? checked : value }));
  };

  const applyFilters = () => {
    getLatestAdverts(filters).then(filteredAdverts => {
      setAdverts(filteredAdverts);
    });
  };
  

  return (
    <div>
      {adverts.length === 0 ? (
        <div>
          No hay anuncios disponibles. <Link to="new">Crear anuncio</Link>
        </div>
      ) : (
        <div>
          {adverts.map((advert) => (
            <div key={advert.id}>
              <div>Nombre: {advert.name}</div>
              <div>Precio: {advert.price}</div>
              <div>Tipo: {advert.sale ? 'Venta' : 'Compra'}</div>
              <div>Tags: {advert.tags.join(', ')}</div>
              <Link to={`/adverts/${advert.id}`}>Ver detalles</Link>
            </div>
          ))}
        </div>
      )}
      <div>
        <h2>Filtros</h2>
          <form onSubmit={(e) => { e.preventDefault(); applyFilters(); }}>
            {/* Filtro por nombre */}
            <input type="text" 
                  name="name" 
                  placeholder="Buscar por nombre" 
                  onChange={handleInputChange} />
            
            {/* Filtro compra/venta */}
            <Select
              name="sale"
              options={saleOptions}
              className="basic-single-select"
              classNamePrefix="select"
              placeholder="Estado de venta"
              onChange={selectedOption => handleFilterChange('sale', selectedOption)}
            />
            
            {/* Filtro por precio */}
            <input type="number" name="minPrice" placeholder="Precio mínimo" onChange={handleInputChange} />
            <input type="number" name="maxPrice" placeholder="Precio máximo" onChange={handleInputChange} />
            
            {/* Filtro por tags (selección múltiple) */}
            <Select
              isMulti
              name="tags"
              options={tagOptions} // Now using the defined tagOptions
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Selecciona tags"
              onChange={selectedOption => handleFilterChange('tags', selectedOption)}
            />
            <button type="submit">Aplicar Filtros</button>
          </form>
      </div>
    </div>
  );
}

export default AdvertsPage;
