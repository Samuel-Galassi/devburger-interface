import { createBrowserRouter, Route, Routes } from 'react-router-dom';

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
            <Route path="/" element={<UserLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/Cardapio" element={<Menu />} />
                <Route path="/carrinho" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/complete" element={<CompletePayment />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
                <Route path="/admin/pedidos" element={<Orders />} />
                <Route path="/admin/novo-produto" element={<NewProduct />} />
                <Route path="/admin/editar-produto" element={<EditProduct />} />
                <Route path="/admin/produtos" element={<Products />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Register />} />
        </Routes>
    );
}

//qual é o atalho para comentar multiplas linhas: ctrl + k + c, e para reverter ctrl + k + u
