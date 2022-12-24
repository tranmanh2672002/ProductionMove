import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import factoryLogo from '~/assets/image/factorylogo.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminFactory() {
    const navigate = useNavigate();
    const [factories, setFactories] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get('http://localhost:5001/factory');
                setFactories(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        getData();
    }, []);

    return (
        <>
            <>
                <Box
                    id="style-2"
                    sx={{
                        width: 'calc(100% - var(--default-layout-width-sidebar))',
                        height: 'calc(100vh - var(--default-layout-height-header))',
                        float: 'right',
                        overflowY: 'scroll',
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'center', margin: '40px 0' }}>
                        {factories.map((factory) => {
                            return (
                                <Card
                                    key={factory._id}
                                    sx={{ maxWidth: 345, margin: '0 20px' }}
                                    onClick={() => {
                                        navigate(`/admin/factory/${factory._id}`);
                                    }}
                                >
                                    <CardActionArea>
                                        <CardMedia component="img" height="250" image={factoryLogo} alt="Image" />
                                        <CardContent>
                                            <Typography
                                                sx={{ textAlign: 'center', fontSize: '1.2rem' }}
                                                gutterBottom
                                                variant="h4"
                                                component="div"
                                            >
                                                {factory.name}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            );
                        })}
                    </Box>
                </Box>
            </>
        </>
    );
}

export default AdminFactory;
