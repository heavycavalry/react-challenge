import React from 'react';
import {ActionHeader, Card, ColorBox, Error, Loader, LocalizedDate, Money, NoContent, Page, Table} from 'ui';
import {Box, Grid} from '@mui/material';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query'
import {BudgetService} from "../api";

const getUniqueId = (row) => {
    return row.id
};

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
                <QueryClientProvider client={queryClient}>
                    <Grid container>
                        <Grid item xs={12}
                              container
                              direction="column"
                              justifyContent="center"
                              alignItems="center"
                              minHeight={'40vh'}>
                            <TableProvider/>
                        </Grid>
                    </Grid>
                </QueryClientProvider>
            </Card>
        </Page>
    );
};


export const TableProvider = () => {
    const {isLoading, error, data} = useQuery('repoData', () => {
        return BudgetService.findAll()
    })
    if (data.isEmpty) return <NoContent/>
    if (isLoading) return <Loader/>

    if (error) return <Error/>

    return <Table headCells={[NameCell, ExpensesCell, CurrentSpendingCell, StatusCell, DateCell]} rows={data}
                  getUniqueId={getUniqueId} deleteRecords={[]}/>
}
