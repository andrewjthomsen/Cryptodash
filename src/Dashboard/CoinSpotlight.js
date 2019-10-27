import React from "react";
import styled from "styled-components";
import { Tile } from "../Shared/Tile";
import { AppContext } from "../App/AppProvider";
import CoinImage from "../Shared/CoinImage";

const SpotLightName = styled.h2`
    text-align: center;

`;

export default function() {
  return (
    <AppContext.Consumer>
      {({ currentFavorite, coinList }) => (
        <Tile>
          <SpotLightName>{coinList[currentFavorite].coinName}</SpotLightName>
          <CoinImage  coin={coinList[currentFavorite]} spotlight/>
        </Tile>
      )}
    </AppContext.Consumer>
  );
}
