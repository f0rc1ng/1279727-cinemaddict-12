const createFilterItemTemplate = (filter) => {
  const {name, count} = filter;
  const filterTitle = name[0].toUpperCase() + name.slice(1, name.length);
  return `<a href="#${name}" class="main-navigation__item">${filterTitle} <span class="main-navigation__item-count">${count}</span></a>`;
};

const createFilterTemplate = (filters) => {
  const filterItemsTemplate = filters.map(createFilterItemTemplate).join(``);
  return `<div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${filterItemsTemplate}
   </div>`;
};
export {createFilterTemplate};
