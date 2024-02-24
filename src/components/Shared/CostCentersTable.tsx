import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import useModal from '~/hooks/useModal';
import { CostCenters } from '~/types/types';
import CreateCostCenterForm from '../CostCenters/CreateCostCenterForm';

interface Interface {
    data: CostCenters[];
}

const CostCentersTable = ({ data }: Interface) => {
    const [selectedValues, setSelectedValues] =
        useState<Partial<CostCenters> | null>(null);

    const handleEditClick = ({
        costCenterId,
        gerencyCode,
        areaCode,
        officeCode,
        code,
        name,
    }: Partial<CostCenters>) => {
        setSelectedValues({
            costCenterId,
            gerencyCode,
            areaCode,
            officeCode,
            code,
            name,
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
            title: 'Gerencia',
            dataIndex: 'gerencyCode',
        },
        {
            title: 'Area',
            dataIndex: 'areaCode',
        },
        {
            title: 'Oficina',
            dataIndex: 'officeCode',
        },
        {
            title: 'Código',
            dataIndex: 'code',
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
        },
        {
            title: 'Editar',
            key: '',
            render: (
                _: any,
                {
                    costCenterId,
                    gerencyCode,
                    areaCode,
                    officeCode,
                    code,
                    name,
                }: CostCenters
            ) => {
                return (
                    <CiEdit
                        onClick={() =>
                            handleEditClick({
                                costCenterId,
                                gerencyCode,
                                areaCode,
                                officeCode,
                                code,
                                name,
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
            <ModalWrapper title="Editar Centro de Costos">
                <CreateCostCenterForm
                    toEditValues={selectedValues}
                    closeModal={closeModal}
                />
            </ModalWrapper>
            <Table rowKey="costCenterId" dataSource={data} columns={columns} />
        </>
    );
};

export default CostCentersTable;
