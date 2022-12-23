import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

function AgencyImport() {
    const navigate = useNavigate();
    const [deliveries, setDeliveries] = useState([]);
    const [storage, setStorage] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/delivery/to/${localStorage.getItem('idPage')}`);
                const resStorage = await axios.get(`http://localhost:5001/agency/${localStorage.getItem('idPage')}`);
                const newDeliveries = res.data.filter((delivery) => {
                    return delivery.status !== 'Giao hàng thành công';
                });
                setDeliveries(newDeliveries);
                setStorage(resStorage.data.agency.storage);
            } catch (e) {
                console.log(e);
            }
        };
        getData();
    }, []);

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

    const handleClickAccept = async (idProduct, amountImport, idDelivery) => {
        // console.log(idDelivery);
        const rest = storage.filter((item) => {
            return item.id !== idProduct;
        });
        const productImport = storage.find((item) => {
            return item.id === idProduct;
        });
        var amount = Number(amountImport) + productImport.amount;

        try {
            await axios.post('http://localhost:5001/agency/updateAmount', {
                id: localStorage.getItem('idPage'),
                storage: [{ id: idProduct, amount: amount }, ...rest],
            });
            const res = await axios.put(`http://localhost:5001/delivery/updateStatus/${idDelivery}`, {
                status: 'Giao hàng thành công',
            });
            if (res.data.update) {
                window.location.reload();
                alert(res.data.msg);
            }
        } catch (err) {
            console.log(err.message);
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

                <Box
                    sx={{
                        margin: '10px 10px',
                    }}
                >
                    <Typography sx={{ color: '#666', fontWeight: '600' }} variant="span">
                        Đang vận chuyển:
                    </Typography>

                    <List
                        sx={{
                            Width: '100%',
                        }}
                    >
                        {deliveries.length !== 0 ? (
                            deliveries.map((delivery) => (
                                <ListItem
                                    key={delivery._id}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        padding: '5px',
                                        borderBottom: '1px solid #ccc',
                                    }}
                                >
                                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography sx={{ color: '#666', fontSize: '1rem' }} variant="span">
                                            {delivery.nameProduct}
                                        </Typography>
                                        <Typography sx={{ color: '#666', fontSize: '1rem' }} variant="span">
                                            Số lượng: {delivery.amount}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography sx={{ color: '#666', fontSize: '1rem' }} variant="span">
                                            Kho vận chuyển:
                                        </Typography>
                                        <Typography sx={{ color: '#666', fontSize: '1rem' }} variant="span">
                                            {delivery.nameFrom}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography sx={{ color: '#666', fontSize: '1rem' }} variant="span">
                                            Ngày giao hàng:
                                        </Typography>
                                        <Typography sx={{ color: '#666', fontSize: '1rem' }} variant="span">
                                            {getDate(delivery.createdAt)}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'right',
                                            margin: '10px 0',
                                        }}
                                    >
                                        <Button
                                            onClick={() =>
                                                handleClickAccept(delivery.idProduct, delivery.amount, delivery._id)
                                            }
                                            variant="contained"
                                            color="primary"
                                        >
                                            Đã nhận được hàng
                                        </Button>
                                    </Box>
                                </ListItem>
                            ))
                        ) : (
                            <>
                                <Typography sx={{ color: 'red', fontSize: '1.̉rem' }} variant="span">
                                    Không có vận chuyển
                                </Typography>
                            </>
                        )}
                    </List>
                </Box>
            </Box>
        </>
    );
}

export default AgencyImport;
