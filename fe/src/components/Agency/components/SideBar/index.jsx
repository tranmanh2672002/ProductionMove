import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './SideBar.scss';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';


function SideBarAgency() {
    return (
        <>
            <Box
                sx={{
                    height: '100vh',
                    backgroundColor: '#3c4b64',
                    width: 'var(--default-layout-width-sidebar)',
                    float: 'left',
                }}
            >
                <Box
                    sx={{
                        backgroundColor: '#303c54',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 'var(--default-layout-height-header)',
                        marginBottom: '20px'
                    }}
                >
                    <Typography variant="h4" sx={{}}>
                        Agency
                    </Typography>
                </Box>
                <Box
                    sx={{
                        color: '#fff',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 'var(--default-layout-height-header)',
                    }}
                >
                    <NavLink to="/agency/product" className="SideBarAgency__link">
                        <Inventory2OutlinedIcon className="SideBarAgency__link-icon" />
                        Sản phẩm
                    </NavLink>
                    <NavLink to="/agency/storage" className="SideBarAgency__link">
                        <AccountBalanceOutlinedIcon className="SideBarAgency__link-icon" />
                        Quản lý Kho
                    </NavLink>
                    <NavLink to="/agency/import" className="SideBarAgency__link">
                        <FileDownloadOutlinedIcon className="SideBarAgency__link-icon" />
                        Nhập hàng
                    </NavLink>
                    <NavLink to="/agency/sold" className="SideBarAgency__link">
                        <FileUploadOutlinedIcon className="SideBarAgency__link-icon" />
                        SP đã bán
                    </NavLink>
                    <NavLink to="/agency/guarantee" className="SideBarAgency__link">
                        <WorkspacePremiumOutlinedIcon className="SideBarAgency__link-icon" />
                        Sản Phẩm bảo hành
                    </NavLink>
                    <NavLink to="/agency/delivery" className="SideBarAgency__link">
                        <LocalShippingOutlinedIcon className="SideBarAgency__link-icon" />
                        Vận chuyển
                    </NavLink>
                    
                </Box>
            </Box>
        </>
    );
}

export default SideBarAgency;
