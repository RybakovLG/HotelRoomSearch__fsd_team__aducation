import {importContext} from "@pages/imports";

importContext(require.context('@components/input-fields/range-datepicker/', true, /\.(js)$/));
importContext(require.context('@components/input-fields/calc-dropdown/', true, /\.(js)$/));
importContext(require.context('@components/button', true, /\.(js|sass)$/));


