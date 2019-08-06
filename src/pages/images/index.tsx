import Loadable from 'react-loadable';
import LoadingPage from '~/_common/LoadingPage';

export default Loadable({
  loader: () => import('./page'),
  loading: LoadingPage,
});
