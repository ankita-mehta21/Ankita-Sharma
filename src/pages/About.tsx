import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const summary =
  "A California Board Certified Dentist with over 3.5 years of experience providing a full array of preventive and restorative dental services, patient care, and dental surgeries. Proven track record of improving patient satisfaction by providing superior dental care to a diverse patient base. Experienced in procedures associated with oral cancer screening and identifying early stages of oral cancer, oral benign, and pre-malignant lesions. Strong interpersonal and time management skills.";

const education = [
  {
    date: "09/2021",
    degree: "Doctor of Dental Medicine (DMD), Advanced Standing",
    school: "Henry M. Goldman School of Dental Sciences",
    location: "Boston, MA",
  },
  {
    date: "07/2017",
    degree: "BDS, MDS (Oral and Maxillofacial Pathology)",
    school: "Manipal College of Dental Sciences",
    location: "Mangalore, India",
  },
];

const certifications = [
  "Invisalign Certification",
  "Facial injectables and Botox Certified",
];

const publications = [
  "Understanding patterns of invasion: a novel approach to assessment of podoplanin expression in prediction of lymph node metastasis in OSCC, Sharma A, Boaz K, N. Srikant, Histopathology, 72, 4, 672-678, 2018",
  "Dysgenetic Polycystic Disease of Minor Salivary Gland: A Rare Case Report and Review of the Literature, N. Srikant, Shweta Yellapurkar, Karen Boaz, Mohan Baliga, Nidhi Manaktala, Ankita Sharma, Shakthi Dorai, Prajwal Pai, Case Reports in Pathology, 2017, 5279025, 5, 2017",
  "Rapidly Enlarging Swelling of the Palate: A Case Report, K. Boaz, A. Sharma, N. Srikant, Journal of Oral and Maxillofacial Surgery, Medicine and Pathology, Japanese Editorial, 29, 6, 576-580, 2017",
  "Vitality and accuracy of age estimation using tooth coronal index, cementum and sclerosis index, Reddy BM, Natarajan S, Sharma A, Dorai SB, JCDUR, 7, 2, 3-7, 2016",
  "Rhinocerebral mucormycosis: a systematic review of case reports and case series from a global perspective, Kumar M et al., Oral Surg Oral Med Oral Pathol Oral Radiol, 134, 6, 708-716, 2022",
];

const experience = [
  {
    dates: "06/2022 - Current",
    role: "General Dentist",
    organization: "Family Health Care",
    location: "Baldwin, MI",
    bullets: [
      "Performed routine dental procedures including extractions (simple and partially impacted), simple and complex restorations, full coverage restorations, partial and complete dentures, emergency care, endodontic treatment of anterior teeth, premolars, and first mandibular molars with ideal anatomy, and outpatient oral surgery procedures (e.g. incisional biopsy, alveoloplasty).",
      "Diagnosis and treatment planning for oral benign, pre-malignant, and malignant lesions.",
      "Conducted patient assessments and developed tailored treatment plans.",
      "Collaborated with dental specialists to ensure comprehensive patient care.",
      "Trained and supervised dental assistants in daily clinical operations.",
      "Communicated treatment options and procedures clearly to patients.",
      "Managed appointment scheduling and patient follow-ups to enhance clinic efficiency.",
      "Engaged in community outreach programs to promote oral health awareness.",
    ],
  },
  {
    dates: "10/2021 - 05/2022",
    role: "General Dentist",
    organization: "Royal Dental Clinic",
    location: "Pontiac, MI",
    bullets: [],
  },
  {
    dates: "11/2017 - 11/2017",
    role: "Shadowed Dr. Joseph Leonetti",
    organization: "MainLine Centre",
    location: "Paoli, PA",
    bullets: [
      "Assisted in patient evaluations to gather health history and clinical information.",
      "Observed treatment procedures to learn advanced techniques in patient care.",
      "Shadowed dental specialists to understand diverse treatment approaches and methodologies.",
    ],
  },
];

const languages = [
  { language: "English", level: "Fluent/Full professional proficiency" },
  { language: "Hindi", level: "Native/Bilingual" },
];

