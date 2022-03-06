import {Modal} from 'ui/molecules/Modal';

export const AddNewBudgetRecord = ({isOpen, setIsOpen}) => {
    if (isOpen) {
        return <Modal title="Zdefiniuj budżet" isOpen={isOpen} setIsOpen={setIsOpen}/>;
    }
    return <></>;
};
