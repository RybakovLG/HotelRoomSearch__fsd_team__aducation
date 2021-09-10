
import {importCommon, importContext, importHeaderFooter} from '../imports';

importCommon();
importHeaderFooter();

importContext(require.context('@components/forms/reg-acc-card', true, /\.(js|sass)$/));

import './registration-page.sass';

