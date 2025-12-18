import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    background-color: ${(props) => props.theme.mainBlack};
    width: 100%;
    height: 72px;
    padding: 0 56px;
`;
export const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
`;

export const Navigation = styled.nav`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 72px;

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }

    hr {
        height: 24px;
        border: 1px solid ${(props) => props.theme.darkGray};
    }

    .admin-link {
        margin-left: auto;
        display: flex;
        align-items: center;
        gap: 20px;
    }
`;

export const Options = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 48px;
`;

export const Profile = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;

    p {
        color: ${(props) => props.theme.white};
        line-height: 90%;
        font-weight: 300;

        span {
            font-weight: 700;
            color: ${(props) => props.theme.purple};
        }
    }
`;

export const HeaderLink = styled(Link)`
    color: ${(props) =>
        props.$isActive
            ? (props) => props.theme.purple
            : (props) => props.theme.white};
    border-bottom: ${(props) =>
        props.$isActive
            ? `1px solid ${(props) => props.theme.purple}`
            : 'none'};
    padding-bottom: 5px;
    text-decoration: none;
    font-size: 14px;
    transition: color 200ms;

    &:hover {
        color: ${(props) => props.theme.purple};
    }
`;

export const Logout = styled.button`
    color: ${(props) => props.theme.red};
    text-decoration: none;
    font-weight: 700;
    background-color: transparent;
    border: none;

    display: flex;
    align-items: center;
    gap: 10px;
`;

export const LinkContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const AuthContainer = styled.div`
    display: flex;
`;

export const RegisterText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    span {
        color: #fff;
        font-size: 14px;
    }

    a {
        color: ${(props) => props.theme.purple};
        font-weight: 600;
        text-decoration: none;
    }

    &:hover{
        text-decoration:underline 1.6px;
        color: ${(props) => props.theme.purple};
    }
`;

export const AuthRight = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
`;

// 🔹 Container dos botões de autenticação (Login)
export const AuthButtons = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    a {
        color: ${(props) => props.theme.lightGray};
        background-color: ${(props) => props.theme.purple};
        font-weight: 600;
        text-decoration: none;
        padding: 8px 16px;
        border: 1px solid ${(props) => props.theme.purple};;
        border-radius: 8px;

        &:hover {
            background: ${(props) => props.theme.darkPurple};;
            color: ${(props) => props.theme.darkWhite};
        }
    }
`;