import config from '../config';

// Pages
import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';
import LayoutOnly from '../layout/LayoutOnly';
import Product from '../pages/product';
import FileNotFoundPage from '../pages/fileNotFound';
import productDetailPage from '../pages/productDetail';
import CartPage from '../pages/cart';
import CheckOut from '../pages/checkOut';
import CheckOutLoginPage from '../pages/checkOutLogin';
import CheckOutShipping from '../pages/checkOutShipping';
import Search from '../pages/search';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.register, component: Register },
    { path: config.routes.product, component: Product, layout: LayoutOnly },
    { path: config.routes.fileNotFound, component: FileNotFoundPage },
    { path: config.routes.productDetail, component: productDetailPage, layout: LayoutOnly },
    { path: config.routes.cart, component: CartPage, layout: LayoutOnly },
    { path: config.routes.checkOut, component: CheckOut, layout: LayoutOnly },
    { path: config.routes.checkOutLogin, component: CheckOutLoginPage, layout: LayoutOnly },
    { path: config.routes.checkOutShipping, component: CheckOutShipping, layout: LayoutOnly },
    { path: config.routes.search, component: Search, layout: LayoutOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
