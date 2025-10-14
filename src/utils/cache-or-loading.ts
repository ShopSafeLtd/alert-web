function cacheOrLoading({
  data,
  loading,
}: {
  data: unknown;
  loading: boolean;
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
