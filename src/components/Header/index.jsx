import { useNavigate, useResolvedPath } from 'react-router-dom';
import { useUser } from '../../hooks/UserContext';
import {
    Container,
    Navigation,
    Options,
    Profile,
    HeaderLink,
    Logout,
    LinkContainer,
    Content,
} from './styles';

import { UserCircle, ShoppingCart } from '@phosphor-icons/react';

export function Header() {
    const navigate = useNavigate();
    const { pathname } = useResolvedPath();
    const { logout, userInfo } = useUser();

    function logoutUser() {
        logout();
        navigate('/login');
    }

    return (
        <Container>
            <Content>
                <Navigation>
                    <div>
                        <HeaderLink to="/" $isActive={pathname === '/'}>
                            Home
                        </HeaderLink>
                        <hr></hr>
                        <HeaderLink
                            to="/cardapio"
                            $isActive={pathname === '/cardapio'}
                        >
                            Cardápio
                        </HeaderLink>
                    </div>
                </Navigation>
                <Options>
                    <Profile>
                        <UserCircle color="#fff" size={24} />
                        <div>
                            <p>
                                Olá, <span>{userInfo.name}</span>
                            </p>
                            <Logout onClick={logoutUser}>Sair</Logout>
                        </div>
                    </Profile>
                    <LinkContainer>
                        <ShoppingCart color="#fff" size={24} />
                        <HeaderLink to="/carrinho">Carrinho</HeaderLink>
                    </LinkContainer>
                    <Navigation className="admin-container">
                        <div className="admin-link">
                            <hr></hr>
                            <HeaderLink
                                to="/admin/produtos"
                                $isActive={pathname === '/admin/produtos'}
                            >
                                Admin menu
                            </HeaderLink>
                        </div>
                    </Navigation>
                </Options>
            </Content>
        </Container>
    );
}
