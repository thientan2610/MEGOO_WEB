
import routesConfig from '../config/routes.js';

import LoginPage from '../pages/Login.js';
import HomePage from '../pages/Home.js';
import HomeGGPage from '../pages/HomeGG.js';
import PackagePage from '../pages/Package.js';
import StockPage from '../pages/Stock.js';
import ProfilePage from '../pages/Profile.js';
import ShoppingCartPage from '../pages/ShoppingCart.js';
import GroupPage from '../pages/Group.js';
import UserJoinPage from '../pages/UserJoin.js';
import PackageRenewPage from '../pages/PackageRenew.js';
import ChatPage from '../pages/Chat.js';
import ProductPage from '../pages/ListProduct.js';
import ProductItemPage from '../pages/Product.js';
import ListProductPage from "../pages/ProductInStock.js";

const publicRoutes = [
    { path: routesConfig.home, component: HomePage},
    { path: routesConfig.package, component: PackagePage},
    { path: routesConfig.joinGr, component: UserJoinPage},
];

const privateRoutes = [
    { path: routesConfig.stock, component: StockPage},
    { path: routesConfig.profile, component: ProfilePage},
    { path: routesConfig.shopping, component: ShoppingCartPage},
    { path: routesConfig.group, component: GroupPage},
    { path: routesConfig.chatGr, component: ChatPage},
];

const loginRoute = [
    { path: routesConfig.login, component: LoginPage},
    { path: routesConfig.packageGroup, component: PackageRenewPage},
    { path: routesConfig.product, component: ProductPage},
    { path: routesConfig.productItem, component: ProductItemPage},
    { path: routesConfig.listProduct, component: ListProductPage},
    { path: routesConfig.homeGG, component: HomeGGPage},
]

export { publicRoutes, privateRoutes, loginRoute};