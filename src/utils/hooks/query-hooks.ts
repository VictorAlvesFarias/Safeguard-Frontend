import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

type useQueryExecuteRequestProps = (() => Promise<any>)[] | (() => Promise<any>);
type useQueryReturn = [
  boolean,
  (requests: useQueryExecuteRequestProps, noChangeState?: boolean) => void,
  React.Dispatch<React.SetStateAction<boolean>>
];

function useQuery(value?): useQueryReturn {
  const [allRequestsResolved, setAllRequestsResolved] = useState<boolean>(value);

  async function executeRequests(requests: useQueryExecuteRequestProps, noChangeState?: boolean) {
    setAllRequestsResolved(false);

    if (Array.isArray(requests)) {
      await Promise.all(
        requests.map(request =>
          request()
            .catch(error => {
              if (!noChangeState || noChangeState == null) {
                setAllRequestsResolved(true);
              }
              throw error;
            })
        )
      );
    } else {
      await requests()
        .catch(error => {
          if (!noChangeState || noChangeState == null) {
            setAllRequestsResolved(true);
          }
          throw error;
        });
    }

    if (!noChangeState || noChangeState == null) {
      setAllRequestsResolved(true);
    }
  }

  return [allRequestsResolved, executeRequests, setAllRequestsResolved];
}

export {
  useQuery,
  useQueryReturn,
  useQueryExecuteRequestProps
}