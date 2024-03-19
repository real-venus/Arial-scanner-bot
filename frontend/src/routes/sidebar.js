/** Icons are imported separatly to reduce build time */
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon'
import CodeBracketSquareIcon from '@heroicons/react/24/outline/CodeBracketSquareIcon'
import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon'
import BoltIcon from '@heroicons/react/24/outline/BoltIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
import WalletIcon from '@heroicons/react/24/outline/WalletIcon'

const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`

const routes = [

  {
    path: '/app/dashboard',
    icon: <Squares2X2Icon className={iconClasses}/>, 
    name: 'Dashboard',
  },
  {
    path: '', 
    icon: <ChartBarIcon className={`${iconClasses} inline` }/>, 
    name: 'Signal', 
    submenu : [
      {
        path: '/app/hot',
        icon: <CurrencyDollarIcon className={iconClasses}/>,
    name: 'HotSignal',
      },
      {
        path: '/app/long',
        icon: <CurrencyDollarIcon className={iconClasses}/>,
        name: 'LongSignal',
      },
      {
        path: '/app/short',
        icon: <CurrencyDollarIcon className={iconClasses}/>,
        name: 'ShortSignal',
      }
    ]
  },
  {
    path: '/app/backtesting', 
    icon: <BoltIcon className={iconClasses}/>, 
    name: 'Backtesting', 
  },
  {
    path: '', 
    icon: <Cog6ToothIcon className={`${iconClasses} inline` }/>, 
    name: 'Settings',
    submenu : [
      {
        path: '/app/long-setting',
        icon: <WalletIcon className={submenuIconClasses}/>,
        name: 'long',
      },
      {
        path: '/app/short-setting', // url
        icon: <WalletIcon className={submenuIconClasses}/>, 
        name: 'short',
      },
    ]
  },
  {
    path: '',
    icon: <DocumentTextIcon className={`${iconClasses} inline` }/>, 
    name: 'Documentation', 
    submenu : [
      {
        path: '/app/roadmap', 
        icon: <DocumentTextIcon className={submenuIconClasses}/>, 
        name: 'RoadMap', 
      },
      {
        path: '/app/about',
        icon: <UsersIcon className={submenuIconClasses}/>, 
        name: 'About us',
      },
    ]
  },
]

export default routes


