const axios = require("axios");

const getKategori = async () => {
  try {
    const kategori = await axios.get(
      "https://wisata-api.herokuapp.com/categories"
    );

    return kategori.data;
  } catch (error) {
    console.log(error);
  }
};

const getDestinations = async (id) => {
  try {
    const kategori = await getKategori();
    const kategoriId = kategori[id]._id;

    const destinations = await axios.get(
      `https://admin-wisata-api.herokuapp.com/categories/${kategoriId}`
    );

    return destinations.data.destinations;
  } catch (error) {
    console.log(error);
  }
};

const getInfoDestiny = async ({ id, currentMessage }) => {
  try {
    const destinations = await getDestinations(currentMessage);
    const destinyId = destinations[id]._id;
    const destiny = await axios.get(
      `https://admin-wisata-api.herokuapp.com/destination/${destinyId}`
    );

    return destiny.data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getKategori,
  getDestinations,
  getInfoDestiny,
};
