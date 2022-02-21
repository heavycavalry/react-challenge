import React from 'react';
import {ActionHeader, Card, ColorBox, Error, Loader, LocalizedDate, Money, NoContent, Page, Table} from 'ui';
import {Box, Grid} from '@mui/material';
import {BudgetService} from "../api";
import {QueryClient, QueryClientProvider, useMutation, useQuery} from "react-query";

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
                <Grid container>
                    <Grid item xs={12}
                          container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                          minHeight={'40vh'}>
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
    const {isLoading, error, data} = useQuery('rowData', () => {
        return BudgetService.findAll()
    })
    const deleteMutation = useMutation(
        records => {
           return BudgetService.remove({ids: records})
        },
        {
                onSuccess: () => {
                    // Invalidate and refetch
                    queryClient.invalidateQueries('rowData')
                }
        },
    )
    const deleteRecords = (records) => {
        deleteMutation.mutate(records)
    }

    if (isLoading) return <Loader/>
    if (error) return <Error/>
    if (!data || data.length === 0) return <NoContent/>

    return (
        <Table headCells={[NameCell, ExpensesCell, CurrentSpendingCell, StatusCell, DateCell]} rows={data}
               getUniqueId={getUniqueId} deleteRecords={deleteRecords}/>
    )
}




