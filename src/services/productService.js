import products from "../database/products.json";

export const getAll = async () => {
    return Object.values(products);
};

export const getLatest = async () => {
    const allProducts = Object.values(products);
    const latestProducts = allProducts.slice(0, 3);

    return latestProducts;
};

export const getOne = async (productId) => {
    const product = products.find((p) => p.id === productId);

    return product;
};
