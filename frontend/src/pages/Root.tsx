import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

export const Root = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/${nanoid(8)}`);
  }, []);

  return null;
}
