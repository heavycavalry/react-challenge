import React from 'react';
import {ActionHeader, Card, ColorBox, Error, Loader, LocalizedDate, Money, Page, Table} from 'ui';
import {Box, Grid} from '@mui/material';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query'
import {BudgetService} from "../api";

const row = {
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
const queryClient = new QueryClient();
const NameCell = {
    label: "Nazwa",
    renderCell(row) {
        const category = row["category"];
        return (
            <Box sx={{display: 'flex'}}>
                <ColorBox color={category.color}/>
                <p>{category.name}</p>
            </Box>)
    }
}

const ExpensesCell = {
    label: "Planowane wydatki",
    renderCell(row) {
        return <Money inCents={row["amountInCents"]}/>;
    }
}

const CurrentSpendingCell = {
    label: "Obecna kwota",
    renderCell(row) {
        return <Money inCents={row["currentSpending"]}/>;
    }
}

const StatusCell = {
    label: "Status",
    renderCell(row) {
        if (row["currentSpending"] === row["amountInCents"]) {
            return "Wykorzystany";
        }
        if (row["currentSpending"] > row["amountInCents"]) {
            return "Przekroczone";
        } else {
            return "W normie";
        }
    }
}
const DateCell = {
    label: "Data utworzenia",
    renderCell(row) {
        return <LocalizedDate date={row["createdAt"]}/>;
    }
}


const getUniqueId = () => row.id;

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
                        <QueryClientProvider client={queryClient}>
                            <TableProvider/>
                        </QueryClientProvider>
                    </Grid>
                </Grid>
            </Card>
        </Page>
    );
};


export const TableProvider = () => {
    const {isLoading, error, data} = useQuery('repoData', () => {
        return  BudgetService.findAll()
    })
    if (isLoading) return <Loader/>

    if (error) return <Error/>

    return <Table headCells={[NameCell, ExpensesCell, CurrentSpendingCell, StatusCell, DateCell]} rows={data} getUniqueId={getUniqueId} deleteRecords={[]}/>;
}
