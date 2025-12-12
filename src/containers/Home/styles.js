import styled from 'styled-components';
import BannerHome from '../../assets/banner-home.svg';
import Background from '../../assets/background.png';

export const Banner = styled.div`
        background: url('${BannerHome}');
        background-size: cover;
        background-position: center;
        height: 480px;

        h1{
            font-size:80px;
            font-family: 'Road Rage', sans-serif;
            color: ${(props) => props.theme.darkWhite};
            position:absolute;
            right:20%;
            top:10%;

        }
`


export const Container = styled.section`
  background: 
    linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url('${Background}');
  
  background-size: cover;
  background-position: center;
  height: 900px;
`;



