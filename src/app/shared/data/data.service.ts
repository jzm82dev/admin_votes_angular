import { Injectable } from '@angular/core';
import { routes } from '../routes/routes';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiResultFormat } from '../models/models';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root',
})
export class DataService {

  public translations:any = [];
  public sideBarNew: any = [];

  public trans:any = {
    'en': {
      'club': 'Club',
      'clubs': 'Clubs',
      'my_data': 'My data',
      'my_matchs': 'My matchs',
      'my_wallet': "My wallet",
      'your_clubs': 'My clubs',
      'bookings': 'Bookings',
      'today': 'Today',
      'calendar': 'Calendar',
      'recurrent': 'Recurrent',
      'lesson': 'Lessons',
      'roles_permissions': 'Roles & Permits',
      'new_role': 'New Role',
      'show': "Show",
      'list': 'List',
      'users': 'Users',
      'new': 'Add',
      'edit': 'Edit',
      'delete': 'Delete',
      'leagues_and_tournaments': 'Leagues & Tournaments',
      'leagues': 'Leagues',
      'tournaments': 'Tournaments',
      'monitors': 'Monitors',
      'members': 'Members',
      'delete_recurrent': 'Delete Recurrent',
      'payments': 'Subscription',
      'subscriptions': 'Subscription' ,
      'current_subscription': 'Current subscription' ,
      'wallet': 'Wallet'
    },
    'es': {
      'club': 'Club',
      'clubs': 'Clubes',
      'my_data': 'Mis datos',
      'my_matchs': 'Mis partidos',
      'my_wallet': "Mi monedero",
      'your_clubs': 'Tus clubes',
      'bookings': 'Reservas',
      'today': 'Hoy',
      'calendar': 'Calendario',
      'recurrent': 'Recurrente',
      'lesson': 'Clases',
      'roles_permissions': 'Roles y permisos',
      'new_role': 'Nuevo Rol',
      'show': 'Ver',
      'list': 'Listado',
      'users': 'Usuarios',
      'new': 'Nuevo',
      'edit': 'Editar',
      'delete': 'Borrar',
      'leagues_and_tournaments': 'Ligas y Torneos',
      'leagues': 'Ligas',
      'tournaments': 'Torneos',
      'monitors': 'Monitores',
      'members': 'Socios',
      'delete_recurrent': 'Borrar Recurrent',
      'payments': 'Suscripción',
      'subscriptions': 'Suscripción' ,
      'current_subscription': 'Suscripción actual' ,
      'wallet': 'Monedero'
    }
  }


  constructor(private http: HttpClient, public translate: TranslateService, public authSrv: AuthService) {
    this.initializeLanguage(); 
    this.sideBarNew = [
      {
        tittle: 'Menú',
        showAsTab: false,
        separateRoute: false,
        menu: [
          {
            menuValue: this.trans[this.authSrv.language].club,
            route: routes.club,
            hasSubRoute: false,
            showSubRoute: false,
            icon: 'fa-calendar',
            faIcon: true,
            base: 'calendar',
            permision: 'view_club',
            show_nav: true,
            subMenus: [{
              menuValue: 'Ver',
              route: '',
              base: '',
              permision: 'view_club',
              show_nav: false,
            },
            {
              menuValue: 'Editar',
              route: '',
              base: '',
              permision: 'edit_club',
              show_nav: false,
            },
          ],
        },
      ],
    },
  ];

  }

  ngOnInit(): void {
    this.initializeLanguage(); 
  }

  initializeLanguage(){
    
    this.translate.use(this.authSrv.language);
    this.translate.setDefaultLang(this.authSrv.language);

    this.translate.get(['menu'])
      .subscribe((resp:any) => {
        this.translations = resp.menu;
      }); 
  }

