import ProductModel from '../../src/models/product';

export const seedProducts = async (): Promise<
  { name: string; price: string; user: string }[]
> => {
  try {
    // Define the product data
    const products = Array.from({ length: 50 }, (_, index) => ({
      name: `Product ${index + 1}`,
      price: (Math.random() * (100 - 1) + 1).toFixed(2),
      user: '64a293c612615972102d2f7c',
    }));

    // Create the products
    await ProductModel.create(products);
    return products;
    console.log('Products seeded successfully');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};
