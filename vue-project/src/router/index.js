import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import CoursesListPage from '../pages/CoursesListPage.vue'
import CoursePage from '../pages/CoursePage.vue'
import CourseDescriptionPage from '../pages/CourseDescriptionPage.vue'
import CourseProgramPage from '../pages/CourseProgramPage.vue'
import CourseReviewsPage from '../pages/CourseReviewsPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import DashboardPage from '../pages/DashboardPage.vue'
import NotFoundPage from '../pages/NotFoundPage.vue'

const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: HomePage 
  },
  {
    path: '/courses',
    name: 'Courses',
    component: CoursesListPage,
    meta: { requiresAuth: false }
  },
  {
    path: '/courses/:id',
    name: 'Course',
    component: CoursePage,
    props: true,
    meta: { requiresAuth: false },
    children: [
      {
        path: '',
        redirect: { name: 'CourseDescription' }
      },
      {
        path: 'description',
        name: 'CourseDescription',
        component: CourseDescriptionPage
      },
      {
        path: 'program',
        name: 'CourseProgram',
        component: CourseProgramPage
      },
      {
        path: 'reviews',
        name: 'CourseReviews',
        component: CourseReviewsPage
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { requiresAuth: false, guestOnly: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('authToken') === 'demo'

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
    return
  }

  if (to.meta.guestOnly && isLoggedIn) {
    next({ name: 'Dashboard' })
    return
  }

  next()
})

export default router