  public getDoctorsList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/doctors-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPatientsList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/doctors-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getStaffList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/staff-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getAppointmentList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/appointment-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getStaffHoliday(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/staff-holiday.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getSchedule(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/schedule.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getInvoices(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/invoices.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPayments(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/payments.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getExpenses(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/expenses.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTaxes(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/taxes.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getProvidentFund(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/provident-fund.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getDepartmentList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/department-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getSalary(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/salary.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getAssetsList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/assets-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getExpenseReports(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/expense-reports.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getInvoiceReports(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/invoice-reports.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getAllInvoice(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/all-invoice.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPatientDashboard(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/patient-dashboard.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getInvoicesPaid(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/invoices-paid.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getInvoicesOverdue(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/invoices-overdue.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getInvoicesDraft(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/invoices-draft.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getInvoicesCancelled(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/invoices-cancelled.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getInvoicesRecurring(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/invoices-recurring.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getStaffLeave(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/staff-leave.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getEvents() {
    return this.http.get<apiResultFormat>('assets/json/scheduleevents.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getDataTables() {
    return this.http.get<apiResultFormat>('assets/json/data-tables.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

 

  public sideBar = [
    {
      tittle: 'Menú',
      showAsTab: false,
      separateRoute: false,
      menu: [
        

        {
          menuValue: 'Urbanizaciones',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'staff',
          img: 'assets/img/icons/menu-icon-03.svg',
          subMenus: [
            {
              menuValue: this.trans[this.authSrv.language].list,
              route: routes.urbanisationsList,
              base: routes.urbanisationsList,
              permision: 'list_urbanisations',
              show_nav: true,
            },
            {
              menuValue: this.trans[this.authSrv.language].new,
              route: routes.addUrbanisations,
              base: routes.addUrbanisations,
              permision: 'register_urbanisations',
              show_nav: true,
            },
            {
              menuValue: this.trans[this.authSrv.language].edit,
              route: '',
              base: '',
              permision: 'edit_urbanisations',
              show_nav: false,
            },
            {
              menuValue: this.trans[this.authSrv.language].delete,
              route: '',
              base: '',
              permision: 'delete_urbanisations',
              show_nav: false,
            },
          ],
        },

        {
          menuValue: 'Juntas',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'staff',
          img: 'assets/img/icons/menu-icon-03.svg',
          subMenus: [
            {
              menuValue: this.trans[this.authSrv.language].list,
              route: routes.meetingList,
              base: routes.meetingList,
              permision: 'list_meeting',
              show_nav: true,
            },
            {
              menuValue: this.trans[this.authSrv.language].new,
              route: routes.addMeeting,
              base: routes.addMeeting,
              permision: 'register_meeting',
              show_nav: true,
            },
            {
              menuValue: this.trans[this.authSrv.language].edit,
              route: '',
              base: '',
              permision: 'edit_meeting',
              show_nav: false,
            },
            {
              menuValue: this.trans[this.authSrv.language].delete,
              route: '',
              base: '',
              permision: 'delete_meeting',
              show_nav: false,
            },
          ],
        },
      
      ]
    },
    {
      tittle: 'Admin',
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: this.trans[this.authSrv.language].roles_permissions,
          hasSubRoute: true,
          showSubRoute: false,
          base: 'gallery',
          base2: 'profile',
          icon: 'fa-columns',
          faIcon: true,
          subMenus: [
            {
              menuValue: this.trans[this.authSrv.language].list,
              route: routes.listRole,
              base: routes.listRole,
              permision: 'list_rol',
              show_nav: true,
            },
            {
              menuValue: this.trans[this.authSrv.language].new_role,
              route: routes.registerRole,
              base: routes.registerRole,
              permision: 'register_rol',
              show_nav: true,
            },
            {
              menuValue: 'Edit Rol',
              route: '',
              base: '',
              permision: 'edit_rol',
              show_nav: false,
            },
            {
              menuValue: 'Delete Rol',
              route: '',
              base: '',
              permision: 'delete_rol',
              show_nav: false,
            },
          ],
        },
        {
          menuValue: this.trans[this.authSrv.language].users,
          hasSubRoute: true,
          showSubRoute: false,
          base: 'user',
          img: 'assets/img/icons/menu-icon-08.svg',
          subMenus: [
            {
              menuValue: this.trans[this.authSrv.language].list,
              route: routes.staffList,
              base: routes.staffList,
              permision: 'list_staff',
              show_nav: true,
            },
            {
              menuValue: this.trans[this.authSrv.language].new,
              route: routes.addStaff,
              base: routes.addStaff,
              permision: 'register_staff',
              show_nav: true,
            },
            {
              menuValue: 'Edit Staff',
              route: '',
              base: '',
              permision: 'edit_staff',
              show_nav: false,
            },
            {
              menuValue: 'Delete Staff',
              route: '',
              base: '',
              permision: 'delete_staff',
              show_nav: false,
            },
          ],
        },
      ]
    },
    {
      tittle: this.trans[this.authSrv.language].leagues_and_tournaments, 
      showAsTab: false,
      separateRoute: false,
      menu: [
        /*{
          menuValue: this.trans[this.authSrv.language].leagues,
          hasSubRoute: true,
          showSubRoute: false,
          base: 'staff',
          img: 'assets/img/icons/menu-icon-16.svg',
          subMenus: [
            {
              menuValue: this.trans[this.authSrv.language].list,
              route: routes.leagueList,
              base: routes.leagueList,
              permision: 'list_league_old',
              show_nav: true,
            },
            {
              menuValue: this.trans[this.authSrv.language].new,
              route: routes.addLeague,
              base: routes.addLeague,
              permision: 'register_league_old',
              show_nav: true,
            },
            {
              menuValue: 'Editar',
              route: '',
              base: '',
              permision: 'edit_league_old',
              show_nav: false,
            },
            {
              menuValue: this.trans[this.authSrv.language].delete,
              route: '',
              base: '',
              permision: 'delete_league_old',
              show_nav: false,
            },
          ],
        }, */
        {
          menuValue: 'Categorias',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'staff',
          img: 'assets/img/icons/menu-icon-15.svg',
          subMenus: [
            {
              menuValue: 'Listado',
              route: routes.categoryList,
              base: routes.categoryList,
              permision: 'list_category',
              show_nav: true,
            },
            {
              menuValue: this.trans[this.authSrv.language].add,
              route: routes.addCategory,
              base: routes.addCategory,
              permision: 'register_category',
              show_nav: true,
            },
            {
              menuValue: this.trans[this.authSrv.language].edit,
              route: '',
              base: '',
              permision: 'edit_category',
              show_nav: false,
            },
            {
              menuValue: this.trans[this.authSrv.language].delete,
              route: '',
              base: '',
              permision: 'delete_category',
              show_nav: false,
            },
          ],
        },
        {
          menuValue: 'Clubs',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'staff',
          img: 'assets/img/icons/menu-icon-03.svg',
          subMenus: [
            {
              menuValue: 'Listado',
              route: routes.clubList,
              base: routes.clubList,
              permision: 'list_club',
              show_nav: true,
            },
            {
              menuValue: 'Añadir',
              route: routes.addClub,
              base: routes.addClub,
              permision: 'register_club',
              show_nav: true,
            },
            {
              menuValue: this.trans[this.authSrv.language].edit,
              route: '',
              base: '',
              permision: 'edit_club',
              show_nav: false,
            },
            {
              menuValue: this.trans[this.authSrv.language].delete,
              route: '',
              base: '',
              permision: 'delete_club',
              show_nav: false,
            },
          ],
        },
        {
          menuValue: 'Jugadores',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'staff',
          img: 'assets/img/icons/menu-icon-02.svg',
          subMenus: [
            {
              menuValue: this.trans[this.authSrv.language].list,
              route: routes.playerList,
              base: routes.playerList,
              permision: 'list_player',
              show_nav: true,
            },
            {
              menuValue: this.trans[this.authSrv.language].add,
              route: routes.addPlayer,
              base: routes.addPlayer,
              permision: 'register_player',
              show_nav: true,
            },
            {
              menuValue: this.trans[this.authSrv.language].edit,
              route: '',
              base: '',
              permision: 'edit_player',
              show_nav: false,
            },
            {
              menuValue: this.trans[this.authSrv.language].delete,
              route: '',
              base: '',
              permision: 'delete_player',
              show_nav: false,
            },
          ],
        },
        {
          menuValue: 'Equipos',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'staff',
          img: 'assets/img/icons/menu-icon-01.svg',
          subMenus: [
            {
              menuValue: this.trans[this.authSrv.language].list,
              route: routes.teamList,
              base: routes.teamList,
              permision: 'list_team',
              show_nav: true,
            },
            {
              menuValue: this.trans[this.authSrv.language].add,
              route: routes.addTeam,
              base: routes.addTeam,
              permision: 'list_team',
              show_nav: true,
            },
            {
              menuValue: this.trans[this.authSrv.language].edit,
              route: '',
              base: '',
              permision: 'edit_team',
              show_nav: false,
            },
            {
              menuValue: this.trans[this.authSrv.language].delete,
              route: '',
              base: '',
              permision: 'delete_team',
              show_nav: false,
            },
          ],
        }, 
        {
          menuValue: 'Jornadas',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'staff',
          img: 'assets/img/icons/menu-icon-04.svg',
          subMenus: [
            {
              menuValue: 'Listado',
              route: routes.jorneyList,
              base: routes.jorneyList,
              permision: 'list_journey',
              show_nav: true,
            },
            {
              menuValue: 'Añadir',
              route: routes.addJorney,
              base: routes.addJorney,
              permision: 'register_journey',
              show_nav: true,
            },
            {
              menuValue: 'Editar',
              route: '',
              base: '',
              permision: 'edit_journey',
              show_nav: false,
            },
            {
              menuValue: this.trans[this.authSrv.language].delete,
              route: '',
              base: '',
              permision: 'delete_journey',
              show_nav: false,
            },
          ],
        },
        
      ]
    },
    {
      tittle: 'Mas...',
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Dashboard',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'dashboard',
          route:'dashboard',
          img: 'assets/img/icons/menu-icon-01.svg',
          subMenus: [
            {
              menuValue: 'Admin Dashboard',
              route: routes.adminDashboard,
              base: routes.adminDashboard,
              permision: 'admin_dashboard',
              show_nav: true,
            },
            {
              menuValue: 'Doctor Dashboard',
              route: routes.doctorDashboard,
              base: routes.doctorDashboard,
              permision: 'doctor_dashboard',
              show_nav: true,
            },
            /*{
              menuValue: 'Patient Dashboard',
              route: routes.patientDashboard,
              base: routes.patientDashboard,
              permision: '',
              show_nav: true,
            },*/
          ],
        },
        {
          menuValue: 'Specialitiess',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'staff',
          img: 'assets/img/icons/menu-icon-15.svg',
          subMenus: [
            {
              menuValue: 'Speciality List',
              route: routes.listSpeciality,
              base: routes.listSpeciality,
              permision: 'list_speciality1',
              show_nav: true,
            },
            {
              menuValue: 'Add Speciality',
              route: routes.registerSpeciality,
              base: routes.registerSpeciality,
              permision: 'register_speciality1',
              show_nav: true,
            },
            {
              menuValue: 'Edit Speciality',
              route: '',
              base: '',
              permision: 'edit_speciality1',
              show_nav: false,
            },
            {
              menuValue: 'Delete Speciality',
              route: '',
              base: '',
              permision: 'delete_speciality1',
              show_nav: false,
            },
          ],
        },
        {
          menuValue: 'Doctors',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'doctor',
          img: 'assets/img/icons/menu-icon-02.svg',
          subMenus: [
            {
              menuValue: 'Doctor List',
              route: routes.doctorsList,
              base: routes.doctorsList,
              permision: 'list_doctor1',
              show_nav: true,
            },
            {
              menuValue: 'Add Doctor',
              route: routes.addDoctor,
              base: routes.addDoctor,
              permision: 'register_doctor',
              show_nav: true,
            },
            {
              menuValue: 'Edit Doctor',
              route: '',
              base: '',
              permision: 'edit_doctor',
              show_nav: false,
            },
            {
              menuValue: 'Delete Doctor',
              route: '',
              base: '',
              permision: 'delete_doctor',
              show_nav: false,
            },
            {
              menuValue: 'Doctor Profile',
              route: '',
              base: '',
              permision: 'profile_doctor',
              show_nav: false,
            },
          ],
        },
        {
          menuValue: 'Patients',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'patient',
          img: 'assets/img/icons/menu-icon-03.svg',
          subMenus: [
            {
              menuValue: 'Patients List',
              route: routes.patientsList,
              base: routes.patientsList,
              permision: 'list_patient',
              show_nav: true,
            },
            {
              menuValue: 'Add Patients',
              route: routes.addPatient,
              base: routes.addPatient,
              permision: 'register_patient',
              show_nav: true,
            },
            {
              menuValue: 'Edit Patients',
              route: '',
              base: '',
              permision: 'edit_patient',
              show_nav: false,
            },
            {
              menuValue: 'Delete Patients',
              route: '',
              base: '',
              permision: 'delete_patient',
              show_nav: false,
            },
            {
              menuValue: 'Patients Profile',
              route: '',
              base: '',
              permision: 'profile_patient',
              show_nav: false,
            },
          ],
        },
        {
          menuValue: 'Appointments',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'appointments',
          img: 'assets/img/icons/menu-icon-04.svg',
          subMenus: [
            {
              menuValue: 'Appointment List',
              route: routes.appointmentList,
              base: routes.appointmentList,
              permision: 'list_appointment',
              show_nav: true,
            },
            {
              menuValue: 'Book Appointment',
              route: routes.addAppointment,
              base: routes.addAppointment,
              permision: 'register_appointment',
              show_nav: true,
            },
            {
              menuValue: 'Edit Appointment',
              route: '',
              base: '',
              permision: 'edit_appointment',
              show_nav: false,
            },
            {
              menuValue: 'Delete Appointment',
              route: '',
              base: '',
              permision: 'delete_appointment',
              show_nav: false,
            },
            {
              menuValue: 'Attention Appointment',
              route: '',
              base: '',
              permision: 'attention_appointment',
              show_nav: false,
            },
          ],
        },
        {
          menuValue: 'Payments',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'payroll',
          img: 'assets/img/icons/menu-icon-09.svg',
          subMenus: [
            {
              menuValue: 'Ver Pagos',
              route: routes.pagos,
              base: routes.pagos,
              permision: 'show_payment',
              show_nav: true,
            },
            {
              menuValue: 'Edit Payment',
              route: '',
              base: '',
              permision: 'edit_payment',
              show_nav: false,
            },
            {
              menuValue: 'Delete Payment',
              route: '',
              base: '',
              permision: 'delete_payment',
              show_nav: false,
            },
            {
              menuValue: 'Add Payment',
              route: '',
              base: '',
              permision: 'add_payment',
              show_nav: false,
            },
          ],
        },
        {
          menuValue: 'Calendar',
          route: routes.appointmentCalendar,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'fa-calendar',
          faIcon: true,
          base: 'calendar',
          permision: 'calendar',
          show_nav: true,
          subMenus: [],
        },
        {
          menuValue: 'Especialidades',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'specialtys',
          img: 'assets/img/icons/menu-icon-06.svg',
          subMenus: [
            {
              menuValue: 'Especialidad List',
              route: routes.departmentList,
              base: routes.departmentList,
              permision: 'list_specialty',
              show_nav: true,
            },
            {
              menuValue: 'Add Especialidad',
              route: routes.addDepartment,
              base: routes.addDepartment,
              permision: 'register_specialty',
              show_nav: true,
            },
            {
              menuValue: 'Edit Especialidad',
              route: '',
              base: '',
              permision: 'edit_specialty',
              show_nav: false,
            },
            {
              menuValue: 'Delete Especialidad',
              route: '',
              base: '',
              permision: 'delete_specialty',
              show_nav: false,
            },
          ],
        },
        
        {
          menuValue: 'Activities',
          route: routes.activities,
          hasSubRoute: false,
          showSubRoute: false,
          img: 'assets/img/icons/menu-icon-14.svg',
          base: 'activities',
          permision: 'activitie',
          show_nav: true,
          subMenus: [],
        },
       
        {
          menuValue: 'Reports',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'reports',
          img: 'assets/img/icons/menu-icon-02.svg',
          subMenus: [
            {
              menuValue: 'Expense Report',
              route: routes.expenseReports,
              base: routes.expenseReports,
              permision: 'expense_report',
              show_nav: true,
            },
            {
              menuValue: 'Invoice Report',
              route: routes.invoiceReports,
              base: routes.invoiceReports,
              permision: 'invoice_report',
              show_nav: true,
            },
          ],
        },
        {
          menuValue: 'Settings',
          route: routes.settings,
          hasSubRoute: false,
          showSubRoute: false,
          img: 'assets/img/icons/menu-icon-16.svg',
          base: 'settings',
          permision: 'settings',
          show_nav: true,
          subMenus: [],
        },
      ],
    },
  ];


  public carousel1 = [
    {
      quantity: '68',
      units: 'kg',
    },
    {
      quantity: '70',
      units: 'kg',
    },
    {
      quantity: '72',
      units: 'kg',
    },
    {
      quantity: '74',
      units: 'kg',
    },
    {
      quantity: '76',
      units: 'kg',
    },
  ];
  public carousel2 = [
    {
      quantity: '160',
      units: 'cm',
    },
    {
      quantity: '162',
      units: 'cm',
    },
    {
      quantity: '164',
      units: 'cm',
    },
    {
      quantity: '166',
      units: 'cm',
    },
    {
      quantity: '168',
      units: 'cm',
    },
  ];
  public socialLinks = [
    {
      icon: 'instagram',
      placeholder: 'https://www.instagram.com',
      input_name: "instagram"
    },
    {
      icon: 'facebook',
      placeholder: 'https://www.facebook.com',
      input_name: "facebook"
    },
    {
      icon: 'twitter',
      placeholder: 'https://www.twitter.com',
      input_name: "twiter"
    },
    {
      icon: 'youtube',
      placeholder: 'https://www.youtube.com',
      input_name: "youtube"
    },
    {
      icon: 'linkedin',
      placeholder: 'https://www.linkedin.com',
      input_name: "linkedin"
    }
  ];
  public upcomingAppointments = [
    {
      "no" : "R00001",
      "patientName" : "Andrea Lalema",
      "doctor" : "Dr.Jenny Smith",
      "date" : "12.05.2022 at",
      "time" : "7.00 PM",
      "disease" : "Fracture",
      "img" : "assets/img/profiles/avatar-03.jpg"
  },
  {
      "no" : "R00002",
      "patientName" : "Cristina Groves",
      "doctor" : "Dr.Angelica Ramos",
      "date" : "13.05.2022 at",
      "time" : "7.00 PM",
      "disease" : "Fever",
      "img" : "assets/img/profiles/avatar-05.jpg"
  },
  {
      "no" : "R00003",
      "patientName" : "Bernardo",
      "doctor" : "Dr.Martin Doe",
      "date" : "14.05.2022 at",
      "time" : "7.00 PM",
      "disease" : "Fracture",
      "img" : "assets/img/profiles/avatar-04.jpg"
  },
  {
      "no" : "R00004",
      "patientName" : "Galaviz Lalema",
      "doctor" : "Dr.Martin Doe",
      "date" : "15.05.2022 at",
      "time" : "7.00 PM",
      "disease" : "Fracture",
      "img" : "assets/img/profiles/avatar-03.jpg"
  },
  {
      "no" : "R00005",
      "patientName" : "Dr.William Jerk",
      "doctor" : "Dr.Angelica Ramos",
      "date" : "16.05.2022 at",
      "time" : "7.00 PM",
      "disease" : "Fever",
      "img" : "assets/img/profiles/avatar-02.jpg"
  }
  ];
  public recentPatients = [
    {
      "no" : "R00001",
      "patientName" : "Andrea Lalema",
      "age" : "21",
      "date" : "12.05.2022 at",
      "dateOfBirth" : "07 January 2002",
      "diagnosis" : "Heart attack",
      "img" : "assets/img/profiles/avatar-02.jpg",
      "triage" : "Non Urgent"
  },
  {
      "no" : "R00002",
      "patientName" : "Mark Hay Smith",
      "age" : "23",
      "date" : "13.05.2022 at",
      "dateOfBirth" : "06 January 2002",
      "diagnosis" : "Jaundice",
      "img" : "assets/img/profiles/avatar-03.jpg",
      "triage" : "Emergency"
  },
  {
      "no" : "R00003",
      "patientName" : "Cristina Groves",
      "age" : "25",
      "date" : "14.05.2022 at",
      "dateOfBirth" : "10 January 2002",
      "diagnosis" : "Malaria",
      "img" : "assets/img/profiles/avatar-04.jpg",
      "triage" : "Out Patient"
  },
  {
      "no" : "R00004",
      "patientName" : "Galaviz Lalema",
      "age" : "21",
      "date" : "15.05.2022 at",
      "dateOfBirth" : "09 January 2002",
      "diagnosis" : "Typhoid",
      "img" : "assets/img/profiles/avatar-05.jpg",
      "triage" : "Urgent"
  }
  ];
  public patientProfile = [
    {
      date : "29/09/2022",
      doctor : "Dr.Jenny Smith",
      treatment : "Check up",
      charges : "$ 60"
    },
    {
      date : "19/09/2022",
      doctor : "Andrea Lalema",
      treatment : "	Blood Test",
      charges : "$ 50"
    },
    {
      date : "20/09/2022",
      doctor : "Dr.William Stephin",
      treatment : "Blood Pressure",
      charges : "$ 30"
    }
  ];
  public blogs = [
    {
      img1: "assets/img/blog/blog-1.jpg",
      img2: "assets/img/profiles/avatar-01.jpg",
      heading5: "Diabetes",
      count1: "58",
      count2: "500",
      date: "05 Sep 2022",
      heading4: "Jenifer Robinson",
      name: "M.B.B.S, Diabetologist",
      heading3: "Simple Changes That Lowered My Mom's Blood Pressure",
      paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      msg: "Read more in 8 Minutes"
    },
    {
      img1: "assets/img/blog/blog-2.jpg",
      img2: "assets/img/profiles/avatar-02.jpg",
      heading5: "Safety",
      count1: "18",
      count2: "5k",
      date: "05 Sep 2022",
      heading4: "Mark hay smith",
      name: "M.B.B.S, Neurologist",
      heading3: "Vaccines Are Close - But Right Now We Need to Hunker Down",
      paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      msg: "Read more in 2 Minutes"
    },
    {
      img1: "assets/img/blog/blog-3.jpg",
      img2: "assets/img/profiles/avatar-03.jpg",
      heading5: "Dermotology",
      count1: "28",
      count2: "2.5k",
      date: "05 Sep 2022",
      heading4: "Denise Stevens",
      name: "M.B.B.S, Dermotologist",
      heading3: "Hair Loss On One Side of Head – Causes & Treatments",
      paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      msg: "Read more in 3 Minutes"
    },
    {
      img1: "assets/img/blog/blog-4.jpg",
      img2: "assets/img/profiles/avatar-05.jpg",
      heading5: "Ophthalmology",
      count1: "48",
      count2: "600",
      date: "05 Sep 2022",
      heading4: "Laura Williams",
      name: "M.B.B.S, Ophthalmologist",
      heading3: "Eye Care Routine To Get Rid Of Under Eye Circles And Puffiness",
      paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      msg: "Read more in 5 Minutes"
    },
    {
      img1: "assets/img/blog/blog-5.jpg",
      img2: "assets/img/profiles/avatar-06.jpg",
      heading5: "Dentist",
      count1: "48",
      count2: "600",
      date: "05 Sep 2022",
      heading4: "Linda Carpenter",
      name: "M.B.B.S, Dentist",
      heading3: "5 Facts About Teeth Whitening You Should Know",
      paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      msg: "Read more in 3 Minutes"
    },
    {
      img1: "assets/img/blog/blog-6.jpg",
      img2: "assets/img/profiles/avatar-04.jpg",
      heading5: "Gynecologist",
      count1: "18",
      count2: "300",
      date: "05 Sep 2022",
      heading4: "Mark hay smith",
      name: "M.B.B.S, Gynecologist",
      heading3: "Sciatica: Symptoms, Causes & Treatments",
      paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      msg: "Read more in 10 Minutes"
    }
  ];
  public invoicesGrid = [
    {
      invoiceNumber: "IN093439#@09",
      name: "Barbara Moore",
      img: "assets/img/profiles/avatar-04.jpg",
      amount: "Amount",
      amounts: "$1,54,220",
      text: "Due Date",
      dueDate: "23 Mar 2022",
      status: "Paid",
    },
    {
      invoiceNumber: "IN093439#@10",
      name: "Karlene Chaidez",
      img: "assets/img/profiles/avatar-06.jpg",
      amount: "Amount",
      amounts: "$1,222",
      text: "Due Date",
      dueDate: "18 Mar 2022",
      status: "Overdue",
      overDue: "Overdue 14 days"
    },
    {
      invoiceNumber: "IN093439#@11",
      name: "Russell Copeland",
      img: "assets/img/profiles/avatar-08.jpg",
      amount: "Amount",
      amounts: "$3,470",
      text: "Due Date",
      dueDate: "10 Mar 2022",
      status: "Cancelled",
    },
    {
      invoiceNumber: "IN093439#@12",
      name: "Joseph Collins",
      img: "assets/img/profiles/avatar-10.jpg",
      amount: "Amount",
      amounts: "$8,265",
      text: "Due Date",
      dueDate: "30 Mar 2022",
      status: "Sent",
    },
    {
      invoiceNumber: "IN093439#@13",
      name: "Jennifer Floyd",
      img: "assets/img/profiles/avatar-11.jpg",
      amount: "Amount",
      amounts: "$5,200",
      text: "Due Date",
      dueDate: "20 Mar 2022",
      status: "Cancelled",
    },
    {
      invoiceNumber: "IN093439#@14",
      name: "Leatha Bailey",
      img: "assets/img/profiles/avatar-09.jpg",
      amount: "Amount",
      amounts: "$480",
      text: "Due Date",
      dueDate: "15 Mar 2022",
      status: "Sent",
    },
    {
      invoiceNumber: "IN093439#@15",
      name: "Alex Campbell",
      img: "assets/img/profiles/avatar-12.jpg",
      amount: "Amount",
      amounts: "$1,999",
      text: "Due Date",
      dueDate: "08 Mar 2022",
      status: "Overdue",
      overDue: "Overdue 10 days"
    },
    {
      invoiceNumber: "IN093439#@16",
      name: "Marie Canales",
      img: "assets/img/profiles/avatar-03.jpg",
      amount: "Amount",
      amounts: "$2,700",
      text: "Due Date",
      dueDate: "18 Mar 2022",
      status: "Paid",
    },
  ]
}
