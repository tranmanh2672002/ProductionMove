import { Avatar, Box, Button, Typography } from '@mui/material';
import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';
import './TopBar.scss';
import { Link, useNavigate } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import avatar from '~/assets/image/guarantee.png';

function TopBarGuarantee() {
    // open profile user
    const [visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    const navigate = useNavigate();

    const handleClickLogout = () => {
        localStorage.setItem('role', '');
        localStorage.setItem('id', '');
        localStorage.setItem('name', '');
        navigate('/');
        window.location.reload();
    };

    return (
        <>
            <Box
                sx={{
                    padding: '0 20px',
                    backgroundColor: '#fff',
                    borderBottom: '1px solid #ccc',
                    float: 'top',
                    height: 'var(--default-layout-height-header)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Link to="/guarantee">
                    <Button
                        sx={{ color: '#666', fontSize: '16px', display: 'flex', alignItems: 'flex-start' }}
                        color="secondary"
                    >
                        <HomeOutlinedIcon />
                        Trang chủ
                    </Button>
                </Link>
                <Tippy
                    interactive
                    visible={visible}
                    onClickOutside={hide}
                    placement="bottom-end"
                    render={(attrs) => (
                        <div className="user__profile" tabIndex="-1" {...attrs}>
                            <Box
                                sx={{
                                    padding: '12px 20px',
                                    borderBottom: '1px solid #ccc',
                                    minWidth: '200px',
                                }}
                            >
                                <Typography sx={{ fontSize: '0.875rem' }} variant="h6">
                                    User
                                </Typography>
                                <Typography sx={{ fontSize: '0.875rem', color: 'rgb(99, 115, 129)' }} variant="h6">
                                    {localStorage.getItem('email')}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    padding: '5px 20px',
                                    borderBottom: '1px solid #ccc',
                                }}
                            >
                                <Button variant="text" fullWidth onClick={handleClickLogout}>
                                    Đăng xuất
                                </Button>
                            </Box>
                        </div>
                    )}
                >
                    <Avatar
                        className="user__avatar"
                        onClick={visible ? hide : show}
                        src={avatar}
                    />
                </Tippy>
            </Box>
        </>
    );
}

export default TopBarGuarantee;
