export interface Wildcard {
  wildcard: {
    [key: string]: any;
  };
}
export const makeWildCard = (
  data: string[],
  searchText: string
): Wildcard[] => {
  const wildcards = data.map((el) => {
    return {
      wildcard: {
        [el]: `*${searchText}*`,
      },
    };
  });
  return wildcards;
};
