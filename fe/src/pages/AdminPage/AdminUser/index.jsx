import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import adminImage from '~/assets/image/admin.jpg';
import agencyImage from '~/assets/image/agency.jpg';
import factoryImage from '~/assets/image/factory.png';
import guaranteeImage from '~/assets/image/guarantee.png';

function AdminUser() {
    const navigate = useNavigate();

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
                <Box sx={{ display: 'flex', justifyContent: 'center', margin: '40px 0' }}>
                    <Card
                        sx={{ maxWidth: 345, margin: '0 20px' }}
                        onClick={() => {
                            navigate('/admin/adminUsers');
                        }}
                    >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="200"
                                image={adminImage}
                                alt="Image"
                                backgroundColor="black"
                            />
                            <CardContent>
                                <Typography sx={{ textAlign: 'center', fontSize: '1rem' }} gutterBottom variant="h7" component="div">
                                    Tài Khoản Admin
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card
                        sx={{ maxWidth: 345, margin: '0 20px' }}
                        onClick={() => {
                            navigate('/admin/factoryUsers');
                        }}
                    >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="200"
                                image={factoryImage}
                                alt="Image"
                                backgroundColor="black"
                            />
                            <CardContent>
                                <Typography sx={{ textAlign: 'center', fontSize: '1rem' }} gutterBottom variant="h7" component="div">
                                    Tài Khoản Kho sản xuất
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card
                        sx={{ maxWidth: 345, margin: '0 20px' }}
                        onClick={() => {
                            navigate('/admin/agencyUsers');
                        }}
                    >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="200"
                                image={agencyImage}
                                alt="Image"
                                backgroundColor="black"
                            />
                            <CardContent>
                                <Typography sx={{ textAlign: 'center', fontSize: '1rem' }} gutterBottom variant="h7" component="div">
                                    Tài Khoản Đại lý
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card
                        sx={{ maxWidth: 345, margin: '0 20px' }}
                        onClick={() => {
                            navigate('/admin/guaranteeUsers');
                        }}
                    >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="200"
                                image={guaranteeImage}
                                alt="Image"
                                backgroundColor="black"
                            />
                            <CardContent>
                                <Typography sx={{ textAlign: 'center', fontSize: '1rem' }} gutterBottom variant="h7" component="div">
                                    Tài Khoản Bảo Hành
                                </Typography>
                            </CardContent>
                            
                        </CardActionArea>
                    </Card>
                </Box>
            </Box>
        </>
    );
}

export default AdminUser;
