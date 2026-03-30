interface AboutSeoTitleInput {
  heroBadge?: string;
  heroTitle?: string;
}

export function getAboutSeoTitle(aboutPage: AboutSeoTitleInput) {
  return aboutPage.heroTitle?.trim() || aboutPage.heroBadge?.trim() || "About";
}
