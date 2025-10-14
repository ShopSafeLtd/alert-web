import { useState } from 'react';

interface DrawerStateType<T extends string> {
  defaultTitle: string;
  id: 'null' | T;
  visible: boolean;
}

export interface DrawerType<T extends string> extends DrawerStateType<T> {
  close(): void;
  open(input: Omit<DrawerStateType<T>, 'visible'>): void;
}

/**
 *
 * @returns {DrawerType<''>} Object containing drawer state and open/close functions.
 *
 * @description Handles a defaultTitle to display, an id, and a boolean indicating whether the drawer should be visible. The intended use case for this hook is to dynamically swap the content of the 'Drawer' component based on the input given in the drawer.open function made available by this hook. The 'open' function accepts an 'id' which should correspond to the item you wish to display in the drawer, and a 'defaultTitle' which is expected to represent the title on the form. The supplied 'close' function will reset these values to { id: 'null', defaultTitle:'', visible:false }. Note that the id is set to string 'null' and not null. This is to accomodate an 'empty' value if the id is being used as a key to access an object.
 */
const useDrawerState = <T extends string>(): { drawer: DrawerType<T> } => {
  const [drawer, setDrawer] = useState<DrawerStateType<T>>({
    defaultTitle: '',
    id: 'null',
    visible: false,
  });

  const openDrawer = (input: Omit<DrawerStateType<T>, 'visible'>) => {
    setDrawer({ ...input, visible: true });
  };
  const closeDrawer = () => {
    setDrawer({ defaultTitle: '', id: 'null', visible: false });
  };

  return {
    drawer: {
      ...drawer,
      close: closeDrawer,
      open: openDrawer,
    },
  };
};

export default useDrawerState;
