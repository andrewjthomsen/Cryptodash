import styled from 'styled-components';
import { subtleBoxShadow, lightBlueBackground, 
    greenBoxShadow, redBoxShadow } from './Styles';


    export const Tile = styled.div`
        ${ subtleBoxShadow }
        ${ lightBlueBackground }
        padding: 10px;
    `

    export const SelectableTile = styled(Tile)`
    &: hover {
        cursor: pointer;
        ${ greenBoxShadow }
    }
    `
    // Extends off of SelectableTile
    // Instead of greenBoxShadow on hover, has red
    export const DeletableTile = styled(SelectableTile)`
        &:hover{
            cursor: pointer;
            ${redBoxShadow}
        }
    `;
// Diables mouse clicks
    export const DisabledTile = styled(Tile)`
        pointer-events: none;
        opacity: 0.4;
    `;