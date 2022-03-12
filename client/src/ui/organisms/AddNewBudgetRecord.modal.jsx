import {Modal} from 'ui/molecules/Modal';
import {Controller, useForm} from "react-hook-form";
import {FormControl, TextField} from "@mui/material";
import * as React from "react";
import {SelectField} from "./AddNewLedgerRecord.modal";

export const AddNewBudgetRecord = ({isOpen, setIsOpen}) => {
    const {handleSubmit, control} = useForm();
    const onSubmit = (data) => console.log(data);
    if (isOpen) {
        return (
            <Modal title="Zdefiniuj budżet" isOpen={isOpen} setIsOpen={setIsOpen} onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth>
                    <Controller
                        name={'amount'}
                        control={control}
                        render={({field: {onChange, value}}) => (
                            <TextField onChange={onChange} value={value} label={'Kwota'}/>
                        )}
                    />
                    <Controller
                        name={'category'}
                        control={control}
                        render={({field: {onChange, value}}) => (
                            <SelectField onChange={onChange} value={value}/>
                        )}
                    />
                </FormControl>
            </Modal>
        );
    }
    return <></>;
};
