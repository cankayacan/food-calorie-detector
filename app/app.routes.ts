import {Routes} from '@angular/router';

import {TagsPage} from './pages/tags/tags.page';

export var routableComponents = [];

export const routes: Routes = [
    routeEntry({ path: '', component: TagsPage})
];

function routeEntry(data) {
    routableComponents.push(data.component);
    return data;
}
