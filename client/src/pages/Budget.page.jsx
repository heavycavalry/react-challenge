import React from 'react';
import {ActionHeader, Card, Page, Table} from 'ui';
import {Grid} from '@mui/material';

let row =  {
    "createdAt": 1641037200000,
    "categoryId": "8",
    "amountInCents": 10000,
    "id": "7",
    "currentSpending": 11799,
    "currentSpendingPercent": 117,
    "category": {
        "id": "8",
        "name": "Różne",
        "color": "#93ab8e",
        "budgetId": "7",
        "ledgerIds": [
            "15",
            "16"
        ],
        "createdAt": 1643713800000
    }
}
const CreateDateCell = {
    id: "createdAt",
    renderCell(row) {
        const ts = row["createdAt"];
        const date = new Date(ts);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const day = date.getDay();
        const month = date.getMonth();
        const year = date.getFullYear();
        return `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`;
    }
}



export const BudgetPage = () => {
  return (
    <Page title="Budżet">
      <Card
        title={
          <ActionHeader
            variant={'h1'}
            title="Budżet"
            renderActions={() => null}
          />
        }
      >
        <Grid container>
          <Grid item xs={12}>
              <Table headCells={[CreateDateCell]} rows={[row]}/>
          </Grid>
        </Grid>
      </Card>
    </Page>
  );
};
