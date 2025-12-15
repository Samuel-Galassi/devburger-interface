import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Row } from './row';
import { api } from '../../../services/api';
import { useEffect, useState } from 'react';
import { orderStatusOptions } from './orderStatus';
import { Filter, FilterOption } from './styles';

export function Orders() {
    // Lista completa de pedidos vinda da API
    const [orders, setOrders] = useState([]);

    // Lista filtrada para exibir na tela
    const [filteredOrders, setFilteredOrders] = useState([]);

    // Status ativo no filtro (0 = Todos)
    const [activeStatus, setActiveStatus] = useState(0);

    // Dados formatados para preencher as linhas da tabela
    const [rows, setRows] = useState([]);

    useEffect(() => {
        // Carrega os pedidos da API quando a página abre
        async function loadOrders() {
            const { data } = await api.get('orders');

            setOrders(data); // salva todos os pedidos
            setFilteredOrders(data); // inicia já mostrando tudo
        }

        loadOrders();
    }, []);

    // Formata a estrutura de dados usada no componente Row
    function createData(order) {
        return {
            name: order.user.name,
            orderId: order._id,
            date: order.createdAt,
            status: order.status,
            products: order.products,
        };
    }

    // Recria as linhas da tabela sempre que os pedidos filtrados mudam
    useEffect(() => {
        const newRows = filteredOrders.map((order) => createData(order));

        setRows(newRows);
    }, [filteredOrders]);

    // Atualiza lista filtrada quando os pedidos mudam
    useEffect(() => {
        if (activeStatus === 0) {
            // 0 = mostrar todos
            setFilteredOrders(orders);
        } else {
            // Descobre qual status está ativo
            const statusIndex = orderStatusOptions.findIndex(
                (item) => item.id === activeStatus,
            );

            // Filtra a lista
            const newFilteredOrders = orders.filter(
                (order) =>
                    order.status === orderStatusOptions[statusIndex].value,
            );

            setFilteredOrders(newFilteredOrders);
        }
    }, [orders]);

    // Troca o filtro de status quando o usuário clica
    function handleStatus(status) {
        if (status.id === 0) {
            setFilteredOrders(orders);
        } else {
            const newOrders = orders.filter(
                (order) => order.status === status.value,
            );

            setFilteredOrders(newOrders);
        }
        setActiveStatus(status.id);
    }

    return (
        <>
            {/* Botões de filtro de status */}
            <Filter>
                {orderStatusOptions.map((status) => (
                    <FilterOption
                        key={status.id}
                        onClick={() => handleStatus(status)}
                        $isActiveStatus={activeStatus === status.id}
                    >
                        {status.label}
                    </FilterOption>
                ))}
            </Filter>

            {/* Tabela principal */}
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Pedido</TableCell>
                            <TableCell>Cliente</TableCell>
                            <TableCell>Data do Pedido</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>

                    {/* Cada pedido é uma linha expansível */}
                    <TableBody>
                        {rows.map((row) => (
                            <Row
                                key={row.orderId}
                                row={row}
                                orders={orders}
                                setOrders={setOrders}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
