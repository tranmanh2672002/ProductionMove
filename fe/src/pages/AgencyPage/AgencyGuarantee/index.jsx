import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Skeleton, Stack, Typography } from '@mui/material';
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

function AgencyGuarantee() {
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();
    const [listProducts, setListProducts] = useState([]);
    const [listGuarantees, setListGuarantees] = useState([]);

    const [openModalCustomer, setOpenModalCustomer] = useState(false);
    const [idGuaranteeOrder, setIdGuaranteeOrder] = useState('');

    const [openModalGuarantee, setOpenModalGuarantee] = useState(false);
    const [idGuaranteeExport, setIdGuaranteeExport] = useState('');

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5001/agency/guaranteeOrder/${localStorage.getItem('idPage')}`,
                );
                const resGuarantees = await axios.get('http://localhost:5001/guarantee');
                if (resGuarantees) {
                    setListGuarantees(resGuarantees.data);
                    console.log(resGuarantees.data);
                }
                if (res) {
                    // console.log(res.data);
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

    const handleDeliveryGuarantee = async () => {
        // console.log(localStorage.getItem('idPage'), localStorage.getItem('name'), idGuaranteeExport, idGuaranteeOrder);
        // console.log(idGuaranteeExport);

        let guarantee = listGuarantees.find((guarantee) => {
            return guarantee._id === idGuaranteeExport;
        });

        try {
            const res = await axios.post('http://localhost:5001/delivery/createDeliveryByAgency', {
                from: localStorage.getItem('idPage'),
                nameFrom: localStorage.getItem('name'),
                to: idGuaranteeExport,
                nameTo: guarantee.name,
                idGuaranteeOrder: idGuaranteeOrder,
                status: '??ang giao h??ng',
            });
            if (res.data.create) {
                alert(res.data.msg);
                window.location.reload();
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleDeliveryCustomer = async () => {
        // console.log(idOrder);
        try {
            const res = await axios.put(`http://localhost:5001/agency/updateNotGuaranteeOrder/${idGuaranteeOrder}`);
            if (res.data.update) {
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
                    Quay l???i
                </Button>

                <TableContainer sx={{ marginTop: '10px' }} component={Paper}>
                    {rows.length > 0 ? (
                        <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell>M?? ????n h??ng</TableCell>
                                    <TableCell>T??n s???n ph???m</TableCell>
                                    <TableCell>L???i</TableCell>
                                    <TableCell>Th???i gian</TableCell>
                                    <TableCell></TableCell>
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
                                        <TableCell component="th" scope="row" sx={{ maxWidth: '200px' }}>
                                            {row.idOrder}
                                        </TableCell>
                                        <TableCell sx={{ maxWidth: '200px' }}>{getNameProduct(row.idOrder)}</TableCell>
                                        <TableCell>{row.error}</TableCell>
                                        <TableCell>{getDate(row.createdAt)}</TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => {
                                                    setIdGuaranteeOrder(row._id);
                                                    setOpenModalCustomer(true);
                                                }}
                                                variant="outlined"
                                                color="secondary"
                                            >
                                                Giao h??ng
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => {
                                                    setIdGuaranteeOrder(row._id);
                                                    setOpenModalGuarantee(true);
                                                }}
                                                variant="outlined"
                                                color="primary"
                                            >
                                                Trung t??m b???o h??nh
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <>
                            <Stack spacing={1} sx={{padding: '0 10px'}}>
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
            {/* Modal delivery customer */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModalCustomer}
                onClose={() => setOpenModalCustomer(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModalCustomer}>
                    <Box sx={styleModal}>
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{ textAlign: 'center' }}
                        >
                            Chuy???n h??ng cho kh??ch h??ng
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                            <Button
                                sx={{ marginTop: '10px' }}
                                color="secondary"
                                variant="contained"
                                type="submit"
                                onClick={() => setOpenModalCustomer(false)}
                            >
                                H???y b???
                            </Button>
                            <Button
                                sx={{ marginTop: '10px', marginLeft: '10px' }}
                                variant="contained"
                                type="submit"
                                onClick={handleDeliveryCustomer}
                            >
                                X??c nh???n
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
            {/* Modal delivery guarantee */}
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
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{ textAlign: 'center' }}
                        >
                            Chuy???n h??ng t???i trung t??m b???o h??nh
                        </Typography>
                        <FormControl fullWidth sx={{ margin: '15px 0' }}>
                            <InputLabel id="demo-simple-select-label">Trung t??m b???o h??nh</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={idGuaranteeExport}
                                label="Trung t??m b???o h??nh"
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setIdGuaranteeExport(e.target.value);
                                }}
                            >
                                {listGuarantees.map((guarantee) => {
                                    return (
                                        <MenuItem key={guarantee._id} value={guarantee._id}>
                                            {guarantee.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>

                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                            <Button
                                sx={{ marginTop: '10px' }}
                                color="secondary"
                                variant="contained"
                                type="submit"
                                onClick={() => setOpenModalGuarantee(false)}
                            >
                                H???y b???
                            </Button>
                            <Button
                                sx={{ marginTop: '10px', marginLeft: '10px' }}
                                variant="contained"
                                type="submit"
                                onClick={handleDeliveryGuarantee}
                            >
                                X??c nh???n
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default AgencyGuarantee;
