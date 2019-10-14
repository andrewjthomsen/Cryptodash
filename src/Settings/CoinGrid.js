import React from 'react';
import styled, { css } from 'styled-components';
import {AppContext} from '../App/AppProvider';

// Divides screen into 5 divs and stretches widths out
export const CoinGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
`
// Taking array of keys of coinList
// then mapping list of keys to a div
// Each coinKey gets its own div
// Displaying keys inside of a grid
export default function() {
    return <AppContext.Consumer>
        {({ coinList })  => <CoinGridStyled>
            {Object.keys(coinList).map(coinKey => 
                <div> {coinKey} </div>)}
        </CoinGridStyled>}
    </AppContext.Consumer>
}