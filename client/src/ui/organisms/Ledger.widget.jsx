import React from 'react';
import { ActionHeader, Button, Card, ColorBox, LocalizedDate, Money } from 'ui';
import { IconAdd } from 'ui/atoms/button.styled';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { TableProvider } from 'pages/Budget.page';
import { LedgerService } from 'api';
import { Grid } from '@mui/material';
const queryClient = new QueryClient();

const categoryCell = {
  label: 'Kategoria',
  renderCell({ category, mode }) {
    if (mode === 'INCOME') {
      return (
        <Box sx={{ display: 'flex' }}>
          <ColorBox color={category.color} />
          <p>Wpływ</p>
        </Box>
      );
    } else {
      return (
        <Box sx={{ display: 'flex' }}>
          <ColorBox color={category.color} />
          <p>{category.name}</p>
        </Box>
      );
    }
  },
};

const nameCell = {
  label: 'Nazwa',
  renderCell({ title }) {
    return <p>{title}</p>;
  },
};

const dateCell = {
  label: 'Data',
  renderCell({ createdAt }) {
    return <LocalizedDate date={createdAt} />;
  },
};

const amountCell = {
  label: 'Kwota',
  renderCell({ amountInCents, mode }) {
    if (mode === 'INCOME') {
      return (
        <Box sx={{ color: 'green', display: 'flex' }}>
          <span>+</span>
          <Money inCents={amountInCents} />
        </Box>
      );
    } else {
      return (
        <Box sx={{ color: 'red', display: 'flex' }}>
          <span>-</span>
          <Money inCents={amountInCents} />
        </Box>
      );
    }
  },
};

const headCells = [nameCell, categoryCell, dateCell, amountCell];
export const LedgerWidget = () => {
  return (
    <Card
      sx={{ position: 'relative' }}
      title={
        <ActionHeader
          variant={'h1'}
          title="Portfel"
          renderActions={() => (
            <Box sx={{ position: 'absolute', right: '50px' }}>
              <Button
                sx={{ margin: 1.5 }}
                variant="outlined"
                color="primary"
                startIcon={<IconAdd />}
              >
                Wpłać
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<RemoveIcon />}
              >
                Wypłać
              </Button>
            </Box>
          )}
        />
      }
    >
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
          <TableProvider service={LedgerService} cells={headCells} />
        </QueryClientProvider>
      </Grid>
    </Card>
  );
};
