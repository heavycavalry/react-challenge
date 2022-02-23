import { Modal } from 'ui/molecules/Modal';

export const AddNewLedgerRecord = ({ type }) => {
  if (type === 'INCOME') {
    return <Modal title="Dodaj wpływ">WPŁYW</Modal>;
  }
  if (type === 'EXPENSE') {
    return <Modal title="Dodaj wydatek">WYDATEK</Modal>;
  }
  return <></>;
};
