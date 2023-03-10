import Loader from '../common/Loader';

type QueryResultTypes = {
    loading: any;
    error: any;
    data: any;
    children: any;
}
 
const QueryResult = (result: QueryResultTypes) => {
  if (result.error) {
    return <p>ERROR: {result.error.message}</p>;
  }
  if (result.loading) {
    return (
      <Loader/>
    );
  }
  if (!result.data) {
    return <p>Nothing to show...</p>;
  }
  if (result.data) {
    return result.children;
  }
};

export default QueryResult;