import { ReactNode, FC } from 'react';
import { store } from '@store';
import { Provider } from 'react-redux';

const ReduxProvider: FC<{
  children: ReactNode;
}> = ({ children }) => <Provider store={store}>{children}</Provider>;

export default ReduxProvider;
