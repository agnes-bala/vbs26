import { capitalCase } from 'change-case';

// @mui
import { Container, Tab, Box, Tabs } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// @mui
// hooks
import useTabs from '../../hooks/useTabs';
import useSettings from '../../hooks/useSettings';
// _mock_
// import { _userPayment, _userAddressBook, _userInvoices, _userAbout } from '../../_mock';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections

import {  ContactForm} from '../../sections/auth/register';

// ----------------------------------------------------------------------

export default function UserAccount() {
  const { themeStretch } = useSettings();

  const { currentTab, onChangeTab } = useTabs('Profile');
 
   
  const ACCOUNT_TABS = [
    // {
    //   value: 'Basic',
    //   icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
    //   component: <BasicInfoForm />,
    // },
    {
      value: 'Profile',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <ContactForm />,
    },
    // {
    //   value: 'Spouse',
    //   icon: <Iconify icon={'ic:round-receipt'} width={20} height={20} />,
    //   component: <SpouseForm />,
    // },
    // {
    //   value: 'Children',
    //   icon: <Iconify icon={'eva:bell-fill'} width={20} height={20} />,
    //   component:  <ChildForm />,
    // },
  
    // {
    //   value: 'change_password',
    //   icon: <Iconify icon={'ic:round-vpn-key'} width={20} height={20} />,
    //   component: <UpdatePasswordForm />,
    // },
  ];

  return (
    <Page title="User: Profile">
      <Container maxWidth={themeStretch ? false : 'lg'}>
      <HeaderBreadcrumbs
          heading="User Profile"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Profile' , href: PATH_DASHBOARD.user.profile },
            { name: 'Spouse', href: PATH_DASHBOARD.user.spouse },
            { name: 'Child/Children', href: PATH_DASHBOARD.user.child },
            { name:  ''}
            
          ]}
          
        />
        
        <Tabs
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
          value={currentTab}
          onChange={onChangeTab}
        >
          {ACCOUNT_TABS.map((tab) => (
            
            <Tab disableRipple key={tab.value} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value} />
            
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
