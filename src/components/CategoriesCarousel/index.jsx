import { api } from '../../services/api';
import { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Container, Tittle, ContainerItems, CategoryButton } from './styles';
import { useNavigate } from 'react-router-dom';

export function CategoriesCarousel() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadCategories() {
            const { data } = await api.get('/categories');
            setCategories(data);
        }
        loadCategories();
    }, []);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 4,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1280 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1280, min: 690 },
            items: 3,
        },
        mobile: {
            breakpoint: { max: 690, min: 0 },
            items: 2,
        },
    };

    return (
        <Container>
            <Tittle>Categorias</Tittle>

            <Carousel
                responsive={responsive}
                infinite={true}
                partialVisible={false}
                itemclass="carousel-item"
            >
                {categories.map((category) => (
                    <ContainerItems key={category.id} imageurl={category.url}>
                        <CategoryButton
                            onClick={() => {
                                navigate({
                                    pathname: '/cardapio',
                                    search: `?categoria=${category.id}`,
                                });
                            }}
                        >
                            {category.name}
                        </CategoryButton>
                    </ContainerItems>
                ))}
            </Carousel>
        </Container>
    );
}
