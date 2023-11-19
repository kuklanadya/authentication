import { Route } from '@angular/router';
import { AuthorInfoComponent } from './components/author-info/author-info.component';

export const homeRoutes: Route[] = [
    {
        path: '',
        component: AuthorInfoComponent
    }
];
