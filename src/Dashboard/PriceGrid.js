import React from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";
import PriceTile from "./PriceTile";

const PriceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
  margin-top: 40px;
`;
// Passing index in allows option of compact tile (second row) or regular tile (first row)
export default function() {
  return (
    <AppContext.Consumer>
      {({ prices }) => (
        <PriceGrid>
          {prices.map((price, index) => (
            <PriceTile key={ index } price={ price } index={ index }/>
          ))}
        </PriceGrid>
      )}
    </AppContext.Consumer>
  );
}
