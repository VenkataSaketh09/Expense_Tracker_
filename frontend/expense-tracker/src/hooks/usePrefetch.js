import { useQueryClient } from '@tanstack/react-query'
import { queryKeys } from './useQueries'
import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPaths'

export const usePrefetch = () => {
  const queryClient = useQueryClient()

  const prefetchDashboard = async () => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.dashboard,
      queryFn: async () => {
        const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA)
        return response.data
      },
      staleTime: 2 * 60 * 1000,
    })
  }

  const prefetchExpenses = async () => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.expenses,
      queryFn: async () => {
        const response = await axiosInstance.get(API_PATHS.Expense.GET_ALL_Expense)
        return response.data.expense || []
      },
      staleTime: 1 * 60 * 1000,
    })
  }

  const prefetchIncome = async () => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.income,
      queryFn: async () => {
        const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME)
        return response.data.income || []
      },
      staleTime: 1 * 60 * 1000,
    })
  }

  const prefetchUserInfo = async () => {
    if (localStorage.getItem('token')) {
      await queryClient.prefetchQuery({
        queryKey: queryKeys.user,
        queryFn: async () => {
          const response = await axiosInstance.get(API_PATHS.Auth.GET_USER_INFO)
          return response.data
        },
        staleTime: 10 * 60 * 1000,
      })
    }
  }

  const prefetchAll = async () => {
    try {
      await Promise.all([
        prefetchDashboard(),
        prefetchExpenses(),
        prefetchIncome(),
        prefetchUserInfo(),
      ])
    } catch (error) {
      console.error('Prefetch error:', error)
    }
  }

  return {
    prefetchDashboard,
    prefetchExpenses,
    prefetchIncome,
    prefetchUserInfo,
    prefetchAll,
  }
}
