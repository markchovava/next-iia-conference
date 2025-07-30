import { OrderData, OrderInterface } from '@/_data/OrderData'
import { create } from 'zustand'



interface OrderStore {
    data: OrderInterface
    setData: (name: keyof OrderInterface, value: string) => void
    resetData: () => void
}

export const useOrderStore = create<OrderStore>()((set) => ({
    data: OrderData,
    setData: (name: keyof OrderInterface, value: string) =>
        set((state: OrderStore) => ({
            data: {
                ...state.data,
                [name]: value, 
            },
        })),
    resetData: () =>
        set({
            data: OrderData,
        }),
}))