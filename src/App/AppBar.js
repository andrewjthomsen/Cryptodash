import React from 'react';
import styled, {css} from 'styled-components';

const Logo = styled.div`
   font-size: 1.5em;
`
const Bar = styled.div`
display: grid;
margin-bottom: 40px;
grid-template-columns: 100px auto 100px 100px;
`
// Styled component for button
// When certain props are passed in, button will respond differently with specific styles
const ControlButtonElement = styled.div`
   cursor: pointer;
    ${props => props.active && css`
      text-shadow: 0px 0px 60px #03ff03;
    `}
`
// Takes first character and transforms it to be uppercase
// Styling is being applied to dashboard and settings control buttons
function toProperCase(lower) {
   return lower.charAt(0)
   .toUpperCase()
   + lower.substr(1);

}

// Wrapper to apply functionality and styling to buttons
function ControlButton({ name, active }) {
   return (
      <ControlButtonElement active={active}>
         {toProperCase(name)}
      </ControlButtonElement>
   )
}

export default function(){
return (
   <Bar>
      <Logo> CryptoDash </Logo>
      <div/>
      <ControlButton active name="dashboard"/> 
      <ControlButton name="settings"/> 
   </Bar>
   )
}