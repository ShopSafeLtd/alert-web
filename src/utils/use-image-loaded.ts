import { useEffect, useRef, useState } from 'react';

interface Props {
  ref: React.RefObject<HTMLDivElement>;
  loaded: boolean;
  onLoad: () => void;
}

const useImageLoaded = (): Props => {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const onLoad = () => {
    setLoaded(true);
  };

  useEffect(() => {
    if (ref.current) {
      onLoad();
    }
  });

  return {
    ref,
    loaded,
    onLoad,
  };
};
export default useImageLoaded;
