import moment from 'moment';

const formatDate = (date: Date) => {
  if (moment(date).format('DD/MM/YY') === moment().format('DD/MM/YY'))
    return moment(date).format('hh:mm');
  return moment(date).format('hh:mm DD/MM');
};
export default formatDate;
