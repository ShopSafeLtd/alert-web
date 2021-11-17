import React, { ReactNode } from 'react';
import { Radio, Switch, Button, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import ColorPicker, {
  ColorRes,
} from 'components/shared-components/AntD/ColorPicker';
import CopyToClipboard from 'react-copy-to-clipboard';
import NavLanguage from './navigation/NavLanguage';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import utils from 'utils/index';
import { useStoreActions, useStoreState, NavType, SideNavTheme } from 'state';

const colorOptions = ['#3e82f7', '#24a772', '#de4436', '#924aca', '#193550'];

interface ListItemProps {
  name: string;
  selector: ReactNode;
  disabled?: boolean;
  vertical?: boolean;
}

const ListOption = ({ name, selector, disabled, vertical }: ListItemProps) => (
  <div
    className={`my-4 ${
      vertical ? '' : 'd-flex align-items-center justify-content-between'
    }`}
  >
    <div
      className={`${disabled ? 'opacity-0-3' : ''} ${vertical ? 'mb-3' : ''}`}
    >
      {name}
    </div>
    <div>{selector}</div>
  </div>
);

export const ThemeConfigurator = () => {
  const navType = useStoreState((state) => state.theme.navType);
  const sideNavTheme = useStoreState((state) => state.theme.sideNavTheme);
  const navCollapsed = useStoreState((state) => state.theme.navCollapsed);
  const topNavColor = useStoreState((state) => state.theme.topNavColor);
  const headerNavColor = useStoreState((state) => state.theme.headerNavColor);
  const locale = useStoreState((state) => state.theme.locale);
  const currentTheme = useStoreState((state) => state.theme.currentTheme);

  const toggleCollapsedNav = useStoreActions(
    (actions) => actions.theme.toggleCollapsedNav
  );
  const onNavTypeChange = useStoreActions(
    (actions) => actions.theme.navTypeChange
  );
  const onNavStyleChange = useStoreActions(
    (actions) => actions.theme.sideNavStyleChange
  );
  const onTopNavColorChange = useStoreActions(
    (actions) => actions.theme.topNavColorChange
  );
  const onHeaderNavColorChange = useStoreActions(
    (actions) => actions.theme.headerNavColorChange
  );
  const onSwitchTheme = useStoreActions((actions) => actions.theme.switchTheme);

  const isNavTop = navType === NavType.TOP ? true : false;
  const isCollapse = navCollapsed;

  const { switcher, themes } = useThemeSwitcher();

  const toggleTheme = (isChecked: boolean) => {
    onHeaderNavColorChange('');
    const changedTheme = isChecked ? 'dark' : 'light';
    onSwitchTheme(changedTheme);
    switcher({ theme: themes[changedTheme] });
  };

  const ontopNavColorClick = (value: ColorRes) => {
    onHeaderNavColorChange('');
    const { rgb } = value;
    const rgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
    const hex = utils.rgbaToHex(rgba);
    onTopNavColorChange(hex);
  };
  const onHeaderNavColorClick = (value: ColorRes) => {
    const { rgb } = value;
    const rgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
    const hex = utils.rgbaToHex(rgba);
    onHeaderNavColorChange(hex);
  };

  const onNavTypeClick = (value: NavType) => {
    onHeaderNavColorChange('');
    if (value === NavType.TOP) {
      onTopNavColorChange(colorOptions[0]);
      toggleCollapsedNav(false);
    }
    onNavTypeChange(value);
  };

  interface genCopySettingJsonArgs {
    navType: NavType;
    sideNavTheme: SideNavTheme;
    navCollapsed: boolean;
    topNavColor: string;
    headerNavColor: string;
    locale: string;
    currentTheme: string;
  }

  const genCopySettingJson = (configState: genCopySettingJsonArgs) =>
    JSON.stringify(configState, null, 2);

  return (
    <>
      <div className="mb-5">
        <h4 className="mb-3 font-weight-bold">Navigation</h4>
        {isNavTop ? (
          <ListOption
            name="Top Nav Color:"
            vertical
            selector={
              <ColorPicker
                color={topNavColor}
                colorChange={ontopNavColorClick}
              />
            }
          />
        ) : (
          <ListOption
            name="Header Nav Color:"
            vertical
            selector={
              <ColorPicker
                color={headerNavColor}
                colorChange={onHeaderNavColorClick}
              />
            }
          />
        )}

        <ListOption
          name="Navigation Type:"
          selector={
            <Radio.Group
              size="small"
              onChange={(e) => onNavTypeClick(e.target.value)}
              value={navType}
            >
              <Radio.Button value={NavType.SIDE}>Side</Radio.Button>
              <Radio.Button value={NavType.TOP}>Top</Radio.Button>
            </Radio.Group>
          }
        />
        <ListOption
          name="Side Nav Color:"
          selector={
            <Radio.Group
              disabled={isNavTop}
              size="small"
              onChange={(e) => onNavStyleChange(e.target.value)}
              value={sideNavTheme}
            >
              <Radio.Button value={SideNavTheme.LIGHT}>Light</Radio.Button>
              <Radio.Button value={SideNavTheme.DARK}>Dark</Radio.Button>
            </Radio.Group>
          }
          disabled={isNavTop}
        />
        <ListOption
          name="Side Nav Collapse:"
          selector={
            <Switch
              disabled={isNavTop}
              checked={isCollapse}
              onChange={() => toggleCollapsedNav(!navCollapsed)}
            />
          }
          disabled={isNavTop}
        />
        <ListOption
          name="Dark Theme:"
          selector={
            <Switch checked={currentTheme === 'dark'} onChange={toggleTheme} />
          }
        />
      </div>
      <div className="mb-5">
        <h4 className="mb-3 font-weight-bold">Locale</h4>
        <ListOption name="Language:" selector={<NavLanguage configDisplay />} />
      </div>
      <div>
        <CopyToClipboard
          text={genCopySettingJson({
            navType,
            sideNavTheme,
            navCollapsed,
            topNavColor,
            headerNavColor,
            locale,
            currentTheme,
          })}
          onCopy={() =>
            message.success(
              'Copy Success, please paste it to src/configs/AppConfig.js THEME_CONFIG variable.'
            )
          }
        >
          <Button icon={<CopyOutlined />} block>
            <span>Copy Setting</span>
          </Button>
        </CopyToClipboard>
      </div>
    </>
  );
};

export default ThemeConfigurator;
