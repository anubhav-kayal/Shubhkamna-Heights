export interface CalculatorInputs {
  flatUnitId: string;
  bhkType: string;
  areaScftFt: number;
  downPaymentPercent: number;
  loanTenureYears: number;
  interestRateAnnual: number;
  pricePerSqft: number;
  gstPercent: number;
  stampDutyPercent: number;
}

export interface CalculatorOutputs {
  totalCost: number;
  gst: number;
  stampDuty: number;
  allInCost: number;
  downPayment: number;
  loanAmount: number;
  monthlyEmi: number;
}

export function calculatePropertyCost(inputs: CalculatorInputs): CalculatorOutputs {
  const { areaScftFt, downPaymentPercent, loanTenureYears, interestRateAnnual, pricePerSqft, gstPercent, stampDutyPercent } = inputs;

  // Base cost
  const totalCost = areaScftFt * pricePerSqft;

  // GST and Stamp Duty
  const gst = totalCost * (gstPercent / 100);
  const stampDuty = totalCost * (stampDutyPercent / 100);
  const allInCost = totalCost + gst + stampDuty;

  // Down payment and loan
  const downPayment = allInCost * (downPaymentPercent / 100);
  const loanAmount = allInCost - downPayment;

  // EMI calculation
  const monthlyRate = interestRateAnnual / 12 / 100;
  const numberOfMonths = loanTenureYears * 12;

  let monthlyEmi = 0;
  if (monthlyRate === 0) {
    monthlyEmi = loanAmount / numberOfMonths;
  } else {
    monthlyEmi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
      (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
  }

  return {
    totalCost,
    gst,
    stampDuty,
    allInCost,
    downPayment,
    loanAmount,
    monthlyEmi,
  };
}

export function formatCurrency(amount: number): string {
  const lakhs = amount / 100000;
  if (lakhs >= 1) {
    return `₹${lakhs.toFixed(2)} L`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function formatEmi(amount: number): string {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}
