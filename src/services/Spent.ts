import apiClient from "./apiClient"

interface IncomeService {
	[key: string]: () => Promise<any>;
}

const incomeService: IncomeService = {}

incomeService["getExpenses"] = () => {
	return apiClient({
		url: `expenses`,
		method: 'get',
	})
}

export default incomeService
