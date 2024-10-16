import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

interface SchemesInput {
  currentScheme: string;
  schemes?: string[];
  type: 'incident' | 'offender';
}

const useCanView = ({ currentScheme, schemes, type }: SchemesInput) => {
  const navigate = useNavigate();
  console.log(schemes, currentScheme);

  const isAllowed = useMemo(() => {
    if (!schemes) return true;

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

  console.log('rejected', schemes, currentScheme);
  redirectToEntity();
  return false;
};

export default useCanView;
