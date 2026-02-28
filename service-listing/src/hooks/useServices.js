import { useQuery } from '@tanstack/react-query'
import servicesData from '../data/services.json'

// Simulates an async data fetch (replaced with real API endpoint in production)
const fetchServices = async () => {
  await new Promise((resolve) => setTimeout(resolve, 400))
  return servicesData
}

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
    staleTime: 5 * 60 * 1000,
  })
}

export function useServiceById(id) {
  return useQuery({
    queryKey: ['services', id],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 200))
      const service = servicesData.find((s) => s.id === id)
      if (!service) throw new Error('Service not found')
      return service
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  })
}
