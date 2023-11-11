import { ICity } from '../../interfaces/ICity';
import { placesMock } from '../../mock/Places';

type ICityProps = {
  isActiveCity: ICity;
};

function Sort({ isActiveCity }: ICityProps) {
  const arrayOffers = placesMock.filter(
    (item) => item.location === isActiveCity.name
  );
  return (
    <>
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {arrayOffers.length} places to stay in {isActiveCity.name}
      </b>
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex={0}>
          Popular
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className="places__options places__options--custom places__options--opened">
          <li className="places__option places__option--active" tabIndex={0}>
            Popular
          </li>
          <li className="places__option" tabIndex={0}>
            Price: low to high
          </li>
          <li className="places__option" tabIndex={0}>
            Price: high to low
          </li>
          <li className="places__option" tabIndex={0}>
            Top rated first
          </li>
        </ul>
      </form>
    </>
  );
}

export default Sort;
