import countries from "world-countries";

const formattedCountries = countries.map((country) => ({
  flag: country.flag,
  value: country.cca2,
  latlng: country.latlng,
  region: country.region,
  label: country.name.common,
}));

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) =>
    formattedCountries.find((item) => item.value === value);

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
