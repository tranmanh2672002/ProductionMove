import { Box, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import adminImage from '~/assets/image/adminlogo.jpg';

function Admin() {
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
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'center', margin: '40px 0' }}>
                        <Card sx={{ maxWidth: 750, margin: '0 20px' }}>
                                <CardContent>
                                    <Typography
                                        sx={{ marginTop: '10px', textAlign: 'center', fontSize: '1.6rem', fontWeight: '500' }}
                                        gutterBottom
                                        variant="h7"
                                        component="div"
                                    >
                                        BigCorp
                                    </Typography>
                                    <Typography
                                        sx={{ marginTop: '10px', textAlign: 'center', fontSize: '1.4rem', fontWeight: '400' }}
                                        gutterBottom
                                        variant="h7"
                                        component="div"
                                    >
                                        Hệ thống quản lý vòng đời sản phẩm
                                    </Typography>
                                    
                                </CardContent>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={adminImage}
                                    alt="Image"
                                    backgroundColor="black"
                                />
                        </Card>
                    </Box>
                </>
            </Box>
        </>
    );
}

export default Admin;
