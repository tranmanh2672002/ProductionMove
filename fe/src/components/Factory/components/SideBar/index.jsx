import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './SideBar.scss';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

function SideBarFactory() {
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
                        Factory
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
                    <NavLink to="/factory/storage" className="SideBarFactory__link">
                        <AccountBalanceOutlinedIcon className="SideBarFactory__link-icon" />
                        Quản lý Kho
                    </NavLink>
                    <NavLink to="/factory/import" className="SideBarFactory__link">
                        <FileDownloadOutlinedIcon className="SideBarFactory__link-icon" />
                        Nhập hàng
                    </NavLink>
                    <NavLink to="/factory/export" className="SideBarFactory__link">
                        <FileUploadOutlinedIcon className="SideBarFactory__link-icon" />
                        Chuyển hàng
                    </NavLink>
                    <NavLink to="/factory/guarantee" className="SideBarFactory__link">
                        <WorkspacePremiumOutlinedIcon className="SideBarFactory__link-icon" />
                        Sản Phẩm lỗi
                    </NavLink>
                    
                </Box>
            </Box>
        </>
    );
}

export default SideBarFactory;
