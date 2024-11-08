import React from 'react'

import { useParams } from 'next/navigation'

import PaymentForm from "@components/payment/PaymentForm"
import OrderSummaryCard from '@components/payment/OrderSummary'

const plans = [
  {
    id: 1,
    name: 'Basic',
    price: 10,
    credits: 100,
  },
  {
    id: 2,
    name: 'Pro',
    price: 20,
    credits: 100,
  },
  {
    id: 3,
    name: 'Enterprise',
    price: 30,
    credits: 100,
  }
]

const Payment = () => {

  const { id } = useParams<{ id: string }>()

  return (
    <div className='pb-4 px-12 flex flex-col md:grid md:grid-cols-[60%_40%] gap-8 items-center justify-center'>
      <PaymentForm />
      <OrderSummaryCard
        packageName={plans[id].name}
        credits={plans[id].credits}
        price={plans[id].price}
        processingFee={1}
        />
    </div>
  )
}

export default Payment;