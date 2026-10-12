
'use client'

import { useState } from 'react'
import { formatNPR } from '@/lib/format'

export function SavingsReturnCalculator() {
  // Store the initial deposit amount and annual interest rate.
  const [amount, setAmount] = useState(500000)
  const [rate, setRate] = useState(8)
  const [years, setYears] = useState(3)

  // Calculate the maturity value using annual compounding.
  const maturity =
    amount * Math.pow(1 + rate / 100, years)

  // Calculate the interest earned from the deposit.
  const interest = maturity - amount

  return (
    <div
      id="savings-calculator"
      className="rounded-3xl border bg-background p-6 shadow-sm md:p-8"
    >
      <h3 className="text-xl font-bold">
        Savings Return Calculator
      </h3>

      <div className="mt-6 space-y-5">
        {/* Deposit amount input */}
        <div>
          <label htmlFor="deposit-amount" className="text-sm font-medium">
            Deposit Amount (NPR)
          </label>
          <input
            id="deposit-amount"
            type="number"
            min="25000"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="mt-2 w-full rounded-lg border bg-background p-3"
          />
        </div>

        {/* Annual interest rate input */}
        <div>
          <label htmlFor="deposit-rate" className="text-sm font-medium">
            Annual Interest Rate (%)
          </label>
          <input
            id="deposit-rate"
            type="number"
            min="0"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="mt-2 w-full rounded-lg border bg-background p-3"
          />
        </div>

        {/* Deposit duration input */}
        <div>
          <label htmlFor="deposit-years" className="text-sm font-medium">
            Duration (Years)
          </label>
          <input
            id="deposit-years"
            type="number"
            min="1"
            max="20"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="mt-2 w-full rounded-lg border bg-background p-3"
          />
        </div>
      </div>

      {/* Display the estimated maturity and interest earned */}
      <div className="mt-6 rounded-2xl bg-primary p-5 text-primary-foreground">
        <p className="text-sm">Maturity Value</p>
        <p className="mt-2 text-3xl font-bold">
          {formatNPR(maturity)}
        </p>

        <div className="mt-4 space-y-2 text-sm">
          <p>Principal: {formatNPR(amount)}</p>
          <p>Interest Earned: {formatNPR(interest)}</p>
        </div>
      </div>
    </div>
  )
}