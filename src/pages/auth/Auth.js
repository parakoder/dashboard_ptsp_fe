import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { AppContext } from '../../services/context/Context';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { FaChevronLeft } from 'react-icons/fa';
import './auth.scss';
import '../../styles/global.scss';
import Button from '../../components/Button';

const Auth = () => {
    const history = useHistory();
    const { state, fun } = useContext(AppContext);

    const { authState } = state;
    const { authContext } = fun;

    const [showHidePass, setShowHidePass] = useState(true);
    const [pageAuth, setPageAuth] = useState('forgot');

    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    const [errorUsername, setErrorUsername] = useState({
        isError: false,
        text: '',
    });
    const [errorPassword, setErrorPassword] = useState({
        isError: false,
        text: '',
    });

    const loginHandler = () => {
        if (form.username === '') {
            setErrorUsername({
                isError: true,
                text: 'Username tidak boleh kosong',
            });
        }

        if (form.password === '') {
            setErrorPassword({
                isError: true,
                text: 'Password tidak boleh kosong',
            });
        }
    };

    return (
        <div className='container-auth'>
            <div className='auth-logo'>
                <img
                    src={require('../../assets/img_logo.png').default}
                    alt='logo.png'
                    className='img-logo'
                />
                <div className='auth-logo-text'>
                    <p className='t1'>Mahkamah Agung Republik Indonesia</p>
                    <p className='t2'>Pengadilan Negeri Jakarta Selatan</p>
                    <p className='t3'>Kelas 1A Khusus</p>
                </div>
            </div>
            <div className='auth-form'>
                {pageAuth === 'login' ? (
                    <div style={{ width: '60%' }}>
                        <div className='title-auth-form'>
                            Dashboard Management Loket
                        </div>
                        <div className='subtitle-auth-form'>
                            Masuk dengan ID dan Password yang terdaftar untuk
                            mengakses Dashboard Management Loket
                        </div>
                        <div style={{ height: 30 }} />
                        <div className='input-title-wrapper'>
                            <div className='input-title'>ID</div>
                            {errorUsername.isError ? (
                                <div className='input-txt-error'>
                                    {errorUsername.text}
                                </div>
                            ) : null}
                        </div>
                        <div
                            className={
                                errorUsername.isError
                                    ? 'input-form-error'
                                    : 'input-form'
                            }
                        >
                            <input
                                placeholder='Masukkan NIK atau ID'
                                className='input-form-body'
                                value={form.username}
                                onChange={(e) => {
                                    if (e.target.value.length > 0) {
                                        setErrorUsername({
                                            isError: false,
                                            text: '',
                                        });
                                    }
                                    setForm({
                                        ...form,
                                        username: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <div style={{ height: 30 }} />
                        <div className='input-title-wrapper'>
                            <div className='input-title'>Kata Sandi</div>
                            {errorPassword.isError ? (
                                <div className='input-txt-error'>
                                    {errorPassword.text}
                                </div>
                            ) : null}
                        </div>
                        <div
                            className={
                                errorPassword.isError
                                    ? 'input-form-error'
                                    : 'input-form'
                            }
                        >
                            <input
                                placeholder='Masukkan Kata Sandi'
                                className='input-form-body'
                                value={form.password}
                                onChange={(e) => {
                                    if (e.target.value.length > 0) {
                                        setErrorPassword({
                                            isError: false,
                                            text: '',
                                        });
                                    }
                                    setForm({
                                        ...form,
                                        password: e.target.value,
                                    });
                                }}
                                type={showHidePass ? 'password' : 'text'}
                            />
                            {showHidePass ? (
                                <AiOutlineEye
                                    size={24}
                                    color=' #5f764f'
                                    onClick={() =>
                                        setShowHidePass(!showHidePass)
                                    }
                                />
                            ) : (
                                <AiOutlineEyeInvisible
                                    size={24}
                                    color='#5f764f'
                                    onClick={() =>
                                        setShowHidePass(!showHidePass)
                                    }
                                />
                            )}
                        </div>
                        <div style={{ height: 50 }} />
                        <Button className='button-login' onClick={loginHandler}>
                            Masuk
                        </Button>
                        <div style={{ height: 30 }} />
                        <div
                            className='txt-problem-login'
                            onClick={() => setPageAuth('problem')}
                        >
                            Bermasalah untuk masuk?
                        </div>
                    </div>
                ) : (
                    <div style={{ width: '60%' }}>
                        <div
                            className='btn-back'
                            onClick={() => setPageAuth('login')}
                        >
                            <FaChevronLeft color=' #0d461b' size={24} />
                            <div className='txt-btn-back'>Kembali</div>
                        </div>
                        <div className='title-auth-form'>
                            Bermasalah untuk masuk?
                        </div>
                        <div className='subtitle-auth-form'>
                            Hubungi IT Support apabila tidak dapat Masuk kedalam
                            dashboard yang disebabkan oleh Lupa Kata Sandi
                            ataupun Masalah lainnya.
                        </div>
                        <div style={{ height: 50 }} />

                        <Button className='button-problem'>
                            support.it@pengadilannegerijaksel.com
                        </Button>
                    </div>
                )}
                {/* <button
                    onClick={() => {
                        authContext.signIn().then((res) => {
                            history.replace('/admin');
                        });
                    }}
                >
                    Login
                </button> */}
            </div>
        </div>
    );
};

export default Auth;
