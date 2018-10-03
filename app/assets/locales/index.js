const files = {};
files['app/ui/screens/profile/ProfileScreenNL'] = require('./nl/app/ui/screens/profile/ProfileScreen.json');
files['app/ui/screens/login/LoginScreenNL'] = require('./nl/app/ui/screens/login/LoginScreen.json');
files['app/ui/screens/memberList/MemberListScreenNL'] = require('./nl/app/ui/screens/memberList/MemberListScreen.json');
files['app/ui/screens/welcome/WelcomeScreenNL'] = require('./nl/app/ui/screens/welcome/WelcomeScreen.json');
files['app/ui/screens/welcome/EventDetailCardNL'] = require('./nl/app/ui/screens/welcome/EventDetailCard.json');
files['app/ui/screens/pizza/PizzaScreenNL'] = require('./nl/app/ui/screens/pizza/PizzaScreen.json');
files['app/ui/screens/settings/NotificationsSectionNL'] = require('./nl/app/ui/screens/settings/NotificationsSection.json');
files['app/ui/screens/events/CalendarScreenNL'] = require('./nl/app/ui/screens/events/CalendarScreen.json');
files['app/ui/screens/events/RegistrationScreenNL'] = require('./nl/app/ui/screens/events/RegistrationScreen.json');
files['app/ui/screens/events/CalendarItemNL'] = require('./nl/app/ui/screens/events/CalendarItem.json');
files['app/ui/screens/events/EventScreenNL'] = require('./nl/app/ui/screens/events/EventScreen.json');
files['app/ui/components/standardHeader/StandardHeaderNL'] = require('./nl/app/ui/components/standardHeader/StandardHeader.json');
files['app/ui/components/errorScreen/ErrorScreenNL'] = require('./nl/app/ui/components/errorScreen/ErrorScreen.json');
files['app/ui/components/sidebar/SidebarNL'] = require('./nl/app/ui/components/sidebar/Sidebar.json');
files['app/AppNL'] = require('./nl/app.json');

export default {
  nl: {
    'screens/profile/ProfileScreen': files['app/ui/screens/profile/ProfileScreenNL'],
    'screens/login/LoginScreen': files['app/ui/screens/login/LoginScreenNL'],
    'screens/memberList/MemberListScreen': files['app/ui/screens/memberList/MemberListScreenNL'],
    'screens/welcome/WelcomeScreen': files['app/ui/screens/welcome/WelcomeScreenNL'],
    'screens/welcome/EventDetailCard': files['app/ui/screens/welcome/EventDetailCardNL'],
    'screens/pizza/PizzaScreen': files['app/ui/screens/pizza/PizzaScreenNL'],
    'screens/settings/NotificationsSection': files['app/ui/screens/settings/NotificationsSectionNL'],
    'screens/events/CalendarScreen': files['app/ui/screens/events/CalendarScreenNL'],
    'screens/events/RegistrationScreen': files['app/ui/screens/events/RegistrationScreenNL'],
    'screens/events/CalendarItem': files['app/ui/screens/events/CalendarItemNL'],
    'screens/events/EventScreen': files['app/ui/screens/events/EventScreenNL'],
    'components/standardHeader/StandardHeader': files['app/ui/components/standardHeader/StandardHeaderNL'],
    'components/errorScreen/ErrorScreen': files['app/ui/components/errorScreen/ErrorScreenNL'],
    'components/sidebar/Sidebar': files['app/ui/components/sidebar/SidebarNL'],
    'app/App': files['app/AppNL'],
  },
};
