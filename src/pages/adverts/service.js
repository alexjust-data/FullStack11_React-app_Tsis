import client from '../../api/client';

const advertsUrl = '/api/v1/adverts';


export const getLatestAdverts = () => {
  const url = `${advertsUrl}`;
  return client.get(url)
    .then(response => response.data)
    .catch(error => {
      console.error("Error al obtener los anuncios: ", error);
      throw error; // Esto permite que el error se propague y pueda ser capturado más arriba
    });
};




export const createAdvert = advert => {
  const url = advertsUrl;
  return client.post(url, advert);
};

export const getAdvert = advertId => {
  const url = `${advertsUrl}/${advertId}`;
  return client.get(url);
};


