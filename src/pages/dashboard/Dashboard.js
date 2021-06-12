import React, { useContext, useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import Card from '../../components/Card';
import { AppContext } from '../../services/context/Context';
import { RunningHandler } from '../../services/handler/RunningTextHandler';
import { DisplayHandler } from '../../services/handler/DisplayHandler';
import './dashboard.scss';
import { GoPrimitiveDot } from 'react-icons/go';

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
    const [arrDisplay, setArrDisplay] = useState([]);

    const { state } = useContext(AppContext);
    console.log('ajkdn', state.controlState);
    const [runningState, setRunningState] = useState([]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            //assign interval to a variable to clear it.
            DisplayHandler()
                .then((res) => {
                    console.log('ress display', res);
                    if (res.status === 200) {
                        setArrDisplay(res.data);
                    }
                })
                .catch((err) => {
                    console.log('err display', err);
                });
        }, 5000);

        return () => clearInterval(intervalId); //This is important
    }, []);

    useEffect(() => {
        RunningHandler()
            .then((res) => {
                console.log('res running', res);
                if (res.status === 200 && res.data !== null) {
                    // const mappingData = res.data.map(val => {

                    // });

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
                    {arrDisplay.map((item, i) => (
                        <>
                            {i === 0 ? (
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
                                            Mahkamah Agung Republik Indonesia
                                        </p>
                                        <p className='t2'>
                                            Pengadilan Negeri Jakarta Selatan
                                        </p>
                                        <p className='t3'>Kelas 1A Khusus</p>
                                    </div>
                                </div>
                            ) : null}
                            <div className='item-card-dashboard'>
                                <Card className='card-dashboard'>
                                    <div className='title-card-dashboard'>
                                        {item.loket}
                                    </div>
                                    <div className='desc-card-dashboard'>
                                        <div className='desc-card-loket'>
                                            Loket {i + 1}
                                        </div>
                                        <div className='desc-card-noAntrian'>
                                            {item.antrian}
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </>
                    ))}
                </div>
                {/* </div> */}
            </div>
            <div className='footer'>
                <Marquee gradient={false} speed={50}>
                    {runningState.map((i) => {
                        return (
                            <div className='txt-run'>
                                {i}{' '}
                                <GoPrimitiveDot
                                    size={20}
                                    style={{ margin: '0px 5px' }}
                                />
                            </div>
                        );
                    })}
                </Marquee>
            </div>
        </div>
    );
};

export default Dashboard;
