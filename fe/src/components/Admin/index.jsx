import { Box } from '@mui/material';

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
                <div style={{height: '1000px'}}></div>
            </Box>
        </>
    );
}

export default Admin;
