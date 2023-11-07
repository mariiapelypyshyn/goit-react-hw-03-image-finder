import axios from 'axios';

export async function fetchImages(inputData, page) {
    const searchParams = new URLSearchParams({
    key: '25678499-fb4307c7635ffe0bf86a6d7bf',
    q: inputData,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
    page,
  });
  const images = await axios.get(`https://pixabay.com/api/?${searchParams}`);
 
  return images.data;
}