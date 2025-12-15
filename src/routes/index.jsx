import { Routes, Route } from 'react-router-dom';

import {
    Cart,
    Home,
    Menu,
    Login,
    Register,
    Checkout,
    CompletePayment,
} from '../containers';
import { Orders, NewProduct, EditProduct, Products } from '../containers/Admin';
import { UserLayout } from '../layout/UserLayout';
import { AdminLayout } from '../layout/AdminLayout';

export default function Router() {
    return (
        <Routes>
            {/* Rotas do usuário */}
            <Route path="/" element={<UserLayout />}>
                <Route index element={<Home />} /> {/* Página inicial */}
                <Route path="cardapio" element={<Menu />} />
                <Route path="carrinho" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="complete" element={<CompletePayment />} />
            </Route>

            {/* Rotas do admin */}
            <Route path="/admin" element={<AdminLayout />}>
                <Route path="pedidos" element={<Orders />} />
                <Route path="novo-produto" element={<NewProduct />} />
                <Route path="editar-produto" element={<EditProduct />} />
                <Route path="produtos" element={<Products />} />
            </Route>

            {/* Rotas públicas */}
            <Route path="login" element={<Login />} />
            <Route path="cadastro" element={<Register />} />
        </Routes>
    );
}