import { useNavigate } from 'react-router-dom';

export function useHome() {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    if (query) {
      navigate(`/services?q=${encodeURIComponent(query)}`);
    } else {
      navigate('/services');
    }
  };

  return { handleSearch };
}
