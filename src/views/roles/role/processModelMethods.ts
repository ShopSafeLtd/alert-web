import type { FormValues } from '#/views/roles/role/useRole';
import type { PermissionMethod, PermissionModel } from 'graphql/types';

interface ModelMethod {
  allowedMethods: PermissionMethod[];
  model: PermissionModel;
}

/**
 * Processes an object of model:method keys and groups allowed methods by model
 * @param values Object containing model:method keys with boolean values
 * @param excludedKeys Set of keys to exclude from processing
 * @returns Array of model objects with their allowed methods
 */
export function processModelMethods(
  values: FormValues,
  excludedKeys: Set<string> = new Set(['name', 'type', 'approvalAllowed'])
): ModelMethod[] {
  const groupedData = Object.entries(values)
    .filter(([key]) => !excludedKeys.has(key))
    .map(([key, value]) => {
      const [model, method] = key.split(':');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return { method, model, value };
    })
    // eslint-disable-next-line unicorn/no-array-reduce
    .reduce<Record<string, ModelMethod>>((acc, { method, model, value }) => {
      if (value) {
        if (!acc[model]) {
          acc[model] = { allowedMethods: [], model: model as PermissionModel };
        }
        acc[model].allowedMethods.push(method as PermissionMethod);
      }
      return acc;
    }, {});

  return Object.values(groupedData);
}

interface Method {
  key: string;
  // Add other properties if needed
}

interface Item {
  key: string;
  methods: Method[];
  // Add other properties if needed
}

/**
 * Creates an array of [permission key, false] entries from a collection of items
 * @param items Collection of items with keys and methods
 * @param result
 * @returns Array of tuple entries for Object.fromEntries
 */
export const createPermissionEntries = (
  items: Item[],
  result: boolean
): [string, boolean][] =>
  items.flatMap((item) =>
    item.methods.map(
      (method) => [`${item.key}:${method.key}`, result] as [string, boolean]
    )
  );
