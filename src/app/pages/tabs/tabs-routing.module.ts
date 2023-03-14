import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../../routingGuards/AuthGuard.guard';

const routes: Routes = [
  {
    path: 'tabs',
    canActivate: [AuthGuard],
    component: TabsPage,
    children: [
      {
        path: 'calendar',
        loadChildren: () => import('../calendar/calendar.module').then( m => m.CalendarPageModule)
      },
      {
        path: 'sales',
        loadChildren: () => import('../sales/sales.module').then( m => m.SalesPageModule)
      },
      {
        path: 'clients',
        loadChildren: () => import('../clients/clients.module').then( m => m.ClientsPageModule)
      },
      {
        path: 'notification',
        loadChildren: () => import('../notification/notification.module').then( m => m.NotificationPageModule)
      },
      {
        path: 'more',
        loadChildren: () => import('../more/more.module').then( m => m.MorePageModule)
      },
      {
        path: '',  
        redirectTo: '/tabs/calendar',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/calendar',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
