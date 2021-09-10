import {importCommon, importContext, importHeaderFooter} from '../imports';

importCommon();
importHeaderFooter();

importContext(require.context('@components/input-fields/range-datepicker/', true, /\.(js)$/));
importContext(require.context('@components/input-fields/calc-dropdown/', true, /\.(js)$/));
importContext(require.context('@components/input-fields/range-slider/', true, /\.(js)$/));
importContext(require.context('@components/list-check/', true, /\.(js)$/));
importContext(require.context('@components/pagination/', true, /\.(js)$/));
importContext(require.context('@components/room-card/', false, /\.(js|sass)$/));

import './search-room.sass';
