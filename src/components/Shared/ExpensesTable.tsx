import { Table, Tag } from 'antd';
import { useEffect, useState } from 'react';

import { CiEdit } from 'react-icons/ci';
import useModal from '~/hooks/useModal';
import CreateExpensesForm from '../Outcome/CreateExpensesForm';
import dayjs from 'dayjs';
import { Expenses } from '~/types/types';

interface Interface {
    data: Expenses[];
}

const ExpensesTable = ({ data }: Interface) => {
    const [selectedValues, setSelectedValues] =
        useState<Partial<Expenses> | null>(null);

    const handleEditClick = ({
        expenseId,
        costCenterId,
        spentId,
        projectedAmount,
        executedAmount,
    }: Partial<Expenses>) => {
        setSelectedValues({
            expenseId,
            costCenterId,
            spentId,
            projectedAmount,
            executedAmount,
        });
    };

    useEffect(() => {
        if (selectedValues !== null) {
            openModal();
        }
    }, [selectedValues]);

    const { openModal, ModalWrapper, closeModal } = useModal();

    const columns = [
        {
            title: 'Centro de Costos',
            dataIndex: ['costCenter', 'name'],
        },
        { title: 'Categoría', dataIndex: ['spent', 'denomination'] },
        {
            title: 'Proyectado',
            dataIndex: 'projectedAmount',
            render: (_: any, { projectedAmount }: Expenses) => {
                return <Tag color="green">{projectedAmount}</Tag>;
            },
        },
        {
            title: 'Ejecutado',
            dataIndex: 'executedAmount',
            render: (_: any, { projectedAmount, executedAmount }: Expenses) => {
                const textColor =
                    executedAmount > projectedAmount ? 'red' : 'geekblue';
                return <Tag color={textColor}>{executedAmount}</Tag>;
            },
        },
        {
            title: 'Fecha',
            dataIndex: 'date',
            render: (_: any, { date }: Expenses) => {
                return <Tag>{dayjs(date).format('DD/MM/YYYY')}</Tag>;
            },
        },
        {
            title: 'Editar',
            key: '',
            render: (
                _: any,
                {
                    expenseId,
                    costCenterId,
                    spentId,
                    projectedAmount,
                    executedAmount,
                }: Expenses
            ) => {
                return (
                    <CiEdit
                        onClick={() =>
                            handleEditClick({
                                expenseId,
                                costCenterId,
                                spentId,
                                projectedAmount,
                                executedAmount,
                            })
                        }
                        className="text-2xl text-amber-500 rounded-lg cursor-pointer"
                    />
                );
            },
        },
    ];
    return (
        <>
            <ModalWrapper title="Editar Egreso">
                <CreateExpensesForm
                    toEditValues={selectedValues}
                    closeModal={closeModal}
                />
            </ModalWrapper>
            <Table rowKey="expenseId" dataSource={data} columns={columns} />
        </>
    );
};

export default ExpensesTable;
