// State Container
import React from "react";
import _ from "lodash";

const cc = require("cryptocompare");

// Will be exported to be use consumers in the child components
export const AppContext = React.createContext();

const MAX_FAVORITES = 10;

// Provider is going to be in main wrapper to provide state with the other components
export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    // Intitial state
    this.state = {
      page: "dashboard",
      favorites: ["BTC", "ETH", "XMR", "DOGE"],
      ...this.savedSettings(),
      // State updater function
      setPage: this.setPage,
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavorites: this.isInFavorites,
      confirmFavorites: this.confirmFavorites,
      setFilteredCoins: this.setFilteredCoins
    };
  }

  componentDidMount = () => {
    this.fetchCoins();
    this.fetchPrices();
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
  
  prices = async () => {
    let returnData = [];
    for (let i = 0; i < this.state.favorites.length; i++) {
      try {
        let priceData = await cc.priceFull(this.state.favorites[i], "USD");
        returnData.push(priceData);
      } catch (e) {
        console.warn("Fetch price error: ", e);
      }
    }
    return returnData;
  };

  addCoin = key => {
    let favorites = [...this.state.favorites];
    // If length is less than max favorites
    if (favorites.length < MAX_FAVORITES) {
      // Push key onto favorites array
      favorites.push(key);
      this.setState({ favorites });
    }
  };
  // .pull is a lodash command
  // Will return new array of value removed
  removeCoin = key => {
    let favorites = [...this.state.favorites];
    this.setState({ favorites: _.pull(favorites, key) });
  };

  // Prevents adding the same coin to favorites multiple times
  isInFavorites = key => _.includes(this.state.favorites, key);
  confirmFavorites = () => {
    //  console.log('Hello');
    this.setState(
      {
        firstVisit: false,
        page: "dashboard"
      },
      () => {
        this.fetchPrices();
      }
    );
    localStorage.setItem(
      "cryptodash",
      JSON.stringify({
        favorites: this.state.favorites
      })
    );
  };

  savedSettings() {
    let cryptoDashData = JSON.parse(localStorage.getItem("cryptoDash"));
    // If not cryptoDashData return default frstVisit variable
    if (!cryptoDashData) {
      return { page: "settings", firstVisit: true };
    }
    let { favorites } = cryptoDashData;
    return { favorites };
  }

  // Function to set page with React
  setPage = page => this.setState({ page });

  // Fuzzy search on search input setFilterCoin
  setFilteredCoins = filteredCoins => this.setState({ filteredCoins });

  // Render function will pass children through to get access to provider
  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
