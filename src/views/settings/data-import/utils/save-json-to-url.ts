import { customRequest } from './upload-json';

const saveJsonToUrl = async (
  json: object,
  filename?: string
): Promise<null | string> => {
  try {
    if (filename && !filename.endsWith('.json')) {
      throw new Error('Filename must end with .json');
    }
    const jsonString = JSON.stringify(json);
    const newJsonData = new Blob([jsonString], { type: 'application/json' });
    return customRequest(newJsonData, filename);
  } catch (error) {
    console.error('Error saving JSON to URL:', error);
    return null;
  }
};

export default saveJsonToUrl;
