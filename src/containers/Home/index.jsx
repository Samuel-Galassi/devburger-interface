
import { CategoriesCarousel, OffersCarousel} from '../../components';
import { useUser } from '../../hooks/UserContext';
import { Banner, Container } from './styles';




export function Home() {


    return (
        <main>
            <Banner>
                <h1>Bem-vindo!</h1>
            </Banner>
            <Container>
                    <CategoriesCarousel />
                    <OffersCarousel />

            </Container>
        </main>
    )
}