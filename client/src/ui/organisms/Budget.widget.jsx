import React, { useState } from 'react';
import { ActionHeader, Card } from '../../ui';
import { Box, Grid } from '@mui/material';
import { BudgetService } from '../../api';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from 'react-query';
import { Button } from '../atoms/Button';
import { IconAdd } from '../atoms/button.styled';
import {
  ColorBox,
  Error,
  Loader,
  LocalizedDate,
  Money,
  NoContent,
  Table,
} from 'ui';
import { AddNewBudgetRecord } from './AddNewBudgetRecord.modal';

const queryClient = new QueryClient();

const nameCell = {
  label: 'Nazwa',
  renderCell({ category }) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <ColorBox color={category.color} />
        <p>{category.name}</p>
      </Box>
    );
  },
};
const expensesCell = {
  label: 'Planowane wydatki',
  renderCell(row) {
    return <Money inCents={row.amountInCents} />;
  },
};
const currentSpendingCell = {
  label: 'Obecna kwota',
  renderCell(row) {
    return <Money inCents={row.currentSpending} />;
  },
};
const statusCell = {
  label: 'Status',
  renderCell(row) {
    if (row.currentSpending === row.amountInCents) {
      return 'Wykorzystany';
    }
    if (row.currentSpending > row.amountInCents) {
      return 'Przekroczone';
    } else {
      return 'W normie';
    }
  },
};
const dateCell = {
  label: 'Data utworzenia',
  renderCell(row) {
    return <LocalizedDate date={row.createdAt} />;
  },
};
const headCells = [
  nameCell,
  expensesCell,
  currentSpendingCell,
  statusCell,
  dateCell,
];
export const BudgetWidget = () => {
  const [open, setOpen] = useState(false);
  return (
    <Card
      sx={{ position: 'relative' }}
      title={
        <ActionHeader
          variant={'h1'}
          title="Twój budżet"
          renderActions={() => (
            <Box sx={{ position: 'absolute', right: '50px' }}>
              <Button
                variant={'contained'}
                color={'primary'}
                startIcon={<IconAdd />}
                onClick={() => setOpen(true)}
              >
                Zdefiniuj budżet
              </Button>
            </Box>
          )}
        />
      }
    >
      <AddNewBudgetRecord isOpen={open} />
      <Grid container>
        <Grid
          item
          xs={12}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          minHeight={'40vh'}
        >
          <QueryClientProvider client={queryClient}>
            <TableProvider
              service={BudgetService}
              cells={headCells}
              queryClient={queryClient}
            />
          </QueryClientProvider>
        </Grid>
      </Grid>
    </Card>
  );
};

export const TableProvider = ({ service, cells, queryClient }) => {
  const { isLoading, error, data } = useQuery('rowData', () => {
    return service.findAll();
  });
  const deleteMutation = useMutation(
    (records) => {
      return service.remove({ ids: records });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('rowData');
      },
    },
  );

  const getUniqueId = (row) => {
    return row.id;
  };

  const deleteRecords = (records) => {
    deleteMutation.mutate(records);
  };

  if (isLoading) return <Loader />;
  if (error) return <Error />;
  if (!data || data.length === 0) return <NoContent />;

  return (
    <Table
      headCells={cells}
      rows={data}
      getUniqueId={getUniqueId}
      deleteRecords={deleteRecords}
    />
  );
};