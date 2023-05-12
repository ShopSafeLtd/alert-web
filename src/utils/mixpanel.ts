import mixpanel from 'mixpanel-browser';

const ENV_CHECK = import.meta.env.PROD;

const Mixpanel = ENV_CHECK
  ? {
      identify: (id: string) => {
        // if (env_check) mixpanel.identify(id);
        mixpanel.identify(id);
      },
      alias: (id: string) => {
        // if (env_check) mixpanel.alias(id);
        mixpanel.alias(id);
      },
      track: (
        name: string,
        props?: {
          [key: string]: string | number | boolean | undefined;
        }
      ) => {
        // if (env_check) mixpanel.track(name, props);
        mixpanel.track(name, props);
      },
      people: {
        set: (props: {
          name: string;
          businessName: string;
          businessId: string;
        }) => {
          // if (env_check) mixpanel.people.set(props);
          mixpanel.people.set(props);
        },
      },
    }
  : {
      identify: (_id: string) => null,
      alias: (_id: string) => null,
      track: (
        _name: string,
        _props?: {
          [key: string]: string | number | boolean | undefined;
        }
      ) => null,
      people: {
        set: (_props: {
          name: string;
          businessName: string;
          businessId: string;
        }) => null,
      },
    };

export default Mixpanel;
