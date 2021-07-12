import { SignIn } from './cmps/SignIn.jsx'
// import { StayAdd } from './cmps/StayAdd.jsx'
import { Home } from './pages/Home.jsx'
// import { About } from './pages/About.jsx'
import { StayApp } from './pages/StayApp.jsx'
import { StayDetails } from './pages/StayDetails.jsx'
import { UserProfile } from './pages/UserProfile.jsx'

export const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/stay',
        component: StayApp,
    },
    {
        path: '/stay/:stayId',
        component: StayDetails,
    },
    {
        path: '/user',
        component: UserProfile,
    },
    {
        path: '/login',
        component: SignIn,
    },
    // {
    //     path: '/about',
    //     component: About,
    // }
]