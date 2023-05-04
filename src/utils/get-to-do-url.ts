import { TodoType } from 'graphql/generated';

interface TodoData {
  type?: TodoType | null;
  vehicleId?: string | null;
  offenderId?: string | null;
  crimeGroupId?: string | null;
  incidentId?: string | null;
  investigationId?: string | null;
  chatId?: string | null;
}
// calculate the difference in days between start and end date
const getTodoUrl = (todo: TodoData) => {
  // approve
  if (todo.type === TodoType.IncidentApprove)
    return `/app/incidents/review/${todo.incidentId}`;
  if (todo.type === TodoType.OffenderApprove)
    return `/app/offenders/review/${todo.offenderId}`;

  // mention
  if (todo.type === TodoType.IncidentUpdate)
    return `/app/offenders/view/${todo.incidentId}`;
  if (todo.type === TodoType.OffenderUpdate)
    return `/app/offenders/view/${todo.incidentId}`;
  if (todo.type === TodoType.InvestigationUpdate)
    return `/app/investigations/view/${todo.investigationId}`;
  if (todo.type === TodoType.VehicleUpdate)
    return `/app/vehicles/view/${todo.vehicleId}`;
  if (todo.type === TodoType.CrimegroupUpdate)
    return `/app/crime-groups/view/${todo.crimeGroupId}`;
  if (todo.type === TodoType.ChatMessage) return `/app/chat/${todo.chatId}`;
  return `/app/adminTodo`;
};

export default getTodoUrl;
