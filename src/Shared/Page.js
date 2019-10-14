import React from 'react';
import { AppContext } from '../App/AppProvider';

export default function ({ name, children }) {
    // Consumer extracts page from props, and checks if 
    // the page isn't equal to name. Which is a prop which
    // is passed in at component level. Name can be settings or dashboard
    // Page on line 6 is page on app state and checking it aginst name of
    // and if that's not the case will return null, else retrun children
    return <AppContext.Consumer>
        {({ page }) => {
            if (page !== name) {
                return null;
            }
            return <div> { children } </div>;
        }}
    </AppContext.Consumer>;
}