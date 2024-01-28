import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const perPage = 12;

export const requestImagesByQuery = async (q, page) => {
  const { data } = await axios.get(`${URL}`, {
    params: {
      key: '40771364-1b8e2f9ffde2c59ed62b20760',
      q: `${q}`,
      orientation: 'horizontal',
      page: `${page}`,
      image_type: 'photo',
      per_page: perPage,
    },
  });
  return data;
};
