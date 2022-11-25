import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './SideBar.scss';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';

function SideBarAdmin() {
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
                        ADMIN
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
                    <NavLink to="/admin/factory" className="SideBarAdmin__link">
                        <FactoryOutlinedIcon className="SideBarAdmin__link-icon" />
                        Cơ sở sản xuất
                    </NavLink>
                    <NavLink to="/admin/agency" className="SideBarAdmin__link">
                        <StoreOutlinedIcon className="SideBarAdmin__link-icon" />
                        Quản lý Đại lý
                    </NavLink>
                    <NavLink to="/admin/guarantee" className="SideBarAdmin__link">
                        <WorkspacePremiumOutlinedIcon className="SideBarAdmin__link-icon" />
                        Trung tâm bảo hành
                    </NavLink>
                    <NavLink to="/admin/user" className="SideBarAdmin__link">
                        <ManageAccountsOutlinedIcon className="SideBarAdmin__link-icon" />
                        Quản lý tài khoản
                    </NavLink>
                </Box>
            </Box>
        </>
    );
}

export default SideBarAdmin;
