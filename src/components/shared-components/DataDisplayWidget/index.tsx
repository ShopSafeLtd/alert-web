import React from "react";
import { Card, Avatar } from "antd";
import Flex from "../Flex";
import CustomStatistic from "../CustomStatistic";

interface Props {
  size: string;
  value: string;
  title: string;
  icon: string;
  color: string;
  avatarSize: number;
  vertical: boolean;
}

const DataDisplayWidget = (props:Props) => {
  const {
    size,
    value,
    title,
    icon,
    color,
    avatarSize = 50,
    vertical = false,
  } = props;
  const customStatisticProps = { size, value, title };
  return (
    <Card>
      <Flex alignItems="center" flexDirection={vertical ? "column" : "row"}>
        <Avatar
          size={avatarSize}
          shape="square"
          icon={icon}
          className={`ant-avatar-${color}`}
        />
        <div className={vertical ? "mt-3 text-center" : "ml-3"}>
          <CustomStatistic {...customStatisticProps} />
        </div>
      </Flex>
    </Card>
  );
};

export default DataDisplayWidget;
