import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export const constantRouterMap = [
  {
    path:'/show_report',
    name:'show_report',
    component:()=>import('@/pages/Login/show_report'),
    hidden:true,
  },
  {
    path:'/mobile_check_report',
    component:()=>import('@/pages/Login/mobile_check_report'),
    hidden:true
  },
  {
    path:'/admin_login',
    component:()=>import('@/pages/Login/admin_login'),
    hidden:true
  },
  {
    path:'/check_report',
    component:()=>import('@/pages/Login/check_report'),
    hidden:true
  },
  {
    path: '/login',
    component: () => import('@/pages/Login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/pages/404'),
    hidden: true
  },
  {
    path: '/modify_password',
    name:"mehe",
    component: () => import('@/pages/Login/modify_password'),
    hidden: true
  },
  {
    path: '/admin_modify_password',
    component: () => import('@/pages/Login/admin_modify_password'),
  },
]

export const adminRouterMap = [{
    path: '/',
    component: () => import('@/pages/Manager/homepage'),
    children: [{
        path: '',
        redirect: 'statistics',
        component: () => import('@/pages/Manager/children/index'),
      },
      {
        path: 'statistics',
        component: () => import('@/pages/Manager/children/index'),
      },

      {
        path:'statistics/upload_achievements',
        component:() => import('@/pages/Manager/children/achievements/upload_achievements')
      },
      {
        path: 'achievements/summary',
        component: () => import('@/pages/Manager/children/achievements/summary'),
      },
      {
        path: 'identity/student',
        component: () => import('@/pages/Manager/children/user_identity/student')
      },
      {
        path: 'identity/student_outer',
        component: () => import('@/pages/Manager/children/user_identity/student_outer')
      },
      {
        path: 'identity/teacher',
        component: () => import('@/pages/Manager/children/user_identity/teacher')
      },
      {
        path: 'identity/teacher_outer',
        component: () => import('@/pages/Manager/children/user_identity/teacher_outer')
      },
      {
        path: 'identity/configuration',
        component: () => import('@/pages/Manager/children/user_identity/configuration')
      },
      {
        path: 'identity/key_reset',
        component: () => import('@/pages/Manager/children/user_identity/key_reset')
      },
      {
        path: 'competition&project_items/competition_items',
        component: () => import('@/pages/Manager/children/competition&project_items/competition_items')
      },
      {
        path: 'competition&project_items/project_items',
        component: () => import('@/pages/Manager/children/competition&project_items/project_items')
      },
      {
        path: 'competition&project_items/add_typeAlevel',
        component: () => import('@/pages/Manager/children/competition&project_items/add_typeAlevel')
      },
      {
        name: 'competition',
        path: 'achievements/competition',
        component: () => import('@/pages/Manager/children/achievements/competition')
      },
      {
        path: 'achievements/achieve_details',
        name: 'achievements_achieve_details',
        component: () => import('@/pages/Manager/children/achievements/achieve_details')
      },
      {
        path: 'achievements/achieve_details/modify_achieve',
        component: () => import('@/pages/Manager/children/achievements/modify_achieve')
      },
      {
        name: 'projects',
        path: 'achievements/projects',
        component: () => import('@/pages/Manager/children/achievements/projects')
      },
      {
        name: 'paper',
        path: 'achievements/paper',
        component: () => import('@/pages/Manager/children/achievements/paper')
      },
      {
        name: 'patent',
        path: 'achievements/patent',
        component: () => import('@/pages/Manager/children/achievements/patent')
      },
      {
        name: 'honor',
        path: 'achievements/honor',
        component: () => import('@/pages/Manager/children/achievements/honor')
      },
      {
        name: 'summary',
        path: 'achievements/summary',
        component: () => import('@/pages/Manager/children/achievements/summary')
      },
      {
        name: 'react_app',
        path: 'react_app',
      },
      {
        name: 'achieve_subset_list',
        path: 'achieve_subset/list',
        component: () => import('@/pages/Manager/children/achieve_subset/index')
      },
      {
        name: 'achieve_subset_add',
        path: 'achieve_subset/add',
        component: () => import('@/pages/Manager/children/achieve_subset/add')
      },
      {
        name: 'achieve_subset_details',
        path: 'achieve_subset/details',
        component: () => import('@/pages/Manager/children/achieve_subset/details')
      },
      {
        path: 'summary/sum_studentTechnology',
        component: () => import('@/pages/Manager/children/summary/sum_studentTechnology')
      },
      {
        path: 'update/update',
        component: () => import('@/pages/Manager/children/update/update')
      },
      {
        name: 'mailbox',
        path: '/mailbox',
        component: () => import('@/pages/Manager/mailbox/mailbox')
      },
      {
        name: 'mailbox_details',
        path: '/mailbox/mailbox_details',
        component: () => import('@/pages/Manager/mailbox/mail_details')
      },
      {
        path: '/recycleBin',
        name: 'recycleBin',
        component: () => import('@/pages/Manager/recycleBin')
      },
      {
        path: '/user_info',
        name: 'user_info',
        component: () => import('@/pages/userInfo')
      },
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
export const stuRouterMap = [{
    path: '/',
    component: () => import('@/pages/Student/homepage'),
    children: [{
        path: '',
        redirect: 'achievements/summary',
        component: () => import('@/pages/Student/children/achievements/summary')
      },
      {
        path: 'achievements/report',
        component: () => import('@/pages/Student/children/achievements/report'),
        name:"report"
      },
      {
        path: 'achievements/achieve_details',
        name: 'students_achieve_details',
        component: () => import('@/pages/Student/children/achievements/achieve_details')
      },
      {
        path: 'achievements/achieve_details/modify_achieve',
        component: () => import('@/pages/Student/children/achievements/modify_achieve')
      },
      {
        name: 'stu_summary',
        path: 'achievements/summary',
        component: () => import('@/pages/Student/children/achievements/summary')
      },
      {
        name: 'stu_summary_uncheck',
        path: 'achievements/summary_uncheck',
        component: () => import('@/pages/Student/children/achievements/summary_uncheck')
      },
      {
        name: 'stu_update_index',
        path: 'update/index',
        component: () => import('@/pages/Student/children/update/update_index')
      },
      {
        name: 'stu_update_add',
        path: 'update/add',
        component: () => import('@/pages/Student/children/update/update_add')
      },
      {
        name: 'stu_update_achieve',
        path: 'update/achieve',
        component: () => import('@/pages/Student/children/update/update_achieve')
      },
      {
        name: 'stu_drafts',
        path: 'achievements/drafts',
        component: () => import('@/pages/Student/children/achievements/drafts')
      },
      {
        name: 'stu_mailbox',
        path: '/stu_mailbox',
        component: () => import('@/pages/Student/mailbox/mailbox')
      },
      {
        name: 'stu_mailbox_details',
        path: '/stu_mailbox/mailbox_details',
        component: () => import('@/pages/Student/mailbox/mail_details')
      },
      {
        path: '/motify_information',
        name: 'stu_motify_information',
        component: () => import('@/pages/Student/children/identity/motify_information')
      },
      {
        path: '/user_info',
        name: 'user_info',
        component: () => import('@/pages/userInfo')
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]


export const teaRouterMap = [{
    path: '/',
    component: () => import('@/pages/Teacher/homepage'),
    children: [{
        path: '',
        redirect: 'achievements/summary',
        component: () => import('@/pages/Teacher/children/achievements/summary')
      },
      {
         path:'achievements/teacher_report',
         name:'teacher_report',
         component:()=>import('@/pages/Teacher/children/achievements/teacher_report')
      },
      {
        path: 'achievements/achieve_details',
        name: 'teachers_achieve_details',
        component: () => import('@/pages/Teacher/children/achievements/achieve_details')
      },
      {
        path: 'achievements/achieve_details/modify_achieve',
        component: () => import('@/pages/Teacher/children/achievements/modify_achieve')
      },
      {
        path: 'achievements/achieve_details/modify_achieve/modify_members',
        component: () => import('@/pages/Teacher/children/achievements/modify_members')
      },
      {
        name: 'tea_summary',
        path: 'achievements/summary',
        component: () => import('@/pages/Teacher/children/achievements/summary')
      },
      {
        path: 'motify_information',
        name: 'tea_motify_information',
        component: () => import('@/pages/Teacher/children/identity/motify_information')
      },
      {
        path: '/user_info',
        name: 'user_info',
        component: () => import('@/pages/userInfo')
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]


export default new Router({
  mode: 'history',
  routes: constantRouterMap,
  //切换路由时控制视图位置，现用于keepalive保存位置
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})
