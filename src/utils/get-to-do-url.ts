import { TodoType } from 'graphql/generated';

export interface TodoData {
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
  switch (todo.type) {
    // approve
    case TodoType.IncidentApprove: {
      return `/app/incidents/review/${todo.incidentId}`;
    }
    case TodoType.OffenderApprove: {
      return `/app/offenders/review/${todo.offenderId}`;
    }
    // mention
    case TodoType.IncidentUpdate: {
      return `/app/incidents/view/${todo.incidentId}`;
    }
    case TodoType.OffenderUpdate: {
      return `/app/offenders/view/${todo.offenderId}`;
    }
    case TodoType.InvestigationUpdate: {
      return `/app/investigations/view/${todo.investigationId}`;
    }
    case TodoType.VehicleUpdate: {
      return `/app/vehicles/view/${todo.vehicleId}`;
    }
    case TodoType.CrimegroupUpdate: {
      return `/app/crime-groups/view/${todo.vehicleId}`;
    }
    case TodoType.ChatMessage: {
      return `/app/chat/${todo.chatId}`;
    }
    default: {
      return `/app/adminTodo`;
    }
  }
};
export default getTodoUrl;
