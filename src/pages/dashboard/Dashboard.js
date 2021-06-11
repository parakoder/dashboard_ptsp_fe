import React, { useContext, useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import Card from '../../components/Card';
import { AppContext } from '../../services/context/Context';
import { RunningHandler } from '../../services/handler/RunningTextHandler';
import './dashboard.scss';

const Dashboard = () => {
    const arrCard = [1, 2, 3, 4, 5, 6, 7];
    const arrCard2 = [
        { id: 1, title: 'ECOURT' },
        { id: 2, title: 'PENGADUAN & INFORMASI' },
        { id: 3, title: 'HUKUM' },
        { id: 4, title: 'KEPANITERAAN PIDANA' },
        { id: 5, title: 'UPAYA PERDATA' },
        { id: 6, title: 'SALINAN PUTUSAN/EKSEKUSI' },
        { id: 7, title: 'UMUM & SURAT MASUK' },
    ];

    const { state } = useContext(AppContext);
    console.log('ajkdn', state.controlState);
    const [runningState, setRunningState] = useState([]);

    useEffect(() => {
        RunningHandler()
            .then((res) => {
                console.log('res running', res);
                if (res.status === 200 && res.data !== null) {
                    setRunningState(res.data);
                } else {
                    setRunningState([]);
                }
            })
            .catch((err) => console.log('err', err));
        return () => {};
    }, []);

    return (
        <div className='container-dashboard'>
            <div className='content-dashboard'>
                <div className='grid-card'>
                    {arrCard2.map((item) => {
                        return (
                            <>
                                {item.id === 1 ? (
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
                                <div className='item-card-dashboard'>
                                    <Card className='card-dashboard'>
                                        <div className='title-card-dashboard'>
                                            {item.title}
                                        </div>
                                        <div className='desc-card-dashboard'>
                                            <div className='desc-card-loket'>
                                                Loket {item.id}
                                            </div>
                                            <div className='desc-card-noAntrian'>
                                                H 34
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </>
                        );
                    })}
                </div>
                {/* </div> */}
            </div>
            <div className='footer'>
                <Marquee gradient={false} speed={50}>
                    {runningState.map((i) => {
                        return <div style={{ fontWeight: 'w500' }}>{i}</div>;
                    })}
                </Marquee>
            </div>
        </div>
    );
};

export default Dashboard;
