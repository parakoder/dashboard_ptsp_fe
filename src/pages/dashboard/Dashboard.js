import React from 'react';
import Marquee from 'react-fast-marquee';
import Card from '../../components/Card';
import './dashboard.scss';

const Dashboard = () => {
    const arrCard = [1, 2, 3, 4, 5, 6, 7];

    return (
        <div className='container-dashboard'>
            <div className='content-dashboard'>
                <div className='grid-card'>
                    {arrCard.map((item) => {
                        return (
                            <>
                                <div className='item-card-dashboard'>
                                    <Card className='card-dashboard'>
                                        <div className='title-card-dashboard'>
                                            ECOURT
                                        </div>
                                        <div className='desc-card-dashboard'>
                                            E 13
                                        </div>
                                    </Card>
                                </div>
                                {item === 6 ? (
                                    <div className='logo-text'>
                                        <img
                                            src={
                                                require('../../assets/img_logo.png')
                                                    .default
                                            }
                                            alt='logo.png'
                                            className='logo-img'
                                        />
                                        <div>
                                            <p className='t1'>
                                                Mahkamah Agung Republik
                                                Indonesia
                                            </p>
                                            <p className='t2'>
                                                Pengadilan Negeri Jakarta
                                                Selatan
                                            </p>
                                            <p className='t3'>
                                                Kelas 1A Khusus
                                            </p>
                                        </div>
                                    </div>
                                ) : null}
                            </>
                        );
                    })}
                </div>
                {/* </div> */}
            </div>
            <div className='footer'>
                <Marquee gradient={false} speed={50}>
                    <div style={{ fontWeight: 'w500' }}>
                        Patuhilah protokol kesehatan demi kesehatan dan
                        keselamatan kita bersama di dalam melaksanakan aktivitas
                        sehari-hari
                    </div>
                </Marquee>
            </div>
        </div>
    );
};

export default Dashboard;
