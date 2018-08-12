const files = {};
files['app/ui/screens/settings/NotificationsSectionNL'] = require('./nl/app/ui/screens/settings/NotificationsSection.json');
files['app/ui/screens/user/ProfileNL'] = require('./nl/app/ui/screens/user/Profile.json');
files['app/ui/screens/user/LoginNL'] = require('./nl/app/ui/screens/user/Login.json');
files['app/ui/screens/welcome/WelcomeNL'] = require('./nl/app/ui/screens/welcome/Welcome.json');
files['app/ui/screens/welcome/EventDetailCardNL'] = require('./nl/app/ui/screens/welcome/EventDetailCard.json');
files['app/ui/screens/memberList/MemberListNL'] = require('./nl/app/ui/screens/memberList/MemberList.json');
files['app/ui/screens/events/CalendarItemNL'] = require('./nl/app/ui/screens/events/CalendarItem.json');
files['app/ui/screens/events/EventNL'] = require('./nl/app/ui/screens/events/Event.json');
files['app/ui/screens/events/RegistrationNL'] = require('./nl/app/ui/screens/events/Registration.json');
files['app/ui/screens/events/CalendarNL'] = require('./nl/app/ui/screens/events/Calendar.json');
files['app/ui/screens/pizza/PizzaNL'] = require('./nl/app/ui/screens/pizza/Pizza.json');
files['app/ui/components/standardHeader/StandardHeaderNL'] = require('./nl/app/ui/components/standardHeader/StandardHeader.json');
files['app/ui/components/sidebar/SidebarNL'] = require('./nl/app/ui/components/sidebar/Sidebar.json');
files['app/ui/components/errorScreen/ErrorScreenNL'] = require('./nl/app/ui/components/errorScreen/ErrorScreen.json');

export default {
  nl: {
    'screens/settings/NotificationsSection': files['app/ui/screens/settings/NotificationsSectionNL'],
    'screens/user/Profile': files['app/ui/screens/user/ProfileNL'],
    'screens/user/Login': files['app/ui/screens/user/LoginNL'],
    'screens/welcome/Welcome': files['app/ui/screens/welcome/WelcomeNL'],
    'screens/welcome/EventDetailCard': files['app/ui/screens/welcome/EventDetailCardNL'],
    'screens/memberList/MemberList': files['app/ui/screens/memberList/MemberListNL'],
    'screens/events/CalendarItem': files['app/ui/screens/events/CalendarItemNL'],
    'screens/events/Event': files['app/ui/screens/events/EventNL'],
    'screens/events/Registration': files['app/ui/screens/events/RegistrationNL'],
    'screens/events/Calendar': files['app/ui/screens/events/CalendarNL'],
    'screens/pizza/Pizza': files['app/ui/screens/pizza/PizzaNL'],
    'components/standardHeader/StandardHeader': files['app/ui/components/standardHeader/StandardHeaderNL'],
    'components/sidebar/Sidebar': files['app/ui/components/sidebar/SidebarNL'],
    'components/errorScreen/ErrorScreen': files['app/ui/components/errorScreen/ErrorScreenNL'],
  },
};
