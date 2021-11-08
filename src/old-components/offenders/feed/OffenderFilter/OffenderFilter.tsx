import React, { useState, SetStateAction, useEffect } from 'react';

import {
  Radio,
  Typography,
  Select,
  Checkbox,
  Button,
  Row,
  RadioChangeEvent,
  Drawer,
  Space,
  Col,
} from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { LocalStorageKeys } from '../../../../types';

const { Option } = Select;

const ethnicities = {
  UNKNOWN: 'Unknown',
  IC1: 'IC1 - White - North European',
  IC2: 'IC2 - White - South European',
  IC3: 'IC3 - Black',
  IC4: 'IC4 - South Asian',
  IC5: 'IC5 - Southeast Asian',
  IC6: 'IC6 - North African or Arab',
};

type OrderType = Record<string, 'asc' | 'desc' | undefined>;
interface TagsType {
  id: string;
  name: string;
  description: string;
}

interface QueryVariablesType {
  order: OrderType;
  groups: string[] | undefined | null;
  sex: CheckboxValueType[] | undefined | null;
  ethnicity: string[] | undefined | null;
  tags: string[] | undefined | null;
  approved: boolean | undefined | null;
}

interface GroupType {
  id: string;
  name: string;
  description: string;
}

const convertApprovalToBooleanOrUndefined = (
  value: CheckboxValueType[] | undefined
) => {
  let booleanOrUndefined;
  if (value?.includes('Approved')) booleanOrUndefined = true;
  if (value?.includes('Awaiting Approval')) booleanOrUndefined = false;
  if (value?.length === 2) booleanOrUndefined = undefined;
  return booleanOrUndefined;
};

const arrayOrNull = (
  value: string[] | CheckboxValueType[] | undefined | null
) => {
  if (value && value.length > 0) return value as string[];
  return null;
};

interface Props {
  handleClose: () => void;
  open: boolean;
  setQueryVariables: React.Dispatch<SetStateAction<QueryVariablesType>>;
  tags: TagsType[] | undefined;
  groups: GroupType[] | undefined;
}

