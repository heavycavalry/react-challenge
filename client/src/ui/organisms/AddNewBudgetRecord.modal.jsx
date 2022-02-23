import { Modal } from 'ui/molecules/Modal';

export const AddNewBudgetRecord = ({ isOpen }) => {
  if (isOpen) {
    return <Modal title="Zdefiniuj budżet" />;
  }
  return <></>;
};
