export type ConfigValueType = 'string' | 'number' | 'boolean' | 'array' | 'object';

export interface ConfigField {
  key: string;
  type: ConfigValueType;
  required: boolean;  
}

export const configFields: ConfigField[] = [
  {
    key: 'server_name',
    type: 'string',
    required: true,
  },
  {
    key: 'server_host',
    type: 'string',
    required: true,
  },
  {
    key: 'server_port',
    type: 'number',
    required: true,
  },
  {
    key: 'elasticsearch_hosts',
    type: 'array',
    required: true,
  },
  {
    key: 'kibana_index',
    type: 'string',
    required: true,
  },
  {
    key: 'elasticsearch_username',
    type: 'string',
    required: true,
  },
  {
    key: 'elasticsearch_password',
    type: 'string',
    required: true,
  },

  {
    key: 'server_basePath',
    type: 'string',
    required: false,
  },
  {
    key: 'elasticsearch_preserveHost',
    type: 'boolean',
    required: true,
  },
];
