import { useIndexImageMutation } from 'graphql/rekognition/mutations/__generated__/index-image.generated';
import { Role } from 'graphql/types';
import { useEffect, useState } from 'react';
import { useStoreState } from 'state';

interface Return {
  isAdmin: boolean;
  linkNewOffender: boolean;
  linkOffender: null | string;
  onReIndex: (imageId?: string) => void;
  reIndexing: boolean;
  showBoxes: boolean;
  toggleBoxes: () => void;
  toggleLinkNewOffender: () => void;
  toggleLinkOffender: (faceId: null | string) => void;
  toggleViewMatches: (offenderId: null | string) => void;
  viewMatches: null | string;
}

const useLightBox = (): Return => {
  const role = useStoreState((state) => state.user.role);

  const [reIndexing, setReIndexing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showBoxes, setShowBoxes] = useState(true);
  const [linkOffender, setLinkOffender] = useState<null | string>(null);
  const [viewMatches, setViewMatches] = useState<null | string>(null);
  const [linkNewOffender, setLinkNewOffender] = useState(false);

  useEffect(() => {
    setIsAdmin(role !== Role.User);
  }, [role]);

  const [indexImage] = useIndexImageMutation();

  const onReIndex = async (image?: string) => {
    setReIndexing(true);
    await indexImage({
      variables: {
        where: {
          id: image,
        },
      },
    });
    setReIndexing(false);
  };

  const toggleBoxes = () => {
    setShowBoxes(!showBoxes);
  };

  const toggleLinkOffender = (value: null | string) => {
    setLinkOffender(value);
    if (value === null) setLinkNewOffender(false);
  };

  const toggleLinkNewOffender = () => {
    setLinkNewOffender(!linkNewOffender);
  };

  return {
    isAdmin,
    linkNewOffender,
    linkOffender,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onReIndex,
    reIndexing,
    showBoxes,
    toggleBoxes,
    toggleLinkNewOffender,
    toggleLinkOffender,
    toggleViewMatches: setViewMatches,
    viewMatches,
  };
};

export default useLightBox;
