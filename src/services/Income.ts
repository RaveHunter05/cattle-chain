import apiClient from "./apiClient"

interface IncomeService {
	[key: string]: () => Promise<any>;
}

const incomeService: IncomeService = {}

incomeService["getIncomes"] = () => {
	return apiClient({
		url: `incomes`,
		method: 'get',
	})
}

export default incomeService
