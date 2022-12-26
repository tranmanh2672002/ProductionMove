import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

function AgencyDelivery() {
    const [deliveries, setDeliveries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/delivery/from/${localStorage.getItem('idPage')}`);
                // console.log(res.data);
                setDeliveries(res.data.reverse());
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
                        {deliveries.map((delivery) => (
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
                                        Mã bảo hành
                                    </Typography>
                                    <Typography sx={{ color: '#666', fontSize: '1rem' }} variant="span">
                                        {delivery.idGuaranteeOrder}
                                    </Typography>
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography sx={{ color: '#666', fontSize: '1rem' }} variant="span">
                                        Vận chuyển đến
                                    </Typography>
                                    <Typography sx={{ color: '#666', fontSize: '1rem' }} variant="span">
                                        {delivery.nameTo}
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
                                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography sx={{ color: '#666', fontSize: '1rem' }} variant="span">
                                        Trạng thái:
                                    </Typography>
                                    <Typography sx={{ color: 'blue', fontSize: '1rem' }} variant="span">
                                        {delivery.status}
                                    </Typography>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        </>
    );
}

export default AgencyDelivery;
