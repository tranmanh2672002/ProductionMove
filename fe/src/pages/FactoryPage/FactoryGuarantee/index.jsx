import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button} from '@mui/material';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function FactoryGuarantee() {
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();
    const [listProducts, setListProducts] = useState([]);


    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5001/factory/guaranteeOrder/${localStorage.getItem('idPage')}`,
                );

                if (res) {
                    setRows(res.data.guaranteeOrders);
                    setListProducts(res.data.productGuarantees);
                }
            } catch (err) {
                console.error(err);
            }
        };
        getData();
    }, []);

    const getNameProduct = (id) => {
        let product = listProducts.find((product) => {
            return product._id === id;
        });
        return product.nameProduct;
    };

    // const getDate = (data) => {
    //     let date = new Date(data);
    //     let year = date.getFullYear();
    //     let month = date.getMonth() + 1;
    //     let dt = date.getDate();

    //     if (dt < 10) {
    //         dt = '0' + dt;
    //     }
    //     if (month < 10) {
    //         month = '0' + month;
    //     }

    //     return dt + '/' + month + '/' + year;
    // };

    return (
        <>
            <Box
                id="style-2"
                sx={{
                    backgroundColor: '#fff',
                    width: 'calc(100% - var(--default-layout-width-sidebar))',
                    height: 'calc(100vh - var(--default-layout-height-header))',
                    float: 'right',
                    overflowY: 'scroll',
                }}
            >
                <Button onClick={() => navigate('/guarantee')} variant="outlined" sx={{ margin: '10px' }}>
                    <KeyboardArrowLeftOutlinedIcon />
                    Quay lại
                </Button>

                <TableContainer sx={{ marginTop: '10px'}} component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>STT</TableCell>
                                <TableCell>Mã đơn hàng</TableCell>
                                <TableCell>Tên sản phẩm</TableCell>
                                <TableCell>Lỗi</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow
                                    id={row._id}
                                    className="row"
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell component="th" scope="row" sx={{ maxWidth: '200px' }}>
                                        {row.idOrder}
                                    </TableCell>
                                    <TableCell sx={{ maxWidth: '200px' }}>{getNameProduct(row.idOrder)}</TableCell>
                                    <TableCell>{row.error}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}

export default FactoryGuarantee;