const OffenderFilter: React.FC<Props> = ({
  handleClose,
  open,
  setQueryVariables,
  tags,
  groups,
}) => {
  const [selectedOrder, setSelectedOrder] = useState<OrderType>({
    createdAt: 'desc',
  });
  const [selectedGroups, setSelectedGroups] = useState<string[] | undefined>();
  const [selectedTags, setSelectedTags] = useState<string[] | undefined>();
  const [selectedEthnicity, setSelectedEthnicity] = useState<
    string[] | undefined
  >();
  const [selectedSex, setSelectedSex] = useState<
    CheckboxValueType[] | undefined
  >();
  const [selectedApproval, setSelectedApproval] = useState<
    CheckboxValueType[] | undefined
  >();

  const actions = {
    onOrderChange: (event: RadioChangeEvent) =>
      setSelectedOrder({ createdAt: event.target.value }),
    onGroupsChange: (value: string[]) => setSelectedGroups(value),
    clearGroups: () => setSelectedGroups(undefined),
    onTagsChange: (value: string[]) => setSelectedTags(value),
    clearTags: () => setSelectedTags(undefined),
    onEthnicityChange: (value: string[]) => setSelectedEthnicity(value),
    clearEthnicity: () => setSelectedEthnicity(undefined),
    onSexChange: (value: CheckboxValueType[]) => setSelectedSex(value),
    clearSex: () => setSelectedSex(undefined),
    onApprovedChange: (value: CheckboxValueType[]) =>
      setSelectedApproval(value),
    clearApproval: () => setSelectedApproval(undefined),
    onSubmit: () => {
      const variables = {
        order: selectedOrder,
        groups: arrayOrNull(selectedGroups),
        sex: arrayOrNull(selectedSex),
        tags: arrayOrNull(selectedTags),
        ethnicity: arrayOrNull(selectedEthnicity),
        approved: convertApprovalToBooleanOrUndefined(selectedApproval),
      };

      setQueryVariables(variables);
      window.localStorage.setItem(
        LocalStorageKeys.OFFENDER_FILTER,
        JSON.stringify(variables)
      );
      handleClose();
    },
    onClose: () => {
      setSelectedOrder({
        createdAt: 'desc',
      });
      setSelectedGroups(undefined);
      setSelectedSex(undefined);
      setSelectedApproval(undefined);
      handleClose();
    },
  };

  useEffect(() => {
    const json = window.localStorage.getItem(LocalStorageKeys.OFFENDER_FILTER);
    const filters = json && (JSON.parse(json) as QueryVariablesType | null);
    if (!filters) return;

    setSelectedOrder(filters.order);
    setSelectedGroups(arrayOrNull(filters.groups) || undefined);
    setSelectedSex(arrayOrNull(filters.sex) || undefined);
    setSelectedTags(arrayOrNull(filters.tags) || undefined);
    setSelectedEthnicity(arrayOrNull(filters.ethnicity) || undefined);

    let approval: string[] | undefined;
    approval = undefined;
    if (filters.approved === true) approval = ['Approved'];
    if (filters.approved === false) approval = ['Awaiting Approval'];
    setSelectedApproval(approval);
  }, []);

  return (
    <Drawer
      title={<h2 style={{ margin: '0', padding: '0' }}>Sort & Filter</h2>}
      placement="right"
      onClose={actions.onClose}
      visible={open}
      width={480}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: '0 12px',
        }}
      >
        <Typography.Text>
          Select options from below to sort and filter the feed. The filters
          will not be applied until you confirm your selection by pressing the
          'Submit' button at the bottom of the page.
        </Typography.Text>
        <div style={{ margin: '24px 0 16px 0' }}>
          <Row>
            <Typography.Title level={4}>Order</Typography.Title>
          </Row>

          <Radio.Group
            onChange={actions.onOrderChange}
            value={selectedOrder?.createdAt}
          >
            <Space direction="vertical">
              <Radio value={'desc'}>Latest First</Radio>
              <Radio value={'asc'}>Oldest First</Radio>
            </Space>
          </Radio.Group>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <Row>
            <Space align="end">
              <Typography.Title level={4}>Groups</Typography.Title>
            </Space>
            <div style={{ flex: 1 }} />
            <Button type="text" onClick={actions.clearGroups}>
              Clear
            </Button>
          </Row>
          <Select
            mode="multiple"
            placeholder="Select groups..."
            onChange={actions.onGroupsChange}
            style={{ width: '100%' }}
            defaultValue={undefined}
            value={selectedGroups}
            showSearch
            filterOption={(input, option) =>
              option?.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {groups?.map(({ id, name }) => (
              <Option value={id} key={id} title={name}>
                {name}
              </Option>
            ))}
          </Select>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <Row>
            <Space align="end">
              <Typography.Title level={4}>Tags</Typography.Title>
            </Space>
            <div style={{ flex: 1 }} />
            <Button type="text" onClick={actions.clearTags}>
              Clear
            </Button>
          </Row>
          <Select
            mode="multiple"
            placeholder="Select tags..."
            onChange={actions.onTagsChange}
            style={{ width: '100%' }}
            defaultValue={undefined}
            value={selectedTags}
            showSearch
            filterOption={(input, option) =>
              option?.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {tags?.map(({ id, name }) => (
              <Option value={id} key={id} title={name}>
                {name}
              </Option>
            ))}
          </Select>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <Row>
            <Space align="end">
              <Typography.Title level={4}>Ethnicity</Typography.Title>
            </Space>
            <div style={{ flex: 1 }} />
            <Button type="text" onClick={actions.clearEthnicity}>
              Clear
            </Button>
          </Row>
          <Select
            mode="multiple"
            placeholder="Select ethnicity..."
            onChange={actions.onEthnicityChange}
            style={{ width: '100%' }}
            defaultValue={undefined}
            value={selectedEthnicity}
            showSearch
            filterOption={(input, option) =>
              option?.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {Object.keys(ethnicities)?.map((el) => {
              const key = el as keyof typeof ethnicities;
              return (
                <Option value={key} key={key} title={ethnicities[key]}>
                  {ethnicities[key]}
                </Option>
              );
            })}
          </Select>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <Row style={{ marginBottom: '4px' }}>
            <Space align="end">
              <Typography.Title level={4}>Sex</Typography.Title>
            </Space>
            <div style={{ flex: 1 }} />
            <Button type="text" onClick={actions.clearSex}>
              Clear
            </Button>
          </Row>
          <Checkbox.Group value={selectedSex} onChange={actions.onSexChange}>
            <Space direction="vertical">
              <Checkbox value="MALE">Male</Checkbox>
              <Checkbox value="FEMALE">Female</Checkbox>
              <Checkbox value="UNKNOWN">Unknown</Checkbox>
            </Space>
          </Checkbox.Group>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <Row style={{ marginBottom: '4px' }}>
            <Space align="end">
              <Typography.Title level={4}>Approved</Typography.Title>
            </Space>
            <div style={{ flex: 1 }} />
            <Button type="text" onClick={actions.clearApproval}>
              Clear
            </Button>
          </Row>
          <Checkbox.Group
            value={selectedApproval}
            onChange={actions.onApprovedChange}
          >
            <Space direction="vertical">
              <Checkbox value="Approved">Approved</Checkbox>
              <Checkbox value="Awaiting Approval">Awaiting Approval</Checkbox>
            </Space>
          </Checkbox.Group>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ marginBottom: '16px' }}>
          <Row>
            <Col flex="auto" />
            <Col>
              <Space>
                <Button type="ghost" onClick={actions.onClose}>
                  Cancel
                </Button>
                <Button type="primary" onClick={actions.onSubmit}>
                  Submit
                </Button>
              </Space>
            </Col>
          </Row>
        </div>
      </div>
    </Drawer>
  );
};

