import AllProductsPage from './AllProductsPage';
import AddProductPage from './AddProductPage';
import UpdateProductPage from './UpdateProductPage';

export const ProductsPageConfig = {
  routes: [
    {
      path: '/products',
      exact: true,
      component: AllProductsPage,
    },
    {
      path: '/products/add-product',
      exact: true,
      component: AddProductPage,
    },
    {
      path: '/products/:id',
      exact: true,
      component: UpdateProductPage,
    },
  ],
};
