import { useState } from 'react';

interface DrawerStateType<T extends string> {
  visible: boolean;
  id: T | 'null';
  defaultTitle: string;
}

export interface DrawerType<T extends string> extends DrawerStateType<T> {
  open(input: Omit<DrawerStateType<T>, 'visible'>): void;
  close(): void;
}

/**
 *
 * @returns {DrawerType<''>} Object containing drawer state and open/close functions.
 *
 * @description Handles a defaultTitle to display, an id, and a boolean indicating whether the drawer should be visible. The intended use case for this hook is to dynamically swap the content of the 'Drawer' component based on the input given in the drawer.open function made available by this hook. The 'open' function accepts an 'id' which should correspond to the item you wish to display in the drawer, and a 'defaultTitle' which is expected to represent the title on the form. The supplied 'close' function will reset these values to { id: 'null', defaultTitle:'', visible:false }. Note that the id is set to string 'null' and not null. This is to accomodate an 'empty' value if the id is being used as a key to access an object.
 */
const useDrawerState = <T extends string>(): { drawer: DrawerType<T> } => {
  const [drawer, setDrawer] = useState<DrawerStateType<T>>({
    visible: false,
    id: 'null',
    defaultTitle: '',
  });

  const openDrawer = (input: Omit<DrawerStateType<T>, 'visible'>) => {
    setDrawer({ ...input, visible: true });
  };
  const closeDrawer = () => {
    setDrawer({ visible: false, id: 'null', defaultTitle: '' });
  };

  return {
    drawer: {
      ...drawer,
      open: openDrawer,
      close: closeDrawer,
    },
  };
};

export default useDrawerState;
