// State Container
import React from "react";
import _ from "lodash";
import moment from "moment";

const cc = require("cryptocompare");

// Will be exported to be use consumers in the child components
export const AppContext = React.createContext();

const MAX_FAVORITES = 10;
const TIME_UNITS = 30;

// Provider is going to be in main wrapper to provide state with the other components
export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    // Intitial state
    this.state = {
      page: "dashboard",
      favorites: ["BTC", "ETH", "XMR", "DOGE"],
      timeInterval: "months",
      ...this.savedSettings(),
      // State updater function
      setPage: this.setPage,
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavorites: this.isInFavorites,
      confirmFavorites: this.confirmFavorites,
      setCurrentFavorite: this.setCurrentFavorite,
      setFilteredCoins: this.setFilteredCoins,
      changeChartSelect: this.changeChartSelect
    };
  }

  addCoin = key => {
    let favorites = [...this.state.favorites];
    // If length is less than max favorites
    if (favorites.length < MAX_FAVORITES) {
      // Push key onto favorites array
      favorites.push(key);
      this.setState({ favorites });
    }
  };

  removeCoin = key => {
    let favorites = [...this.state.favorites];
    this.setState({ favorites: _.pull(favorites, key) });
  };

  componentDidMount = () => {
    this.fetchCoins();
    this.fetchPrices();
    this.fetchHistorical();
  };

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    this.setState({ coinList });
  };

  fetchPrices = async () => {
    if (this.state.firstVisit) return;
    let prices = await this.prices();
    prices = prices.filter(price => Object.keys(price).length);
    this.setState({ prices });
  };

  fetchHistorical = async () => {
    // Check if User is in firstVisit state
    if (this.state.firstVisit) return; 
    let result = await this.historical();
    // compile results
    let historical = [
      // Highcharts needs an array because of the possibility of multiple series
      {
        name: this.state.currentFavorite,
        data: result.map((ticker, index) => [
          // x value date, index = 0
          moment()
            .subtract({ [this.state.timeInterval]: TIME_UNITS - index })
            .valueOf(),
          // Y value
          ticker.USD
        ])
      }
    ];
    this.setState({ historical });
  };

    // Complies array of promises
    historical = () => {
      let promises = [];
      // Loop over TIME_UNITS (intervals to fetch over)
      for (let units = TIME_UNITS; units > 0; units--) {
        promises.push(
          // Query inside crypto API
          cc.priceHistorical(
            this.state.currentFavorite,
            ["USD"],
            // Use of Moment for date manipulation
            moment()
              .subtract({ [this.state.timeInterval]: units })
              .toDate()
          )
        );
      }

      // Resolves only when all promises (fetches) are returned
      return Promise.all(promises);
    };

  // Compiles array of promises
  prices = async () => {
    let returnData = [];
    for (let favorite of this.state.favorites) {
      try {
        let priceData = await cc.priceFull(favorite, "USD");
        returnData.push(priceData);
      } catch (e) {
        console.warn("Fetch price error: ", e);
      }
    }
    return returnData;
  };

  // Prevents adding the same coin to favorites multiple times
  isInFavorites = key => _.includes(this.state.favorites, key);

  confirmFavorites = () => {
    let currentFavorite = this.state.favorites[0];
    this.setState(
      {
        firstVisit: false,
        page: "dashboard",
        currentFavorite,
        prices: null,
        historical: null,
      },
      () => {
        this.fetchPrices();
        this.fetchHistorical();
      }
    );
    localStorage.setItem(
      "cryptodash",
      JSON.stringify({
        favorites: this.state.favorites,
        currentFavorite
      })
    );
  };

  setCurrentFavorite = sym => {
    this.setState({
      currentFavorite: sym, 
      // Callback function fetches current historical data 
      // runs after app has currentFavorite
      historical: null
    }, 
    this.fetchHistorical
    );

    localStorage.setItem(
      "cryptoDash",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("cryptoDash")),
        currentFavorite: sym
      })
    );
  };

  savedSettings() {
    let cryptoDashData = JSON.parse(localStorage.getItem("cryptoDash"));
    // If not cryptoDashData return default frstVisit variable
    if (!cryptoDashData) {
      return { page: "settings", firstVisit: true };
    }
    let { favorites, currentFavorite } = cryptoDashData;
    return { favorites, currentFavorite };
  }

  // Function to set page with React
  setPage = page => this.setState({ page });

  // Fuzzy search on search input setFilterCoin
  setFilteredCoins = filteredCoins => this.setState({ filteredCoins });

  changeChartSelect = value => {
    this.state(
      { timeInterval: value, historical: null },
      this.fetchHistorical
    );
  };
  // Render function will pass children through to get access to provider
  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
