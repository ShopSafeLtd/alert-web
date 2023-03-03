export interface VehicleData {
  id: string;
  make?: string | null | undefined;
  model?: string | null | undefined;
  colour?: string | null | undefined;
  registration?: string | null | undefined;
  crimeGroup?: string[];
  incidents?: string[];
  offenders?: string[];
  edited?: boolean;
}
