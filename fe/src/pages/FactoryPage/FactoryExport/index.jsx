import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Skeleton, TextField, Typography } from '@mui/material';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Stack } from '@mui/system';

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

function FactoryExport() {
    // data call api
    const [rows, setRows] = useState([]);
    const [storage, setStorage] = useState([]);
    const [agencies, setAgencies] = useState([]);
    const [factory, setFactory] = useState();

    // input delivery
    const [openModal, setOpenModal] = useState(false);
    const [idAgencyExport, setIdAgencyExport] = useState('');
    const [idProduct, setIdProduct] = useState('');
    const [amountExport, setAmountExport] = useState(0);
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    const getAmount = (id) => {
        var result = storage.find((product) => {
            return product.id === id;
        });
        return result.amount;
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/factory/${localStorage.getItem('idPage')}`);
                console.log(res.data);
                setAgencies(res.data.agencies);
                setRows(res.data.products);
                setStorage(res.data.factory.storage);
                setFactory(res.data.factory);
            } catch (err) {
                console.error(err);
            }
        };
        getData();
    }, []);

    const handleClickExport = async () => {
        const rest = storage.filter((item) => {
            return item.id !== idProduct;
        });
        var amount = getAmount(idProduct) - Number(amountExport);

        const agencyName = agencies.find((item) => {
            return item._id === idAgencyExport;
        });

        if (amount <= 0 || Number(amountExport) <= 0) {
            return;
        }

        try {
            await axios.post('http://localhost:5001/factory/updateAmount', {
                id: localStorage.getItem('idPage'),
                storage: [{ id: idProduct, amount: amount }, ...rest],
            });
            const res2 = await axios.post('http://localhost:5001/delivery/createDeliveryByFactory', {
                from: localStorage.getItem('idPage'),
                nameFrom: factory.name,
                to: idAgencyExport,
                nameTo: agencyName.name,
                idProduct: idProduct,
                amount: amountExport,
                description: description,
                status: 'Đang giao hàng',
            });
            if (res2.data.create) {
                window.location.reload();
                alert(res2.data.msg);
            }
        } catch (err) {
            console.log('Register failed: ' + err.message);
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
                <Button onClick={() => navigate('/factory')} variant="outlined" sx={{ margin: '10px 20px' }}>
                    <KeyboardArrowLeftOutlinedIcon />
                    Quay lại
                </Button>

                <TableContainer sx={{ marginTop: '10px' }} component={Paper}>
                    {rows.length > 0 ? (
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Mã Sản Phẩm</TableCell>
                                    <TableCell>Tên sản phẩm</TableCell>
                                    <TableCell>Số lượng</TableCell>
                                    <TableCell></TableCell>
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
                                            {row.code}
                                        </TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{getAmount(row._id)}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => {
                                                    setOpenModal(true);
                                                    setIdProduct(row._id);
                                                }}
                                            >
                                                Chuyển hàng
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <>
                            <Stack spacing={1} sx={{ padding: '0 10px' }}>
                                <Skeleton variant="rounded" width={'100%'} height={40} />
                                <Skeleton variant="rounded" width={'100%'} height={40} />
                                <Skeleton variant="rounded" width={'100%'} height={40} />
                                <Skeleton variant="rounded" width={'100%'} height={40} />
                                <Skeleton variant="rounded" width={'100%'} height={40} />
                                <Skeleton variant="rounded" width={'100%'} height={40} />
                            </Stack>
                        </>
                    )}
                </TableContainer>
            </Box>
            {/* Modal export amount product */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModal}
                onClose={() => setOpenModal(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModal}>
                    <Box sx={styleModal}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Nhập thông tin vận chuyển
                        </Typography>
                        <FormControl fullWidth sx={{ margin: '15px 0' }}>
                            <InputLabel id="demo-simple-select-label">Đại lý</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={idAgencyExport}
                                label="Đại lý"
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setIdAgencyExport(e.target.value);
                                }}
                            >
                                {agencies.map((agency) => {
                                    return (
                                        <MenuItem key={agency._id} value={agency._id}>
                                            {agency.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ margin: '15px 0' }}>
                            <InputLabel id="demo-simple-select-label">Mã sản phẩm</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={idProduct}
                                label="Mã sản phẩm"
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setIdProduct(e.target.value);
                                }}
                            >
                                {rows.map((row) => {
                                    return <MenuItem value={row._id}>{row.code}</MenuItem>;
                                })}
                            </Select>
                        </FormControl>
                        <TextField
                            sx={{ margin: '15px 0' }}
                            label="Số lượng"
                            variant="standard"
                            fullWidth
                            type="number"
                            value={amountExport}
                            onChange={(e) => setAmountExport(e.target.value)}
                        />
                        <TextField
                            sx={{ margin: '15px 0' }}
                            label="Ghi chú"
                            variant="standard"
                            fullWidth
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <Button
                            sx={{ marginTop: '10px' }}
                            variant="contained"
                            fullWidth
                            type="submit"
                            onClick={handleClickExport}
                        >
                            Giao hàng
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default FactoryExport;
