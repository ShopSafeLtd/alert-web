import { useState } from 'react'
import { useListSchemeUsersQuery, ListSchemeUsersQuery, QueryMode } from 'graphql/generated'
import { useStoreState } from 'state'

interface Return {
  data: ListSchemeUsersQuery | undefined,
  loading: boolean,
  search: string;
  setSearch: (value: string) => void
}

const useUserList = (): Return => {
  const schemeId = useStoreState(state => state.scheme.id)

  const [search, setSearch] = useState('')

  const {
    data,
    loading
  } = useListSchemeUsersQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        schemes: {
          some: {
            scheme: {
              id: {
                equals: schemeId
              }
            },
            recycled: {
              equals: false
            }
          }
        },
        recycled: {
          equals: false
        },
        OR: [{
          fullName: {
            contains: search,
            mode: QueryMode.Insensitive
          }
        }, {
          email: {
            contains: search,
            mode: QueryMode.Insensitive
          }
        }]
      }
    }
  })

  return {
    data,
    loading,
    search,
    setSearch
  }
}

export default useUserList