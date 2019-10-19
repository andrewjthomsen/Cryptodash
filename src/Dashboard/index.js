// Functional component that returns welcome message
import React from 'react';
import Page from '../Shared/Page';
import PriceGrid from './PriceGrid';

export default function() {
  return (
    <Page name="dashboard">
      <PriceGrid />
    </Page>
  );
}
