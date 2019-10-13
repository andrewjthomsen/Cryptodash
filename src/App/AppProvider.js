// State Container
import React from 'react';
// Creates a new React context 
// Will be exported to be use consumers in the child components 
export const AppContext = React.createContext();

// Provider is going to be in main wrapper to provide state with the other components
export class AppProvider extends React.Component {
    constructor(props) {
        super(props);
        // Intitial state
        this.state = {
            page:'settings',
            // State updater function
            setPage: this.setPage
        }
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