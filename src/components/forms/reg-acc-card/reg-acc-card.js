import {importContext} from "@pages/imports";

importContext(require.context('@components/button', true, /\.(js|sass)$/));
importContext(require.context('@components/input-fields/input-field', true, /\.(js|sass)$/));

