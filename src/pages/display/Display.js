import React, { useEffect, useState, useRef } from 'react';
import Marquee from 'react-fast-marquee';
import Card from '../../components/Card';
import { RunningHandler } from '../../services/handler/RunningTextHandler';
import {
    CallDisplayHandler,
    DisplayHandler,
} from '../../services/handler/DisplayHandler';
import { GoPrimitiveDot } from 'react-icons/go';
import { VoiceList } from '../../services/utils/voicelist';
import './display.scss';

const Dashboard = () => {
    const audioRef = useRef(null);
    const [arrDisplay, setArrDisplay] = useState([]);
    const [runningState, setRunningState] = useState([]);

    const [audioIndex, setAudioIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const [audioArr, setAudioArr] = useState([]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            //assign interval to a variable to clear it.
            DisplayHandler()
                .then((res) => {
                    console.log('ress display', res);
                    if (res.status === 200) {
                        CallDisplayHandler()
                            .then((resCall) => {
                                let arrVoice = [];
                                if (
                                    resCall.status === 200 &&
                                    res.panggil === true
                                ) {
                                    console.log('resCall display', resCall);
                                    setArrDisplay(res.data);
                                    res.data.map((data) => {
                                        // console.log('dataaaa mp3', data);
                                        // let item = `/public/voice/${data}.mp3`;
                                        let item = VoiceList.find(
                                            (o) => o.name === data
                                        );
                                        if (item !== undefined) {
                                            return arrVoice.push(item.path);
                                        }
                                    });
                                    // console.log('arrVoice', arrVoice);
                                    setAudioArr(arrVoice);
                                    audioRef.current.play();
                                } else {
                                    setAudioArr([]);
                                    setIsPlaying(false);
                                    audioRef.current.pause();
                                }
                            })
                            .catch((errCall) => {
                                console.log('errCall display', errCall);
                                audioRef.current.pause();
                                setIsPlaying(false);
                            });
                    }
                })
                .catch((err) => {
                    console.log('err display', err);
                });
        }, 2000);

        return () => clearInterval(intervalId); //This is important
    }, []);

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

    const handlePause = () => {
        audioRef.current.pause();

        setIsPlaying(false);
    };

    return (
        <div className='container-dashboard'>
            {/* content dashboard */}
            <div className='content-dashboard'>
                <div className='grid-card'>
                    {arrDisplay &&
                        arrDisplay.map((item, i) => (
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
            </div>
            {/* content dashboard */}

            {/* footer running text */}
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
            {/* footer running text */}

            <audio
                autoPlay
                controls={true}
                preload='auto'
                style={{ display: 'none' }}
                ref={audioRef}
                src={audioArr[audioIndex]}
                onEnded={() => {
                    setAudioIndex((i) => i + 1);
                    if (audioIndex === audioArr.length - 1) {
                        setIsPlaying(false);
                    }
                }}
            />
        </div>
    );
};

export default Dashboard;
