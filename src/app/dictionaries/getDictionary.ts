import en from './en.json';
import uk from './uk.json';

type StatusItem = {
  label: string;
  desc: string;
};

export type Dictionary = {
  nav: {
    garden: string;
    login: string;
  };

  homepage: {
    mainCredo: string;
    credo: string;
    firstIntroduction: string;
    secondIntroduction: string;
    ourPhilosophyTitle: string;
    ourPhilosophyDescription: string;
    whyHerbariumTitle: string;
    whyHerbariumDescription: string;
    whyHerbariumFirstSubtitle: string;
    whyHerbariumFirstDescription: string;
    whyHerbariumSecondSubtitle: string;
    whyHerbariumSecondDescription: string;
    whyHerbariumThirdSubtitle: string;
    whyHerbariumThirdDescription: string;
    personalLandscapeTitle: string;
    personalLandscapeDescription: string;
    personalLandscapeFirstSubtitle: string;
    personalLandscapeFirstDescription: string;
    personalLandscapeSecondSubtitle: string;
    personalLandscapeSecondDescription: string;
    personalLandscapeThirdSubtitle: string;
    personalLandscapeThirdDescription: string;
    summary: string;
  };

  login: {
    title: string;
    subtitleGoogle: string;
    or: string,
    subtitleEmail: string;
    textNoAccount: string;
  };

  accountMenu: {
    account: string;
    logout: string;
  };

  statuses: {
    title: string,
    infoButton: string;
    modalTitle: string;
    close: string;
    items: {
      perennials: StatusItem;
      exotic: StatusItem;
      asphalt: StatusItem;
      seeds: StatusItem;
      shadow: StatusItem;
      middaySun: StatusItem;
      dew: StatusItem;
      closedGarden: StatusItem;
      pollination: StatusItem;
      wildlife: StatusItem;
      gardenSilence: StatusItem;
    }
  };
}

export type Locale = 'en' | 'uk';

const dictionaries: Record<Locale, Dictionary> = { en, uk };

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale];
}
