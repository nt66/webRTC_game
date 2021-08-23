import dva, { connect } from 'dva';
import GlobalModel  from './global';

const app = dva();

app.model(GlobalModel);

export default app;