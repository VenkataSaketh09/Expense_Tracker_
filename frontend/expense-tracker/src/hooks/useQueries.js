import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPaths'
import toast from 'react-hot-toast'

// Query Keys
export const queryKeys = {
  dashboard: ['dashboard'],
  expenses: ['expenses'],
  income: ['income'],
  user: ['user'],
}

// Dashboard Queries
export const useDashboardData = () => {
  return useQuery({
    queryKey: queryKeys.dashboard,
    queryFn: async () => {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA)
      return response.data
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  })
}

// Expense Queries
export const useExpenses = () => {
  return useQuery({
    queryKey: queryKeys.expenses,
    queryFn: async () => {
      const response = await axiosInstance.get(API_PATHS.Expense.GET_ALL_Expense)
      return response.data.expense || []
    },
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 3 * 60 * 1000, // 3 minutes
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  })
}

export const useAddExpense = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (expenseData) => {
      const response = await axiosInstance.post(API_PATHS.Expense.ADD_Expense, expenseData)
      return response.data
    },
    onMutate: async (newExpense) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: queryKeys.expenses })
      await queryClient.cancelQueries({ queryKey: queryKeys.dashboard })

      // Snapshot the previous value
      const previousExpenses = queryClient.getQueryData(queryKeys.expenses)
      const previousDashboard = queryClient.getQueryData(queryKeys.dashboard)

      // Optimistically update to the new value
      if (previousExpenses) {
        queryClient.setQueryData(queryKeys.expenses, (old) => [
          ...old,
          { ...newExpense, _id: Date.now().toString(), createdAt: new Date().toISOString() }
        ])
      }

      // Return a context object with the snapshotted value
      return { previousExpenses, previousDashboard }
    },
    onError: (err, newExpense, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousExpenses) {
        queryClient.setQueryData(queryKeys.expenses, context.previousExpenses)
      }
      if (context?.previousDashboard) {
        queryClient.setQueryData(queryKeys.dashboard, context.previousDashboard)
      }
      const errorMessage = err.response?.data?.message || 'Failed to add expense'
      toast.error(`Error: ${errorMessage}`)
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: queryKeys.expenses })
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard })
    },
    onSuccess: () => {
      toast.success('Expense added successfully! 💸')
    },
  })
}

export const useDeleteExpense = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (expenseId) => {
      const response = await axiosInstance.delete(API_PATHS.Expense.DELETE_Expense(expenseId))
      return response.data
    },
    onMutate: async (expenseId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.expenses })
      await queryClient.cancelQueries({ queryKey: queryKeys.dashboard })

      // Snapshot the previous value
      const previousExpenses = queryClient.getQueryData(queryKeys.expenses)
      const previousDashboard = queryClient.getQueryData(queryKeys.dashboard)

      // Optimistically update to the new value
      if (previousExpenses) {
        queryClient.setQueryData(queryKeys.expenses, (old) => 
          old.filter(expense => expense._id !== expenseId)
        )
      }

      // Return a context object with the snapshotted value
      return { previousExpenses, previousDashboard }
    },
    onError: (err, expenseId, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousExpenses) {
        queryClient.setQueryData(queryKeys.expenses, context.previousExpenses)
      }
      if (context?.previousDashboard) {
        queryClient.setQueryData(queryKeys.dashboard, context.previousDashboard)
      }
      const errorMessage = err.response?.data?.message || 'Failed to delete expense'
      toast.error(`Error: ${errorMessage}`)
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: queryKeys.expenses })
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard })
    },
    onSuccess: () => {
      toast.success('Expense deleted successfully! 🗑️')
    },
  })
}

// Income Queries
export const useIncome = () => {
  return useQuery({
    queryKey: queryKeys.income,
    queryFn: async () => {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME)
      return response.data.income || []
    },
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 3 * 60 * 1000, // 3 minutes
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  })
}

