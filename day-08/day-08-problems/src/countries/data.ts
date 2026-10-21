export type Region = "Africa" | "Asia" | "Europe" | "Americas";

export interface Country {
  code: string;
  name: string;
  region: Region;
  population: number;
}

export const COUNTRIES: Country[] = [
  { code: "EG", name: "Egypt", region: "Africa", population: 114 },
  { code: "NG", name: "Nigeria", region: "Africa", population: 227 },
  { code: "MA", name: "Morocco", region: "Africa", population: 38 },
  { code: "KE", name: "Kenya", region: "Africa", population: 56 },
  { code: "JP", name: "Japan", region: "Asia", population: 124 },
  { code: "IN", name: "India", region: "Asia", population: 1441 },
  { code: "SA", name: "Saudi Arabia", region: "Asia", population: 33 },
  { code: "DE", name: "Germany", region: "Europe", population: 84 },
  { code: "FR", name: "France", region: "Europe", population: 68 },
  { code: "IT", name: "Italy", region: "Europe", population: 59 },
  { code: "BR", name: "Brazil", region: "Americas", population: 216 },
  { code: "CA", name: "Canada", region: "Americas", population: 40 },
];
