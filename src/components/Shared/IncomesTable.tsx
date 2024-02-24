import { Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import useModal from '~/hooks/useModal';
import CreateIncomeForm from '../Income/CreateIncomeForm';
import dayjs from 'dayjs';
import { Incomes } from '~/types/types';



interface Interface {
    data: Incomes[];
}

const IncomesTable = ({ data }: Interface) => {
    const [selectedValues, setSelectedValues] =
        useState<Partial<Incomes> | null>(null);

    const handleEditClick = ({
        incomeId,
        serviceId,
        costCenterId,
        projectedAmount,
        executedAmount,
    }: Partial<Incomes>) => {
        setSelectedValues({
            incomeId,
            serviceId,
            costCenterId,
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
            title: 'Código',
            dataIndex: ['service', 'code'],
        },
        {
            title: 'Servicio',
            dataIndex: ['service', 'name'],
        },
        {
            title: 'Proyectado',
            dataIndex: 'projectedAmount',
            render: (_: any, { projectedAmount }: Incomes) => {
                return <Tag color="green">{projectedAmount}</Tag>;
            },
        },
        {
            title: 'Ejecutado',
            dataIndex: 'executedAmount',
            render: (
                _: any,
                { projectedAmount, executedAmount }: Incomes
            ) => {
                const textColor =
                    executedAmount > projectedAmount ? 'red' : 'geekblue';
                return <Tag color={textColor}>{executedAmount}</Tag>;
            },
        },
        {
            title: 'Fecha',
            dataIndex: 'date',
            render: (_: any, { date }: Incomes) => {
                return <Tag>{dayjs(date).format('DD/MM/YYYY')}</Tag>;
            },
        },
        {
            title: 'Editar',
            key: '',
            render: (
                _: any,
                {
                    incomeId,
                    serviceId,
                    costCenterId,
                    projectedAmount,
                    executedAmount,
                }: Incomes
            ) => {
                return (
                    <CiEdit
                        onClick={() =>
                            handleEditClick({
                                incomeId,
                                serviceId,
                                costCenterId,
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
            <ModalWrapper title="Editar Ingresos">
                <CreateIncomeForm
                    toEditValues={selectedValues}
                    closeModal={closeModal}
                />
            </ModalWrapper>
            <Table rowKey="incomeId" dataSource={data} columns={columns} />
        </>
    );
};

export default IncomesTable;
