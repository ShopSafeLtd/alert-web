import gql from 'graphql-tag';

export const EditAlertMutation = gql`
  mutation updateIncident(
    $id: String!
    $subject: NullableStringFieldUpdateOperationsInput
    $date: DateTimeFieldUpdateOperationsInput
    $time: DateTimeFieldUpdateOperationsInput
    $description: StringFieldUpdateOperationsInput
    $crimeTypes: TagUpdateManyWithoutIncidentsInput
    $location: AddressUpdateOneRequiredWithoutIncidentInput
    $offenders: OffenderUpdateManyWithoutIncidentsInput
    $images: ImageUpdateManyWithoutIncidentInput
    $groups: GroupUpdateManyWithoutIncidentsInput
  ) {
    updateIncident(
      where: { id: $id }
      data: {
        subject: $subject
        date: $date
        time: $time
        description: $description
        crimeTypes: $crimeTypes
        groups: $groups
        offenders: $offenders
        location: $location
        images: $images
      }
    ) {
      id
      subject
      description
      date
      time
      crimeTypes {
        id
        name
      }
      offenders {
        id
        name
        images {
          id
          url
        }
      }
      images {
        id
        url
        offenders {
          id
          name
        }
      }
      location {
        id
        premises
        building
        street
        townCity
        county
        postcode
      }
      groups {
        id
        name
      }
    }
  }
`;