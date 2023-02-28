export const countNodeChillds = (
  parentHTML: HTMLElement,
  nameChild: string
) => {
  let counter = 0;
  nameChild = nameChild.toUpperCase();
  parentHTML.childNodes.forEach((child) => {
    if (child.nodeName === nameChild) counter++;
  });
  return counter;
};