export default OffenderFilter;

// import React, { PureComponent } from "react";
// import styled from "styled-components";
// import Typography from "@material-ui/core/Typography";
// import isEqual from "lodash/isEqual";
// import Button from "@material-ui/core/Button";

// import { FullWidthButton, BackButton } from "../../../global/actions";
// import { PopOver, PopOverContainer } from "../../../global/layout";

// const Options = styled.div`
//   border-top: 1px solid #eeeeee;
// `;
// const Option = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 6px 20px;
//   cursor: pointer;
//   border-bottom: 1px solid #eeeeee;
// `;
// const Svg = styled.svg`
//   height: 30px;
//   width: 30px;
// `;
// const OptionText = styled(Typography)`
//   margin-left: 10px;
// `;
// const Row = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 20px 20px 10px;
// `;
// const Grow = styled.div`
//   flex: 1;
// `;

// const OptionItem = ({ children, selected, onClick }) => (
//   <Option onClick={onClick}>
//     <Svg onClick={onClick} viewBox="0 0 24 24">
//       <path
//         fill={selected ? "#1E88E5" : "#E0E0E0"}
//         d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"
//       />
//     </Svg>
//     <OptionText onClick={onClick} variant="body2">
//       {children}
//     </OptionText>
//   </Option>
// );

// class AlertFilter extends PureComponent {
//   componentDidUpdate(prevProps) {
//     !isEqual(this.props.filter, prevProps.filter) &&
//       this.setState({ filter: this.props.filter });
//     !isEqual(this.props.order, prevProps.order) &&
//       this.setState({ order: this.props.order });
//   }

//   submit = () => {
//     this.props.setOrder(this.state.order);
//     this.props.setFilter(this.state.filter);
//     this.props.handleClose();
//   };

//   render() {
//     const {
//       handleClose,
//       open,
//       order,
//       setOrder,
//       filter,
//       setFilter,
//       setQueryVariables,
//       tags,
//       groups,
//     } = this.props;

