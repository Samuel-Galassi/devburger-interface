import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { CaretUp, CaretDown } from '@phosphor-icons/react';
import { useState } from 'react';
import { formatDate } from '../../../utils/FormatDate';
import { ProductImage, SelectStatus } from './styles';
import { orderStatusOptions } from './orderStatus';
import { api } from '../../../services/api';

export function Row({ row, setOrders, orders }) {
    // controla abertura da linha expandida
    const [open, setOpen] = useState(false);

    // loading apenas para mostrar estado durante atualização do status
    const [loading, setLoading] = useState(false);

    // Função responsável por atualizar o status no backend e atualizar o estado local
    async function newStatusOrder(id, status) {
        try {
            setLoading(true);
            await api.put(`orders/${id}`, { status }); // envia atualização ao backend

            // atualiza o array `orders` no frontend para refletir o novo status
            const newOrders = orders.map((order) =>
                order._id === id ? { ...order, status } : order,
            );

            setOrders(newOrders);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {/* Linha principal da tabela */}
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    {/* Botão de expandir/ocultar detalhes */}
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <CaretUp size={20} weight="bold" />
                        ) : (
                            <CaretDown size={20} weight="bold" />
                        )}
                    </IconButton>
                </TableCell>

                {/* Dados principais do pedido */}
                <TableCell component="th" scope="row">
                    {row.orderId}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{formatDate(row.date)}</TableCell>

                {/* Select para alterar status */}
                <TableCell>
                    <SelectStatus
                        options={orderStatusOptions.filter(
                            (status) => status.id !== 0,
                        )}
                        placeholder="Status"
                        defaultValue={orderStatusOptions.find(
                            (status) => status.value === row.status,
                        )}
                        onChange={(status) =>
                            newStatusOrder(row.orderId, status.value)
                        } // dispara atualização
                        isLoading={loading}
                        menuPortalTarget={document.body}
                    />
                </TableCell>
            </TableRow>

            {/* Linha expandida com detalhes do pedido */}
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                Pedido
                            </Typography>

                            {/* Tabela interna: produtos do pedido */}
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Quantidade</TableCell>
                                        <TableCell>Produto</TableCell>
                                        <TableCell>Categoria</TableCell>
                                        <TableCell>Imagem do Produto</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {row.products.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {product.id}
                                            </TableCell>
                                            <TableCell>
                                                {product.name}
                                            </TableCell>
                                            <TableCell>
                                                {product.category}
                                            </TableCell>
                                            <TableCell>
                                                <ProductImage
                                                    src={`${import.meta.env.VITE_BASE_URL}/${product.url}`}
                                                    alt={product.name}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

Row.propTypes = {
    orders: PropTypes.array.isRequired,
    setOrders: PropTypes.func.isRequired,
    row: PropTypes.shape({
        orderId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        products: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                category: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
                quantity: PropTypes.number.isRequired,
                url: PropTypes.string.isRequired,
            }),
        ).isRequired,
        Status: PropTypes.string.isRequired,
    }).isRequired,
};
