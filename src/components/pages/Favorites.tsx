import { useEffect } from 'react';
import { store } from '../../store';
import { useAppSelector } from '../../types/store';
import Header from '../Header/Header';
import FavoritesEmpty from './FavoritesEmpty';
import { fetchFavorites } from '../../store/api-actions';
import { LOCATIONS_NAME } from '../../consts/consts';
import FavoriteButton from '../FavoriteButton/FavoriteButton';

export default function Favorites() {
  useEffect(() => {
    store.dispatch(fetchFavorites());
  }, []);
  const favoriteOffers = useAppSelector((state) => state.favoriteOffers);
  // const filterFavorOffers = favoriteOffers.sort((a, b) => b.city.name.localeCompare(a.city.name));

  // const filteredOffer = favoriteOffers.some((cityNameOffer) => LOCATIONS_NAME.includes(cityNameOffer.city.name))
  // const filteredOffer = favoriteOffers.filter((item) => LOCATIONS_NAME.includes(item.city.name));
  const filterLocation = LOCATIONS_NAME.filter((location) => favoriteOffers.map((item) => item.city.name).includes(location));
  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favoriteOffers.length ? (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {filterLocation.map((locationName) => (
                  <div key={locationName}>
                    <li className="favorites__locations-items">
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{locationName}</span>
                          </a>
                        </div>
                      </div>
                    </li>

                    {favoriteOffers
                      .filter(
                        (cityNameOffer) =>
                          cityNameOffer.city.name === locationName
                      )
                      .map((offerData) => (
                        <div key={offerData.id} className="favorites__places">
                          <article className="favorites__card place-card" >
                            {offerData.isPremium && (
                              <div className="place-card__mark">
                                <span>Premium</span>
                              </div>
                            )}

                            <div className="favorites__image-wrapper place-card__image-wrapper">
                              <a href="#">
                                <img
                                  className="place-card__image"
                                  src={offerData.previewImage}
                                  width="150"
                                  height="110"
                                  alt="Place image"
                                />
                              </a>
                            </div>
                            <div className="favorites__card-info place-card__info">
                              <div className="place-card__price-wrapper">
                                <div className="place-card__price">
                                  <b className="place-card__price-value">
                                    &euro;{offerData.price}
                                  </b>
                                  <span className="place-card__price-text">
                                    &#47;&nbsp;night
                                  </span>
                                </div>
                                <FavoriteButton place={offerData}/>
                              </div>
                              <div className="place-card__rating rating">
                                <div className="place-card__stars rating__stars">
                                  <span style={{ width: (offerData.rating * 100) / 5 }}></span>
                                  <span className="visually-hidden">
                                    Rating
                                  </span>
                                </div>
                              </div>
                              <h2 className="place-card__name">
                                <a href="#">{offerData.title}</a>
                              </h2>
                              <p className="place-card__type">{offerData.type}</p>
                            </div>
                          </article>
                        </div>
                      ))}
                  </div>
                ))}
              </ul>
            </section>
          ) : (
            <FavoritesEmpty />
          )}
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
}
