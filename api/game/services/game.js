"use strict";

const axios = require("axios");

async function getGameInfo(slug) {
  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;
  const body = await axios.get(`https://www.gog.com/game/${slug}`);
  const dom = new JSDOM(body.data);

  const description = dom.window.document.querySelector(".description");
  return {
    rating: "BR0",
    shrort_description: description.textContent.slice(0, 160),
    description: description.innerHTML,
  };
}

module.exports = {
  populate: async (params) => {
    const gogApiUrl = `https://www.gog.com/games/ajax/filtered?mediaType=game&page=1&sort=popularity`;
    const {
      data: { products },
    } = await axios.get(gogApiUrl);
    const gameInfo = await getGameInfo(products[0].slug);
  },
};
