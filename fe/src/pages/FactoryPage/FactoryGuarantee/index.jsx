import { Box } from "@mui/system";

function FactoryGuarantee() {
    return ( <>
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
                <div style={{height: '1000px'}}>FactoryGuarantee</div>
            </Box>
    </> );
}

export default FactoryGuarantee;