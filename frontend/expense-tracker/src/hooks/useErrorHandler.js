import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export const useErrorHandler = () => {
  const queryClient = useQueryClient()

  const handleError = (error, customMessage = null) => {
    let errorMessage = customMessage

    if (!errorMessage) {
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.message) {
        errorMessage = error.message
      } else {
        errorMessage = 'An unexpected error occurred'
      }
    }

    // Handle specific error types
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem('token')
      window.location.href = '/login'
      return
    }

    if (error.response?.status === 403) {
      errorMessage = 'You do not have permission to perform this action'
    }

    if (error.response?.status === 404) {
      errorMessage = 'The requested resource was not found'
    }

    if (error.response?.status >= 500) {
      errorMessage = 'Server error. Please try again later'
    }

    // Show error toast
    toast.error(errorMessage)

    // Log error for debugging
    console.error('Error details:', error)
  }

  const handleNetworkError = () => {
    toast.error('Network error. Please check your connection and try again.')
  }

  const handleTimeoutError = () => {
    toast.error('Request timeout. Please try again.')
  }

  return {
    handleError,
    handleNetworkError,
    handleTimeoutError,
  }
}
