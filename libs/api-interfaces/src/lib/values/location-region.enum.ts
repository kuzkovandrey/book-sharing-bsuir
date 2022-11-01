// TODO: Refactor to enum
export enum LocationRegion {
  MINSK_REGION = 'Минская обл.',
  GOMEL_REGION = 'Гомельская обл.',
  MOGILEV_REGION = 'Могилевская обл.',
  VITEBSK_REGION = 'Витебская обл.',
  BREST_REGION = 'Брестская обл.',
  GRODNO_REGION = 'Гродненская обл.',
}

export const locationRegionToText = (region: LocationRegion): string => {
  const text = {
    [LocationRegion.MINSK_REGION]: 'Минская обл.',
    [LocationRegion.GOMEL_REGION]: 'Гомельская обл.',
    [LocationRegion.MOGILEV_REGION]: 'Могилевская обл.',
    [LocationRegion.VITEBSK_REGION]: 'Витебская обл.',
    [LocationRegion.BREST_REGION]: 'Брестская обл.',
    [LocationRegion.GRODNO_REGION]: 'Гродненская обл.',
  }[region];

  if (text) return text;

  return 'Любой';
};

export const stringifyLocationRegion = (type: LocationRegion) =>
  locationRegionToText(type);
