export interface Review {
  id: string;
  name: string;
  treatment: string;
  rating: number;
  review: string;
  date: string;
  verified: boolean;
}

export const reviews: Review[] = [
  {
    id: "1",
    name: "Megan R.",
    treatment: "Preventive & Restorative Care",
    rating: 5,
    review: "Dr. Sharma was thorough, calm, and very clear about my treatment plan. My fillings look great and the whole visit felt organized and patient-focused.",
    date: "2025-11-18",
    verified: true
  },
  {
    id: "2",
    name: "Arjun P.",
    treatment: "Extractions & Emergency Care",
    rating: 5,
    review: "I came in with severe pain and Dr. Sharma fit me in the same day. The extraction was smooth and I felt relief immediately. Excellent follow-up and aftercare guidance.",
    date: "2025-10-29",
    verified: true
  },
  {
    id: "3",
    name: "Lila C.",
    treatment: "Endodontic Therapy",
    rating: 5,
    review: "I was anxious about a root canal, but Dr. Sharma explained every step and made it comfortable. The tooth feels great and I appreciated the attention to detail.",
    date: "2025-09-12",
    verified: true
  },
  {
    id: "4",
    name: "George T.",
    treatment: "Dentures & Prosthodontics",
    rating: 4,
    review: "My partial denture fits comfortably and looks natural. Dr. Sharma was patient with adjustments and made sure everything felt right before finalizing.",
    date: "2025-08-20",
    verified: true
  },
  {
    id: "5",
    name: "Sofia N.",
    treatment: "Oral Cancer Screening",
    rating: 5,
    review: "Dr. Sharma performed a thorough screening and explained what she was looking for. I left feeling informed and reassured about my oral health.",
    date: "2025-07-08",
    verified: true
  },
  {
    id: "6",
    name: "Ben H.",
    treatment: "Oral Surgery & Biopsy",
    rating: 5,
    review: "I needed a biopsy and Dr. Sharma handled it with precision and care. The procedure was quick and she clearly explained the results and next steps.",
    date: "2025-06-16",
    verified: true
  },
  {
    id: "7",
    name: "Nina S.",
    treatment: "Invisalign Certified Care",
    rating: 5,
    review: "I chose Dr. Sharma for Invisalign and felt supported the entire time. She was proactive with check-ins and my alignment improved steadily.",
    date: "2025-05-02",
    verified: true
  },
  {
    id: "8",
    name: "Kara M.",
    treatment: "Facial Injectables & Botox",
    rating: 5,
    review: "Dr. Sharma has a steady hand and a great aesthetic eye. I felt safe and comfortable, and the results were subtle and natural.",
    date: "2025-04-19",
    verified: true
  }
];

export const treatmentTypes = [
  "Preventive & Restorative Care",
  "Extractions & Emergency Care",
  "Endodontic Therapy",
  "Dentures & Prosthodontics",
  "Oral Surgery & Biopsy",
  "Oral Cancer Screening",
  "Invisalign Certified Care",
  "Facial Injectables & Botox",
  "Other"
];
