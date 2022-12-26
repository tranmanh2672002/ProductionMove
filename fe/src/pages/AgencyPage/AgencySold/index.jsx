import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
    p: 3,
};

function AgencySold() {
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();
    const [listProducts, setListProducts] = useState([]);
    const [storage, setStorage] = useState([]);

    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [nameAgency, setNameAgency] = useState('');
    const [nameCustomer, setNameCustomer] = useState('');
    const [sdt, setSdt] = useState('');
    const [address, setAddress] = useState('');
    const [codeProduct, setCodeProduct] = useState('');
    const [price, setPrice] = useState(0);

    const [openModalGuarantee, setOpenModalGuarantee] = useState(false);
    const [idOrder, setIdOrder] = useState('');
    const [error, setError] = useState('');


    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/agency/order/${localStorage.getItem('idPage')}`);
                const resStorage = await axios.get(`http://localhost:5001/agency/${localStorage.getItem('idPage')}`);
                console.log(res.data);
                setRows(res.data.orders.reverse());
                setNameAgency(res.data.nameAgency);
                setListProducts(res.data.products);
                setStorage(resStorage.data.agency.storage);
            } catch (err) {
                console.error(err);
            }
        };
        getData();
    }, []);

    const PriceVND = (price) => {
        const priceVND = Intl.NumberFormat('en-US').format;
        return priceVND(price);
    };

    const getPriceByID = (id) => {
        const product = listProducts.find((product) => {
            return product._id === id;
        });
        return product.price;
    };

    const getDate = (data) => {
        let date = new Date(data);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let dt = date.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }

        return dt + '/' + month + '/' + year;
    };

    const compareDate = (data) => {
        let date = new Date(data);
        let today = new Date();
        let ms1 = date.getTime();
        let ms2 = today.getTime();
        return Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));
    };

    const handleCreateOrder = async () => {

        const rest = storage.filter((item) => {
            return item.id !== codeProduct;
        });
        const productImport = storage.find((item) => {
            return item.id === codeProduct;
        });
        var amount = productImport.amount - 1;
        console.log(amount);

        try {

            await axios.post('http://localhost:5001/agency/updateAmount', {
                id: localStorage.getItem('idPage'),
                storage: [{ id: codeProduct, amount: amount }, ...rest],
            });

            const res = await axios.post('http://localhost:5001/agency/createOder', {
                idAgency: localStorage.getItem('idPage'),
                nameAgency: nameAgency,
                nameCustomer: nameCustomer,
                sdt: sdt,
                address: address,
                price: Number(price),
                idProduct: codeProduct,
            });

            if (res.data.create) {
                alert(res.data.msg);
                window.location.reload();
            }
        } catch (e) {
            console.log(e);
        }
    };
    const handleGuaranteeOrder = async () => {
        try {
            const res = await axios.post('http://localhost:5001/agency/createGuaranteeOrder', {
                idOrder: idOrder,
                error: error,
                idAgency: localStorage.getItem('idPage'),
                status: 'agency',
            });
            if (res.data.create) {
                alert(res.data.msg);
                window.location.reload();
            }
        } catch (e) {
            console.log(e);
        }
    };

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
                <Button onClick={() => navigate('/agency')} variant="outlined" sx={{ margin: '10px' }}>
                    <KeyboardArrowLeftOutlinedIcon />
                    Quay lại
                </Button>

                <TableContainer sx={{ marginTop: '10px' }} component={Paper}>
                    <Button sx={{marginLeft: '10px'}} onClick={() => setOpenModalCreate(true)} variant="outlined" color="secondary">
                        Tạo hóa đơn
                    </Button>
                    <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>STT</TableCell>
                                <TableCell>Tên sản phẩm</TableCell>
                                <TableCell>ID khách hàng</TableCell>
                                <TableCell>Giá</TableCell>
                                <TableCell>Thời gian</TableCell>
                                <TableCell>Bảo hành</TableCell>
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
                                    <TableCell component="th" scope="row" sortDirection="desc">
                                        {row.nameProduct}
                                    </TableCell>
                                    <TableCell>{row.idCustomer}</TableCell>
                                    <TableCell>{PriceVND(row.price)}</TableCell>
                                    <TableCell>{getDate(row.createdAt)}</TableCell>
                                    <TableCell>
                                        {compareDate(row.createdAt) > 365 ? (
                                            <Button onClick={() => {}} variant="outlined" disabled color="secondary">
                                                Hết bảo hành
                                            </Button>
                                        ) : (
                                            <>
                                                {row.status === 'not guarantee' ? (
                                                    <Button onClick={() => {
                                                        setIdOrder(row._id);
                                                        setOpenModalGuarantee(true);
                                                    }} variant="outlined" color="primary">
                                                        Bảo hành
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        onClick={() => {}}
                                                        sx={{ color: 'red !important', border: '1px solid red !important' }}
                                                        disabled
                                                        variant="outlined"
                                                    >
                                                        Đang bảo hành
                                                    </Button>
                                                )}
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            {/* Modal create order */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModalCreate}
                onClose={() => setOpenModalCreate(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModalCreate}>
                    <Box sx={styleModal}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Tạo hóa đơn
                        </Typography>
                        <TextField
                            sx={{ margin: '10px 0' }}
                            label="Tên Đại lý"
                            variant="standard"
                            fullWidth
                            type="text"
                            value={nameAgency}
                        />
                        <TextField
                            sx={{ margin: '10px 0' }}
                            label="Tên khách hàng"
                            variant="standard"
                            fullWidth
                            type="text"
                            value={nameCustomer}
                            onChange={(e) => setNameCustomer(e.target.value)}
                        />
                        <TextField
                            sx={{ margin: '10px 0' }}
                            label="Số điện thoại"
                            variant="standard"
                            fullWidth
                            type="number"
                            value={sdt}
                            onChange={(e) => setSdt(e.target.value)}
                        />
                        <TextField
                            sx={{ margin: '10px 0' }}
                            label="Địa chỉ"
                            variant="standard"
                            fullWidth
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <FormControl fullWidth sx={{ margin: '10px 0' }}>
                            <InputLabel id="demo-simple-select-label">Mã Sản phẩm</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={codeProduct}
                                label="Mã sản phẩm"
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setCodeProduct(e.target.value);
                                    setPrice(getPriceByID(e.target.value));
                                }}
                            >
                                {listProducts.map((product) => {
                                    return (
                                        <MenuItem key={product._id} value={product._id}>
                                            {product.code}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <TextField
                            sx={{ margin: '10px 0' }}
                            label="Giá sản phẩm"
                            variant="standard"
                            fullWidth
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />

                        <Button
                            sx={{ marginTop: '10px' }}
                            variant="contained"
                            fullWidth
                            type="submit"
                            onClick={handleCreateOrder}
                        >
                            Xác nhận
                        </Button>
                    </Box>
                </Fade>
            </Modal>
            {/* Modal guarantee order */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModalGuarantee}
                onClose={() => setOpenModalGuarantee(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModalGuarantee}>
                    <Box sx={styleModal}>
                        <Typography id="transition-modal-title" variant="h6" component="h2" sx={{textAlign: 'center'}}>
                            Chuyển vào danh sách bảo hành
                        </Typography>
                        
                        <TextField
                            sx={{ marginTop: '15px' }}
                            label="Lỗi sản phẩm"
                            variant="standard"
                            fullWidth
                            type="text"
                            value={error}
                            onChange={(e) => setError(e.target.value)}
                        />
                        <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
                            <Button
                                sx={{ marginTop: '10px',}}
                                color= 'secondary'
                                variant="contained"
                                type="submit"
                                onClick={() => setOpenModalGuarantee(false)}
                            >
                                Hủy bỏ
                            </Button>
                            <Button
                                sx={{ marginTop: '10px', marginLeft: '10px' }}
                                variant="contained"
                                type="submit"
                                onClick={handleGuaranteeOrder}
                            >
                                Xác nhận
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default AgencySold;
