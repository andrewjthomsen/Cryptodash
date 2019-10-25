import React from "react";
import { Tile } from "../Shared/Tile";
import { AppContext } from "../App/AppProvider";
import highchartsConfig from "./HighchartsConfig";
import ReactHighcharts from "react-highcharts";
import HighchartsTheme from "./HighchartsTheme";

ReactHighcharts.Highcharts.setOptions(HighchartsTheme);
export default function() {
  // Pulls out historical data and passes val into config funct
  return (
    <AppContext.Consumer>
      {({ historical }) => (
        <Tile>
          <ReactHighcharts config={highchartsConfig(historical)} />
        </Tile>
      )}
    </AppContext.Consumer>
  );
}
