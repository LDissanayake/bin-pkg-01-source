interface Font {
    family: string;
    variants?: (string | number)[];
  }
  
  const generateGoogleFontsLink = (fonts: Font[], subsets: string[] = [], display: string = 'swap'): string => {
    const families = fonts.reduce((acc: string[], font: Font) => {
      const family = font.family.replace(/ +/g, '+');
      const weights = (font.variants || []).join(',');
  
      return [
        ...acc,
        family + (weights ? `:${weights}` : ''),
      ];
    }, []).join('|');
  
    let href = `https://fonts.googleapis.com/css?family=${families}`;
  
    if (subsets.length > 0) {
      href += `&subset=${subsets.join(',')}`;
    }
  
    if (display) {
      href += `&display=${display}`;
    }
  
    return href;
  };
  
  export default generateGoogleFontsLink;
  