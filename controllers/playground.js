const Datastore = require("nedb");

const { sendMail } = require("../services/email");

// const { findOneWithProjection } = require("../services/database");

db = new Datastore();

exports.playground = async (req, res) => {
  try {
    const product = {
      sku: 43900,
      name: "Duracell - AAA Batteries (4-Pack)",
      type: "HardGood",
      price: 5.49,
      upc: "041333424019",
      category: [
        { id: "pcmcat312300050015", name: "Connected Home & Housewares" },
        { id: "pcmcat248700050021", name: "Housewares" },
        { id: "pcmcat303600050001", name: "Household Batteries" },
        { id: "abcat0208002", name: "Alkaline Batteries" },
      ],
      shipping: 5.49,
      description:
        "Compatible with select electronic devices; AAA size; DURALOCK Power Preserve technology; 4-pack",
      manufacturer: "Duracell",
      model: "MN2400B4Z",
      url: "http://www.bestbuy.com/site/duracell-aaa-batteries-4-pack/43900.p?id=1051384074145&skuId=43900&cmp=RMXCC",
      image:
        "http://img.bbystatic.com/BestBuy_US/images/products/4390/43900_sa.jpg",
    };

    await sendMail('feyi.tobi@gmail.com', product);

    res.status(200).send('OK');
  } catch (e) {
    console.error(e);
  }
};
