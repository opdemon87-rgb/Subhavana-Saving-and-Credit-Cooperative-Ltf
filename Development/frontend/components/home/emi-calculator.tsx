
'use client'

import { useState } from 'react'
import { formatNPR } from '@/lib/format'

export function EmiCalculator() {
  // Store the loan details entered by the user.
  const [amount, setAmount] = useState(1000000)
  const [rate, setRate] = useState(12.5)
  const [years, setYears] = useState(5)

  // Convert the loan duration from years into months.
  const months = years * 12

  // Convert the annual interest rate into a monthly rate.
  const monthlyRate = rate / 12 / 100

  // Calculate the monthly EMI using the standard EMI formula.
  const emi =
    monthlyRate === 0
      ? amount / months
      : (amount *
          monthlyRate *
          Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)

  // Calculate the total repayment and interest.
  const totalPayment = emi * months
  const totalInterest = totalPayment - amount

  return (
    <div
      id="emi"
      className="rounded-3xl border bg-background p-6 shadow-sm md:p-8"
    >
      <h3 className="text-xl font-bold">EMI Calculator</h3>

      <div className="mt-6 space-y-5">
        {/* Loan amount input */}
        <div>
          <label htmlFor="loan-amount" className="text-sm font-medium">
            Loan Amount (NPR)
          </label>
          <input
            id="loan-amount"
            type="number"
            min="50000"
            max="10000000"
            step="50000"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="mt-2 w-full rounded-lg border bg-background p-3"
          />
        </div>

        {/* Annual interest rate input */}
        <div>
          <label htmlFor="interest-rate" className="text-sm font-medium">
            Interest Rate (% per year)
          </label>
          <input
            id="interest-rate"
            type="number"
            min="0"
            max="30"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="mt-2 w-full rounded-lg border bg-background p-3"
          />
        </div>

        {/* Loan duration input */}
        <div>
          <label htmlFor="loan-years" className="text-sm font-medium">
            Loan Duration (Years)
          </label>
          <input
            id="loan-years"
            type="number"
            min="1"
            max="20"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="mt-2 w-full rounded-lg border bg-background p-3"
          />
        </div>
      </div>

      {/* Display the calculated monthly installment */}
      <div className="mt-6 rounded-2xl bg-primary p-5 text-primary-foreground">
        <p className="text-sm">Monthly Installment (EMI)</p>
        <p className="mt-2 text-3xl font-bold">
          {formatNPR(emi)}
        </p>

        {/* Show the total repayment and interest */}
        <div className="mt-4 space-y-2 text-sm">
          <p>
            Loan Principal: {formatNPR(amount)}
          </p>
          <p>
            Total Interest: {formatNPR(totalInterest)}
          </p>
          <p>
            Total Repayment: {formatNPR(totalPayment)}
          </p>
        </div>
      </div>
    </div>
  )
}