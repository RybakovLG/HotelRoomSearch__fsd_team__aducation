
import {importCommon, importContext, importHeaderFooter} from '../imports';

importCommon();
importHeaderFooter();

importContext(require.context('@components/forms/sign-in-card', true, /\.(js|sass)$/));


import './sign-in-page.sass';
