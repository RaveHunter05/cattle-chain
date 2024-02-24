import { Typography } from 'antd';
import axios from 'axios';
import { Formik, Field, Form, FieldProps } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeData } from '~/redux/reducers/data/dataSlice';
import { CostCenters } from '~/pages/api/costcenters';
import { Incomes, Services } from '~/types/types';

interface Interface {
    toEditValues?: Partial<Incomes> | null;
    closeModal: () => void;
}

const CreateIncomeForm: React.FC<Interface> = ({
    toEditValues,
    closeModal,
}): React.ReactElement => {
    const [initialValues, setInitialValues] = useState<Partial<Incomes>>({
        serviceId: 2,
        costCenterId: 3,
        projectedAmount: 200,
        executedAmount: 300,
    });

    const dispatch = useDispatch();

    const [costCenters, setCostCenters] = useState<CostCenters[]>([]);
    const [services, setServices] = useState<Services[]>([]);

    useEffect(() => {
        const getCostCenters = async () => {
            try {
                const value = await axios('/api/costcenters');
                setCostCenters(value.data);
            } catch (error) {
                console.log(error);
            }
        };

        const getServices = async () => {
            try {
                const value = await axios('/api/services');
                setServices(value.data);
            } catch (error) {
                console.log(error);
            }
        };

        getCostCenters();
        getServices();
    }, []);

    useEffect(() => {
        if (toEditValues) setInitialValues(toEditValues);
    }, [toEditValues, initialValues]);

    const createIncome = async ({
        serviceId,
        costCenterId,
        projectedAmount,
        executedAmount,
    }: Partial<Incomes>) => {
        await axios.post('/api/incomes', {
            serviceId,
            costCenterId,
            projectedAmount,
            executedAmount,
        });

        alert('Ingreso Creado');
    };

    const updateIncome = async ({
        incomeId,
        serviceId,
        costCenterId,
        projectedAmount,
        executedAmount,
    }: Partial<Incomes>) => {
        await axios.put('/api/incomes', {
            incomeId,
            serviceId,
            costCenterId,
            projectedAmount,
            executedAmount,
        });

        alert('Ingreso Actualizado');
    };

    const handleSubmit = async ({
        incomeId,
        serviceId,
        costCenterId,
        projectedAmount,
        executedAmount,
    }: Partial<Incomes>) => {
        try {
            if (!toEditValues) {
                createIncome({
                    serviceId,
                    costCenterId,
                    projectedAmount,
                    executedAmount,
                });
                return;
            }

            updateIncome({
                incomeId,
                serviceId,
                costCenterId,
                projectedAmount,
                executedAmount,
            });
            return;
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(changeData());
            closeModal();
        }
    };
    const IncomeSchema = yup.object({
        serviceId: yup.string().required('El servicio es requerido'),
        costCenterId: yup.string().required('El centro de costos es requerido'),
        projectedAmount: yup
            .number()
            .min(0, 'Cantidad proyectada debe ser mayor a 0')
            .required('Cantidad proyectada  es requerida'),
        executedAmount: yup
            .number()
            .min(0, 'Cantidad ejecutada ser mayor a 0')
            .required('Cantidad ejecutada es requerida'),
    });
    return (
        <>
            <Formik
                initialValues={toEditValues ? toEditValues : initialValues}
                onSubmit={handleSubmit}
                validationSchema={IncomeSchema}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className="space-y-4 my-2 flex flex-col justify-center items-center mt-4">
                            <section>
                                <Typography.Text className="font-bold text-blue-500">
                                    Servicio
                                </Typography.Text>
                                <Field
                                    as="select"
                                    placeholder="Servicio"
                                    className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="serviceId"
                                >
                                    {services.map((x) => (
                                        <option
                                            key={x.serviceId}
                                            value={x.serviceId}
                                        >
                                            {x.name}
                                        </option>
                                    ))}
                                </Field>
                                {errors.serviceId && touched.serviceId && (
                                    <div>
                                        <span className="text-red-500 text-xs font-bold">
                                            {errors.serviceId}
                                        </span>
                                    </div>
                                )}
                            </section>

                            <section>
                                <Typography.Text className="font-bold text-blue-500">
                                    Centro de Costos
                                </Typography.Text>
                                <Field
                                    as="select"
                                    name="costCenterId"
                                    className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    {costCenters.map((x) => (
                                        <option
                                            value={x.costCenterId}
                                            key={x.costCenterId}
                                        >
                                            {' '}
                                            {x.name}{' '}
                                        </option>
                                    ))}
                                </Field>
                                {errors.costCenterId &&
                                    touched.costCenterId && (
                                        <div>
                                            <span className="text-red-500 text-xs font-bold">
                                                {errors.costCenterId}
                                            </span>
                                        </div>
                                    )}
                            </section>
                            <section>
                                <Typography.Text className="font-bold text-blue-500">
                                    Cantidad proyectada
                                </Typography.Text>
                                <Field
                                    type="text"
                                    placeholder="Candidad Proyectada"
                                    className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="projectedAmount"
                                />
                                {errors.projectedAmount &&
                                    touched.projectedAmount && (
                                        <div>
                                            <span className="text-red-500 text-xs font-bold">
                                                {errors.projectedAmount}
                                            </span>
                                        </div>
                                    )}
                            </section>
                            <section>
                                <Typography.Text className="font-bold text-blue-500">
                                    Cantidad ejecutada
                                </Typography.Text>
                                <Field
                                    type="text"
                                    placeholder="Candidad Ejecutada"
                                    className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="executedAmount"
                                />
                                {errors.executedAmount &&
                                    touched.executedAmount && (
                                        <div>
                                            <span className="text-red-500 text-xs font-bold">
                                                {errors.executedAmount}
                                            </span>
                                        </div>
                                    )}
                            </section>
                            <div className="space-y-2">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                                    {toEditValues
                                        ? 'Editar Ingreso'
                                        : 'Agregar Ingreso'}
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateIncomeForm;
