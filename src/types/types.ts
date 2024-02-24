export type Incomes = {
    incomeId: any;
    serviceId: number;
    costCenterId: number;
    projectedAmount: number;
    executedAmount: number;
    date: Date;
}

export type Expenses = {
    expenseId: any;
    costCenterId: number;
    spentId: number;
    projectedAmount: number;
    executedAmount: number;
    date: Date;
}

export type CostCenters = {
    costCenterId: number;
    gerencyCode: string;
    areaCode: string;
    officeCode: string;
    code: string;
    name: string;
};

export type Services = {
    serviceId: number;
    code: string;
    name: string;
};

export type Spents = {
	spentId: number;
	category: string;
	denomination: string;
}
