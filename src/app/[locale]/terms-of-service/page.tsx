import {unstable_setRequestLocale} from 'next-intl/server';

import PageComponent from './PageComponent';
import {getNavMenu, getIndexLanguageText} from "~/configs/languageText";
export const runtime = 'edge';
export default async function PageContent({params: {locale = ''}}) {
  // Enable static rendering
  unstable_setRequestLocale(locale);
  const indexLanguageText = await getIndexLanguageText();
  const termsOfServiceLanguageText = null;
  const navMenuText = await getNavMenu();

  return (
    <PageComponent
      locale={locale}
      navMenuText={navMenuText}
      termsOfServiceLanguageText={termsOfServiceLanguageText}
      indexLanguageText={indexLanguageText}
    >
    </PageComponent>
  )

}
