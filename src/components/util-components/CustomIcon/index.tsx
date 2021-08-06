import React from 'react'
import Icon from '@ant-design/icons';

interface Props {
  svg: any;
  className?: string;
}

const CustomIcon = React.forwardRef((props: Props, _) => <Icon component={props.svg} className={props.className}/>)

export default CustomIcon
