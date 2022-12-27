import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Skeleton, Stack } from '@mui/material';
import agencyLogo from '~/assets/image/agencylogo.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminAgency() {
    const navigate = useNavigate();
    const [agencies, setAgencies] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get('http://localhost:5001/agency');
                setAgencies(res.data);
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
                        backgroundColor: '#fff',
                        width: 'calc(100% - var(--default-layout-width-sidebar))',
                        height: 'calc(100vh - var(--default-layout-height-header))',
                        float: 'right',
                        overflowY: 'scroll',
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'center', margin: '40px 0' }}>
                        {agencies.length > 0 ? (
                            agencies.map((agency) => {
                                return (
                                    <>
                                        <Card
                                            key={agency._id}
                                            sx={{ maxWidth: 345, margin: '0 20px' }}
                                            onClick={() => {
                                                navigate(`/admin/agency/${agency._id}`);
                                            }}
                                        >
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    height="250"
                                                    image={agencyLogo}
                                                    alt="Image"
                                                />
                                                <CardContent>
                                                    <Typography
                                                        sx={{ textAlign: 'center', fontSize: '1.2rem' }}
                                                        gutterBottom
                                                        variant="h4"
                                                        component="div"
                                                    >
                                                        {agency.name}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </>
                                );
                            })
                        ) : (
                            <>
                                <Stack spacing={3} direction="row">
                                    <Skeleton variant="rounded" width={250} height={300} />
                                    <Skeleton variant="rounded" width={250} height={300} />
                                    <Skeleton variant="rounded" width={250} height={300} />
                                    <Skeleton variant="rounded" width={250} height={300} />
                                </Stack>
                            </>
                        )}
                    </Box>
                </Box>
            </>
        </>
    );
}

export default AdminAgency;
