const categoryToOption = (category) => ({
  value: category._id,
  label: category.title,
});

const filterCategories = (inputValue, categoriesData) => {
  const filteredOptions = categoriesData
    .map(categoryToOption)
    .filter((category) =>
      category.label.toLowerCase().includes(inputValue.toLowerCase())
    );

  return filteredOptions;
};

export { categoryToOption, filterCategories };
