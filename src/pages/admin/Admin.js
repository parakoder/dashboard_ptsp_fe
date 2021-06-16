import React, { useState, useContext, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { AppContext } from '../../services/context/Context';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DatePicker from 'react-datepicker';
import { FiDownload } from 'react-icons/fi';
import { RiCalendar2Line } from 'react-icons/ri';
import { IoMdClose } from 'react-icons/io';
import moment from 'moment';
import Modals from '../../components/Modals';

import './admin.scss';
import { CardHandler } from '../../services/handler/CardHandler';
import { ProfileHandler } from '../../services/handler/ProfileHandler';
import { QueueHandler } from '../../services/handler/QueueHandler';
import { ExportData } from '../../services/handler/ExportHandler';
import { CallHandler, NextHandler } from '../../services/handler/ButtonHandler';
import { VoiceList } from '../../services/utils/voicelist';

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

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
        position: 'sticky',
        top: 0,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
    },
}));

const Admin = () => {
    const audioRef = useRef(null);
    const classes = useStyles();
    const { state, fun } = useContext(AppContext);
    const { authContext } = fun;

    const [showModalLogout, setShowModalLogout] = useState(false);
    const [showModalExport, setShowModalExport] = useState(false);

    const handleClickOpen = () => {
        setShowModalLogout(true);
    };

    const handleClose = () => {
        setShowModalLogout(false);
    };

    const handleClickExport = () => {
        setShowModalExport(true);
    };

    const handleCloseExport = () => {
        setShowModalLogout(false);
    };

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [formattedStartDate, setFormattedStartDate] = useState('');
    const [formattedEndDate, setFormattedEndDate] = useState('');

    const onChangeDate = (type, date) => {
        // const [start, end] = dates;

        if (type === 'startDate') {
            var formatStart = moment(date).format('yyyy-MM-DD').toString();
            setFormattedStartDate(formatStart);
            setStartDate(date);
        } else {
            var formatEnd = moment(date).format('yyyy-MM-DD').toString();
            setFormattedEndDate(formatEnd);
            setEndDate(date);
        }
    };

    const onClearFilter = () => {
        setStartDate('');
        setEndDate('');
    };

    // console.log(
    //     'localstorage',
    //     JSON.parse(localStorage.getItem('@user_dashboard_ptsp'))
    // );
    const dataStorage = JSON.parse(
        localStorage.getItem('@user_dashboard_ptsp')
    );

    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        GetProfileData();
    }, []);

    const GetProfileData = () => {
        ProfileHandler(dataStorage.userName)
            .then((res) => {
                console.log('res profile', res);
                if (res.status === 200) {
                    setProfileData(res.data);
                }
            })
            .catch((err) => {
                console.log('err profile', err);
            });
    };

    const [cardData, setCardData] = useState(null);

    useEffect(() => {
        GetCardData();
    }, []);

    const GetCardData = () => {
        CardHandler(dataStorage.loketID)
            .then((res) => {
                console.log('res card', res);
                if (res.status === 200) {
                    setCardData(res.data);
                }
            })
            .catch((err) => {
                console.log('err card', err);
            });
    };

    const [queueData, setQueueData] = useState([]);

    useEffect(() => {
        GetQueueData();
    }, []);

    const GetQueueData = () => {
        QueueHandler(dataStorage.loketID)
            .then((res) => {
                console.log('res queue', res);
                setQueueData(res.data);
            })
            .catch((err) => {
                console.log('err queue', err);
            });
    };

    const [fileNameExport, setFileNameExport] = useState('');

    const ExportFunction = () => {
        if (formattedStartDate === '' || formattedEndDate === '') {
            alert('Mohon isi Tanggal');
        }

        if (fileNameExport.length === 0) {
            alert('Mohon isi nama file');
        }

        if (startDate === '' || endDate === '') {
            alert('Mohon isi Tanggal');
        }

        if (
            fileNameExport.length > 0 &&
            formattedStartDate !== '' &&
            formattedEndDate !== '' &&
            startDate !== '' &&
            endDate !== ''
        ) {
            ExportData(formattedStartDate, formattedEndDate)
                .then((res) => {
                    // if (res.status)
                    console.log('res export', res);
                    const url = window.URL.createObjectURL(
                        new Blob([res.data])
                    );
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute(
                        'download',
                        `${fileNameExport} (${formattedStartDate}-${formattedEndDate}).xlsx`
                    );
                    document.body.appendChild(link);
                    link.click();
                })
                .catch((err) => console.log('err export', err));
        }
    };

    const [audioIndex, setAudioIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const [audioArr, setAudioArr] = useState([]);

    const getCall = () => {
        setIsPlaying(true);
        CallHandler(dataStorage.loketID)
            .then((res) => {
                console.log('res call', res);
                let arrVoice = [];
                if (res.status === 200) {
                    setAudioIndex(0);

                    res.data.map((data) => {
                        console.log('dataaaa mp3', data);
                        // let item = `/public/voice/${data}.mp3`;
                        let item = VoiceList.find((o) => o.name === data);
                        console.log('itemm', item);
                        if (item !== undefined) {
                            return arrVoice.push(item.path);
                        }
                    });
                    console.log('arrVoice', arrVoice);
                    setAudioArr(arrVoice);
                    audioRef.current.play();
                    if (
                        audioRef.current.duration === 0 &&
                        !audioRef.current.paused
                    ) {
                        setIsPlaying(false);
                    }
                }
            })
            .catch((err) => {
                console.log('err call', err);
                audioRef.current.pause();
                setIsPlaying(false);
            });
    };

    const handlePause = () => {
        audioRef.current.pause();

        setIsPlaying(false);
    };

    const nextHandler = () => {
        NextHandler(dataStorage.loketID)
            .then((res) => {
                console.log('res next', res);
                if (res.status === 200) {
                    GetCardData();
                    GetProfileData();
                    GetQueueData();
                }
            })
            .catch((err) => {
                console.log('error next', err);
            });
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
            </div>
            <Modals open={showModalLogout} onClose={handleClose}>
                <div className='dialog-logout'>
                    <div className='t18b'>Keluar</div>
                    <div className='desc-dialog-logout'>
                        Apa Anda yakin ingin keluar dari Dashboard Dashboard
                        Management Loket?
                    </div>
                    <div className='flexrowaround' style={{ width: '100%' }}>
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
            </Modals>
            <div style={{ height: 40, backgroundColor: '#f5f5f5' }} />
            <div className='content-admin'>
                <div className='content-cards'>
                    <Card className='content-cards-1'>
                        <div className='content-cards-1-body'>
                            <div
                                className='card-info'
                                style={{ marginBottom: 20 }}
                            >
                                <div className='t18b'>Informasi Loket</div>
                                <div style={{ height: 18 }} />
                                <div>ID Loket</div>
                                <div style={{ fontWeight: 'bold' }}>
                                    {profileData && profileData.loketID}
                                </div>
                                <div style={{ height: 18 }} />
                                <div>Nama Loket</div>
                                <div style={{ fontWeight: 'bold' }}>
                                    {profileData && profileData.namaPelayanan}
                                </div>
                            </div>
                            <div className='card-info'>
                                <div className='t18b'>Kode Antrean Online</div>
                                <div style={{ height: 18 }} />
                                <div className='card-loket'>
                                    {cardData && cardData.noAntrian}
                                </div>
                                <div className='content-cards-1-footer'>
                                    <audio
                                        autoPlay
                                        controls={true}
                                        preload='auto'
                                        style={{ display: 'none' }}
                                        ref={audioRef}
                                        src={audioArr[audioIndex]}
                                        onEnded={() => {
                                            setAudioIndex((i) => i + 1);
                                            if (
                                                audioIndex ===
                                                audioArr.length - 1
                                            ) {
                                                setIsPlaying(false);
                                            }
                                        }}
                                    />
                                    {isPlaying ? (
                                        <Button
                                            className='button-control-admin'
                                            onClick={handlePause}
                                        >
                                            ||
                                        </Button>
                                    ) : (
                                        <Button
                                            className='button-control-admin'
                                            onClick={getCall}
                                        >
                                            Panggil
                                        </Button>
                                    )}
                                    <Button
                                        className='button-control-admin'
                                        onClick={nextHandler}
                                    >
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
                            <div
                                className='button-export'
                                onClick={handleClickExport}
                            >
                                Cetak Laporan
                            </div>
                        </div>
                        <Modals
                            open={showModalExport}
                            onClose={handleCloseExport}
                        >
                            <div className='dialog-export'>
                                <div className='t18b'>Cetak Laporan</div>
                                <div className='desc-dialog-export'>
                                    <div className='desc-dialog-export-content'>
                                        Simpan Sebagai
                                    </div>
                                    <div className='desc-dialog-export-button'>
                                        XLS
                                    </div>
                                </div>
                                <div className='desc-dialog-export'>
                                    <div className='desc-dialog-export-content'>
                                        Rentang Tanggal
                                    </div>
                                    <div className='wrapperFilter-date'>
                                        <RiCalendar2Line />
                                        <DatePicker
                                            className='filter-date'
                                            monthsShown={2}
                                            selected={startDate}
                                            onChange={(date) =>
                                                onChangeDate('startDate', date)
                                            }
                                            // startDate={startDate}
                                            // endDate={endDate}
                                            // selectsRange
                                            dateFormat='dd MMM'
                                            placeholderText={'1 Jan'}
                                            popperPlacement='bottom-end'
                                        ></DatePicker>
                                        <div>-</div>
                                        <DatePicker
                                            className='filter-date'
                                            monthsShown={2}
                                            selected={endDate}
                                            onChange={(date) =>
                                                onChangeDate('endDate', date)
                                            }
                                            // startDate={startDate}
                                            // endDate={endDate}
                                            // selectsRange
                                            dateFormat='dd MMM'
                                            placeholderText='31 Des'
                                            popperPlacement='bottom-end'
                                        />
                                        {startDate !== '' || endDate !== '' ? (
                                            <IoMdClose
                                                color='red'
                                                size={20}
                                                onClick={onClearFilter}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                                <div className='desc-dialog-export'>
                                    <div className='desc-dialog-export-content'>
                                        Nama File
                                    </div>
                                    <div className='desc-dialog-export-button'>
                                        <input
                                            className='export-input'
                                            placeholder='Laporan'
                                            value={fileNameExport}
                                            onChange={(e) =>
                                                setFileNameExport(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div
                                    className='flexrowaround'
                                    style={{ width: '100%' }}
                                >
                                    <div
                                        className='button-yes-export'
                                        onClick={ExportFunction}
                                    >
                                        <FiDownload
                                            size={24}
                                            style={{ marginRight: 5 }}
                                        />
                                        Cetak
                                    </div>
                                    <div
                                        className='button-cancel-white'
                                        onClick={() =>
                                            setShowModalExport(false)
                                        }
                                    >
                                        Cancel
                                    </div>
                                </div>
                            </div>
                        </Modals>
                        <div style={{ height: 20 }} />
                        <div className='content-cards-2-body'>
                            <Card className='content-cards-2-card'>
                                <div className='t12sb'>Antrean Berlangsung</div>
                                <div
                                    className='t40b'
                                    style={{ margin: '20px 0px' }}
                                >
                                    {cardData && cardData.antrianBerlangsung}
                                </div>
                            </Card>
                            <Card className='content-cards-2-card'>
                                <div className='t12sb'>Antrean Selesai</div>
                                <div
                                    className='t40b'
                                    style={{ margin: '20px 0px' }}
                                >
                                    {cardData && cardData.antrianSelesai}
                                </div>
                            </Card>
                            <Card className='content-cards-2-card'>
                                <div className='t12sb'>Total Antrean</div>
                                <div
                                    className='t40b'
                                    style={{ margin: '20px 0px' }}
                                >
                                    {cardData && cardData.totalAntrian}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className='content-table'>
                    <div className='t18b'>Riwayat Pelayanan Hari Ini</div>
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
                                    <StyledTableCell>No. Urut</StyledTableCell>
                                    <StyledTableCell align='center'>
                                        Nomor Antrean
                                    </StyledTableCell>
                                    <StyledTableCell align='center'>
                                        Loket
                                    </StyledTableCell>
                                    <StyledTableCell align='center'>
                                        Jam Kunjungan
                                    </StyledTableCell>
                                    <StyledTableCell align='center'>
                                        Jam Dilayani
                                    </StyledTableCell>
                                    <StyledTableCell align='center'>
                                        Lama Menunggu (Menit)
                                    </StyledTableCell>
                                    <StyledTableCell align='center'>
                                        Lama Pelayanan (Menit)
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {queueData &&
                                    queueData.map((queue, i) => (
                                        <StyledTableRow key={i}>
                                            <StyledTableCell
                                                component='th'
                                                scope='row'
                                            >
                                                {i + 1}
                                            </StyledTableCell>
                                            <StyledTableCell align='center'>
                                                {queue.noAntrian}
                                            </StyledTableCell>
                                            <StyledTableCell align='center'>
                                                {queue.Loket}
                                            </StyledTableCell>
                                            <StyledTableCell align='center'>
                                                {queue.jamKedatangan}
                                            </StyledTableCell>
                                            <StyledTableCell align='center'>
                                                {moment(queue.jamDilayani)
                                                    .utc()
                                                    .format('hh:mm') ===
                                                'Invalid date'
                                                    ? '-'
                                                    : moment(queue.jamDilayani)
                                                          .utc()
                                                          .format('HH:mm')}
                                            </StyledTableCell>
                                            <StyledTableCell align='center'>
                                                {queue.lamaMenunggu}
                                            </StyledTableCell>
                                            <StyledTableCell align='center'>
                                                {queue.lamaPelayanan}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Admin);
