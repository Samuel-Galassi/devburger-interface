import { Link } from 'react-router-dom';
import styled from 'styled-components';


export const Container = styled.div`
    .carousel-item {
        padding: 40px;
    }
    .react-multi-carousel-item {
        margin: 15px;
        padding: 10px;
    }

        .react-multiple-carousel__arrow--left{
        left: 15px;
        top: 30px;
    }
     .react-multiple-carousel__arrow--right{
        top: 30px;
    }

    padding-left: 40px;
`

export const Tittle = styled.h2`
    font-size: 32px;
    font-weight: 800;
    color: ${(props) => props.theme.purple};
    padding-bottom: 12px;
    position: relative;
    text-align: center;
    margin-bottom:40px;
    margin-top:20px;

    &::after {
        content: '';
        position:absolute;
        bottom: 0;
        width: 56px;
        height: 4px;
        background-color: ${(props) => props.theme.purple};
        left: calc(50% - 28px);
    }

`

export const ContainerItems = styled.div.attrs(props => ({
    style: {
        backgroundImage: `url(${props.imageurl})`
    }
}))`
    background-size: cover;
    background-position: center;
    border-radius: 20px;

    display: flex;
    align-items: center;
    padding: 20px 10px;
    width: 98%;
    height: 250px;


`;

    export const CategoryButton = styled(Link)`
     color: ${(props) => props.theme.white};
        background-color: rgba(0, 0, 0, 0.5);
        padding: 10px 30px;
        border-radius: 30px;
        font-size: 22.5px;
        font-weight: 500;
        margin-top: 50px;
        text-decoration:none;

        &:hover{
             background-color:${(props) => props.theme.purple};
        }
    `