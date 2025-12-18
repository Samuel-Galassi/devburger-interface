import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
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
    AuthRight,
    RegisterText,
    AuthButtons,
} from './styles';

import { UserCircle, ShoppingCart } from '@phosphor-icons/react';

export function Header() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { logout, userInfo } = useUser();

    const isLogged = !!userInfo?.id;

    function logoutUser() {
        logout();
        navigate('/login');
    }

    
    useEffect(() => {
        if (
            !isLogged &&
            (pathname === '/' || pathname === '/cardapio')
        ) {
            toast.info(
                'Entre com a sua conta para acessar o catálogo de produtos!',
                {
                    toastId: 'auth-warning', // evita toast duplicado
                }
            );
        }
    }, [pathname, isLogged]);

    return (
        <Container>
            <Content>
                {/* 🔹 NAVEGAÇÃO ESQUERDA */}
                <Navigation>
                    <div>
                        <HeaderLink to="/" $isActive={pathname === '/'}>
                            Home
                        </HeaderLink>
                        <hr />
                        <HeaderLink
                            to="/cardapio"
                            $isActive={pathname === '/cardapio'}
                        >
                            Cardápio
                        </HeaderLink>
                    </div>
                </Navigation>

                {/* 🔹 ÁREA DIREITA */}
                {!isLogged ? (
                    <AuthRight>
                        <RegisterText>
                            <span>Não possui uma conta?</span>
                            <Link to="/cadastro">Cadastre-se</Link>
                        </RegisterText>

                        <AuthButtons>
                            <Link to="/login">Entrar</Link>
                        </AuthButtons>
                    </AuthRight>
                ) : (
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
                            <HeaderLink to="/carrinho">
                                Carrinho
                            </HeaderLink>
                        </LinkContainer>

                        <Navigation className="admin-container">
                            <div className="admin-link">
                                <hr />
                                <HeaderLink
                                    to="/admin/produtos"
                                    $isActive={
                                        pathname === '/admin/produtos'
                                    }
                                >
                                    Admin menu
                                </HeaderLink>
                            </div>
                        </Navigation>
                    </Options>
                )}
            </Content>
        </Container>
    );
}