import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { AppContext } from '../../services/context/Context';
import './admin.scss';

const Admin = () => {
    const { state, fun } = useContext(AppContext);
    const { authContext } = fun;

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
                <div className='button-logout'>Keluar</div>
            </div>
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
                                <div className='t18b'>Kode Antrean</div>
                                <div style={{ height: 18 }} />
                                <div className='card-loket'>J 80</div>
                            </div>
                        </div>
                        <div className='content-cards-1-footer'>
                            <Button className='button-control-admin'>
                                Panggil
                            </Button>
                            <Button className='button-control-admin'>
                                Selanjutnya
                            </Button>
                            <Button className='button-control-admin'>
                                Cetak Laporan
                            </Button>
                        </div>
                    </Card>
                    <div className='content-cards-2'>
                        <div className='t18b'>Rekapitulasi Antrean</div>
                        <div style={{ height: 20 }} />
                        <div className='content-cards-2-body'>
                            <Card className='content-cards-2-card'>Card</Card>
                            <Card className='content-cards-2-card'>Card</Card>
                            <Card className='content-cards-2-card'>Card</Card>
                        </div>
                    </div>
                </div>
                <div className='content-table'>
                    <div className='t18b'>Riwayat Pelayanan</div>
                    <div onClick={() => authContext.signOut()}>Logout</div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Admin);
