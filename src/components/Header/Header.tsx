import { AppRoute } from '../../consts/route';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../types/store';
import { fetchUserData, logoutAction } from '../../store/api-actions';
import { AuthorizationStatus } from '../../consts/consts';
import { store } from '../../store';
import Logo from '../Logo/Logo';

store.dispatch(fetchUserData());
function Header() {
  const userInfo = useAppSelector((state) => state.user.userData);
  const favoriteOffers = useAppSelector((state) => state.favorites.favoriteOffers);
  const authorizationStatus = useAppSelector(
    (state) => state.user.authorizationStatus
  );
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(logoutAction());
  };
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo />
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link
                  to={AppRoute.Favorites}
                  className="header__nav-link header__nav-link--profile"
                >
                  {authorizationStatus === AuthorizationStatus.Auth && (
                    <>
                      <div
                        className="header__avatar-wrapper user__avatar-wrapper"
                        style={{
                          borderRadius: '50px',
                          overflow: 'hidden',
                        }}
                      >
                        <img src={userInfo?.avatarUrl} alt="user avatar" />
                      </div>
                      <span className="header__user-name user__name">
                        {userInfo?.name}
                      </span>
                      <span className="header__favorite-count">{favoriteOffers.length}</span>
                    </>
                  )}
                </Link>
              </li>
              <li className="header__nav-item">
                {authorizationStatus === AuthorizationStatus.Auth ? (
                  <Link to={AppRoute.Root} className="header__nav-link">
                    <span
                      className="header__signout"
                      onClick={() => handleClick()}
                    >
                      Sign out
                    </span>
                  </Link>
                ) : (
                  <Link to={AppRoute.Login} className="header__nav-link">
                    <span className="header__signout">Sign in</span>
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
