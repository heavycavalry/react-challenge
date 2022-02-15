import React from 'react';
import {ActionHeader, Button, Card, Page, Table} from 'ui';
import {Grid} from '@mui/material';
import styled from 'styled-components'
import {IconAdd} from "../ui/atoms/button.styled";
const row =  {
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
const DateCells = {
    label: "Data utworzenia",
    renderCell(row) {
        const ts = row["createdAt"];
        const date = new Date(ts);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const day = String(date.getDay()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`;
    }
}
const NameCells = {
    label: "Nazwa",
    renderCell(row) {
        const category = row["category"];
        return <IconBox color={category.color}>{category.name}</IconBox>;
    }
}

const ExpensesCells = {
    label: "Planowane wydatki",
    renderCell(row) {
        const category = row["category"];
        return <IconBox color={category.color}>{category.name}</IconBox>;
    }
}



const getUniqueId = () => row.id;
const IconBox = styled.div`
&:before {
  content: "";
  display: block;
  float: left;
  margin-right: 10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
}`;

export const BudgetPage = () => {
  return (
    <Page title="Budżet">
      <Card
        title={
          <ActionHeader
            variant={'h1'}
            title="Twój budżet"
            renderActions={() => null}
          />
        }
      >
        <Grid container>
          <Grid item xs={12}>
              <Table headCells={[ NameCells, ExpensesCells, DateCells]} rows={[row]} getUniqueId={getUniqueId} deleteRecords={[]}/>
          </Grid>
        </Grid>
      </Card>
        <Button variant={"contained"} color={"primary"} startIcon={<IconAdd/>} label={"Zdefiniuj budżet"}/>
    </Page>
  );
};
