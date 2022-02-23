import { useMutation, useQuery } from 'react-query';
import { Error, Loader, NoContent, Table } from 'ui';

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
