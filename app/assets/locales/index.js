const files = {};
files['app/appNL'] = require('./nl/app/app.json');
files['app/ui/components/errorScreen/ErrorScreenNL'] = require('./nl/app/ui/components/errorScreen/ErrorScreen.json');
files['app/ui/components/standardHeader/StandardHeaderNL'] = require('./nl/app/ui/components/standardHeader/StandardHeader.json');
files['app/ui/components/sidebar/SidebarNL'] = require('./nl/app/ui/components/sidebar/Sidebar.json');
files['app/ui/screens/memberList/MemberListScreenNL'] = require('./nl/app/ui/screens/memberList/MemberListScreen.json');
files['app/ui/screens/settings/NotificationsSectionNL'] = require('./nl/app/ui/screens/settings/NotificationsSection.json');
files['app/ui/screens/events/CalendarItemNL'] = require('./nl/app/ui/screens/events/CalendarItem.json');
files['app/ui/screens/events/RegistrationScreenNL'] = require('./nl/app/ui/screens/events/RegistrationScreen.json');
files['app/ui/screens/events/CalendarScreenNL'] = require('./nl/app/ui/screens/events/CalendarScreen.json');
files['app/ui/screens/events/EventAdminScreenNL'] = require('./nl/app/ui/screens/events/EventAdminScreen.json');
files['app/ui/screens/events/EventScreenNL'] = require('./nl/app/ui/screens/events/EventScreen.json');
files['app/ui/screens/admin/AdminScreenNL'] = require('./nl/app/ui/screens/admin/AdminScreen.json');
files['app/ui/screens/pizza/PizzaScreenNL'] = require('./nl/app/ui/screens/pizza/PizzaScreen.json');
files['app/ui/screens/welcome/WelcomeScreenNL'] = require('./nl/app/ui/screens/welcome/WelcomeScreen.json');
files['app/ui/screens/welcome/EventDetailCardNL'] = require('./nl/app/ui/screens/welcome/EventDetailCard.json');
files['app/ui/screens/profile/AchievementSectionNL'] = require('./nl/app/ui/screens/profile/AchievementSection.json');
files['app/ui/screens/profile/PersonalInfoSectionNL'] = require('./nl/app/ui/screens/profile/PersonalInfoSection.json');
files['app/ui/screens/profile/DescriptionSectionNL'] = require('./nl/app/ui/screens/profile/DescriptionSection.json');
files['app/ui/screens/profile/ProfileScreenNL'] = require('./nl/app/ui/screens/profile/ProfileScreen.json');
files['app/ui/screens/photos/AlbumDetailScreenNL'] = require('./nl/app/ui/screens/photos/AlbumDetailScreen.json');
files['app/ui/screens/photos/AlbumsOverviewScreenNL'] = require('./nl/app/ui/screens/photos/AlbumsOverviewScreen.json');
files['app/ui/screens/login/LoginScreenNL'] = require('./nl/app/ui/screens/login/LoginScreen.json');
files['app/sagas/sessionNL'] = require('./nl/app/sagas/session.json');
files['app/sagas/registrationNL'] = require('./nl/app/sagas/registration.json');
files['app/sagas/profileNL'] = require('./nl/app/sagas/profile.json');

export default {
  nl: {
    app: files['app/appNL'],
    'ui/components/errorScreen/ErrorScreen': files['app/ui/components/errorScreen/ErrorScreenNL'],
    'ui/components/standardHeader/StandardHeader': files['app/ui/components/standardHeader/StandardHeaderNL'],
    'ui/components/sidebar/Sidebar': files['app/ui/components/sidebar/SidebarNL'],
    'ui/screens/memberList/MemberListScreen': files['app/ui/screens/memberList/MemberListScreenNL'],
    'ui/screens/settings/NotificationsSection': files['app/ui/screens/settings/NotificationsSectionNL'],
    'ui/screens/events/CalendarItem': files['app/ui/screens/events/CalendarItemNL'],
    'ui/screens/events/RegistrationScreen': files['app/ui/screens/events/RegistrationScreenNL'],
    'ui/screens/events/CalendarScreen': files['app/ui/screens/events/CalendarScreenNL'],
    'ui/screens/events/EventAdminScreen': files['app/ui/screens/events/EventAdminScreenNL'],
    'ui/screens/events/EventScreen': files['app/ui/screens/events/EventScreenNL'],
    'ui/screens/admin/AdminScreen': files['app/ui/screens/admin/AdminScreenNL'],
    'ui/screens/pizza/PizzaScreen': files['app/ui/screens/pizza/PizzaScreenNL'],
    'ui/screens/welcome/WelcomeScreen': files['app/ui/screens/welcome/WelcomeScreenNL'],
    'ui/screens/welcome/EventDetailCard': files['app/ui/screens/welcome/EventDetailCardNL'],
    'ui/screens/profile/AchievementSection': files['app/ui/screens/profile/AchievementSectionNL'],
    'ui/screens/profile/PersonalInfoSection': files['app/ui/screens/profile/PersonalInfoSectionNL'],
    'ui/screens/profile/DescriptionSection': files['app/ui/screens/profile/DescriptionSectionNL'],
    'ui/screens/profile/ProfileScreen': files['app/ui/screens/profile/ProfileScreenNL'],
    'ui/screens/photos/AlbumDetailScreen': files['app/ui/screens/photos/AlbumDetailScreenNL'],
    'ui/screens/photos/AlbumsOverviewScreen': files['app/ui/screens/photos/AlbumsOverviewScreenNL'],
    'ui/screens/login/LoginScreen': files['app/ui/screens/login/LoginScreenNL'],
    'sagas/session': files['app/sagas/sessionNL'],
    'sagas/registration': files['app/sagas/registrationNL'],
    'sagas/profile': files['app/sagas/profileNL'],
  },
};
