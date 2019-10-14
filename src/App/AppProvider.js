// State Container
import React from 'react';

const CC = require('cryptocompare');

// Will be exported to be use consumers in the child components 
export const AppContext = React.createContext();

// Provider is going to be in main wrapper to provide state with the other components
export class AppProvider extends React.Component {
    constructor(props) {
        super(props);
        // Intitial state
        this.state = {
            page:'dashboard',
            ...this.savedSettings(), 
            // State updater function
            setPage: this.setPage,
            confirmFavorites: this.confirmFavorites
        }
    }

    componentDidMount = () => {
        this.fetchCoins();
    }

    fetchCoins = async () => {
        let coinList = (await CC.coinList()).Data;
        this.setState({ coinList });
    }

    confirmFavorites = () => {
    //  console.log('Hello'); 
        this.setState({
            firstVisit: false,
            page: 'dashboard'
        });
        localStorage.setItem('cryptodash', JSON.stringify({
            test: 'Hello'
        }));
    }  

    savedSettings() {
        let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
        // If not cryptoDashData return default frstVisit variable
        if(!cryptoDashData) {
            return { page: 'settings', firstVisit: true }
        }
        return {};
    }
    // Function to set page with React
    setPage = page => this.setState({ page })

    // Render function will pass children through to get access to provider
    render(){
        return (
            <AppContext.Provider value= {this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}