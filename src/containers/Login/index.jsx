import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/UserContext';
import {
    Container,
    Form,
    Link,
    InputContainer,
    LeftContainer,
    RigthContainer,
    Tittle,
} from './styles';

import { Button } from '../../components/Button';

import Logo from '../../assets/logo.svg';

export function Login() {
    const { putUserData } = useUser();
    const navigate = useNavigate();
    const schema = yup
        .object({
            email: yup.string().email().required('o email é obrigatório'),
            password: yup
                .string()
                .min(6, 'a senha deve conter pelo menos 6 caracteres')
                .required('a senha é obrigatória'),
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data) => {
        try {
            const { status, data: userData } = await api.post(
                '/sessions',
                {
                    email: data.email,
                    password: data.password,
                },
                {
                    validateStatus: () => true, // permite capturar todos os status
                },
            );

            if (status === 200) {
                putUserData(userData);
                toast.success('Seja bem vindo(a)! 👌');

                setTimeout(() => {
                    if (userData?.admin) {
                        navigate('/admin/pedidos');
                    } else {
                        navigate('/');
                    }
                }, 2000);
            } else if (status === 401) {
                toast.error('Email ou senha incorretos 🤯');
            } else {
                throw new Error(); // força cair no catch
            }
        } catch (error) {
            toast.error('😭 Falha no Sistema! tente novamente');
        }
    };

    return (
        <Container>
            <LeftContainer>
                <img src={Logo} alt="logo-devburguer"></img>
            </LeftContainer>
            <RigthContainer>
                <Tittle>
                    Olá, seja bem vindo ao <span>Dev Burguer</span>!
                    <br />
                    Acesse com seu <span>Login e senha.</span>
                </Tittle>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <label>Email</label>
                        <input type="email" {...register('email')} />
                        <p>{errors?.email?.message}</p>
                    </InputContainer>

                    <InputContainer>
                        <label>Senha</label>
                        <input type="password" {...register('password')} />
                        <p>{errors?.password?.message}</p>
                    </InputContainer>
                    <Button type="submit">Entrar</Button>
                    <p>
                        não possui uma conta?{' '}
                        <Link to="/cadastro">clique aqui.</Link>
                    </p>
                </Form>
            </RigthContainer>
        </Container>
    );
}
