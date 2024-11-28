import {getTranslations} from "next-intl/server";

export const getNavMenu = async () => {
  const navMenuIndex = await getTranslations('NavMenu');
  return {
    name2: navMenuIndex('name2'),
    href2: navMenuIndex('href2'),
  };
}

export const getIndexLanguageText = async () => {
  const tIndex = await getTranslations('IndexPage');
  return {
    title: tIndex('title'),
    description: tIndex('description'),
    h1Text: tIndex('h1Text'),
    pDescription: tIndex('pDescription')
  };
}

export const getWalkthroughLanguageText = async () => {
  const tIndex = null;
  return {
    title: tIndex('title'),
    description: tIndex('description'),
    h1Text: tIndex('h1Text'),
    pDescription: tIndex('pDescription'),
    level_h2:tIndex('level_h2')
  };
}

export const getModApkLanguageText = async () => {
  //const tIndex = await getTranslations('modApkPage');
  const tIndex = null;

  return {
    title: tIndex('title'),
    description: tIndex('description'),
    h1Text: tIndex('h1Text'),
    pDescription: tIndex('pDescription'),
    h2_1: tIndex('h2_1'),
    h2_1_p1: tIndex('h2_1_p1'),
    h2_2: tIndex('h2_2'),
    h2_2_p1: tIndex('h2_2_p1'),
    h2_3: tIndex('h2_3'),
    h2_3_p1: tIndex('h2_3_p1'),
  };
}


export const getQuestionLanguageText = async () => {
  const tIndexQuestion = await getTranslations('indexQuestion');
  return {
    h2_0: tIndexQuestion('h2_0'),
    h2_1: tIndexQuestion('h2_1'),
    h2_1_p1: tIndexQuestion('h2_1_p1'),
    h2_2: tIndexQuestion('h2_2'),
    h2_2_p1: tIndexQuestion('h2_2_p1'),
    h2_3: tIndexQuestion('h2_3'),
    h2_3_p1: tIndexQuestion('h2_3_p1'),
    h2_4: tIndexQuestion('h2_4'),
    h2_4_p1: tIndexQuestion('h2_4_p1'),
    h2_5: tIndexQuestion('h2_5'),
    h2_5_p1: tIndexQuestion('h2_5_p1'),
    h2_6: tIndexQuestion('h2_6'),
    h2_6_p1: tIndexQuestion('h2_6_p1'),
    h2_7: tIndexQuestion('h2_7'),
    h2_7_p1: tIndexQuestion('h2_7_p1'),
  }
}

export const getPlayInfoLanguageText = async () => {
  const tIndexQuestion = await getTranslations('playInfos');
  return {
    h2_0: tIndexQuestion('h2_0'),
    h2_1: tIndexQuestion('h2_1'),
    h2_1_p1: tIndexQuestion('h2_1_p1'),
    h2_2: tIndexQuestion('h2_2'),
    h2_2_p1: tIndexQuestion('h2_2_p1'),
    h2_3: tIndexQuestion('h2_3'),
    h2_3_p1: tIndexQuestion('h2_3_p1'),
    h2_4: tIndexQuestion('h2_4'),
    h2_4_p1: tIndexQuestion('h2_4_p1'),
  }
}

export const getTestimonialInfos = async () => {
  const tIndexQuestion = await getTranslations('testimonialInfos');
  return {
    h2_0: tIndexQuestion('h2_0'),
    h2_1_p1: tIndexQuestion('h2_1_p1'),
    h2_2_p1: tIndexQuestion('h2_2_p1'),
    h2_3_p1: tIndexQuestion('h2_3_p1'),
  }
}



export const getVideosPageLanguageText = async () => {
  const tVideosPage = null;
  return {
    title: tVideosPage('title'),
    description: tVideosPage('description'),
  }
}
