function cacheOrLoading({
  loading,
  data,
}: {
  loading: boolean;
  data: unknown;
}) {
  if (data) {
    return false;
  }
  if (loading) {
    return true;
  }
  return data === undefined;
}
export default cacheOrLoading;
