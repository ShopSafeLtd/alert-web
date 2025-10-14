import { useEffect, useRef, useState } from 'react';

interface Props {
  loaded: boolean;
  onLoad: () => void;
  ref: React.RefObject<HTMLDivElement>;
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
    loaded,
    onLoad,
    ref,
  };
};
export default useImageLoaded;
