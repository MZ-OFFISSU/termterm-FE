import styled from "styled-components/native";
import { View, Keyboard } from "react-native";
import { LIGHT_COLOR_STYLE } from "@style/designSystem";
import {
    CustomTextInput,
    CustomButton,
    BUTTON_TYPE,
    BUTTON_STATE,
} from '@components/index';
import { Props } from '@interfaces/inquiry';
import { useState, useEffect } from 'react';
import { screenWidth } from '@style/dimensions';
import { themeState } from "@recoil/themeState";
import { useRecoilState } from "recoil";
import { infoState } from "@recoil/signupState";

const First = ({ onEnd }: Props) => {
    const [theme, setTheme] = useRecoilState(themeState);
    const [info, setInfo] = useRecoilState(infoState);
    const [email, setEmail] = useState('');
    const [inquiryContent, setInquiryContent] = useState('');

    const nextStage = () => 
    if (onEnd && email !== '') {
        setInfo({
            ...info,
            email: email,
        });
        onEnd();
    }
    }
}