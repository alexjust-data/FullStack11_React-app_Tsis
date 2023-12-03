import client from '../../../api/client';

const advertsUrl = '/api/v1/adverts';

export const getLatestAdverts = () => {
  const url = `${advertsUrl}?_sort=createdAt&_order=desc`;
  return client.get(url);
};

export const createAdvert = advert => {
  const url = advertsUrl;
  return client.post(url, advert);
};

export const getAdvert = advertId => {
  const url = `${advertsUrl}/${advertId}`;
  return client.get(url);
};