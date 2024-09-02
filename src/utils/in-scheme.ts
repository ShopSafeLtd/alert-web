import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

interface SchemesInput {
  currentScheme: string;
  schemes?: string | string[];
  type: 'incident' | 'offender';
}

const useCanView = ({ currentScheme, schemes, type }: SchemesInput) => {
  const navigate = useNavigate();

  const isAllowed = useMemo(() => {
    if (!schemes) return false;

    if (typeof schemes === 'string') {
      return schemes === currentScheme;
    }
    return schemes.includes(currentScheme);
  }, [currentScheme, schemes]);

  const redirectToEntity = useCallback(() => {
    if (!schemes) return;
    if (type === 'offender') {
      navigate('/app/offenders', { replace: true });
    } else if (type === 'incident') {
      navigate('/app/incidents', { replace: true });
    }
  }, [navigate, type]);

  if (isAllowed) return true;

  redirectToEntity();
  return false;
};

export default useCanView;
