import { setStoreItem } from '@cromwell/core';
import { getGraphQLClient, getRestAPIClient } from '@cromwell/core-frontend';
import { Button, IconButton, InputAdornment, TextField, Tooltip, withStyles } from '@material-ui/core';
import {
    AddPhotoAlternateOutlined as AddPhotoAlternateOutlinedIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
} from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getFileManager } from '../../components/fileManager/helpers';
import { toast } from '../../components/toast/toast';
import styles from './Welcome.module.scss';


export default function welcomePage() {
    const apiClient = getRestAPIClient();
    const graphQLClient = getGraphQLClient();
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [submitPressed, setSubmitPressed] = useState(false);
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [avatarInput, setAvatarInput] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmitClick = async () => {
        setSubmitPressed(true);

        if (!emailInput || emailInput === '' || !passwordInput || passwordInput === '' || !nameInput || nameInput === '') {
            return;
        }

        setLoading(true);

        try {
            await graphQLClient.createUser({
                fullName: nameInput,
                email: emailInput,
                password: passwordInput,
                avatar: avatarInput,
            });
        } catch (e) {
            toast.error('Failed to create user with provided credentials');
            console.error(e);
            setLoading(false);
            return;
        }

        try {
            await apiClient.setUpCms();

            await apiClient.login({
                email: emailInput,
                password: passwordInput
            });
        } catch (e) {
            console.error(e);

        }

        checkAuth();

        setLoading(false);
    }

    const checkAuth = async () => {
        const userInfo = await apiClient.getUserInfo();
        if (userInfo) {
            setStoreItem('userInfo', userInfo);
            history?.push?.(`/`);
        }
    }

    const handleChangeAvatar = async () => {
        const photoPath = await getFileManager()?.getPhoto();
        if (photoPath) setAvatarInput(photoPath);
    }

    return (
        <div className={styles.WelcomePage}>
            <div className={styles.wrapper}>
                <img src="/logo_small.png" width="150px" className={styles.logo} />
                <h1 className={styles.title}>Welcome to Cromwell CMS!</h1>
                <h3 className={styles.subtitle}>Let's create your account</h3>
                <div className={styles.inputForm}>
                    <div className={styles.userMainInfo}>
                        <Tooltip title="Pick avatar">
                            <div className={styles.avatar}
                                onClick={handleChangeAvatar}
                                style={{ backgroundImage: `url(${avatarInput})` }}>
                                {!avatarInput && <AddPhotoAlternateOutlinedIcon />}
                            </div>
                        </Tooltip>
                        <CssTextField
                            label="Name"
                            value={nameInput}
                            onChange={e => setNameInput(e.target.value)}
                            fullWidth
                            error={nameInput === '' && submitPressed}
                            helperText={nameInput === '' && submitPressed ? "This field is required" : undefined}
                            id="name-input"
                        />
                    </div>

                    <CssTextField
                        label="E-mail"
                        value={emailInput}
                        className={styles.textField}
                        onChange={e => setEmailInput(e.target.value)}
                        fullWidth
                        error={emailInput === '' && submitPressed}
                        helperText={emailInput === '' && submitPressed ? "This field is required" : undefined}
                        id="email-input"
                    />
                    <CssTextField
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        value={passwordInput}
                        onChange={e => setPasswordInput(e.target.value)}
                        className={styles.textField}
                        fullWidth
                        error={passwordInput === '' && submitPressed}
                        helperText={passwordInput === '' && submitPressed ? "This field is required" : undefined}
                        id="password-input"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        onClick={handleSubmitClick}
                        className={styles.createBtn}
                        disabled={loading}
                        color="primary"
                        variant="contained"
                    >Create</Button>
                </div>
            </div>
        </div>
    );
}


const CssTextField = withStyles({
    root: {
        // borderColor: '#fff',
        // color: "#fff",

        // '& label': {
        //     color: '#fff',
        // },
        // '& label.Mui-focused': {
        //     color: '#fff',
        // },
        // '& .MuiInput-underline:before': {
        //     borderBottomColor: '#ccc',
        // },
        // '& .MuiInput-underline:hover:before': {
        //     borderBottomColor: '#fff',
        // },
        // '& .MuiInput-input': {
        //     color: '#fff',
        // },

    },
})(TextField);