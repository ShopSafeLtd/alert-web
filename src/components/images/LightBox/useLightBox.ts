import { useEffect, useState } from 'react';
import { useStoreState } from 'state';
import { Role } from 'graphql/types';
import { useIndexImageMutation } from 'graphql/rekognition/mutations/index-image.generated';

interface Return {
  onReIndex: (imageId?: string) => void;
  reIndexing: boolean;
  isAdmin: boolean;
  toggleBoxes: () => void;
  showBoxes: boolean;
  linkOffender: string | null;
  toggleLinkOffender: (faceId: string | null) => void;
  toggleLinkNewOffender: () => void;
  linkNewOffender: boolean;
  viewMatches: string | null;
  toggleViewMatches: (offenderId: string | null) => void;
}

const useLightBox = (): Return => {
  const role = useStoreState((state) => state.user.role);

  const [reIndexing, setReIndexing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showBoxes, setShowBoxes] = useState(true);
  const [linkOffender, setLinkOffender] = useState<string | null>(null);
  const [viewMatches, setViewMatches] = useState<string | null>(null);
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

  const toggleLinkOffender = (value: string | null) => {
    setLinkOffender(value);
    if (value === null) setLinkNewOffender(false);
  };

  const toggleLinkNewOffender = () => {
    setLinkNewOffender(!linkNewOffender);
  };

  return {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onReIndex,
    reIndexing,
    isAdmin,
    toggleBoxes,
    showBoxes,
    linkOffender,
    toggleLinkOffender,
    linkNewOffender,
    toggleLinkNewOffender,
    toggleViewMatches: setViewMatches,
    viewMatches,
  };
};

export default useLightBox;
