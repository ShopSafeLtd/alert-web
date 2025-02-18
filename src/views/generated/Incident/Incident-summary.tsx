/* eslint-disable formatjs/no-literal-string-in-jsx */
import React from 'react';
import { createUseStyles } from 'react-jss';

interface Business {
  address: string;
  name: string;
}

interface Reporter {
  email: string;
  name: string;
}

interface IncidentDetails {
  date: string;
  description: string;
  time: string;
}

interface Offender {
  address?: string;
  age?: string;
  alias?: string;
  build?: string;
  characteristics?: string;
  dateOfBirth?: string;
  dateOfBirthSource?: string;
  ethnicity?: string;
  hair?: string;
  height?: string;
  idVerificationSource?: string;
  idVerified: boolean;
  name: string;
  sex?: string;
}

interface Vehicle {
  colour: string;
  make: string;
  model: string;
  registration: string;
}

interface GoodsTaken {
  description: string;
  type: string;
  value: number;
}

interface CCTVEvidence {
  cameraNumber: string;
  description?: null | string;
  endTime: Date;
  showFace: boolean;
  showIncident: boolean;
  startTime: Date;
}

interface StoreDetails {
  methodUsed?: string;
  mg11Provided: boolean;
  whereItemsTakenFrom?: string;
}

interface IncidentReport {
  business: Business;
  cctv: {
    emailToObtain: string;
    evidence: CCTVEvidence[];
  };
  goodsTaken: GoodsTaken[];
  images: string[];
  incidentDetails: IncidentDetails;
  incidentType: string;
  involvedTags: string[];
  offenders: Offender[];
  reporter: Reporter;
  storeDetails: StoreDetails;
  vehicles: Vehicle[];
}

const useStyles = createUseStyles({
  imageUrl: {
    marginBottom: 10,
    maxWidth: '100%',
  },
  list: {
    paddingLeft: 20,
  },
  page: {
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    fontFamily: 'Arial, sans-serif',
    margin: 'auto',
    minHeight: '297mm',
    padding: 20,
    width: '210mm',
  },
  printButton: {
    backgroundColor: '#007bff',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontSize: 16,
    marginBottom: 20,
    padding: 10,
  },
  section: {
    borderBottom: '1px solid #ddd',
    marginBottom: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const IncidentReportPrint = () => {
  const classes = useStyles();
  const rawdata = localStorage.getItem('data') || '{}';
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const incidentData: IncidentReport = JSON.parse(rawdata);
  return (
    <div>
      <div className={classes.page}>
        <div className={classes.section}>
          <div className={classes.title}>Incident Report</div>
          <p>
            <strong>Type:</strong> {incidentData.incidentType}
          </p>
          <p>
            <strong>Business:</strong> {incidentData.business.name},{' '}
            {incidentData.business.address}
          </p>
          <p>
            <strong>Reporter:</strong> {incidentData.reporter.name} (
            {incidentData.reporter.email})
          </p>
        </div>

        <div className={classes.section}>
          <div className={classes.title}>Incident Details</div>
          <p>
            <strong>Date:</strong> {incidentData.incidentDetails.date}
          </p>
          <p>
            <strong>Time:</strong> {incidentData.incidentDetails.time}
          </p>
          <p>
            <strong>Description:</strong>{' '}
            {incidentData.incidentDetails.description}
          </p>
        </div>

        <div className={classes.section}>
          <div className={classes.title}>Offenders</div>
          {incidentData.offenders.map((offender, index) => (
            <div key={index}>
              <p>
                <strong>Name:</strong> {offender.name}
              </p>
              <p>
                <strong>Alias:</strong> {offender.alias || 'N/A'}
              </p>
              <p>
                <strong>Age:</strong> {offender.age || 'Unknown'}
              </p>
              <p>
                <strong>Address:</strong> {offender.address || 'Unknown'}
              </p>
            </div>
          ))}
        </div>

        <div className={classes.section}>
          <div className={classes.title}>Vehicles</div>
          {incidentData.vehicles.map((vehicle, index) => (
            <div key={index}>
              <p>
                <strong>Make:</strong> {vehicle.make}, <strong>Model:</strong>{' '}
                {vehicle.model}
              </p>
              <p>
                <strong>Colour:</strong> {vehicle.colour},{' '}
                <strong>Registration:</strong> {vehicle.registration}
              </p>
            </div>
          ))}
        </div>

        <div className={classes.section}>
          <div className={classes.title}>Goods Taken</div>
          {incidentData.goodsTaken.map((item, index) => (
            <div key={index}>
              <p>
                <strong>Type:</strong> {item.type}
              </p>
              <p>
                <strong>Description:</strong> {item.description}
              </p>
              <p>
                <strong>Value:</strong> £{item.value}
              </p>
            </div>
          ))}
        </div>

        <div className={classes.section}>
          <div className={classes.title}>CCTV Evidence</div>
          <p>
            <strong>Email to obtain:</strong> {incidentData.cctv.emailToObtain}
          </p>
          {incidentData.cctv.evidence.map((evidence, index) => (
            <div key={index}>
              <p>
                <strong>Camera Number:</strong> {evidence.cameraNumber}
              </p>
              <p>
                <strong>Start Time:</strong>{' '}
                {new Date(evidence.startTime).toLocaleString()}
              </p>
              <p>
                <strong>End Time:</strong>{' '}
                {new Date(evidence.endTime).toLocaleString()}
              </p>
              <p>
                <strong>Show Incident:</strong>{' '}
                {evidence.showIncident ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>Show Face:</strong> {evidence.showFace ? 'Yes' : 'No'}
              </p>
            </div>
          ))}
        </div>

        <div className={classes.section}>
          <div className={classes.title}>Store Details</div>
          <p>
            <strong>MG11 Provided:</strong>{' '}
            {incidentData.storeDetails.mg11Provided ? 'Yes' : 'No'}
          </p>
          <p>
            <strong>Where Items Taken From:</strong>{' '}
            {incidentData.storeDetails.whereItemsTakenFrom || 'N/A'}
          </p>
          <p>
            <strong>Method Used:</strong>{' '}
            {incidentData.storeDetails.methodUsed || 'N/A'}
          </p>
        </div>

        <div className={classes.section}>
          <div className={classes.title}>Images</div>
          {incidentData.images.map((image, index) => (
            <img
              alt={`Incident image ${index + 1}`}
              className={classes.imageUrl}
              key={index}
              src={image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IncidentReportPrint;
