
import {importCommon, importContext, importHeaderFooter} from '../imports';

import './landing-page.sass';


importHeaderFooter();

importCommon();

// require.context('@styles/',false , /fonts.sass$/, 'eager')
importContext(require.context('@components/forms/finding-room-card/', false, /\.(js|sass)$/));



