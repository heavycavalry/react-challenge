import {Modal} from 'ui/molecules/Modal';

export const AddNewLedgerRecord = ({type, isOpen, setIsOpen}) => {

    if (type === 'INCOME') {
        return <Modal title="Dodaj wpływ" isOpen={isOpen} setIsOpen={setIsOpen}></Modal>;
    }
    if (type === 'EXPENSE') {
        return <Modal title="Dodaj wydatek" isOpen={isOpen} setIsOpen={setIsOpen}></Modal>;
    }
    return <></>;
};
