import reviewsData from "../../reviews.json";

export interface Review {
  id: string;
  name: string;
  treatment: string;
  rating: number;
  review: string;
  date: string;
  verified: boolean;
}

export const reviews: Review[] = reviewsData as Review[];

const uniqueTreatments = Array.from(new Set(reviews.map((r) => r.treatment)));
// Ensure "Other" is at the end if you want, or just default sort
export const treatmentTypes = uniqueTreatments.sort();
