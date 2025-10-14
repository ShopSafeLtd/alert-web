import mixpanel from 'mixpanel-browser';

const ENV_CHECK = import.meta.env.PROD;

const Mixpanel = ENV_CHECK
  ? {
      alias: (id: string) => {
        // if (env_check) mixpanel.alias(id);
        mixpanel.alias(id);
      },
      identify: (id: string) => {
        // if (env_check) mixpanel.identify(id);
        mixpanel.identify(id);
      },
      people: {
        set: (props: {
          businessId: string;
          businessName: string;
          name: string;
        }) => {
          // if (env_check) mixpanel.people.set(props);
          mixpanel.people.set(props);
        },
      },
      track: (
        name: string,
        props?: {
          [key: string]: boolean | number | string | undefined;
        }
      ) => {
        // if (env_check) mixpanel.track(name, props);
        mixpanel.track(name, props);
      },
    }
  : {
      alias: (_id: string) => null,
      identify: (_id: string) => null,
      people: {
        set: (_props: {
          businessId: string;
          businessName: string;
          name: string;
        }) => null,
      },
      track: (
        _name: string,
        _props?: {
          [key: string]: boolean | number | string | undefined;
        }
      ) => null,
    };

export default Mixpanel;
