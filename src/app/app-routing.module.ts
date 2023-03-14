import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./pages/tabs/tabs.module").then((m) => m.TabsPageModule),
  },
  {
    path: "clientProfile/:clientId",
    loadChildren: () =>
      import("./pages/client-profile/client-profile.module").then(
        (m) => m.ClientProfilePageModule
      ),
  },
  {
    path: "viewAppointment",
    loadChildren: () =>
      import("./pages/view-appointment/view-appointment.module").then(
        (m) => m.ViewAppointmentPageModule
      ),
  },
  {
    path: "appointments",
    loadChildren: () =>
      import("./Pages/appointments/appointments.module").then(
        (m) => m.AppointmentsPageModule
      ),
  },
  {
    path: "signin",
    loadChildren: () =>
      import("./Pages/signin/signin.module").then((m) => m.SigninPageModule),
  },
  {
    path: "gallery",
    loadChildren: () =>
      import("./pages/gallary/gallary.module").then((m) => m.GallaryPageModule),
  },
  {
    path: "services",
    loadChildren: () =>
      import("./Pages/services/services.module").then(
        (m) => m.ServicesPageModule
      ),
  },
  {
    path: "service/:action",
    loadChildren: () =>
      import("./Pages/add-service/add-service.module").then(
        (m) => m.AddServicePageModule
      ),
  },
  {
    path: "reviews",
    loadChildren: () =>
      import("./pages/reviews/reviews.module").then((m) => m.ReviewsPageModule),
  },
  {
    path: "staff",
    loadChildren: () =>
      import("./pages/staff/staff.module").then((m) => m.StaffPageModule),
  },
  {
    path: "addGallary/:action",
    loadChildren: () =>
      import("./pages/add-gallary/add-gallary.module").then(
        (m) => m.AddGallaryPageModule
      ),
  },
  {
    path: "editProfile",
    loadChildren: () =>
      import("./Pages/edit-profile/edit-profile.module").then(
        (m) => m.EditProfilePageModule
      ),
  },
  {
    path: "setting",
    loadChildren: () =>
      import("./pages/setting/setting.module").then((m) => m.SettingPageModule),
  },
  {
    path: "companySetting",
    loadChildren: () =>
      import("./pages/company-setting/company-setting.module").then(
        (m) => m.CompanySettingPageModule
      ),
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./pages/dashboard/dashboard.module").then(
        (m) => m.DashboardPageModule
      ),
  },
  {
    path: "reports",
    loadChildren: () =>
      import("./pages/reports/reports.module").then((m) => m.ReportsPageModule),
  },
  {
    path: "forgotPassword",
    loadChildren: () =>
      import("./pages/forgot-password/forgot-password.module").then(
        (m) => m.ForgotPasswordPageModule
      ),
  },
  {
    path: "addClients",
    loadChildren: () =>
      import("./pages/add-clients/add-clients.module").then(
        (m) => m.AddClientsPageModule
      ),
  },
  {
    path: 'selectServices',
    loadChildren: () => import('./pages/select-services/select-services.module').then(m => m.SelectServicesPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'salon-add',
    loadChildren: () => import('./pages/salon-add/salon-add.module').then(m => m.SalonAddPageModule)
  },
  {
    path: 'employee-detail',
    loadChildren: () => import('./pages/employee-detail/employee-detail.module').then(m => m.EmployeeDetailPageModule)
  },
  {
    path: 'add-employees',
    loadChildren: () => import('./pages/add-employees/add-employees.module').then(m => m.AddEmployeesPageModule)
  },
  {
    path: 'delete',
    loadChildren: () => import('./modals/delete/delete.module').then(m => m.DeletePageModule)
  },
  {
    path: 'add-salon',
    loadChildren: () => import('./pages/add-salon/add-salon.module').then(m => m.AddSalonPageModule)
  },
  {
    path: 'select-address',
    loadChildren: () => import('./pages/select-address/select-address.module').then(m => m.SelectAddressPageModule)
  },
  {
    path: 'add-adress',
    loadChildren: () => import('./pages/add-adress/add-adress.module').then(m => m.AddAdressPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
