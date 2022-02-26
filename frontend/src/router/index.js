import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/corrector',
    name: 'Corrector',
    component: () => import(/* webpackChunkName: "about" */ '../views/Corrector.vue')
  },
  {
    path: '/collaborator',
    name: 'Collaborator',
    component: () => import(/* webpackChunkName: "about" */ '../views/Collaborator.vue')
  },
  {
    path: '/createsurvey',
    name: 'CreateSurvey',
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateSurvey.vue')
  },
  {
    path: '/passsurvey',
    name: 'PassSurvey',
    component: () => import(/* webpackChunkName: "about" */ '../views/passsurvey.vue')
  },
  {
    path: '/createquestion',
    name: 'CreateQuestion',
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateQuestion.vue')
  },
  {
    path: '/modifyquestion/:id',
    name: 'ModifyQuestion',
    component: () => import(/* webpackChunkName: "about" */ '../views/ModifyQuestion.vue')
  },
  {
    path: '/modifysurvey/:id',
    name: 'ModifySurvey',
    component: () => import(/* webpackChunkName: "about" */ '../views/ModifySurvey.vue')
  },
  {
    path: '/survey',
    name: 'survey',
    component: () => import(/* webpackChunkName: "about" */ '../views/survey.vue')
  },
  {
    path: '/showsurvey/:id',
    name: 'ShowSurvey',
    component: () => import(/* webpackChunkName: "about" */ '../views/ShowSurvey.vue')
  },
  {
    path: '/question',
    name: 'question',
    component: () => import(/* webpackChunkName: "about" */ '../views/question.vue')
  },
  {
    path: '/showquestion/:id',
    name: 'ShowQuestion',
    component: () => import(/* webpackChunkName: "about" */ '../views/ShowQuestion.vue')
  },
  {
    path: '/createcategory',
    name: 'CreateCategory',
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateCategory.vue')
  },
  {
    path: '/showcategory/:id',
    name: 'ShowCategory',
    component: () => import(/* webpackChunkName: "about" */ '../views/ShowCategory.vue')
  },
  {
    path: '/modifycategory/:id',
    name: 'ModifyCategory',
    component: () => import(/* webpackChunkName: "about" */ '../views/ModifyCategory.vue')
  },
  {
    path: '/category',
    name: 'category',
    component: () => import(/* webpackChunkName: "about" */ '../views/category.vue')
  },
  {
    path: '/showuser/:id',
    name: 'ShowUser',
    component: () => import(/* webpackChunkName: "about" */ '../views/ShowUser.vue')
  },
  {
    path: '/modifyuser/:id',
    name: 'ModifyUser',
    component: () => import(/* webpackChunkName: "about" */ '../views/ModifyUser.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "about" */ '../views/user.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "about" */ '../views/Signup.vue')
  
  },
  {
    path: '/creategroup',
    name: 'CreateGroup',
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateGroup.vue')
  
  },
  {
    path: '/modifygroup/:id',
    name: 'ModifyGroup',
    component: () => import(/* webpackChunkName: "about" */ '../views/ModifyGroup.vue')
  
  },
  {
    path: '/showgroup/:id',
    name: 'ShowGroup',
    component: () => import(/* webpackChunkName: "about" */ '../views/ShowGroup.vue')
  
  },
  {
    path: '/group',
    name: 'group',
    component: () => import(/* webpackChunkName: "about" */ '../views/group.vue')
  
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import(/* webpackChunkName: "about" */ '../views/Logout.vue')
  
  },
  {
    path: '/surveypass',
    name: 'surveypass',
    component: () => import(/* webpackChunkName: "about" */ '../views/surveypass.vue')
  
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue')
  
  },
  {
    path: '',
    name: 'Questions',
    component: () => import(/* webpackChunkName: "about" */ '../components/Questions.vue')
  
  },
  {
    path: '/correction',
    name: 'Correction',
    component: () => import(/* webpackChunkName: "about" */ '../views/Correction.vue')
  
  },
  {
    path: '/listcorrection',
    name: 'listCorrection',
    component: () => import(/* webpackChunkName: "about" */ '../views/listCorrection.vue')
  
  },
  {
    path: '/showsurveycorrect/:id',
    name: 'ShowSurveyCorrect',
    component: () => import(/* webpackChunkName: "about" */ '../views/ShowSurveyCorrect.vue')
  
  },
  {
    path: '/dashboardcollab',
    name: 'DashboardCollab',
    component: () => import(/* webpackChunkName: "about" */ '../views/DashboardCollab.vue')
  
  },
 
  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