export const useAddIncome = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (incomeData) => {
      const response = await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, incomeData)
      return response.data
    },
    onMutate: async (newIncome) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.income })
      await queryClient.cancelQueries({ queryKey: queryKeys.dashboard })

      // Snapshot the previous value
      const previousIncome = queryClient.getQueryData(queryKeys.income)
      const previousDashboard = queryClient.getQueryData(queryKeys.dashboard)

      // Optimistically update to the new value
      if (previousIncome) {
        queryClient.setQueryData(queryKeys.income, (old) => [
          ...old,
          { ...newIncome, _id: Date.now().toString(), createdAt: new Date().toISOString() }
        ])
      }

      // Return a context object with the snapshotted value
      return { previousIncome, previousDashboard }
    },
    onError: (err, newIncome, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousIncome) {
        queryClient.setQueryData(queryKeys.income, context.previousIncome)
      }
      if (context?.previousDashboard) {
        queryClient.setQueryData(queryKeys.dashboard, context.previousDashboard)
      }
      const errorMessage = err.response?.data?.message || 'Failed to add income'
      toast.error(`Error: ${errorMessage}`)
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: queryKeys.income })
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard })
    },
    onSuccess: () => {
      toast.success('Income added successfully! 🎉')
    },
  })
}

export const useDeleteIncome = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (incomeId) => {
      const response = await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(incomeId))
      return response.data
    },
    onMutate: async (incomeId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.income })
      await queryClient.cancelQueries({ queryKey: queryKeys.dashboard })

      // Snapshot the previous value
      const previousIncome = queryClient.getQueryData(queryKeys.income)
      const previousDashboard = queryClient.getQueryData(queryKeys.dashboard)

      // Optimistically update to the new value
      if (previousIncome) {
        queryClient.setQueryData(queryKeys.income, (old) => 
          old.filter(income => income._id !== incomeId)
        )
      }

      // Return a context object with the snapshotted value
      return { previousIncome, previousDashboard }
    },
    onError: (err, incomeId, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousIncome) {
        queryClient.setQueryData(queryKeys.income, context.previousIncome)
      }
      if (context?.previousDashboard) {
        queryClient.setQueryData(queryKeys.dashboard, context.previousDashboard)
      }
      const errorMessage = err.response?.data?.message || 'Failed to delete income'
      toast.error(`Error: ${errorMessage}`)
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: queryKeys.income })
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard })
    },
    onSuccess: () => {
      toast.success('Income deleted successfully! 🗑️')
    },
  })
}

// User Queries
export const useUserInfo = () => {
  return useQuery({
    queryKey: queryKeys.user,
    queryFn: async () => {
      const response = await axiosInstance.get(API_PATHS.Auth.GET_USER_INFO)
      return response.data
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    enabled: !!localStorage.getItem('token'), // Only run if user is authenticated
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  })
}

// Download functions (not mutations since they don't modify data)
export const useDownloadExpenseExcel = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.get(API_PATHS.Expense.DOWNLOAD_Expense, {
        responseType: 'blob',
      })
      return response
    },
    onSuccess: (response) => {
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url

      // Get filename from response headers or use default
      const contentDisposition = response.headers['content-disposition']
      let filename = 'expense_details.xlsx'
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/)
        if (filenameMatch) {
          filename = filenameMatch[1]
        }
      }

      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)

      toast.success('Excel file downloaded successfully! 📊')
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Failed to download file'
      toast.error(`Error: ${errorMessage}`)
    },
  })
}

export const useDownloadIncomeExcel = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: 'blob',
      })
      return response
    },
    onSuccess: (response) => {
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url

      // Get filename from response headers or use default
      const contentDisposition = response.headers['content-disposition']
      let filename = 'income_details.xlsx'
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/)
        if (filenameMatch) {
          filename = filenameMatch[1]
        }
      }

      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)

      toast.success('Excel file downloaded successfully! 📊')
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Failed to download file'
      toast.error(`Error: ${errorMessage}`)
    },
  })
}
