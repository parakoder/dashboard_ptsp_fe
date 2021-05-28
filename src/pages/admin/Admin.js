import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { AppContext } from '../../services/context/Context';
import {
    withStyles,
    Theme,
    createStyles,
    makeStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import './admin.scss';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#5f764f',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(even)': {
            backgroundColor: '#dfe4db',
        },
    },
}))(TableRow);

function createData(
    noUrut,
    noAntrean,
    counter,
    jamKunjungan,
    jamDilayani,
    lamaMenunggu,
    lamaPelayanan
) {
    return {
        noUrut,
        noAntrean,
        counter,
        jamKunjungan,
        jamDilayani,
        lamaMenunggu,
        lamaPelayanan,
    };
}

const rows = [
    createData(110, 'J 79', 2, '14:20', '14:23', '00:03', '00:20'),
    createData(110, 'J 79', 2, '14:20', '14:23', '00:03', '00:20'),
    createData(110, 'J 79', 2, '14:20', '14:23', '00:03', '00:20'),
    createData(110, 'J 79', 2, '14:20', '14:23', '00:03', '00:20'),
    createData(110, 'J 79', 2, '14:20', '14:23', '00:03', '00:20'),
    createData(110, 'J 79', 2, '14:20', '14:23', '00:03', '00:20'),
    createData(110, 'J 79', 2, '14:20', '14:23', '00:03', '00:20'),
    createData(110, 'J 79', 2, '14:20', '14:23', '00:03', '00:20'),
];

const useStyles = makeStyles({
    table: {
        minWidth: 700,
        position: 'sticky',
        top: 0,
    },
});

const Admin = () => {
    const classes = useStyles();
    const { state, fun } = useContext(AppContext);
    const { authContext } = fun;

    const [showModalLogout, setShowModalLogout] = useState(false);

    const handleClickOpen = () => {
        setShowModalLogout(true);
    };

    const handleClose = () => {
        setShowModalLogout(false);
    };

    return (
        <div className='container-admin'>
            <div className='header-admin'>
                <div className='header-logo'>
                    <img
                        src={require('../../assets/img_logo.png').default}
                        alt='logo.png'
                        className='header-logo-img'
                    />
                    <div className='header-logo-text'>
                        Dashboard Management Loket
                    </div>
                </div>
                <div className='button-logout' onClick={handleClickOpen}>
                    Keluar
                </div>
                <Dialog
                    open={showModalLogout}
                    onClose={handleClose}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                >
                    <div className='dialog-logout'>
                        <div className='t18b'>Keluar</div>
                        <div
                            style={{ textAlign: 'center', margin: '20px 0px' }}
                        >
                            Apa Anda yakin ingin keluar dari Dashboard Dashboard
                            Management Loket?
                        </div>
                        <div
                            className='flexrowaround'
                            style={{ width: '100%' }}
                        >
                            <div
                                className='button-yes-red'
                                onClick={() => authContext.signOut()}
                            >
                                Ya, Keluar
                            </div>
                            <div
                                className='button-cancel-white'
                                onClick={() => setShowModalLogout(false)}
                            >
                                Cancel
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
            <div style={{ height: 40, backgroundColor: '#f5f5f5' }} />
            <div className='content-admin'>
                <div className='content-cards'>
                    <Card className='content-cards-1'>
                        <div className='content-cards-1-body'>
                            <div className='card-info'>
                                <div className='t18b'>Informasi Loket</div>
                                <div style={{ height: 18 }} />
                                <div>ID Loket</div>
                                <div style={{ fontWeight: 'bold' }}>J0003</div>
                                <div style={{ height: 18 }} />
                                <div>Nama Loket</div>
                                <div style={{ fontWeight: 'bold' }}>
                                    Pengaduan dan Informasi
                                </div>
                            </div>
                            <div className='card-info'>
                                <div className='t18b'>Kode Antrean Online</div>
                                <div style={{ height: 18 }} />
                                <div className='card-loket'>J 80</div>
                                <div className='content-cards-1-footer'>
                                    <Button className='button-control-admin'>
                                        Panggil
                                    </Button>
                                    <Button className='button-control-admin'>
                                        Selanjutnya
                                    </Button>
                                </div>
                            </div>
                            <div className='card-info'>
                                <div className='t18b' style={{ opacity: 0.5 }}>
                                    Kode Antrean Manual
                                </div>
                                <div style={{ height: 18 }} />
                                <div className='card-loket-disabled'>J 80</div>
                                <div className='content-cards-1-footer'>
                                    <Button className='button-control-admin-disabled'>
                                        Panggil
                                    </Button>
                                    <Button className='button-control-admin-disabled'>
                                        Selanjutnya
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <div className='content-cards-2'>
                        <div className='flexrowbetween'>
                            <div className='t18b'>Rekapitulasi Antrean</div>
                            <div className='button-export'>Cetak Laporan</div>
                        </div>
                        <div style={{ height: 20 }} />
                        <div className='content-cards-2-body'>
                            <Card className='content-cards-2-card'>
                                <div className='t12sb'>Antrean Berlangsung</div>
                                <div
                                    className='t40b'
                                    style={{ margin: '20px 0px' }}
                                >
                                    6
                                </div>
                            </Card>
                            <Card className='content-cards-2-card'>
                                <div className='t12sb'>Antrean Selesai</div>
                                <div
                                    className='t40b'
                                    style={{ margin: '20px 0px' }}
                                >
                                    6
                                </div>
                            </Card>
                            <Card className='content-cards-2-card'>
                                <div className='t12sb'>Total Antrean</div>
                                <div
                                    className='t40b'
                                    style={{ margin: '20px 0px' }}
                                >
                                    6
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className='content-table'>
                    <div className='t18b'>Riwayat Pelayanan</div>
                    <div style={{ height: 15 }} />
                    <TableContainer
                        component={Paper}
                        style={{ maxHeight: '70%' }}
                    >
                        <Table
                            stickyHeader
                            className={classes.table}
                            aria-label='customized table'
                        >
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align='center'>
                                        No. Urut
                                    </StyledTableCell>
                                    <StyledTableCell align='center'>
                                        Nomor Antrean
                                    </StyledTableCell>
                                    <StyledTableCell align='center'>
                                        Counter
                                    </StyledTableCell>
                                    <StyledTableCell align='center'>
                                        Jam Kunjungan
                                    </StyledTableCell>
                                    <StyledTableCell align='center'>
                                        Jam Dilayani
                                    </StyledTableCell>
                                    <StyledTableCell align='center'>
                                        Lama Menunggu
                                    </StyledTableCell>
                                    <StyledTableCell align='center'>
                                        Lama Pelayanan
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow key={row.noUrut}>
                                        <StyledTableCell
                                            component='th'
                                            scope='row'
                                        >
                                            {row.noUrut}
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>
                                            {row.noAntrean}
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>
                                            {row.counter}
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>
                                            {row.jamKunjungan}
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>
                                            {row.jamDilayani}
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>
                                            {row.lamaMenunggu}
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>
                                            {row.lamaPelayanan}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* <div onClick={() => authContext.signOut()}>Logout</div> */}
                </div>
            </div>
        </div>
    );
};

export default withRouter(Admin);
