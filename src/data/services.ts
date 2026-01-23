import { 
  Sparkles, 
  SmilePlus, 
  CircleDot, 
  Stethoscope, 
  ShieldCheck, 
  Heart,
  Zap,
  Scan
} from "lucide-react";

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: typeof Sparkles;
  duration: string;
  benefits: string[];
  whoIsItFor: string;
}

export const services: Service[] = [
  {
    id: "preventive-restorative",
    title: "Preventive & Restorative Care",
    shortDescription: "Comprehensive exams, cleanings, and restorations with a prevention-first focus.",
    fullDescription: "Experienced in simple and complex restorations as well as full coverage restorations, with treatment plans tailored to each patient.",
    icon: Heart,
    duration: "Varies by visit",
    benefits: [
      "Personalized treatment planning",
      "Evidence-based preventive care",
      "Durable restorative outcomes",
      "Clear patient communication"
    ],
    whoIsItFor: "Patients seeking routine care, restorations, or long-term oral health planning."
  },
  {
    id: "extractions-emergency",
    title: "Extractions & Emergency Care",
    shortDescription: "Same-day relief with gentle extractions and urgent dental care.",
    fullDescription: "Performed routine extractions including simple and partially impacted cases, plus emergency visits to stabilize pain and infection.",
    icon: Zap,
    duration: "Varies by case",
    benefits: [
      "Comfort-focused care",
      "Prompt pain relief",
      "Clear aftercare guidance",
      "Coordinated referrals when needed"
    ],
    whoIsItFor: "Patients with urgent dental issues or teeth that require removal."
  },
  {
    id: "endodontic-therapy",
    title: "Endodontic Therapy",
    shortDescription: "Root canal care for anterior teeth, premolars, and first mandibular molars.",
    fullDescription: "Experienced in endodontic treatment of anterior teeth, premolars, and first mandibular molars with ideal anatomy.",
    icon: Stethoscope,
    duration: "Single or multiple visits",
    benefits: [
      "Preserves natural teeth",
      "Relieves dental pain",
      "Precise clinical technique",
      "Long-term tooth stability"
    ],
    whoIsItFor: "Patients with pulp infection or inflammation requiring root canal therapy."
  },
  {
    id: "dentures-prosthodontics",
    title: "Dentures & Prosthodontics",
    shortDescription: "Partial and complete dentures designed for comfort and function.",
    fullDescription: "Skilled in delivering partial and complete dentures with attention to fit, esthetics, and function.",
    icon: SmilePlus,
    duration: "Multiple visits",
    benefits: [
      "Comfortable fit",
      "Improved chewing and speech",
      "Natural appearance",
      "Patient education and follow-up"
    ],
    whoIsItFor: "Patients needing replacement of multiple or all teeth."
  },
  {
    id: "oral-surgery-biopsy",
    title: "Oral Surgery & Biopsy",
    shortDescription: "Outpatient oral surgery including incisional biopsy and alveoloplasty.",
    fullDescription: "Performed outpatient oral surgery procedures such as incisional biopsy and alveoloplasty with precise surgical technique.",
    icon: Scan,
    duration: "Outpatient visit",
    benefits: [
      "Minimally invasive approach",
      "Accurate diagnostics",
      "Comprehensive aftercare",
      "Coordinated specialty care"
    ],
    whoIsItFor: "Patients requiring surgical evaluation or minor oral surgery."
  },
  {
    id: "oral-cancer-screening",
    title: "Oral Cancer Screening",
    shortDescription: "Early identification of benign, pre-malignant, and malignant lesions.",
    fullDescription: "Experienced in oral cancer screening and identifying early stages of oral cancer, as well as benign and pre-malignant lesions.",
    icon: ShieldCheck,
    duration: "Included in exams",
    benefits: [
      "Early detection focus",
      "Thorough soft-tissue evaluation",
      "Clear referral pathways",
      "Patient education"
    ],
    whoIsItFor: "All patients, especially those seeking comprehensive preventive evaluations."
  },
  {
    id: "invisalign",
    title: "Invisalign Certified Care",
    shortDescription: "Clear aligner therapy delivered by a certified provider.",
    fullDescription: "Invisalign Certification supports evidence-based clear aligner planning and patient guidance.",
    icon: Sparkles,
    duration: "Varies by case",
    benefits: [
      "Discreet treatment option",
      "Customized aligner planning",
      "Patient education and monitoring",
      "Comfort-first approach"
    ],
    whoIsItFor: "Patients interested in clear aligner orthodontic care."
  },
  {
    id: "facial-injectables",
    title: "Facial Injectables & Botox",
    shortDescription: "Certified in facial injectables and Botox for facial esthetics.",
    fullDescription: "Facial injectables and Botox certification reflects training in facial esthetics and patient care.",
    icon: CircleDot,
    duration: "Varies by service",
    benefits: [
      "Certified technique",
      "Aesthetic focus",
      "Patient-centered consultation",
      "Safety-first care"
    ],
    whoIsItFor: "Patients exploring facial esthetic services."
  }
];