//     return (
//       <PopOver
//         noPadding
//         open={open}
//         handleClose={handleClose}
//         width={700}
//         title="Offender Filters"
//         actions={[
//           <BackButton key={0} onClick={handleClose}>
//             Close
//           </BackButton>,
//           <Button
//             key={1}
//             onClick={() => {
//               setQueryVariables({
//                 order: order ? order : { createdAt: "desc" },
//                 groups: filter.groups.length > 0 ? filter.groups : undefined,
//                 sex: filter.sex.length > 0 ? filter.sex : undefined,
//                 ethnicity:
//                   filter.ethnicity.length > 0 ? filter.ethnicity : undefined,
//                 tags: filter.tags.length > 0 ? filter.tags : undefined,
//                 approved: filter.approved.approved
//                   ? true
//                   : filter.approved.awaitingApproval
//                   ? false
//                   : undefined,
//               });
//               handleClose();
//             }}
//             color="primary"
//             variant="contained"
//           >
//             Apply Filter
//           </Button>,
//         ]}
//         mobileAction={[
//           <FullWidthButton key={0} text="Apply Filter" onClick={this.submit} />,
//         ]}
//       >
//         <PopOverContainer>
//           <div>
//             <Row>
//               <Typography variant="subtitle1">Order</Typography>
//             </Row>
//             <Options>
//               <OptionItem
//                 selected={order?.createdAt === "desc"}
//                 onClick={() => setOrder({ createdAt: "desc" })}
//               >
//                 Latest First
//               </OptionItem>
//               <OptionItem
//                 selected={order?.createdAt === "asc"}
//                 onClick={() => setOrder({ createdAt: "asc" })}
//               >
//                 Oldest First
//               </OptionItem>
//             </Options>
//           </div>
//           <div>
//             <Row>
//               <Typography variant="subtitle1">Groups</Typography>
//               <Grow />
//               <Button
//                 color="primary"
//                 size="small"
//                 onClick={() =>
//                   setFilter({
//                     ...filter,
//                     groups: [],
//                   })
//                 }
//               >
//                 Clear All
//               </Button>
//             </Row>
//             <Options>
//               {groups?.map(({ id, name }) => (
//                 <OptionItem
//                   key={id}
//                   selected={filter.groups.includes(id)}
//                   onClick={() => {
//                     const isSelected = filter.groups.find((el) => el === id);
//                     setFilter({
//                       ...filter,
//                       groups: isSelected
//                         ? filter.groups.filter((el) => el !== id)
//                         : [...filter.groups, id],
//                     });
//                   }}
//                 >
//                   {name}
//                 </OptionItem>
//               ))}
//             </Options>
//           </div>
//           <div>
//             <Row>
//               <Typography variant="subtitle1">Sex</Typography>
//               <Grow />
//               <Button
//                 color="primary"
//                 size="small"
//                 onClick={() =>
//                   setFilter({
//                     ...filter,
//                     sex: [],
//                   })
//                 }
//               >
//                 Clear All
//               </Button>
//             </Row>
//             <Options>
//               {["Unknown", "Male", "Female"].map((el, i) => (
//                 <OptionItem
//                   key={i}
//                   selected={filter.sex.includes(el.toUpperCase())}
//                   onClick={() => {
//                     const isSelected = filter.sex.find(
//                       (e) => el.toUpperCase() === e
//                     );
//                     setFilter({
//                       ...filter,
//                       sex: isSelected
//                         ? filter.sex.filter((e) => el.toUpperCase() !== e)
//                         : [...filter.sex, el.toUpperCase()],
//                     });
//                   }}
//                 >
//                   {el}
//                 </OptionItem>
//               ))}
//             </Options>
//           </div>
//           <div>
//             <Row>
//               <Typography variant="subtitle1">Ethnicity</Typography>
//               <Grow />
//               <Button
//                 color="primary"
//                 size="small"
//                 onClick={() =>
//                   setFilter({
//                     ...filter,
//                     ethnicity: [],
//                   })
//                 }
//               >
//                 Clear All
//               </Button>
//             </Row>
//             <Options>
//               {[
//                 { name: "Unknown", id: "UNKNOWN" },
//                 { name: "IC1 - White - North European", id: "IC1" },
//                 { name: "IC2 - White - South European", id: "IC2" },
//                 { name: "IC3 - Black", id: "IC3" },
//                 { name: "IC4 - South Asian", id: "IC4" },
//                 { name: "IC5 - Southeast Asian", id: "IC5" },
//                 { name: "IC6 - North African of Arab", id: "IC6" },
//               ].map((el, i) => (
//                 <OptionItem
//                   key={i}
//                   selected={filter.ethnicity.includes(el.id)}
//                   onClick={() => {
//                     const isSelected = filter.ethnicity.find(
//                       (e) => el.id === e
//                     );
//                     setFilter({
//                       ...filter,
//                       ethnicity: isSelected
//                         ? filter.ethnicity.filter((e) => el.id !== e)
//                         : [...filter.ethnicity, el.id],
//                     });
//                   }}
//                 >
//                   {el.name}
//                 </OptionItem>
//               ))}
//             </Options>
//           </div>
//           <div>
//             <Row>
//               <Typography variant="subtitle1">Tags</Typography>
//               <Grow />
//               <Button
//                 color="primary"
//                 size="small"
//                 onClick={() =>
//                   setFilter({
//                     ...filter,
//                     tags: [],
//                   })
//                 }
//               >
//                 Clear All
//               </Button>
//             </Row>
//             <Options>
//               {tags?.map(({ id, name }) => (
//                 <OptionItem
//                   key={id}
//                   selected={filter.tags.includes(id)}
//                   onClick={() => {
//                     const isSelected = filter.tags.find((el) => el === id);
//                     setFilter({
//                       ...filter,
//                       tags: isSelected
//                         ? filter.tags.filter((el) => el !== id)
//                         : [...filter.tags, id],
//                     });
//                   }}
//                 >
//                   {name}
//                 </OptionItem>
//               ))}
//             </Options>
//           </div>
//           <div>
//             <Row>
//               <Typography variant="subtitle1">Approved</Typography>
//               <Grow />
//               <Button
//                 color="primary"
//                 size="small"
//                 onClick={() =>
//                   setFilter({
//                     ...filter,
//                     approved: {
//                       approved: undefined,
//                       awaitingApproval: undefined,
//                     },
//                   })
//                 }
//               >
//                 Clear All
//               </Button>
//             </Row>
//             <Options>
//               <OptionItem
//                 selected={filter.approved.approved}
//                 onClick={() =>
//                   setFilter({
//                     ...filter,
//                     approved: {
//                       ...filter.approved,
//                       approved: filter.approved.approved ? undefined : true,
//                     },
//                   })
//                 }
//               >
//                 Approved
//               </OptionItem>
//               <OptionItem
//                 selected={filter.approved.awaitingApproval}
//                 onClick={() =>
//                   setFilter({
//                     ...filter,
//                     approved: {
//                       ...filter.approved,
//                       awaitingApproval: filter.approved.awaitingApproval
//                         ? undefined
//                         : true,
//                     },
//                   })
//                 }
//               >
//                 Awaiting Approval
//               </OptionItem>
//             </Options>
//           </div>
//         </PopOverContainer>
//       </PopOver>
//     );
//   }
// }

// export default AlertFilter;
