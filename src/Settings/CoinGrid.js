import React from 'react';
import styled from 'styled-components';
import {AppContext} from '../App/AppProvider';
import CoinTile from './CoinTile';

// Divides screen into 5 divs and stretches widths out
export const CoinGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 15px;
    margin-top: 40px;
`
function getCoinsToDisplay(coinList, topSection, favorites) {
    return topSection ? favorites :  Object.keys(coinList).slice(0, 100);
}

// Taking array of keys of coinList
// then mapping list of keys to a div
// Each coinKey gets its own div
// Displaying keys inside of a grid
export default function({ topSection }) {
    return <AppContext.Consumer>
        {({ coinList, favorites })  => <CoinGridStyled>
            {getCoinsToDisplay(coinList, topSection, favorites).map(coinKey => 
                <CoinTile topSection={topSection} coinKey = {coinKey}/>
            )}
        </CoinGridStyled>}
    </AppContext.Consumer>
}