import React from 'react';
import {
	CloseOutlined,
} from '@ant-design/icons';
import utils from 'utils'
import SearchInput from './SearchInput';
import { useStoreState } from 'state'

interface Props {
	active: boolean;
	close(): void;
}

export const NavSearch = (props: Props) => {
	const { active, close } = props
	const headerNavColor = useStoreState(state => state.theme.topNavColor)
	const mode = utils.getColorContrast(headerNavColor)

	return (
		<div className={`nav-search ${active ? 'nav-search-active' : ''} ${mode}`} style={{backgroundColor: headerNavColor}}>
			<div className="d-flex align-items-center w-100">
				<SearchInput close={close} active={active}/>
			</div>
			<div className="nav-close" onClick={close}>
				<CloseOutlined />
			</div>
		</div>
	)
}

export default NavSearch