import { 
  action,
  Action,
} from 'easy-peasy'

export interface DataModel {
  users: {
    name: {name: string; id: string};
    status: string;
    services: string[]
  }[]

  addUser: Action<DataModel, {
    name: {name: string; id: string};
    status: string;
    services: string[]
  }>;
}

const dataModel:DataModel = {
  users: [{
    name: { name: 'Warden 1', id: '0' },
    services: ['HYTALK', 'DEM'],
    status: 'Active'
  }, {
    name: { name: 'Warden 2', id: '1' },
    services: ['HYTALK', 'DEM'],
    status: 'Active'
  }, {
    name: { name: 'Warden 3', id: '2' },
    services: ['HYTALK', 'DEM'],
    status: 'Active'
  }, {
    name: { name: 'Warden 4', id: '3' },
    services: ['HYTALK', 'DEM'],
    status: 'Active'
  }, {
    name: { name: 'Warden 5', id: '4' },
    services: ['HYTALK'],
    status: 'Active'
  }, {
    name: { name: 'Warden 6', id: '5' },
    services: ['HYTALK', 'DEM'],
    status: 'Active'
  }, {
    name: { name: 'Warden 7', id: '6' },
    services: ['HYTALK', 'DEM'],
    status: 'Active'
  }],

  addUser: action((state, payload) => {
    state.users = [
      ...state.users,
      payload
    ]
  }) 
}

export default dataModel