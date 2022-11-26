import './Product.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import { Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SendIcon from '@mui/icons-material/Send';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';

import { useEffect, useState } from 'react';
import axios from 'axios';

import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

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

function AdminProduct() {
    const [rows, setRows] = useState([]);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);

    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');


    const [id, setId] = useState('');

    // Get data
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get('http://localhost:3001/product/allProducts');
                setRows(res.data);
            } catch (err) {
                console.log('fe : ' + err.message);
            }
        };
        getData();
    }, []);

    // Create product
    const handleCreate = async () => {
        try {
            const res = await axios.post('http://localhost:3001/product/create', {
                code,
                name,
                description,
                image,
            });
            if (res.data.create) {
                window.location.reload();
                alert(res.data.msg);
            }
        } catch (err) {
            console.log('Register failed: ' + err.message);
        }
    };
    
    // update product
    const handleEdit = async () => {
        try {
            const res = await axios.post('http://localhost:3001/product/update', {
                id,
                code,
                name,
                description,
                image,
            });
            if (res.data.update) {
                window.location.reload();
                alert(res.data.msg);
            }
        } catch (err) {
            console.log('Register failed: ' + err.message);
        }
    };

    // delete product
    const handleDelete = async () => {
        try {
            const res = await axios.post('http://localhost:3001/product/delete', {
                id,
            });
            if (res.data.delete) {
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
                <Typography variant="h4" sx={{ margin: '10px', color: '#666' }}>
                    Products
                </Typography>

                {/* btn new user */}
                <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ margin: '10px' }}
                    onClick={() => {
                        setName('');
                        setCode('');
                        setImage('');
                        setDescription('');
                        setOpenModalCreate(true);
                    }}
                >
                    <AddCircleOutlineOutlinedIcon sx={{ marginRight: '5px' }} />
                    New
                </Button>

                <TableContainer sx={{ marginBottom: '40px' }} component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>STT</TableCell>
                                <TableCell>Code</TableCell>
                                <TableCell>Name</TableCell>
                                {/* <TableCell>Password</TableCell> */}
                                <TableCell align="center">Chỉnh sửa</TableCell>
                                <TableCell align="center">Xóa</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow
                                    id={row._id}
                                    className="row"
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell component="th" scope="row" sortDirection="desc">
                                        {row.code}
                                    </TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    {/* <TableCell size="small">{row.password}</TableCell> */}
                                    <TableCell
                                        align="center"
                                        onClick={() => {
                                            setOpenModalEdit(true);
                                            setId(row._id);
                                            setName(row.name);
                                            setCode(row.code);
                                            setDescription(row.description);
                                            setImage(row.image);
                                        }}
                                    >
                                        <Button variant="text">
                                            <EditOutlinedIcon />
                                            Edit
                                        </Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="text"
                                            color="error"
                                            onClick={() => {
                                                setOpenModalDelete(true);
                                                setId(row._id);
                                            }}
                                        >
                                            <DeleteSweepOutlinedIcon />
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            {/* Modal Create product */}
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
                            Create product
                        </Typography>
                        <ValidatorForm onSubmit={handleCreate}>
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={code}
                                label="Mã sản phẩm"
                                variant="standard"
                                color="secondary"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập mã sản phẩm']}
                                onChange={(e) => setCode(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={name}
                                label="Tên sản phẩm"
                                variant="standard"
                                color="secondary"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập tên sản phẩm']}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={description}
                                label="Mô tả"
                                variant="standard"
                                color="secondary"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập mô tả']}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={image}
                                label="Link image"
                                variant="standard"
                                color="secondary"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập địa chỉ ảnh']}
                                onChange={(e) => setImage(e.target.value)}
                            />
                            <Button
                                sx={{ marginTop: '10px' }}
                                variant="contained"
                                startIcon={<SendIcon />}
                                fullWidth
                                type="submit"
                            >
                                Tạo mới
                            </Button>
                        </ValidatorForm>
                    </Box>
                </Fade>
            </Modal>
            {/* Modal Edit Product*/}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModalEdit}
                onClose={() => setOpenModalEdit(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModalEdit}>
                    <Box sx={styleModal}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Edit User Admin
                        </Typography>
                        <ValidatorForm onSubmit={handleEdit}>
                        <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={code}
                                label="Mã sản phẩm"
                                variant="standard"
                                color="secondary"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập mã sản phẩm']}
                                onChange={(e) => setCode(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={name}
                                label="Tên sản phẩm"
                                variant="standard"
                                color="secondary"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập tên sản phẩm']}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={description}
                                label="Mô tả"
                                variant="standard"
                                color="secondary"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập mô tả']}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={image}
                                label="Link image"
                                variant="standard"
                                color="secondary"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập địa chỉ ảnh']}
                                onChange={(e) => setImage(e.target.value)}
                            />
                            <Button
                                sx={{ marginTop: '10px' }}
                                variant="contained"
                                startIcon={<SendIcon />}
                                fullWidth
                                type="submit"
                            >
                                Chỉnh sửa
                            </Button>
                        </ValidatorForm>
                    </Box>
                </Fade>
            </Modal>
            {/* Modal Delete */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModalDelete}
                onClose={() => setOpenModalDelete(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModalDelete}>
                    <Box sx={styleModal}>
                        <Typography sx={{ color: '#666' }} variant="h6" component="h2">
                            Delete User ?
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                marginTop: '20px',
                            }}
                        >
                            <Button variant="contained" onClick={() => setOpenModalDelete(false)}>
                                Close
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                sx={{ marginLeft: '10px' }}
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default AdminProduct;
