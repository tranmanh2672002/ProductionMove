import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, TextField, Typography } from '@mui/material';
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

function FactoryImport() {
    const [rows, setRows] = useState([]);
    const [storage, setStorage] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const [idProduct, setIdProduct] = useState('');
    const [amountImport, setAmountImport] = useState(0);

    const navigate = useNavigate();

    const getAmount = (id) => {
        var result = storage.find((item) => {
            return item.id === id;
        });
        return result.amount;
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/factory/${localStorage.getItem('idPage')}`);
                setRows(res.data.products);
                setStorage(res.data.factory.storage);
            } catch (err) {
                console.error(err);
            }
        };
        getData();
    }, []);

    const handleClickImport = async () => {
        const rest = storage.filter(item => {
            return item.id !== idProduct;
        })
        var amount = Number(amountImport) + getAmount(idProduct);

        try {
            const res = await axios.post('http://localhost:5001/factory/updateAmount', {
                id: localStorage.getItem('idPage'),
                storage: [{id: idProduct, amount: amount}, ...rest],
            });
            if (res.data.update) {
                window.location.reload();
                alert(res.data.msg);
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

                <TableContainer sx={{marginTop: '10px'}} component={Paper}>
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
                                            Nhập hàng
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            {/* Modal import amount product */}
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
                            Nhập số lượng sản phẩm
                        </Typography>
                        <TextField
                            sx={{ margin: '15px 0' }}
                            label= "Số lượng"
                            variant="standard"
                            fullWidth
                            type="number"
                            value={amountImport}
                            onChange={(e) => setAmountImport(e.target.value)}
                        />
                        <Button
                            sx={{ marginTop: '10px' }}
                            variant="contained"
                            fullWidth
                            type="submit"
                            onClick={handleClickImport}
                        >
                            Nhập hàng
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default FactoryImport;
