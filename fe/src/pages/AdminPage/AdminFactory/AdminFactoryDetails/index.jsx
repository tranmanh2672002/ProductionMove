import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function FactoryDetails() {
    const { id } = useParams();
    const [rows, setRows] = useState([]);
    const [storage, setStorage] = useState([]);
    const navigate = useNavigate();

    const getAmount = (id) => {
        var result = storage.find((item) => {
          return item.id === id;
        });
        return result.amount;
      };

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/factory/${id}`);
                setRows(res.data.products);
                setStorage(res.data.factory.storage);

            } catch (err) {
                console.error(err);
            }
        };
        getData();
    }, [id]);

    // console.log(amounts.storage);

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
                <Button onClick={() => navigate('/admin/factory')} variant='outlined' sx={{ margin: '10px',}}>
                    <KeyboardArrowLeftOutlinedIcon />
                    Quay lại
                </Button>

                <TableContainer sx={{ padding: '40px 20px' }} component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>STT</TableCell>
                                <TableCell>Mã Sản Phẩm</TableCell>
                                <TableCell>Tên sản phẩm</TableCell>
                                {/* <TableCell>Password</TableCell> */}
                                <TableCell>Số lượng</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow
                                    id={row._id}
                                    className="row"
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell component="th" scope="row" sortDirection="desc">
                                        {row.code}
                                    </TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{getAmount(row._id)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

        </>
    );
}

export default FactoryDetails;
