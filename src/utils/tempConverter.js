// Temperature conversion utility

export const convertTemp = (kelvin, toFahrenheit) => {
    if (toFahrenheit) {
      return Math.round((kelvin - 273.15) * 9/5 + 32);
    }
    return Math.round(kelvin - 273.15);
  };