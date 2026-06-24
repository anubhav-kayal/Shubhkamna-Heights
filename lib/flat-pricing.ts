import type { FloorPlan } from '@/types';

export const BASIC_PRICE_PER_SQFT = 4500;
export const DISCOUNTED_PRICE_PER_SQFT = 4100;

export interface FlatUnitOption {
  id: string;
  bhkType: '2BHK' | '3BHK';
  saleableAreaSqFt: number;
  label: string;
}

/** Official saleable areas from the Shubh Kamna Heights price list */
export const FLAT_UNIT_OPTIONS: FlatUnitOption[] = [
  { id: 'flat-2bhk-1292', bhkType: '2BHK', saleableAreaSqFt: 1292, label: '2 BHK · 1292 sq.ft' },
  { id: 'flat-3bhk-1690', bhkType: '3BHK', saleableAreaSqFt: 1690, label: '3 BHK · 1690 sq.ft' },
  { id: 'flat-3bhk-1700', bhkType: '3BHK', saleableAreaSqFt: 1700, label: '3 BHK · 1700 sq.ft' },
  { id: 'flat-3bhk-1702', bhkType: '3BHK', saleableAreaSqFt: 1702, label: '3 BHK · 1702 sq.ft' },
  { id: 'flat-3bhk-1730', bhkType: '3BHK', saleableAreaSqFt: 1730, label: '3 BHK · 1730 sq.ft' },
  { id: 'flat-3bhk-1801', bhkType: '3BHK', saleableAreaSqFt: 1801, label: '3 BHK · 1801 sq.ft' },
  { id: 'flat-3bhk-1806', bhkType: '3BHK', saleableAreaSqFt: 1806, label: '3 BHK · 1806 sq.ft' },
  { id: 'flat-3bhk-1913', bhkType: '3BHK', saleableAreaSqFt: 1913, label: '3 BHK · 1913 sq.ft' },
];

export const DEFAULT_FLAT_UNIT_ID = FLAT_UNIT_OPTIONS[0].id;

export function getFlatUnitOption(id: string): FlatUnitOption {
  return FLAT_UNIT_OPTIONS.find((option) => option.id === id) ?? FLAT_UNIT_OPTIONS[0];
}

export function getFlatUnitsByBhk(bhkType: '2BHK' | '3BHK'): FlatUnitOption[] {
  return FLAT_UNIT_OPTIONS.filter((option) => option.bhkType === bhkType);
}

export function getDiscountedFlatPrice(areaSqFt: number, pricePerSqft = DISCOUNTED_PRICE_PER_SQFT): number {
  return areaSqFt * pricePerSqft;
}

export function buildOfficialFloorPlans(
  imageUrlForUnit: (unitId: string, bhkType: '2BHK' | '3BHK') => string,
): Record<'2BHK' | '3BHK', FloorPlan[]> {
  const plans = FLAT_UNIT_OPTIONS.map((unit) => ({
    id: unit.id,
    type: unit.bhkType,
    unitLabel: unit.label,
    imageUrl: imageUrlForUnit(unit.id, unit.bhkType),
    carpetArea: unit.saleableAreaSqFt,
    superArea: unit.saleableAreaSqFt,
    price: getDiscountedFlatPrice(unit.saleableAreaSqFt),
    active: true,
  }));

  return {
    '2BHK': plans.filter((plan) => plan.type === '2BHK'),
    '3BHK': plans.filter((plan) => plan.type === '3BHK'),
  };
}
