import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AdvertsPage() {
  const [adverts, setAdverts] = useState([]); // Estado para los anuncios
  const [filters, setFilters] = useState({}); // Estado para los filtros

  useEffect(() => {
    // Cargar los anuncios iniciales aquí (llamada a la API)
  }, []);

  const handleFilterChange = (e) => {
    // Actualizar el estado de los filtros aquí
    // Ejemplo: setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    // Filtrar los anuncios basados en los filtros aplicados
    // Puedes ajustar esto para filtrar los anuncios de manera efectiva
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
          {/* Añadir inputs para los filtros aquí */}
          <input type="text" name="name" onChange={handleFilterChange} />
          {/* Añadir más inputs según sea necesario */}
          <button type="submit">Aplicar Filtros</button>
        </form>
      </div>
    </div>
  );
}

export default AdvertsPage;
