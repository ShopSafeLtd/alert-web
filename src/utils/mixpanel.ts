import mixpanel from 'mixpanel-browser';

// const env_check = process.env.NODE_ENV === 'production';

const Mixpanel = {
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
};

export default Mixpanel;
