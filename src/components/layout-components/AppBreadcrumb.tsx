import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import navigationConfig, { NavItem, SubMenuItem, MenuItem } from "configs/NavigationConfig";
import IntlMessage from 'components/util-components/IntlMessage';

let breadcrumbData:{
	[path: string]: JSX.Element;
} = { 
	'/app' : <IntlMessage id="home" />
};

navigationConfig.forEach((elm:NavItem) => {
	const assignBreadcrumb = (obj:NavItem|SubMenuItem|MenuItem) => breadcrumbData[obj.path] = <IntlMessage id={obj.title} />;
	assignBreadcrumb(elm);
	if (elm.submenu) {
		elm.submenu.forEach( elm => {
			assignBreadcrumb(elm)
			if(elm.submenu) {
				elm.submenu.forEach( elm => {
					assignBreadcrumb(elm)
				})
			}
		})
	}
})

const BreadcrumbRoute = withRouter(props => {
	const { location } = props;
	const pathSnippets = location.pathname.split('/').filter(i => i);
	const buildBreadcrumb = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbData[url]}</Link>
      </Breadcrumb.Item>
    );
	});
  
  return (
		<Breadcrumb>
			{buildBreadcrumb}
		</Breadcrumb>
  );
});

const AppBreadcrumb = () => {
	return (
		<BreadcrumbRoute />
	)
}

export default AppBreadcrumb
