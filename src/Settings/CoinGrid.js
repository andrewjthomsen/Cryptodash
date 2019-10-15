import React from 'react';
import styled, { css } from 'styled-components';
import {AppContext} from '../App/AppProvider';
import CoinTile from './CoinTile';

// Divides screen into 5 divs and stretches widths out
export const CoinGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 15px;
    margin-top: 40px;
`
function getCoinsToDisplay(coinList) {
    return Object.keys(coinList).slice(0, 100);
}

// Taking array of keys of coinList
// then mapping list of keys to a div
// Each coinKey gets its own div
// Displaying keys inside of a grid
export default function() {
    return <AppContext.Consumer>
        {({ coinList })  => <CoinGridStyled>
            {getCoinsToDisplay(coinList).map(coinKey => 
                <CoinTile coinKey = {coinKey}/>
            )}
        </CoinGridStyled>}
    </AppContext.Consumer>
}