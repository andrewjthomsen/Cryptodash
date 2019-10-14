// Functional component that returns welcome message
import React from 'react';
import WelcomeMessage from '../Settings/WelcomeMessage';
import ConfirmButton from './ConfirmButton';
import Page from '../Shared/Page';
import CoinGrid from './CoinGrid';


export default function() {
    return <Page name="settings"> 
        <WelcomeMessage/> 
        <ConfirmButton/> 
        <CoinGrid/>
    </Page>
}