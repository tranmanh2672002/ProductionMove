import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Factory() {

    const [factory, setFactory] = useState();

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/factory/${localStorage.getItem('idPage')}`);
                setFactory(res.data.factory);
            } catch (e) {
                console.error(e);
            }
        };
        getData();
    }, []);

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
                {factory ? (
                    <Box sx={{margin: '20px 10px'}}>
                        <Typography sx={{color: '#666', marginTop: '10px'}} variant="h4">Name: {factory.name}</Typography>
                        <Typography sx={{color: '#666', marginTop: '10px'}} variant="h4">Address: {factory.address}</Typography>
                        <Typography sx={{color: '#666', marginTop: '10px'}} variant="h4">Hoạt động: Thứ 2 - Thứ 7 (7h -22h)   </Typography>

                    </Box>
                ) : (
                    <></>
                )}
            </Box>
        </>
    );
}

export default Factory;
