import React from 'react';
import { BudgetWidget } from 'ui/organisms/Budget.widget';
import { Page } from 'ui';

export const BudgetPage = () => {
  return (
    <Page title="Budżet">
      <BudgetWidget />
    </Page>
  );
};
