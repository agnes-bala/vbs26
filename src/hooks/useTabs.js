import { useState } from 'react';

// ----------------------------------------------------------------------

export default function UseTabs(defaultValues) {
  const [currentTab, setCurrentTab] = useState(defaultValues || '');

  return {
    currentTab,
    onChangeTab: (event, newValue) => {
      setCurrentTab(newValue);
    },
    setCurrentTab,
  };
}
