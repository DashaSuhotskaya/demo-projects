export default async function getProducts() {
    const response = await fetch("./data/data.json");
    const products = await response.json();
    return products;
  }