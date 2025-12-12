import Logo from '../../assets/logocart.png'
import { CartItems, CartResume } from '../../components'
import { Banner, Container, Content, Tittle } from './styles'


export function Cart() {
  return(
    
    <Container>
        <Banner>
            <img src={Logo} alt='logo devburger' />
        </Banner>
        <Tittle>Checkout - Pedido </Tittle>
        <Content>
            <CartItems />
            <CartResume />
            
        </Content>
    </Container>
)  
}