const additionalDetails = [
  "H1-B visa status (CAP exempt) with PERM approved.",
  "Resume Reference: #HRJ#42 930574-4 511-4ce5-ab3b-e041e6eb4466#",
];

export default function About() {
  return (
    <Layout>
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <AnimateOnScroll animation="fade-up">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Portfolio
              </span>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={100}>
              <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
                Dr. Ankita Sharma, DMD, MDS
              </h1>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={200}>
              <p className="text-lg text-muted-foreground">
                California Board Certified Dentist focused on preventive, restorative, and surgical care with a
                patient-centered approach.
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                <span>ankita.omfp@outlook.com</span>
                <span className="hidden sm:inline">|</span>
                <span>Baldwin, MI (Current Practice)</span>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <AnimateOnScroll animation="fade-up">
            <SectionHeader badge="Summary" title="Professional Overview" />
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={100}>
            <div className="glass-card p-8 rounded-3xl">
              <p className="text-muted-foreground leading-relaxed">{summary}</p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <AnimateOnScroll animation="fade-up">
            <SectionHeader badge="Credentials" title="Education & Certifications" />
          </AnimateOnScroll>
          <div className="grid lg:grid-cols-2 gap-8">
            <AnimateOnScroll animation="fade-right" delay={100}>
              <div className="glass-card p-8 rounded-3xl h-full">
                <h3 className="font-display text-xl font-semibold mb-4">Education</h3>
                <div className="space-y-4">
                  {education.map((item) => (
                    <div key={item.degree} className="border-l-2 border-primary/20 pl-4">
                      <p className="text-primary font-semibold">{item.date}</p>
                      <p className="font-semibold text-foreground">{item.degree}</p>
                      <p className="text-sm text-muted-foreground">{item.school}</p>
                      <p className="text-sm text-muted-foreground">{item.location}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-left" delay={100}>
              <div className="glass-card p-8 rounded-3xl h-full">
                <h3 className="font-display text-xl font-semibold mb-4">Certifications</h3>
                <ul className="space-y-3 text-muted-foreground">
                  {certifications.map((cert) => (
                    <li key={cert} className="flex items-start gap-2">
                      <span className="w-2 h-2 mt-2 rounded-full bg-primary" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section id="experience" className="section-padding">
        <div className="container-wide">
          <AnimateOnScroll animation="fade-up">
            <SectionHeader badge="Experience" title="Clinical Roles" />
          </AnimateOnScroll>
          <div className="space-y-6">
            {experience.map((role, index) => (
              <AnimateOnScroll key={role.organization} animation="fade-up" delay={index * 100}>
                <div className="glass-card p-8 rounded-3xl">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-foreground">{role.role}</h3>
                      <p className="text-muted-foreground">
                        {role.organization} - {role.location}
                      </p>
                    </div>
                    <p className="text-primary font-semibold">{role.dates}</p>
                  </div>
                  {role.bullets.length > 0 ? (
                    <ul className="space-y-2 text-muted-foreground">
                      {role.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2">
                          <span className="w-2 h-2 mt-2 rounded-full bg-primary" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">General dentistry role supporting comprehensive patient care.</p>
                  )}
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section id="publications" className="section-padding bg-muted/30">
        <div className="container-wide">
          <AnimateOnScroll animation="fade-up">
            <SectionHeader badge="Research" title="Publications" />
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={100}>
            <div className="glass-card p-8 rounded-3xl">
              <ol className="space-y-4 text-muted-foreground list-decimal list-inside">
                {publications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-8">
            <AnimateOnScroll animation="fade-right">
              <div className="glass-card p-8 rounded-3xl h-full">
                <SectionHeader badge="Languages" title="Language Proficiency" align="left" className="mb-6" />
                <ul className="mt-6 space-y-3 text-muted-foreground">
                  {languages.map((language) => (
                    <li key={language.language} className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">{language.language}</span>
                      <span>{language.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-left">
              <div className="glass-card p-8 rounded-3xl h-full">
                <SectionHeader badge="Additional" title="Professional Details" align="left" className="mb-6" />
                <ul className="mt-6 space-y-3 text-muted-foreground">
                  {additionalDetails.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="w-2 h-2 mt-2 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </Layout>
  );
}
