import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLatestAdverts } from './service';

function AdvertsPage() {
  const [adverts, setAdverts] = useState([]); // Estado para los anuncios
  const [filters, setFilters] = useState({}); // Estado para los filtros

  useEffect(() => {
    // Cargar los anuncios iniciales aquí (llamada a la API)
    getLatestAdverts().then(adverts => {
      setAdverts(() => {
        return adverts;
      });
    });
  }, []);

  const handleFilterChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFilters({ ...filters, [e.target.name]: value });
  };

  const applyFilters = () => {
    // Empezamos con todos los anuncios y vamos filtrando
    let filteredAdverts = adverts;

    // Filtro por nombre
    if (filters.name) {
      filteredAdverts = filteredAdverts.filter((advert) =>
        advert.name.toLowerCase().includes(filters.name.toLowerCase())
      );
  }

  // Filtro compra/venta
  if (filters.sale !== 'todos') {
    const isSale = filters.sale === 'venta';
    filteredAdverts = filteredAdverts.filter((advert) => advert.sale === isSale);
  }

  // Filtro por precio
  if (filters.minPrice || filters.maxPrice) {
    filteredAdverts = filteredAdverts.filter((advert) => {
      const price = advert.price;
      const minPrice = filters.minPrice || 0;
      const maxPrice = filters.maxPrice || Number.MAX_VALUE;
      return price >= minPrice && price <= maxPrice;
    });
  }

  // Filtro por tags
  if (filters.tags && filters.tags.length > 0) {
    filteredAdverts = filteredAdverts.filter((advert) =>
      filters.tags.every((tag) => advert.tags.includes(tag))
    );
  }

    setAdverts(filteredAdverts);
};

  return (
    <div>
      {adverts.length === 0 ? (
        <div>
          No hay anuncios disponibles. <Link to="/new-advert">Crear anuncio</Link>
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
          <input type="text" name="name" placeholder="Buscar por nombre" onChange={handleFilterChange} />
          
          {/* Filtro compra/venta */}
          <select name="sale" onChange={handleFilterChange}>
            <option value="todos">Todos</option>
            <option value="venta">Venta</option>
            <option value="compra">Compra</option>
          </select>
          
          {/* Filtro por precio */}
          <input type="number" name="minPrice" placeholder="Precio mínimo" onChange={handleFilterChange} />
          <input type="number" name="maxPrice" placeholder="Precio máximo" onChange={handleFilterChange} />
          
          {/* Filtro por tags (ejemplo con checkboxes) */}
          <div>
            <label>
              <input type="checkbox" name="tags" value="tag1" onChange={handleFilterChange} /> Tag1
            </label>
            <label>
              <input type="checkbox" name="tags" value="tag2" onChange={handleFilterChange} /> Tag2
            </label>
            {/* Añadir más tags según sea necesario */}
          </div>
          
          <button type="submit">Aplicar Filtros</button>
        </form>
      </div>
    </div>
  );
}

export default AdvertsPage;
